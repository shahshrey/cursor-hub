'use client'

import { Badge } from '@/components/ui/badge'
import type { ResourceType } from '@/types/resources'

interface QuickFilter {
  label: string
  type?: ResourceType | 'all'
  category?: string
  icon: string
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: 'Next.js', category: 'nextjs-vercel', icon: '▲' },
  { label: 'Testing', category: 'testing', icon: '🧪' },
  { label: 'Database', category: 'database', icon: '🗄️' },
  { label: 'Security', category: 'security', icon: '🔒' },
  { label: 'DevTools', category: 'devtools', icon: '🛠️' },
  { label: 'AI Tools', category: 'generative-ai', icon: '🤖' },
  { label: 'Performance', category: 'performance', icon: '⚡' },
  { label: 'Documentation', category: 'documentation', icon: '📚' },
]

interface QuickFiltersProps {
  onFilterClick: (filter: QuickFilter) => void
  activeCategory?: string
}

export function QuickFilters({ onFilterClick, activeCategory }: QuickFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-xs text-muted-foreground terminal-font shrink-0">
        Quick filters:
      </span>
      <div className="flex gap-2">
        {QUICK_FILTERS.map((filter) => (
          <Badge
            key={filter.label}
            variant={activeCategory === filter.category ? 'default' : 'outline'}
            className="cursor-pointer text-xs px-3 py-1.5 shrink-0 transition-all hover:scale-105 terminal-font"
            onClick={() => onFilterClick(filter)}
          >
            <span className="mr-1.5">{filter.icon}</span>
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}

