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

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeType} onValueChange={(v) => onTypeChange(v as ResourceType | 'all')}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="command">Commands</TabsTrigger>
          <TabsTrigger value="rule">Rules</TabsTrigger>
          <TabsTrigger value="mcp">MCPs</TabsTrigger>
          <TabsTrigger value="hook">Hooks</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2 items-center">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('')}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Tabs value={sortBy} onValueChange={(v) => onSortChange(v as 'name' | 'downloads' | 'recent')}>
            <TabsList>
              <TabsTrigger value="name">Name</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

