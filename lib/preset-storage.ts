import type { ResourceType } from '@/types/resources'

export interface FilterPreset {
  id: string
  name: string
  type: ResourceType | 'all'
  category: string
  searchQuery: string
  sortBy: 'name' | 'downloads' | 'recent'
  createdAt: string
  lastUsed?: string
  usageCount: number
  isDefault?: boolean
  isStarred?: boolean
}

const STORAGE_KEY = 'cursor-resources-filter-presets'
const MAX_PRESETS = 10

export function getStoredPresets(): FilterPreset[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error('Failed to load presets:', error)
    return []
  }
}

export function savePreset(preset: Omit<FilterPreset, 'id' | 'createdAt' | 'usageCount'>): FilterPreset | null {
  try {
    const presets = getStoredPresets()
    
    if (presets.length >= MAX_PRESETS && !preset.isDefault) {
      throw new Error(`Maximum ${MAX_PRESETS} presets allowed`)
    }

    const newPreset: FilterPreset = {
      ...preset,
      id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    }

    const updatedPresets = [...presets, newPreset]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets))
    
    return newPreset
  } catch (error) {
    console.error('Failed to save preset:', error)
    return null
  }
}

export function deletePreset(presetId: string): boolean {
  try {
    const presets = getStoredPresets()
    const updatedPresets = presets.filter(p => p.id !== presetId && !p.isDefault)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets))
    return true
  } catch (error) {
    console.error('Failed to delete preset:', error)
    return false
  }
}

export function updatePreset(presetId: string, updates: Partial<FilterPreset>): boolean {
  try {
    const presets = getStoredPresets()
    const updatedPresets = presets.map(p => 
      p.id === presetId ? { ...p, ...updates } : p
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets))
    return true
  } catch (error) {
    console.error('Failed to update preset:', error)
    return false
  }
}

export function incrementPresetUsage(presetId: string): void {
  try {
    const presets = getStoredPresets()
    const updatedPresets = presets.map(p => 
      p.id === presetId 
        ? { ...p, usageCount: p.usageCount + 1, lastUsed: new Date().toISOString() }
        : p
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets))
  } catch (error) {
    console.error('Failed to increment usage:', error)
  }
}

export const DEFAULT_PRESETS: FilterPreset[] = [
  {
    id: 'default-recent',
    name: 'Recently Added',
    type: 'all',
    category: '',
    searchQuery: '',
    sortBy: 'recent',
    createdAt: new Date().toISOString(),
    usageCount: 0,
    isDefault: true,
  },
  {
    id: 'default-popular',
    name: 'Most Popular',
    type: 'all',
    category: '',
    searchQuery: '',
    sortBy: 'downloads',
    createdAt: new Date().toISOString(),
    usageCount: 0,
    isDefault: true,
  },
  {
    id: 'default-mcp',
    name: 'All MCPs',
    type: 'mcp',
    category: '',
    searchQuery: '',
    sortBy: 'downloads',
    createdAt: new Date().toISOString(),
    usageCount: 0,
    isDefault: true,
  },
]

