import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError } from '@/lib/errors'
import { getFavoritesCount } from '@/server/queries/favorites'

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
