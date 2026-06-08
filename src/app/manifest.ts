import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sendora',
    short_name: 'Sendora',
    description: 'Private, peer-to-peer file transfers in your browser',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0d12',
    theme_color: '#6366f1',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
