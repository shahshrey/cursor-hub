'use client'

import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface QuickFilter {
  label: string
  type?: string
  category?: string
  searchQuery?: string
  icon?: string
}

const QUICK_FILTERS: QuickFilter[] = [
  { label: 'Popular', searchQuery: '', icon: '🔥' },
  { label: 'New', searchQuery: '', icon: '✨' },
  { label: 'Next.js', category: 'nextjs-vercel', icon: '▲' },
  { label: 'React', category: 'development', icon: '⚛️' },
  { label: 'TypeScript', category: 'development', icon: 'TS' },
  { label: 'Database', category: 'database', icon: '🗄️' },
  { label: 'Testing', category: 'testing', icon: '🧪' },
  { label: 'Security', category: 'security', icon: '🔒' },
]

interface QuickFiltersProps {
  onFilterClick: (filter: QuickFilter) => void
  activeFilter?: Partial<QuickFilter>
}

export function QuickFilters({ onFilterClick, activeFilter }: QuickFiltersProps) {
  const isActive = (filter: QuickFilter) => {
    if (activeFilter?.category && filter.category === activeFilter.category) return true
    if (activeFilter?.searchQuery && filter.searchQuery === activeFilter.searchQuery) return true
    return false
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground terminal-font">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Quick:</span>
      </div>
      {QUICK_FILTERS.map((filter) => (
        <motion.div
          key={filter.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant={isActive(filter) ? 'default' : 'outline'}
            className="cursor-pointer text-xs px-2.5 py-1 transition-all hover:scale-105 terminal-font"
            onClick={() => onFilterClick(filter)}
          >
            {filter.icon && <span className="mr-1">{filter.icon}</span>}
            {filter.label}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}

