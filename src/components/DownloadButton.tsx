import React, { JSX } from 'react'

export default function DownloadButton({
  onClick,
  label = 'Download',
}: {
  onClick?: React.MouseEventHandler
  label?: string
}): JSX.Element {
  return (
    <button
      id="download-button"
      onClick={onClick}
      className="h-12 px-5
    bg-gradient-to-b from-indigo-400 to-violet-500
    dark:from-indigo-500 dark:to-violet-600
    text-white font-semibold
    rounded-md border border-violet-600
    shadow-sm hover:shadow-md
    hover:from-indigo-300 hover:to-violet-400
    active:scale-[0.98]
    transition-all duration-200"
    >
      {label}
    </button>
  )
}
