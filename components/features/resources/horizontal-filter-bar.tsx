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
  X,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import type { FilterCounts } from '@/lib/filter-counts'
import type { FilterPreset } from '@/lib/preset-storage'
import { FilterPresetsDropdown } from './filter-presets-dropdown'
import { McpLogo } from '@/components/ui/mcp-logo'
import { ViewToggle, type ViewMode } from './view-toggle'
import { toast } from 'sonner'

export type SearchScope = 'all' | 'title' | 'description' | 'tags'

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
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
  isSearching?: boolean
  searchScope: SearchScope
  onSearchScopeChange: (scope: SearchScope) => void
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
  onViewChange,
  isSearching,
  searchScope,
  onSearchScopeChange,
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

  const typeLabel = RESOURCE_TYPES.find(type => type.value === activeType)?.label || 'All'
  const contextParts: string[] = []

  if (activeType !== 'all') {
    contextParts.push(typeLabel)
  }

  if (activeCategory) {
    contextParts.push(activeCategory)
  }

  const contextLabel = contextParts.length > 0 ? contextParts.join(' • ') : 'All resources'
  const sortLabel = sortLabels[sortBy]
  const requiresLongerQuery = searchQuery.trim().length > 0 && searchQuery.trim().length < 2
  const handleCopyFilters = async () => {
    try {
      const shareUrl = window.location.href
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Filter link copied')
    } catch (error) {
      toast.error('Unable to copy link')
    }
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
                className="pl-10 pr-10 h-11 md:h-9 text-sm terminal-font touch-manipulation"
                aria-busy={Boolean(isSearching)}
              />
              {isSearching ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Searching</span>
                </div>
              ) : (
                searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onSearchChange('')}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 px-2 text-muted-foreground"
                    aria-label="Clear search text"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )
              )}
            </div>
            <div
              id="search-results-count"
              className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs text-muted-foreground terminal-font"
              aria-live="polite"
              role="status"
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[11px]">
                  {resultsCount.toLocaleString()}/{totalCount.toLocaleString()} results
                </Badge>
                <span className="text-muted-foreground">
                  {contextLabel} • Sorted {sortLabel}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  Scope: {searchScope === 'all' ? 'all text' : searchScope}
                </Badge>
                {isSearching && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    Searching…
                  </span>
                )}
                {!isSearching && (
                  <span className="text-muted-foreground">Press / to focus search</span>
                )}
              </div>
              <div className="flex items-center gap-1 flex-wrap" aria-label="Search scope">
                {[
                  { value: 'all', label: 'All text', hint: 'Shift+A' },
                  { value: 'title', label: 'Titles', hint: 'Shift+T' },
                  { value: 'description', label: 'Descriptions', hint: 'Shift+D' },
                  { value: 'tags', label: 'Tags', hint: 'Shift+G' },
                ].map(option => (
                  <Button
                    key={option.value}
                    size="sm"
                    variant={searchScope === option.value ? 'secondary' : 'ghost'}
                    className="h-7 px-2 text-[11px]"
                    onClick={() => onSearchScopeChange(option.value as SearchScope)}
                    aria-pressed={searchScope === option.value}
                    title={`Press ${option.hint} to switch`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              {searchScope === 'tags' && (
                <span className="text-[11px] text-muted-foreground">
                  Searching tags only. Try keywords like "react", "security", "cli".
                </span>
              )}
              {requiresLongerQuery && (
                <span className="text-destructive">
                  Enter 2+ characters to search titles and descriptions
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
                <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px]">
                  {activeFilterCount}
                </Badge>
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
              onClick={handleCopyFilters}
              className="terminal-font shrink-0 min-h-[44px] touch-manipulation"
              aria-label="Copy shareable link for current filters"
              title="Tip: Cmd/Ctrl+L then Cmd/Ctrl+C also copies the link"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy link
            </Button>
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
            <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
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
