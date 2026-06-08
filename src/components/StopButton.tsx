import React from 'react'

export default function StopButton({
  isDownloading,
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isDownloading?: boolean
}): React.ReactElement {
  return (
    <button
      className="px-2 py-1 text-xs
  text-violet-600 dark:text-violet-400
  bg-transparent
  hover:bg-violet-100 dark:hover:bg-violet-900/40
  border border-transparent hover:border-violet-300 dark:hover:border-violet-700
  rounded transition-all duration-200 flex items-center gap-1"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 mr-1"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="16" height="16" />
      </svg>
      {isDownloading ? 'Stop Download' : 'Stop Upload'}
    </button>
  )
}
