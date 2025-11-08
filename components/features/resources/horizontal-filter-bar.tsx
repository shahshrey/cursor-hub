'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Save } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import type { FilterCounts } from '@/lib/filter-counts'
import type { FilterPreset } from '@/lib/preset-storage'
import { FilterPresetsDropdown } from './filter-presets-dropdown'
import { EnhancedSearchInput } from './enhanced-search-input'
import { ViewToggle, type ViewMode } from './view-toggle'
import { QuickFilters } from './quick-filters'

interface HorizontalFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  resultsCount: number
  totalCount: number
  activeType: ResourceType | 'all'
  onTypeChange: (type: ResourceType | 'all') => void
  activeCategory: string
  categories: string[]
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortClick: () => void
  filterCounts?: FilterCounts
  presets?: FilterPreset[]
  onSavePreset?: () => void
  onLoadPreset?: (preset: FilterPreset) => void
  onDeletePreset?: (presetId: string) => void
  onToggleStarPreset?: (presetId: string, isStarred: boolean) => void
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  onQuickFilterClick?: (filter: { category?: string; searchQuery?: string }) => void
}

const RESOURCE_TYPES: Array<{ value: ResourceType | 'all'; label: string; icon: string }> = [
  { value: 'all', label: 'All', icon: '📦' },
  { value: 'command', label: 'Commands', icon: '⚡' },
  { value: 'rule', label: 'Rules', icon: '📋' },
  { value: 'mcp', label: 'MCPs', icon: '🔌' },
  { value: 'hook', label: 'Hooks', icon: '🪝' },
]

const sortLabels: Record<string, string> = {
  name: 'Alphabetical',
  downloads: 'Most Downloaded',
  recent: 'Recently Added',
}

export function HorizontalFilterBar({
  searchQuery,
  onSearchChange,
  resultsCount,
  totalCount,
  activeType,
  onTypeChange,
  activeCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortClick,
  filterCounts,
  presets = [],
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  onToggleStarPreset,
  viewMode,
  onViewModeChange,
  onQuickFilterClick,
}: HorizontalFilterBarProps) {
  const hasActiveFilters = activeType !== 'all' || activeCategory || searchQuery
  const getTypeCount = (type: ResourceType | 'all'): number => {
    if (!filterCounts) return 0
    
    if (type === 'all') {
      return filterCounts.byType.all
    }

    if (!activeCategory) {
      return filterCounts.byType[type]
    }

    return filterCounts.byCategoryAndType[activeCategory]?.[type] || 0
  }

  return (
    <div className="sticky top-[73px] z-20 border-b border-border backdrop-blur-xl bg-card/30">
      <div className="container mx-auto px-4 py-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <EnhancedSearchInput
            value={searchQuery}
            onChange={onSearchChange}
            resultsCount={resultsCount}
            totalCount={totalCount}
          />

          <div className="flex items-center gap-2 flex-wrap">
            {RESOURCE_TYPES.map((type) => {
              const count = getTypeCount(type.value)
              const isDisabled = filterCounts && count === 0 && activeCategory !== ''
              return (
                <Badge
                  key={type.value}
                  variant={activeType === type.value ? 'default' : 'outline'}
                  className={`cursor-pointer text-xs px-3 py-1.5 transition-all ${
                    isDisabled 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => !isDisabled && onTypeChange(type.value)}
                  title={isDisabled ? 'No resources match this combination' : undefined}
                >
                  <span className="mr-1.5">{type.icon}</span>
                  <span className={isDisabled ? 'line-through' : ''}>{type.label}</span>
                  {filterCounts && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({count})
                    </span>
                  )}
                </Badge>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && onSavePreset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSavePreset}
                className="terminal-font shrink-0"
              >
                <Save className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            )}
            
            {onLoadPreset && onDeletePreset && onToggleStarPreset && (
              <FilterPresetsDropdown
                presets={presets}
                onSelectPreset={onLoadPreset}
                onDeletePreset={onDeletePreset}
                onToggleStar={onToggleStarPreset}
              />
            )}
            
            {viewMode && onViewModeChange && (
              <ViewToggle viewMode={viewMode} onViewChange={onViewModeChange} />
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={onSortClick}
              className="terminal-font shrink-0"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortLabels[sortBy]}
            </Button>
          </div>
        </div>
        
        {onQuickFilterClick && !hasActiveFilters && (
          <QuickFilters
            onFilterClick={onQuickFilterClick}
            activeFilter={{ category: activeCategory, searchQuery }}
          />
        )}
      </div>
    </div>
  )
}

