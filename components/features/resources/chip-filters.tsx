'use client'

import { cn } from '@/lib/utils'
import type { ResourceType } from '@/types/resources'

interface ChipFiltersProps {
  activeType: ResourceType | 'all'
  onTypeChange: (type: ResourceType | 'all') => void
  activeCategory: string
  categories: string[]
  onCategoryChange: (category: string) => void
}

const typeConfig: Record<ResourceType | 'all', { icon: string; label: string; count?: number }> = {
  all: { icon: '🎯', label: 'All Resources' },
  command: { icon: '⚡', label: 'Commands' },
  rule: { icon: '📋', label: 'Rules' },
  mcp: { icon: '🔌', label: 'MCPs' },
  hook: { icon: '🪝', label: 'Hooks' }
}

export function ChipFilters({
  activeType,
  onTypeChange,
  activeCategory,
  categories,
  onCategoryChange
}: ChipFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Resource Type
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(typeConfig) as Array<ResourceType | 'all'>).map((type) => {
            const config = typeConfig[type]
            return (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={cn(
                  "filter-chip",
                  activeType === type && "active"
                )}
              >
                <span className="text-lg">{config.icon}</span>
                <span>{config.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {categories.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Category
            </span>
            {activeCategory && (
              <button
                onClick={() => onCategoryChange('')}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category === activeCategory ? '' : category)}
                className={cn(
                  "filter-chip",
                  activeCategory === category && "active"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

