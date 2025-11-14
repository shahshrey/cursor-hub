'use client'

import { useMemo, useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResourceCard } from './resource-card'
import type { ResourceMetadata, ResourceType, ResourceDownloadData } from '@/types/resources'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Favorite {
  resource_slug: string
  resource_type: ResourceType
  created_at: string
}

interface FavoritesDashboardProps {
  favorites: Favorite[]
  resourcesIndex: ResourceMetadata[]
}

export function FavoritesDashboard({ favorites, resourcesIndex }: FavoritesDashboardProps) {
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})

  const favoritedResources = useMemo(() => {
    return favorites
      .map(fav => {
        const resource = resourcesIndex.find(r => r.slug === fav.resource_slug)
        return resource ? { ...resource, favoritedAt: fav.created_at } : null
      })
      .filter((r): r is ResourceMetadata & { favoritedAt: string } => r !== null)
  }, [favorites, resourcesIndex])

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      if (favoritedResources.length === 0) return

      const supabase = createClient()
      const slugs = favoritedResources.map(r => r.slug)

      const { data, error } = await supabase
        .from('resources')
        .select('slug, download_count')
        .in('slug', slugs)

      if (data && !error) {
        const counts: Record<string, number> = {}
        data.forEach((item: ResourceDownloadData) => {
          counts[item.slug] = item.download_count || 0
        })
        setDownloadCounts(counts)
      }
    }

    fetchDownloadCounts()
  }, [favoritedResources])

  useEffect(() => {
    const handleDownloadEvent = async (event: Event) => {
      const customEvent = event as CustomEvent<{ slug: string }>
      const slug = customEvent.detail.slug

      setDownloadCounts(prev => ({
        ...prev,
        [slug]: (prev[slug] || 0) + 1,
      }))

      setTimeout(async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('resources')
          .select('download_count')
          .eq('slug', slug)
          .single()

        if (data && !error) {
          const resourceData = data as { download_count: number | null }
          setDownloadCounts(prev => ({
            ...prev,
            [slug]: resourceData.download_count || 0,
          }))
        }
      }, 100)
    }

    window.addEventListener('resource-downloaded', handleDownloadEvent)
    return () => window.removeEventListener('resource-downloaded', handleDownloadEvent)
  }, [])

  const groupedByType = useMemo(() => {
    const groups: Record<ResourceType | 'all', (ResourceMetadata & { favoritedAt: string })[]> = {
      all: favoritedResources,
      command: favoritedResources.filter(r => r.type === 'command'),
      rule: favoritedResources.filter(r => r.type === 'rule'),
      mcp: favoritedResources.filter(r => r.type === 'mcp'),
      hook: favoritedResources.filter(r => r.type === 'hook'),
    }
    return groups
  }, [favoritedResources])

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl">💔</div>
      <h3 className="text-lg font-semibold mb-2">No {type} favorites yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Browse resources to start building your collection
      </p>
      <Link href="/">
        <Button variant="outline">
          <Search className="h-4 w-4 mr-1" />
          Browse Resources
        </Button>
      </Link>
    </div>
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All ({groupedByType.all.length})</TabsTrigger>
        <TabsTrigger value="command">Commands ({groupedByType.command.length})</TabsTrigger>
        <TabsTrigger value="rule">Rules ({groupedByType.rule.length})</TabsTrigger>
        <TabsTrigger value="mcp">MCPs ({groupedByType.mcp.length})</TabsTrigger>
        <TabsTrigger value="hook">Hooks ({groupedByType.hook.length})</TabsTrigger>
      </TabsList>

      {Object.entries(groupedByType).map(([type, resources]) => (
        <TabsContent key={type} value={type} className="mt-6">
          {resources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resources.map(resource => (
                <ResourceCard
                  key={resource.slug}
                  resource={resource}
                  downloadCount={downloadCounts[resource.slug] || 0}
                  isFavorited={true}
                  onPreview={() => console.log('Preview:', resource.slug)}
                />
              ))}
            </div>
          ) : (
            <EmptyState type={type} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
