'use client'

import { useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResourceCard } from './resource-card'
import type { ResourceMetadata, ResourceType } from '@/types/resources'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

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
  const favoritedResources = useMemo(() => {
    return favorites
      .map((fav) => {
        const resource = resourcesIndex.find((r) => r.slug === fav.resource_slug)
        return resource ? { ...resource, favoritedAt: fav.created_at } : null
      })
      .filter((r): r is ResourceMetadata & { favoritedAt: string } => r !== null)
  }, [favorites, resourcesIndex])

  const groupedByType = useMemo(() => {
    const groups: Record<ResourceType | 'all', (ResourceMetadata & { favoritedAt: string })[]> = {
      all: favoritedResources,
      command: favoritedResources.filter((r) => r.type === 'command'),
      rule: favoritedResources.filter((r) => r.type === 'rule'),
      mcp: favoritedResources.filter((r) => r.type === 'mcp'),
      hook: favoritedResources.filter((r) => r.type === 'hook'),
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
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.slug}
                  resource={resource}
                  downloadCount={0}
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

