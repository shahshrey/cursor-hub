import { useState, useEffect, useCallback } from 'react'
import type { FilterPreset } from '@/lib/preset-storage'
import {
  getStoredPresets,
  savePreset,
  deletePreset,
  updatePreset,
  incrementPresetUsage,
  DEFAULT_PRESETS,
} from '@/lib/preset-storage'

export function useFilterPresets() {
  const [presets, setPresets] = useState<FilterPreset[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = getStoredPresets()
    setPresets([...DEFAULT_PRESETS, ...stored])
    setIsLoaded(true)
  }, [])

  const createPreset = useCallback(
    (preset: Omit<FilterPreset, 'id' | 'createdAt' | 'usageCount'>) => {
      const newPreset = savePreset(preset)
      if (newPreset) {
        setPresets(prev => [...prev, newPreset])
        return newPreset
      }
      return null
    },
    []
  )

  const removePreset = useCallback((presetId: string) => {
    const success = deletePreset(presetId)
    if (success) {
      setPresets(prev => prev.filter(p => p.id !== presetId))
    }
    return success
  }, [])

  const modifyPreset = useCallback((presetId: string, updates: Partial<FilterPreset>) => {
    const success = updatePreset(presetId, updates)
    if (success) {
      setPresets(prev => prev.map(p => (p.id === presetId ? { ...p, ...updates } : p)))
    }
    return success
  }, [])

  const usePreset = useCallback((presetId: string) => {
    incrementPresetUsage(presetId)
    setPresets(prev =>
      prev.map(p =>
        p.id === presetId
          ? { ...p, usageCount: p.usageCount + 1, lastUsed: new Date().toISOString() }
          : p
      )
    )
  }, [])

  return {
    presets,
    isLoaded,
    createPreset,
    removePreset,
    modifyPreset,
    usePreset,
  }
}
