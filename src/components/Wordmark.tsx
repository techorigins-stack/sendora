import { JSX } from 'react'

export default function Wordmark({
  className = '',
}: {
  className?: string
}): JSX.Element {
  return (
    <svg
      viewBox="0 0 168 32"
      role="img"
      aria-label="Sendora"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="snd-mark"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* paper-plane mark in a rounded square */}
      <rect x="0" y="2" width="28" height="28" rx="8" fill="url(#snd-mark)" />
      <path
        d="M7 16.2 L21 9 L16.5 23 L14.2 17.6 Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* wordmark */}
      <text
        x="38"
        y="22"
        fontFamily="'Manrope','DM Mono',ui-sans-serif,system-ui,sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Sendora
      </text>
    </svg>
  )
}
