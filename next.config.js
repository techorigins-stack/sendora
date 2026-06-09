const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode to avoid calling useEffect twice in development.
  // The uploader and downloader both use useEffect to listen for peerjs events,
  // which would otherwise create the connection twice.
  reactStrictMode: false,

  // Pin the file-tracing root to this project so a stray lockfile in a parent
  // directory can't make Next.js mis-detect the workspace root.
  outputFileTracingRoot: __dirname,

  // 'standalone' output is only needed for self-hosting (Docker). On Vercel it
  // can mis-trace dependencies out of the serverless functions, so we enable it
  // only when explicitly building for Docker.
  ...(process.env.NEXT_OUTPUT_STANDALONE === 'true'
    ? { output: 'standalone' }
    : {}),
}

module.exports = nextConfig
