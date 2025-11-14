import { NextRequest, NextResponse } from 'next/server'

interface RateLimitRecord {
  count: number
  resetAt: number
}

interface RateLimitStore {
  [key: string]: RateLimitRecord
}

const store: RateLimitStore = {}
const CLEANUP_INTERVAL = 60 * 1000

const DEFAULT_WINDOW_MS = 15 * 60 * 1000
const DEFAULT_MAX_REQUESTS = 100

setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (store[key].resetAt < now) {
      delete store[key]
    }
  })
}, CLEANUP_INTERVAL)

function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown'

  const pathname = new URL(request.url).pathname
  return `${ip}:${pathname}`
}

export interface RateLimitConfig {
  windowMs?: number
  maxRequests?: number
  keyGenerator?: (request: NextRequest) => string
}

export function rateLimit(request: NextRequest, config: RateLimitConfig = {}): NextResponse | null {
  const {
    windowMs = DEFAULT_WINDOW_MS,
    maxRequests = DEFAULT_MAX_REQUESTS,
    keyGenerator = getClientId,
  } = config

  const clientId = keyGenerator(request)
  const now = Date.now()
  const record = store[clientId]

  if (!record || now > record.resetAt) {
    store[clientId] = { count: 1, resetAt: now + windowMs }
    return null
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000)

    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(record.resetAt).toISOString(),
        },
      }
    )
  }

  record.count++
  return null
}

export const rateLimitConfigs = {
  api: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  },
  search: {
    windowMs: 1 * 60 * 1000,
    maxRequests: 60,
  },
  download: {
    windowMs: 1 * 60 * 1000,
    maxRequests: 30,
  },
}
