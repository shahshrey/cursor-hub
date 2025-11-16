import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { getResourceBySlug, getResourceContent } from '@/lib/resources'
import { incrementDownload } from '@/server/actions/resources'
import { rateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit'
import { handleApiError, NotFoundError, ValidationError, logError } from '@/lib/errors'
import { validateSlug, MAX_SLUG_LENGTH } from '@/lib/validation'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const rateLimitResponse = rateLimit(request, rateLimitConfigs.download)
    if (rateLimitResponse) return rateLimitResponse

    const { slug } = await params

    if (!slug || slug.length > MAX_SLUG_LENGTH || !validateSlug(slug)) {
      throw new ValidationError(`Invalid slug: ${slug}`, 'Invalid resource identifier')
    }

    const resource = getResourceBySlug(slug)

    if (!resource) {
      throw new NotFoundError(`Resource not found: ${slug}`, 'Resource not found')
    }

    const content = getResourceContent(resource.filePath)

    after(async () => {
      try {
        await incrementDownload(slug)
      } catch (error) {
        logError(error, 'incrementDownload')
      }
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
    return handleApiError(error)
  }
}
