'use client'

import { Button } from '@/components/ui/button'
import { Grid3x3, List } from 'lucide-react'
import { motion } from 'framer-motion'

export type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border border-border rounded-md p-1 bg-muted/30">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="h-7 px-2 terminal-font"
        title="Grid view"
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-7 px-2 terminal-font"
        title="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
