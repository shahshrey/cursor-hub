'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Search, ArrowUpDown, Save } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import type { FilterCounts } from '@/lib/filter-counts'
import type { FilterPreset } from '@/lib/preset-storage'
import { FilterPresetsDropdown } from './filter-presets-dropdown'

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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 w-full lg:w-[440px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                inputMode="search"
                placeholder="Search resources…"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                aria-label="Search resources"
                className="pl-10 h-9 text-sm terminal-font"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-font" aria-live="polite">
              <Badge variant="outline" className="text-[11px]">
                {resultsCount.toLocaleString()}/{totalCount.toLocaleString()} results
              </Badge>
              {filterCounts && activeType !== 'all' && (
                <span>
                  {getTypeCount(activeType).toLocaleString()} {activeType}s
                  {activeCategory && ` in ${activeCategory}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {hasActiveFilters && onSavePreset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSavePreset}
                className="terminal-font shrink-0"
                aria-label="Save current filters as preset"
              >
                <Save className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Save preset</span>
                <span className="sm:hidden">Save</span>
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
            <Button
              variant="outline"
              size="sm"
              onClick={onSortClick}
              className="terminal-font shrink-0"
              aria-live="polite"
              aria-label={`Change sort order. Current order ${sortLabels[sortBy]}`}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortLabels[sortBy]}
            </Button>
          </div>
        </div>
        <Tabs
          value={activeType}
          onValueChange={(value) => onTypeChange(value as ResourceType | 'all')}
        >
          <TabsList className="max-w-full overflow-x-auto">
            {RESOURCE_TYPES.map((type) => {
              const count = getTypeCount(type.value)
              const isDisabled = filterCounts && count === 0 && activeCategory !== ''
              return (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  onMouseDown={(event) => {
                    if (isDisabled) event.preventDefault()
                  }}
                  disabled={Boolean(isDisabled)}
                  className="min-w-[96px] gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wide"
                >
                  <span aria-hidden="true">{type.icon}</span>
                  <span className={isDisabled ? 'line-through opacity-70' : undefined}>{type.label}</span>
                  {filterCounts && (
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {count.toLocaleString()}
                    </span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

