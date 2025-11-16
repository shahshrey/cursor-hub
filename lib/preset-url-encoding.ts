import type { ResourceType } from '@/types/resources'
import { filterStateSchema } from '@/lib/validation'

export interface FilterState {
  type?: ResourceType | 'all'
  category?: string
  searchQuery?: string
  sortBy?: 'name' | 'downloads' | 'recent'
}

const MAX_ENCODED_LENGTH = 2000

export function encodeFilterState(state: FilterState): string {
  try {
    const validated = filterStateSchema.parse(state)
    const json = JSON.stringify(validated)
    return btoa(encodeURIComponent(json))
  } catch (error) {
    console.error('Failed to encode filter state:', error)
    return ''
  }
}

export function decodeFilterState(encoded: string): FilterState | null {
  try {
    if (!encoded || encoded.length > MAX_ENCODED_LENGTH) {
      return null
    }

    if (!/^[A-Za-z0-9+/=]+$/.test(encoded)) {
      return null
    }

    const json = decodeURIComponent(atob(encoded))
    const parsed = JSON.parse(json)
    const validated = filterStateSchema.parse(parsed)

    return validated
  } catch (error) {
    console.error('Failed to decode filter state:', error)
    return null
  }
}

export function createShareableUrl(
  state: FilterState,
  baseUrl: string = window.location.origin
): string {
  const encoded = encodeFilterState(state)
  if (!encoded) return baseUrl

  return `${baseUrl}/browse?filters=${encoded}`
}

export function parseUrlFilters(searchParams: URLSearchParams): FilterState | null {
  const filters = searchParams.get('filters')
  if (!filters) return null

  return decodeFilterState(filters)
}
