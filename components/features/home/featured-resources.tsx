'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ResourceCard } from '@/components/features/resources/resource-card'
import type { ResourceMetadata } from '@/types/resources'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ResourcePreviewModal = dynamic(
  () => import('@/components/features/resources/resource-preview-modal').then(m => m.ResourcePreviewModal),
  { ssr: false }
)

interface FeaturedResourcesProps {
  resources: ResourceMetadata[]
  title: string
  subtitle?: string
  viewAllHref?: string
}

export function FeaturedResources({ resources, title, subtitle, viewAllHref }: FeaturedResourcesProps) {
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const supabase = createClient()
      const slugs = resources.map(r => r.slug)
      
      const { data } = await supabase
        .from('resources')
        .select('slug, download_count')
        .in('slug', slugs)
      
      if (data) {
        const counts: Record<string, number> = {}
        data.forEach(item => {
          counts[item.slug] = item.download_count || 0
        })
        setDownloadCounts(counts)
      }
    }

    if (resources.length > 0) {
      fetchDownloadCounts()
    }
  }, [resources])

  const handlePreview = (resource: ResourceMetadata) => {
    setPreviewResource(resource)
    setIsPreviewOpen(true)
  }

  if (!resources || resources.length === 0) return null

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground text-lg">{subtitle}</p>
              )}
            </div>
            {viewAllHref && (
              <Link href={viewAllHref}>
                <Button variant="ghost" className="hidden md:flex items-center gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ResourceCard
                resource={resource}
                downloadCount={downloadCounts[resource.slug] || 0}
                onPreview={() => handlePreview(resource)}
              />
            </motion.div>
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-8 text-center md:hidden">
            <Link href={viewAllHref}>
              <Button variant="outline" className="w-full">
                View All Resources
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {previewResource && (
        <ResourcePreviewModal
          resource={previewResource}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  )
}

