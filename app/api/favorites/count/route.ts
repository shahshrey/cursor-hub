import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError } from '@/lib/errors'
import { getFavoritesCount } from '@/server/queries/favorites'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimitResponse = rateLimit(request, rateLimitConfigs.api)
    if (rateLimitResponse) return rateLimitResponse

    const count = await getFavoritesCount()

    return NextResponse.json({ count })
  } catch (error) {
    return handleApiError(error)
  }
}
