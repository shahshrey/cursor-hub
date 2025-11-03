'use server'

import { getResourceIndex } from '@/lib/resources'
import { getPopularResources } from '@/server/actions/resources'
import type { ResourceMetadata, ResourceType } from '@/types/resources'

export async function getHomePageData() {
  const index = getResourceIndex()
  
  const typeCounts: Record<ResourceType, number> = {
    command: 0,
    rule: 0,
    mcp: 0,
    hook: 0,
  }
  
  const categoryCounts: Record<string, number> = {}
  
  index.resources.forEach(resource => {
    typeCounts[resource.type]++
    categoryCounts[resource.category] = (categoryCounts[resource.category] || 0) + 1
  })
  
  const recentResources = [...index.resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)
  
  let popularResources: ResourceMetadata[] = []
  try {
    const popular = await getPopularResources(8)
    if (popular && popular.length > 0) {
      const popularSlugs = new Set(popular.map(p => p.slug))
      popularResources = index.resources
        .filter(r => popularSlugs.has(r.slug))
        .sort((a, b) => {
          const aIndex = popular.findIndex(p => p.slug === a.slug)
          const bIndex = popular.findIndex(p => p.slug === b.slug)
          return aIndex - bIndex
        })
    }
    
    if (popularResources.length === 0) {
      popularResources = index.resources
        .slice(0, 8)
    }
  } catch (error) {
    popularResources = index.resources
      .slice(0, 8)
  }
  
  const featuredByType: Record<ResourceType, ResourceMetadata[]> = {
    command: index.resources.filter(r => r.type === 'command').slice(0, 2),
    rule: index.resources.filter(r => r.type === 'rule').slice(0, 2),
    mcp: index.resources.filter(r => r.type === 'mcp').slice(0, 2),
    hook: index.resources.filter(r => r.type === 'hook').slice(0, 2),
  }
  
  return {
    totalResources: index.totalCount,
    typeCounts,
    categoryCount: Object.keys(categoryCounts).length,
    recentResources,
    popularResources,
    featuredByType,
    categories: index.categories,
  }
}

