import React, { JSX } from 'react'

export default function UnlockButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2
  bg-gradient-to-b from-indigo-400 to-violet-500
  dark:from-indigo-500 dark:to-violet-600
  text-white font-semibold
  rounded-md border border-violet-600
  shadow-sm hover:shadow-md
  hover:from-indigo-300 hover:to-violet-400
  active:scale-[0.98]
  transition-all duration-200"
    >
      Unlock
    </button>
  )
}
