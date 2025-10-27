import { getPopularResources } from '@/server/actions/resources'
import { getResourceBySlug } from '@/lib/resources'
import { PopularResourcesClient } from './popular-resources-client'

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

  return <PopularResourcesClient initialResources={popularResources} />
}

