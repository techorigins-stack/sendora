'use client'

// Private, in-browser transfer history. Stored only in localStorage —
// nothing is ever uploaded or sent to a server.

export type TransferRole = 'send' | 'receive'

export interface TransferHistoryEntry {
  id: string
  role: TransferRole
  label: string
  fileCount: number
  totalBytes: number
  createdAt: number
}

const KEY = 'sendora:transfer-history'
const MAX_ENTRIES = 100

function read(): TransferHistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function write(entries: TransferHistoryEntry[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)))
    window.dispatchEvent(new Event('sendora:history-changed'))
  } catch {
    // storage full or unavailable — ignore
  }
}

export function getTransferHistory(): TransferHistoryEntry[] {
  return read()
}

export function recordTransfer(
  entry: Omit<TransferHistoryEntry, 'id' | 'createdAt'> & { id?: string },
): void {
  const entries = read()
  const id =
    entry.id ?? `${entry.role}-${entries.length}-${entries.reduce((a, e) => a + e.createdAt, 1)}`
  // de-dupe by id (avoid double-recording on re-render)
  if (entries.some((e) => e.id === id)) return
  const full: TransferHistoryEntry = {
    id,
    role: entry.role,
    label: entry.label,
    fileCount: entry.fileCount,
    totalBytes: entry.totalBytes,
    createdAt: Date.now(),
  }
  write([full, ...entries])
}

export function clearTransferHistory(): void {
  write([])
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes < 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}
