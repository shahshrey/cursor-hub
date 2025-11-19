'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  ArrowUpDown,
  Save,
  Package,
  Zap,
  Clipboard,
  GitBranch,
  Filter,
  X,
} from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import type { FilterCounts } from '@/lib/filter-counts'
import type { FilterPreset } from '@/lib/preset-storage'
import { FilterPresetsDropdown } from './filter-presets-dropdown'
import { McpLogo } from '@/components/ui/mcp-logo'

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

const RESOURCE_TYPES: Array<{
  value: ResourceType | 'all'
  label: string
  icon: typeof Package | typeof Zap | typeof Clipboard | typeof GitBranch
  useLogo?: boolean
}> = [
  { value: 'all', label: 'All', icon: Package },
  { value: 'command', label: 'Commands', icon: Zap },
  { value: 'rule', label: 'Rules', icon: Clipboard },
  { value: 'mcp', label: 'MCPs', icon: Package, useLogo: true },
  { value: 'hook', label: 'Hooks', icon: GitBranch },
]

const sortLabels: Record<string, string> = {
  name: 'Alphabetical',
  downloads: 'Most Downloaded',
  recent: 'Recently Added',
}

/**
 * Renders a horizontal filter bar with search, type tabs, category-aware counts, sorting, and preset controls.
 *
 * Provides a search input with live result counts, type tabs showing per-type counts (respecting the active category),
 * a clear-filters control, optional save/load/delete/toggle preset actions, and a sort button.
 *
 * @param searchQuery - Current search string shown in the search input
 * @param onSearchChange - Callback invoked with the new search string
 * @param resultsCount - Number of results matching the current filters
 * @param totalCount - Total number of resources available
 * @param activeType - Currently selected resource type (or 'all')
 * @param onTypeChange - Callback invoked when the active type changes
 * @param activeCategory - Currently selected category (empty string when none)
 * @param categories - Available category list (not modified by this component)
 * @param onCategoryChange - Callback invoked to change the active category
 * @param sortBy - Current sort key
 * @param onSortClick - Callback invoked to change the sort order
 * @param filterCounts - Optional counts used to display per-type and per-category numbers
 * @param presets - Optional list of saved filter presets
 * @param onSavePreset - Optional callback to save the current filters as a preset
 * @param onLoadPreset - Optional callback to load a preset
 * @param onDeletePreset - Optional callback to delete a preset
 * @param onToggleStarPreset - Optional callback to star/unstar a preset
 * @returns The rendered horizontal filter bar element
 */
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
  const hasActiveFilters = activeType !== 'all' || activeCategory || searchQuery.trim().length >= 2
  const activeFilterCount = [
    activeType !== 'all' ? 1 : 0,
    activeCategory ? 1 : 0,
    searchQuery.trim().length >= 2 ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

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

  const handleClearFilters = () => {
    onTypeChange('all')
    onCategoryChange('')
    onSearchChange('')
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
                onChange={event => onSearchChange(event.target.value)}
                aria-label="Search resources"
                aria-describedby="search-results-count"
                className="pl-10 h-11 md:h-9 text-sm terminal-font touch-manipulation"
              />
            </div>
            <div
              id="search-results-count"
              className="flex items-center gap-2 text-xs text-muted-foreground terminal-font"
              aria-live="polite"
              role="status"
            >
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
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="terminal-font shrink-0 min-h-[44px] touch-manipulation"
                aria-label={`Clear ${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}`}
              >
                <X className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Clear filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            )}
            {hasActiveFilters && onSavePreset && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSavePreset}
                className="terminal-font shrink-0 min-h-[44px] touch-manipulation"
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
              className="terminal-font shrink-0 min-h-[44px] touch-manipulation"
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
          onValueChange={value => onTypeChange(value as ResourceType | 'all')}
        >
          <TabsList className="max-w-full overflow-x-auto">
            {RESOURCE_TYPES.map(type => {
              const count = getTypeCount(type.value)
              const isDisabled = filterCounts && count === 0 && activeCategory !== ''
              return (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  onMouseDown={event => {
                    if (isDisabled) event.preventDefault()
                  }}
                  disabled={Boolean(isDisabled)}
                  className="min-w-[96px] gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wide"
                >
                  {type.useLogo ? (
                    <McpLogo size={16} className="shrink-0" />
                  ) : (
                    <type.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span className={isDisabled ? 'line-through opacity-70' : undefined}>
                    {type.label}
                  </span>
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