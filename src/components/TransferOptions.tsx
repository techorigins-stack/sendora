'use client'

import React, { JSX } from 'react'

export const EXPIRY_CHOICES: { label: string; minutes: number | null }[] = [
  { label: 'Never', minutes: null },
  { label: '5 min', minutes: 5 },
  { label: '1 hour', minutes: 60 },
  { label: '24 hours', minutes: 60 * 24 },
]

export default function TransferOptions({
  expiryMinutes,
  burnAfterDownload,
  onChangeExpiry,
  onChangeBurn,
}: {
  expiryMinutes: number | null
  burnAfterDownload: boolean
  onChangeExpiry: (m: number | null) => void
  onChangeBurn: (b: boolean) => void
}): JSX.Element {
  return (
    <div className="w-full max-w-md rounded-xl border border-indigo-100 dark:border-[#242b3d] bg-indigo-50/40 dark:bg-[#141823] px-4 py-3 space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1.5">
          Link expires after
        </p>
        <div className="flex flex-wrap gap-1.5">
          {EXPIRY_CHOICES.map((c) => {
            const active = expiryMinutes === c.minutes
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => onChangeExpiry(c.minutes)}
                aria-pressed={active}
                className={
                  'px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ' +
                  (active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-transparent border-indigo-200 dark:border-[#2f3753] text-stone-600 dark:text-stone-300 hover:border-indigo-400')
                }
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={burnAfterDownload}
          onChange={(e) => onChangeBurn(e.target.checked)}
          className="h-4 w-4 accent-indigo-600"
        />
        <span className="text-sm text-stone-700 dark:text-stone-300">
          Burn after first download{' '}
          <span className="text-stone-400 dark:text-stone-500">
            — stop sharing once one person finishes
          </span>
        </span>
      </label>
    </div>
  )
}
