'use client'

import React, { JSX, useCallback, useEffect, useState } from 'react'
import { FiClock, FiX, FiArrowUp, FiArrowDown, FiTrash2 } from 'react-icons/fi'
import {
  TransferHistoryEntry,
  getTransferHistory,
  clearTransferHistory,
  formatBytes,
} from '../utils/transferHistory'

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default function TransferHistoryButton(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<TransferHistoryEntry[]>([])

  const refresh = useCallback(() => setEntries(getTransferHistory()), [])

  useEffect(() => {
    refresh()
    const onChange = () => refresh()
    window.addEventListener('sendora:history-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('sendora:history-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [refresh])

  useEffect(() => {
    if (open) refresh()
  }, [open, refresh])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Transfer history"
        title="Transfer history"
        className="inline-flex items-center justify-center h-9 w-9 rounded-full text-stone-600 dark:text-stone-300 hover:bg-indigo-50 dark:hover:bg-[#161b29] transition-colors"
      >
        <FiClock size={18} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 pt-20"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Transfer history"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-indigo-100 dark:border-[#242b3d] bg-white dark:bg-[#0e121b] shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 dark:border-[#242b3d]">
              <h2 className="text-sm font-bold text-stone-800 dark:text-stone-100">
                Your transfer history
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto">
              {entries.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-stone-500 dark:text-stone-400">
                  No transfers yet. Your history is private and stored only in
                  this browser.
                </p>
              ) : (
                <ul className="divide-y divide-indigo-50 dark:divide-[#1b2130]">
                  {entries.map((e) => (
                    <li key={e.id} className="flex items-center gap-3 px-4 py-3">
                      <span
                        className={
                          'flex-none inline-flex items-center justify-center h-8 w-8 rounded-full ' +
                          (e.role === 'send'
                            ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300'
                            : 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300')
                        }
                      >
                        {e.role === 'send' ? (
                          <FiArrowUp size={15} />
                        ) : (
                          <FiArrowDown size={15} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-100">
                          {e.label}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {e.role === 'send' ? 'Sent' : 'Received'} ·{' '}
                          {formatBytes(e.totalBytes)} · {timeAgo(e.createdAt)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {entries.length > 0 ? (
              <div className="px-4 py-3 border-t border-indigo-100 dark:border-[#242b3d]">
                <button
                  onClick={() => {
                    clearTransferHistory()
                    refresh()
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                >
                  <FiTrash2 size={15} /> Clear history
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
