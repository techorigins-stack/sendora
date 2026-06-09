import Redis from 'ioredis'

export { Redis }

// Resolve a Redis connection string from any of the common env var names used
// by Vercel / Upstash integrations, so the app works as soon as a Redis store
// is attached (no manual var renaming required).
export function getRedisURL(): string | undefined {
  return (
    process.env.REDIS_URL ||
    process.env.KV_URL ||
    process.env.UPSTASH_REDIS_URL ||
    undefined
  )
}

let redisClient: Redis | null = null

export function getRedisClient(): Redis | null {
  const url = getRedisURL()
  if (!redisClient && url) {
    redisClient = new Redis(url, {
      // Serverless-friendly: fail fast rather than hanging a request.
      maxRetriesPerRequest: 3,
    })
    redisClient.on('error', (error) => {
      console.error('[Redis] Error', error)
    })
  }
  return redisClient
}
