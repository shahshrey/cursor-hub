import { NextRequest, NextResponse } from 'next/server'
import { getResourceIndex } from '@/lib/resources'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError } from '@/lib/errors'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimitResponse = rateLimit(request, rateLimitConfigs.api)
    if (rateLimitResponse) return rateLimitResponse

    const index = getResourceIndex()

    const summary = {
      totalCount: index.totalCount,
      categories: index.categories,
      stats: {
        commands: index.resources.filter((r) => r.type === 'command').length,
        rules: index.resources.filter((r) => r.type === 'rule').length,
        mcps: index.resources.filter((r) => r.type === 'mcp').length,
        hooks: index.resources.filter((r) => r.type === 'hook').length,
      },
    }

    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

