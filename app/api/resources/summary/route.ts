import { NextResponse } from 'next/server'
import { getResourceIndex } from '@/lib/resources'

export async function GET(): Promise<NextResponse> {
  try {
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
    console.error('Summary API error:', error)
    return NextResponse.json(
      { error: 'Failed to get resource summary' },
      { status: 500 }
    )
  }
}

