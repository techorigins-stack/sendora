'use client'

import React, { JSX, useCallback, useEffect, useRef, useState } from 'react'
import { UploadedFile, UploaderConnectionStatus } from '../types'
import { useWebRTCPeer } from './WebRTCProvider'
import QRCode from 'react-qr-code'
import Loading from './Loading'
import StopButton from './StopButton'
import { useUploaderChannel } from '../hooks/useUploaderChannel'
import { useUploaderConnections } from '../hooks/uploader/useUploaderConnections'
import { CopyableInput } from './CopyableInput'
import { ConnectionListItem } from './ConnectionListItem'
import UploadFileList from './UploadFileList'
import { ErrorMessage } from './ErrorMessage'
import { setRotating } from '../hooks/useRotatingSpinner'
import { recordTransfer } from '../utils/transferHistory'

const QR_CODE_SIZE = 128

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export default function Uploader({
  files,
  password,
  onStop,
  expiryMinutes = null,
  burnAfterDownload = false,
}: {
  files: UploadedFile[]
  password: string
  onStop: () => void
  expiryMinutes?: number | null
  burnAfterDownload?: boolean
}): JSX.Element {
  const { peer, stop } = useWebRTCPeer()
  const { isLoading, error, longSlug, shortSlug, longURL, shortURL } =
    useUploaderChannel(peer.id)
  const { connections, fileInfo } = useUploaderConnections(
    peer,
    files,
    password,
  )

  const handleStop = useCallback(() => {
    stop()
    onStop()
  }, [stop, onStop])

  const activeDownloaders = connections.filter(
    (conn) => conn.status === UploaderConnectionStatus.Uploading,
  ).length

  useEffect(() => {
    setRotating(activeDownloaders > 0)
  }, [activeDownloaders])

  // Record this send in the local, private transfer history (once the channel is live).
  const recordedRef = useRef(false)
  useEffect(() => {
    if (recordedRef.current || !shortSlug) return
    recordedRef.current = true
    const totalBytes = files.reduce((sum, f) => sum + (f.size || 0), 0)
    const label = files.length === 1 ? files[0].name : `${files.length} files`
    recordTransfer({
      id: `send-${shortSlug}`,
      role: 'send',
      label,
      fileCount: files.length,
      totalBytes,
    })
  }, [shortSlug, files])

  // Expiry: auto-stop the channel after the chosen duration, with a live countdown.
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  useEffect(() => {
    if (!expiryMinutes || !shortSlug) return
    const deadline = Date.now() + expiryMinutes * 60_000
    setRemainingMs(deadline - Date.now())
    const interval = setInterval(() => {
      const left = deadline - Date.now()
      setRemainingMs(left)
      if (left <= 0) {
        clearInterval(interval)
        handleStop()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [expiryMinutes, shortSlug, handleStop])

  // Burn after first download: stop sharing as soon as one peer fully completes.
  useEffect(() => {
    if (!burnAfterDownload) return
    const someoneDone = connections.some(
      (conn) => conn.status === UploaderConnectionStatus.Done,
    )
    if (someoneDone) {
      const t = setTimeout(handleStop, 800)
      return () => clearTimeout(t)
    }
  }, [burnAfterDownload, connections, handleStop])

  if (isLoading || !longSlug || !shortSlug) {
    return <Loading text="Creating channel..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  const showBanner = (expiryMinutes && remainingMs !== null) || burnAfterDownload

  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex-none mr-4 bg-white p-2 rounded-lg">
          <QRCode value={shortURL ?? ''} size={QR_CODE_SIZE} />
        </div>
        <div className="flex-auto flex flex-col justify-center space-y-2">
          <CopyableInput label="Room code" value={shortSlug ?? ''} />
          <CopyableInput label="Short URL" value={shortURL ?? ''} />
          <CopyableInput label="Long URL" value={longURL ?? ''} />
        </div>
      </div>

      {showBanner ? (
        <div className="mt-3 w-full flex flex-wrap gap-2 text-xs">
          {expiryMinutes && remainingMs !== null ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium">
              ⏳ Expires in {formatCountdown(remainingMs)}
            </span>
          ) : null}
          {burnAfterDownload ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-medium">
              🔥 Burns after first download
            </span>
          ) : null}
        </div>
      ) : null}

      {fileInfo ? (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-2">
            Uploading files with hashes
          </h3>
          <UploadFileList files={fileInfo} />
        </div>
      ) : null}
      <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-stone-400 dark:text-stone-200">
            {activeDownloaders} Downloading, {connections.length} Total
          </h2>
          <StopButton onClick={handleStop} />
        </div>
        {connections.map((conn) => (
          <ConnectionListItem key={conn.dataConnection.peer} conn={conn} />
        ))}
      </div>
    </>
  )
}
