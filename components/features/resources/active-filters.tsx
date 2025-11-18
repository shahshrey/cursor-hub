'use client'

import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import { motion, useReducedMotion } from 'framer-motion'
import { filterSlideIn, ANIMATIONS } from '@/lib/animations'

interface ActiveFiltersProps {
  activeType: ResourceType | 'all'
  activeCategory: string
  searchQuery: string
  onClearType: () => void
  onClearCategory: () => void
  onClearSearch: () => void
}

const TYPE_LABELS: Record<ResourceType | 'all', string> = {
  all: 'All',
  command: 'Commands',
  rule: 'Rules',
  mcp: 'MCPs',
  hook: 'Hooks',
}

export function ActiveFilters({
  activeType,
  activeCategory,
  searchQuery,
  onClearType,
  onClearCategory,
  onClearSearch,
}: ActiveFiltersProps) {
  const hasActiveFilters = activeType !== 'all' || activeCategory || searchQuery
  const shouldReduceMotion = useReducedMotion()

  if (!hasActiveFilters) {
    return null
  }

  let badgeIndex = 0

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border">
      <span className="text-xs text-muted-foreground terminal-font mr-1">Active filters:</span>
      {activeType !== 'all' && (
        <motion.div
          custom={badgeIndex++}
          variants={shouldReduceMotion ? {} : filterSlideIn}
          initial="hidden"
          animate="visible"
          whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
          whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
        >
          <Badge variant="default" className="cursor-pointer group" onClick={onClearType}>
            Type: {TYPE_LABELS[activeType]}
            <X className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100" />
          </Badge>
        </motion.div>
      )}
      {activeCategory && (
        <motion.div
          custom={badgeIndex++}
          variants={shouldReduceMotion ? {} : filterSlideIn}
          initial="hidden"
          animate="visible"
          whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
          whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
        >
          <Badge variant="default" className="cursor-pointer group" onClick={onClearCategory}>
            Category: {activeCategory}
            <X className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100" />
          </Badge>
        </motion.div>
      )}
      {searchQuery && (
        <motion.div
          custom={badgeIndex++}
          variants={shouldReduceMotion ? {} : filterSlideIn}
          initial="hidden"
          animate="visible"
          whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
          whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
        >
          <Badge variant="default" className="cursor-pointer group" onClick={onClearSearch}>
            Search: &quot;{searchQuery}&quot;
            <X className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100" />
          </Badge>
        </motion.div>
      )}
    </div>
  )
}
