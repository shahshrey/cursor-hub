import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError } from '@/lib/errors'
import { getFavoritesCount } from '@/server/queries/favorites'

/**
 * Handle GET requests for the authenticated user's favorites count.
 *
 * @param request - Incoming Next.js request used to enforce rate limiting and determine the authenticated user
 * @returns A JSON NextResponse with `count`: the number of favorites for the authenticated user; when unauthenticated, `count` is 0. If the request exceeds rate limits or an internal error occurs, the response produced by the rate-limit or centralized error handler is returned.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimitResponse = rateLimit(request, rateLimitConfigs.api)
    if (rateLimitResponse) return rateLimitResponse

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ count: 0 })
    }

    const count = await getFavoritesCount(userId)

    return NextResponse.json({ count })
  } catch (error) {
    return handleApiError(error)
  }
}