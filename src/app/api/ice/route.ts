// api/ice/route.ts

import { NextResponse } from 'next/server'
import { getTurnIceServers } from '../../../turn'

const peerjsHost = process.env.PEERJS_HOST || '0.peerjs.com'
const peerjsPath = process.env.PEERJS_PATH || '/'

const ICE_TTL = 86400 // 24 hours

type IceServer = {
  urls: string | string[]
  username?: string
  credential?: string
}

// STUN helps peers discover their public address; it's enough for many
// desktop-to-desktop transfers on the same kind of network.
const STUN_SERVERS: IceServer[] = [
  { urls: process.env.STUN_SERVER || 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
]

// TURN relays the data when a direct connection can't be made — essential for
// cross-network transfers (e.g. desktop Wi-Fi <-> mobile cellular, which is
// usually behind a strict/symmetric NAT). These are the free, public Open Relay
// (Metered) credentials, used only as a fallback when no TURN provider is
// configured via env. For production-grade reliability, set TURN_REST_URL
// (Cloudflare / Metered) or COTURN_ENABLED.
const FALLBACK_TURN_SERVERS: IceServer[] = [
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
]

export async function POST(): Promise<NextResponse> {
  let turnServers: IceServer[] = []
  try {
    turnServers = await getTurnIceServers(ICE_TTL)
  } catch (err) {
    console.error('[ICE] failed to get configured TURN credentials:', err)
  }

  // If no TURN provider is configured, fall back to the free public relay so
  // cross-network transfers still work out of the box.
  if (turnServers.length === 0) {
    turnServers = FALLBACK_TURN_SERVERS
  }

  return NextResponse.json({
    host: peerjsHost,
    path: peerjsPath,
    iceServers: [...STUN_SERVERS, ...turnServers],
  })
}
