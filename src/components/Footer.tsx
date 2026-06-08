'use client'
import React, { JSX } from 'react'
import StatsBar from '../components/StatsBar'

const GITHUB_URL = 'https://github.com/techorigins-stack/sendora'

function GitHubIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      className="inline-block"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function Footer(): JSX.Element {
  return (
    <>
      <div className="h-[96px]" />
      <footer className="left-0 right-0 border-t border-indigo-100 dark:border-[#242b3d] bg-white/80 dark:bg-[#0b0d12]/80 backdrop-blur-sm">
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-400 dark:via-indigo-500 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Sendora — private, peer-to-peer file transfers.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sendora on GitHub"
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full
              border border-indigo-200 dark:border-[#2f3753]
              text-indigo-700 dark:text-indigo-300
              hover:bg-indigo-50 dark:hover:bg-[#161b29]
              transition-colors duration-200"
          >
            <GitHubIcon /> View source
          </a>
          <p className="text-xs text-stone-500 dark:text-stone-500 text-center">
            Free &amp; open-source · No accounts · Files never touch a server
          </p>
          <StatsBar variant="footer" />
        </div>
      </footer>
    </>
  )
}

export default Footer
