import { NextRequest, NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import { getResourceIndex } from '@/lib/resources'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError } from '@/lib/errors'
import { searchParamsSchema } from '@/lib/validation'
import type { ResourceMetadata } from '@/types/resources'

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'searchContent', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  shouldSort: true,
  includeScore: true,
}

let fuseInstance: Fuse<unknown> | null = null

function getFuseInstance(): Fuse<unknown> {
  if (!fuseInstance) {
    const index = getResourceIndex()
    fuseInstance = new Fuse(index.resources, FUSE_OPTIONS)
  }
  return fuseInstance
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimitResponse = rateLimit(request, rateLimitConfigs.search)
    if (rateLimitResponse) return rateLimitResponse

    const searchParams = request.nextUrl.searchParams
    const rawParams = {
      q: searchParams.get('q'),
      type: searchParams.get('type'),
      category: searchParams.get('category'),
      limit: searchParams.get('limit'),
    }

    const validated = searchParamsSchema.parse(rawParams)
    const { q: query, type, category, limit } = validated

    const index = getResourceIndex()
    let results = index.resources

    if (type) {
      results = results.filter((r) => r.type === type)
    }

    if (category) {
      results = results.filter((r) => r.category === category)
    }

    if (query && query.length >= 2) {
      const fuse = getFuseInstance()
      const searchResults = fuse.search(query)
      
      results = searchResults
        .map((r) => r.item as ResourceMetadata)
        .filter((resource) => {
          if (type && resource.type !== type) return false
          if (category && resource.category !== category) return false
          return true
        })
    }

    const limitedResults = results.slice(0, limit)

    return NextResponse.json(
      {
        results: limitedResults,
        total: results.length,
        query: query || null,
        type: type || null,
        category: category || null,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-RateLimit-Limit': rateLimitConfigs.search.maxRequests.toString(),
        },
      }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

