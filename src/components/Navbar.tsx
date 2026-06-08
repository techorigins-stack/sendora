import { JSX } from 'react'
import { Link } from 'next-view-transitions'
import Wordmark from './Wordmark'
import { ModeToggle } from './ModeToggle'
import GitHubStarButton from './GitHubStarButton'

export default function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0b0d12]/85 backdrop-blur-md border-b border-indigo-100 dark:border-[#242b3d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* left controls */}
        <div className="flex-1 flex items-center">
          <GitHubStarButton />
        </div>

        {/* centered logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 text-[#0e1116] dark:text-[#eef1f7] hover:opacity-75 transition-opacity duration-200"
          aria-label="Sendora home"
        >
          <Wordmark className="h-7 sm:h-8 md:h-9 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-none" />
        </Link>

        {/* right controls */}
        <div className="flex-1 flex items-center gap-2.5 justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
