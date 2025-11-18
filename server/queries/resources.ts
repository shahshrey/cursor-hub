'use server'

import { getResourceContent, getResourceBySlug } from '@/lib/resources'
import type { ResourceMetadata } from '@/types/resources'

export async function getResourceWithContent(
  slug: string
): Promise<(ResourceMetadata & { content: string }) | null> {
  const resource = getResourceBySlug(slug)
  if (!resource) return null

  try {
    const content = getResourceContent(resource.filePath)
    return { ...resource, content }
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error)
    return null
  }
}
