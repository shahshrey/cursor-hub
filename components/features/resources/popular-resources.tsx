import { getPopularResources } from '@/server/actions/resources'
import { getResourceBySlug } from '@/lib/resources'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp } from 'lucide-react'
import { DownloadButton } from './download-button'
import { getResourceTypeIcon } from '@/lib/file-utils'
import Link from 'next/link'

export async function PopularResources({ limit = 10 }: { limit?: number }) {
  const popularData = await getPopularResources(limit)

  if (popularData.length === 0) {
    return null
  }

  const popularResources = popularData
    .map((p) => {
      const resource = getResourceBySlug(p.slug)
      return resource ? { ...resource, downloadCount: p.download_count } : null
    })
    .filter((r) => r !== null)

  if (popularResources.length === 0) {
    return null
  }

  return (
    <section className="border-y border-primary-300/20 py-16 bg-gradient-to-b from-card/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-[rgb(var(--color-yellow-500))]" />
            <h2 className="text-3xl font-bold text-white">Most Downloaded Resources</h2>
          </div>
          <Link
            href="/?sort=downloads"
            className="text-sm text-[rgb(var(--color-primary-300))] hover:text-[rgb(var(--color-primary-200))] transition-colors font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularResources.map((resource) => {
            const typeIcon = getResourceTypeIcon(resource.type)

            return (
              <Card key={resource.slug} className="border-primary-300/30 hover:border-primary-300/60 hover:shadow-lg hover:shadow-primary-300/10 hover:-translate-y-1 transition-all duration-300 group">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{typeIcon}</span>
                    <Badge variant="secondary" className="text-xs bg-primary-300/20 text-primary-300 border-primary-300/30">
                      {resource.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-white group-hover:text-[rgb(var(--color-primary-200))] transition-colors">{resource.title}</h3>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))] line-clamp-2 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[rgb(var(--color-yellow-500))] font-medium">
                      <Download className="h-3 w-3" />
                      <span>{resource.downloadCount}</span>
                    </div>
                    <DownloadButton resource={resource} size="sm" variant="outline" showLabel={false} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

