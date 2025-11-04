import type { ResourceType } from '@/types/resources'

export interface FilterState {
  type?: ResourceType | 'all'
  category?: string
  searchQuery?: string
  sortBy?: 'name' | 'downloads' | 'recent'
}

export function encodeFilterState(state: FilterState): string {
  try {
    const json = JSON.stringify(state)
    return btoa(encodeURIComponent(json))
  } catch (error) {
    console.error('Failed to encode filter state:', error)
    return ''
  }
}

export function decodeFilterState(encoded: string): FilterState | null {
  try {
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json)
  } catch (error) {
    console.error('Failed to decode filter state:', error)
    return null
  }
}

export function createShareableUrl(state: FilterState, baseUrl: string = window.location.origin): string {
  const encoded = encodeFilterState(state)
  if (!encoded) return baseUrl
  
  return `${baseUrl}/browse?filters=${encoded}`
}

export function parseUrlFilters(searchParams: URLSearchParams): FilterState | null {
  const filters = searchParams.get('filters')
  if (!filters) return null
  
  return decodeFilterState(filters)
}

