import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { getResourceBySlug, getResourceContent } from '@/lib/resources'
import { incrementDownload } from '@/server/actions/resources'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    console.log('[API] Fetching resource:', slug)

    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.log('[API] Invalid slug format:', slug)
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const resource = getResourceBySlug(slug)
    console.log('[API] Resource found:', resource ? 'YES' : 'NO')

    if (!resource) {
      console.log('[API] Resource not found in index for slug:', slug)
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    try {
      const content = getResourceContent(resource.filePath)

      after(async () => {
      await incrementDownload(slug)
      })

      const isPreview = request.headers.get('x-preview-mode') === 'true'
      
      if (isPreview) {
        return new NextResponse(content, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': content.length.toString(),
          },
        })
      }

      return new NextResponse(content, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${resource.fileName}"`,
          'Content-Length': content.length.toString(),
        },
      })
    } catch (error) {
      console.error('File read error:', error)
      return NextResponse.json({ error: 'Failed to read resource file' }, { status: 500 })
    }
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

