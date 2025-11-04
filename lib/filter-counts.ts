import type { ResourceMetadata, ResourceType } from '@/types/resources'

export interface FilterCounts {
  byType: Record<ResourceType | 'all', number>
  byCategory: Record<string, number>
  byCategoryAndType: Record<string, Record<ResourceType, number>>
}

export function calculateFilterCounts(resources: ResourceMetadata[]): FilterCounts {
  const counts: FilterCounts = {
    byType: {
      all: resources.length,
      command: 0,
      rule: 0,
      mcp: 0,
      hook: 0,
    },
    byCategory: {},
    byCategoryAndType: {},
  }

  resources.forEach((resource) => {
    counts.byType[resource.type]++

    if (!counts.byCategory[resource.category]) {
      counts.byCategory[resource.category] = 0
    }
    counts.byCategory[resource.category]++

    if (!counts.byCategoryAndType[resource.category]) {
      counts.byCategoryAndType[resource.category] = {
        command: 0,
        rule: 0,
        mcp: 0,
        hook: 0,
      }
    }
    counts.byCategoryAndType[resource.category][resource.type]++
  })

  return counts
}

export function getCountForFilter(
  counts: FilterCounts,
  currentType: ResourceType | 'all',
  targetCategory?: string
): number {
  if (!targetCategory) {
    return currentType === 'all' 
      ? counts.byType.all 
      : counts.byType[currentType]
  }

  if (currentType === 'all') {
    return counts.byCategory[targetCategory] || 0
  }

  return counts.byCategoryAndType[targetCategory]?.[currentType] || 0
}

export function wouldFilterReturnZeroResults(
  counts: FilterCounts,
  targetType: ResourceType | 'all',
  targetCategory?: string
): boolean {
  const count = getCountForFilter(counts, targetType, targetCategory)
  return count === 0
}

