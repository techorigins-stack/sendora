'use client'

import React, { JSX } from 'react'
import { useRotatingSpinner } from '../hooks/useRotatingSpinner'

function Arrow({ direction }: { direction: 'up' | 'down' }): JSX.Element {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
      aria-hidden="true"
    >
      {direction === 'up' ? (
        <>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </>
      ) : (
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </>
      )}
    </svg>
  )
}

export default function Spinner({
  direction,
}: {
  direction: 'up' | 'down'
}): JSX.Element {
  const isRotating = useRotatingSpinner()
  return (
    <div className="relative w-[180px] h-[180px] select-none">
      {/* rotating gradient ring */}
      <svg
        viewBox="0 0 180 180"
        className={isRotating ? 'animate-spin-slow' : ''}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sendora"
      >
        <defs>
          <linearGradient id="snd-ring" x1="0" y1="0" x2="180" y2="180">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle
          cx="90"
          cy="90"
          r="76"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="10"
          className="text-stone-500"
        />
        <circle
          cx="90"
          cy="90"
          r="76"
          fill="none"
          stroke="url(#snd-ring)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="150 360"
        />
      </svg>
      {/* center mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-3xl"
          style={{
            width: 96,
            height: 96,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 12px 30px -8px rgba(99,102,241,0.5)',
          }}
        >
          <Arrow direction={direction} />
        </div>
      </div>
    </div>
  )
}
