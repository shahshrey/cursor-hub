'use client'

import { Badge } from '@/components/ui/badge'
import type { ResourceType } from '@/types/resources'

interface ChipFiltersProps {
  activeType: ResourceType | 'all'
  onTypeChange: (type: ResourceType | 'all') => void
  activeCategory: string
  categories: string[]
  onCategoryChange: (category: string) => void
}

const RESOURCE_TYPES: Array<{ value: ResourceType | 'all'; label: string; icon: string }> = [
  { value: 'all', label: 'All', icon: '📦' },
  { value: 'command', label: 'Commands', icon: '⚡' },
  { value: 'rule', label: 'Rules', icon: '📋' },
  { value: 'mcp', label: 'MCPs', icon: '🔌' },
  { value: 'hook', label: 'Hooks', icon: '🪝' },
]

export function ChipFilters({ activeType, onTypeChange, activeCategory, categories, onCategoryChange }: ChipFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {RESOURCE_TYPES.map((type) => (
          <Badge
            key={type.value}
            variant={activeType === type.value ? 'default' : 'outline'}
            className="cursor-pointer text-sm px-4 py-2"
            onClick={() => onTypeChange(type.value)}
          >
            <span className="mr-1.5">{type.icon}</span>
            {type.label}
          </Badge>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!activeCategory ? 'default' : 'outline'}
            className="cursor-pointer text-xs px-3 py-1.5"
            onClick={() => onCategoryChange('')}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className="cursor-pointer text-xs px-3 py-1.5"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

