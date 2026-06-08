import React from 'react'
import Footer from '../components/Footer'
import '../styles.css'
import { ThemeProvider } from '../components/ThemeProvider'
import SendoraQueryClientProvider from '../components/QueryClientProvider'
import { Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import Navbar from '../components/Navbar'
import 'highlight.js/styles/atom-one-dark.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sendora.app'
const DESCRIPTION =
  'Send files directly between browsers using WebRTC. No uploads, no cloud storage, no middleman — fast, private, end-to-end encrypted peer-to-peer file sharing that runs entirely in your browser.'

export const metadata = {
  title: 'Sendora — Private Peer-to-Peer File Transfers in Your Browser',
  description: DESCRIPTION,
  keywords: [
    'file transfer',
    'peer to peer',
    'WebRTC',
    'p2p file sharing',
    'browser file sharing',
    'no upload file transfer',
    'private file sharing',
    'send files',
    'Sendora',
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Sendora — Private Peer-to-Peer File Transfers',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Sendora',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sendora — Private Peer-to-Peer File Transfers',
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Caveat:wght@700&family=DM+Mono&display=swap"
            rel="stylesheet"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Sendora',
                url: SITE_URL,
                description: DESCRIPTION,
                applicationCategory: 'UtilitiesApplication',
                offers: { '@type': 'Offer', price: '0' },
              }),
            }}
          />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SendoraQueryClientProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SendoraQueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
