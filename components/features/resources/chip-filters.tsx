'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import { motion, useReducedMotion } from 'framer-motion'
import { filterSlideIn, ANIMATIONS } from '@/lib/animations'

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

const MAX_VISIBLE_CATEGORIES = 8

export function ChipFilters({ activeType, onTypeChange, activeCategory, categories, onCategoryChange }: ChipFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  
  const hasManyCategories = categories.length > MAX_VISIBLE_CATEGORIES
  const visibleCategories = showAllCategories || !hasManyCategories 
    ? categories 
    : categories.slice(0, MAX_VISIBLE_CATEGORIES)
  const hiddenCount = categories.length - MAX_VISIBLE_CATEGORIES

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {RESOURCE_TYPES.map((type, index) => (
          <motion.div
            key={type.value}
            custom={index}
            variants={shouldReduceMotion ? {} : filterSlideIn}
            initial="hidden"
            animate="visible"
            whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
            whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
          >
            <Badge
              variant={activeType === type.value ? 'default' : 'outline'}
              className="cursor-pointer text-sm px-4 py-2"
              onClick={() => onTypeChange(type.value)}
            >
              <span className="mr-1.5">{type.icon}</span>
              {type.label}
            </Badge>
          </motion.div>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground terminal-font uppercase tracking-wide">
              Categories
            </span>
            {hasManyCategories && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="h-7 text-xs terminal-font"
              >
                {showAllCategories ? (
                  <>
                    Show Less
                    <ChevronUp className="w-3 h-3 ml-1" />
                  </>
                ) : (
                  <>
                    Show All ({hiddenCount} more)
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.div
              variants={shouldReduceMotion ? {} : filterSlideIn}
              initial="hidden"
              animate="visible"
              custom={0}
              whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
              whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
            >
              <Badge
                variant={!activeCategory ? 'default' : 'outline'}
                className="cursor-pointer text-xs px-3 py-1.5"
                onClick={() => onCategoryChange('')}
              >
                All Categories
              </Badge>
            </motion.div>
            {visibleCategories.map((category, index) => (
              <motion.div
                key={category}
                variants={shouldReduceMotion ? {} : filterSlideIn}
                initial="hidden"
                animate="visible"
                custom={index + 1}
                whileHover={shouldReduceMotion ? {} : ANIMATIONS.hover}
                whileTap={shouldReduceMotion ? {} : ANIMATIONS.tap}
              >
                <Badge
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer text-xs px-3 py-1.5"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

