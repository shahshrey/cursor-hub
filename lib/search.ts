import Fuse, { type IFuseOptions } from 'fuse.js'
import type { ResourceMetadata, ResourceType } from '@/types/resources'

export interface SearchOptions {
  query: string
  type?: ResourceType
  category?: string
  limit?: number
}

export interface SearchResult {
  item: ResourceMetadata
  score?: number
}

const FUSE_OPTIONS: IFuseOptions<ResourceMetadata> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'searchContent', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  shouldSort: true,
  includeScore: true,
}

export function createSearchIndex(resources: ResourceMetadata[]): Fuse<ResourceMetadata> {
  return new Fuse(resources, FUSE_OPTIONS)
}

export function searchResources(
  fuse: Fuse<ResourceMetadata>,
  allResources: ResourceMetadata[],
  options: SearchOptions
): ResourceMetadata[] {
  let results = allResources

  if (options.type) {
    results = results.filter(r => r.type === options.type)
  }

  if (options.category) {
    results = results.filter(r => r.category === options.category)
  }

  if (options.query && options.query.trim().length >= 2) {
    const searchResults = fuse.search(options.query)
    const filteredResults = searchResults
      .map(r => r.item)
      .filter(item => {
        if (options.type && item.type !== options.type) return false
        if (options.category && item.category !== options.category) return false
        return true
      })
    results = filteredResults
  }

  if (options.limit) {
    results = results.slice(0, options.limit)
  }

  return results
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

