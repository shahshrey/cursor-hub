'use client'

import { Badge } from '@/components/ui/badge'
import { Triangle, FlaskConical, Database, Lock, Wrench, Bot, Zap, Book } from 'lucide-react'
import type { ResourceType } from '@/types/resources'

interface QuickFilter {
  label: string
  type?: ResourceType | 'all'
  category?: string
  icon:
    | typeof Triangle
    | typeof FlaskConical
    | typeof Database
    | typeof Lock
    | typeof Wrench
    | typeof Bot
    | typeof Zap
    | typeof Book
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: 'Next.js', category: 'nextjs-vercel', icon: Triangle },
  { label: 'Testing', category: 'testing', icon: FlaskConical },
  { label: 'Database', category: 'database', icon: Database },
  { label: 'Security', category: 'security', icon: Lock },
  { label: 'DevTools', category: 'devtools', icon: Wrench },
  { label: 'AI Tools', category: 'generative-ai', icon: Bot },
  { label: 'Performance', category: 'performance', icon: Zap },
  { label: 'Documentation', category: 'documentation', icon: Book },
]

interface QuickFiltersProps {
  onFilterClick: (filter: QuickFilter) => void
  activeCategory?: string
}

export function QuickFilters({ onFilterClick, activeCategory }: QuickFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-xs text-muted-foreground terminal-font shrink-0">Quick filters:</span>
      <div className="flex gap-2">
        {QUICK_FILTERS.map(filter => {
          const IconComponent = filter.icon
          return (
            <Badge
              key={filter.label}
              variant={activeCategory === filter.category ? 'default' : 'outline'}
              className="cursor-pointer text-xs px-3 py-1.5 shrink-0 transition-all hover:scale-105 terminal-font"
              onClick={() => onFilterClick(filter)}
            >
              <IconComponent className="w-3.5 h-3.5 mr-1.5" />
              {filter.label}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
