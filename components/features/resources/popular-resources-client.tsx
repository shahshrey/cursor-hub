'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp } from 'lucide-react'
import { DownloadButton } from './download-button'
import { getResourceTypeIcon } from '@/lib/file-utils'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { ResourceMetadata } from '@/types/resources'

interface PopularResourcesClientProps {
  initialResources: Array<ResourceMetadata & { downloadCount: number }>
}

export function PopularResourcesClient({ initialResources }: PopularResourcesClientProps) {
  const [resources, setResources] = useState(initialResources)

  useEffect(() => {
    const handleDownloadEvent = async (event: Event) => {
      const customEvent = event as CustomEvent<{ slug: string }>
      const slug = customEvent.detail.slug

      setResources(prev => prev.map(resource => {
        if (resource.slug === slug) {
          return { ...resource, downloadCount: resource.downloadCount + 1 }
        }
        return resource
      }))

      setTimeout(async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('resources')
          .select('download_count')
          .eq('slug', slug)
          .single()

        if (data && !error) {
          setResources(prev => prev.map(resource => {
            if (resource.slug === slug) {
              return { ...resource, downloadCount: data.download_count }
            }
            return resource
          }))
        }
      }, 100)
    }

    window.addEventListener('resource-downloaded', handleDownloadEvent)
    return () => window.removeEventListener('resource-downloaded', handleDownloadEvent)
  }, [])

  if (resources.length === 0) {
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
          {resources.map((resource) => {
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

