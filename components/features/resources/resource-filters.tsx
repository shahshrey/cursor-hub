'use client'

import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import type { ResourceType } from '@/types/resources'

interface ResourceFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeType: ResourceType | 'all'
  onTypeChange: (type: ResourceType | 'all') => void
  activeCategory: string
  categories: string[]
  onCategoryChange: (category: string) => void
  sortBy: 'name' | 'downloads' | 'recent'
  onSortChange: (sort: 'name' | 'downloads' | 'recent') => void
  onClearFilters: () => void
}

export function ResourceFilters({
  searchQuery,
  onSearchChange,
  activeType,
  onTypeChange,
  activeCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: ResourceFiltersProps) {
  const hasActiveFilters = searchQuery || activeType !== 'all' || activeCategory || sortBy !== 'name'
  const activeFilterCount = [
    searchQuery ? 1 : 0,
    activeType !== 'all' ? 1 : 0,
    activeCategory ? 1 : 0,
    sortBy !== 'name' ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search resources by name, description, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base border-2 focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Resource Type</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8">
              <X className="h-4 w-4 mr-1" />
              Clear All ({activeFilterCount})
            </Button>
          )}
        </div>
        <Tabs value={activeType} onValueChange={(v) => onTypeChange(v as ResourceType | 'all')}>
          <TabsList className="grid w-full grid-cols-5 h-11">
            <TabsTrigger value="all" className="text-sm font-medium">All</TabsTrigger>
            <TabsTrigger value="command" className="text-sm font-medium">Commands</TabsTrigger>
            <TabsTrigger value="rule" className="text-sm font-medium">Rules</TabsTrigger>
            <TabsTrigger value="mcp" className="text-sm font-medium">MCPs</TabsTrigger>
            <TabsTrigger value="hook" className="text-sm font-medium">Hooks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {categories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Category</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('')}
              className="h-9"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="h-9"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-2 border-t">
        <h3 className="text-sm font-semibold text-foreground">Sort By</h3>
        <Tabs value={sortBy} onValueChange={(v) => onSortChange(v as 'name' | 'downloads' | 'recent')}>
          <TabsList className="h-10">
            <TabsTrigger value="name" className="text-sm">Name</TabsTrigger>
            <TabsTrigger value="downloads" className="text-sm">Downloads</TabsTrigger>
            <TabsTrigger value="recent" className="text-sm">Recent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

