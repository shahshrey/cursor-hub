'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Bookmark, Star, Trash2, Share2, Clock } from 'lucide-react'
import type { FilterPreset } from '@/lib/preset-storage'
import { createShareableUrl } from '@/lib/preset-url-encoding'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/clipboard'

interface FilterPresetsDropdownProps {
  presets: FilterPreset[]
  onSelectPreset: (preset: FilterPreset) => void
  onDeletePreset: (presetId: string) => void
  onToggleStar: (presetId: string, isStarred: boolean) => void
}

export function FilterPresetsDropdown({
  presets,
  onSelectPreset,
  onDeletePreset,
  onToggleStar,
}: FilterPresetsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const starredPresets = presets.filter(p => p.isStarred)
  const regularPresets = presets.filter(p => !p.isStarred && !p.isDefault)
  const defaultPresets = presets.filter(p => p.isDefault)

  const handleSelectPreset = (preset: FilterPreset) => {
    onSelectPreset(preset)
    setIsOpen(false)
  }

  const handleSharePreset = async (preset: FilterPreset) => {
    const url = createShareableUrl({
      type: preset.type,
      category: preset.category,
      searchQuery: preset.searchQuery,
      sortBy: preset.sortBy,
    })
    
    const success = await copyToClipboard(url, true)
    if (success) {
      toast.success('Shareable link copied to clipboard')
    } else {
      toast.error('Failed to copy link')
    }
  }

  const formatLastUsed = (lastUsed?: string): string => {
    if (!lastUsed) return 'Never used'
    
    const date = new Date(lastUsed)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const PresetItem = ({ preset }: { preset: FilterPreset }) => (
    <div className="flex items-center justify-between gap-2 p-3 hover:bg-muted/50 rounded-lg transition-colors group">
      <div className="flex-1 min-w-0" onClick={() => handleSelectPreset(preset)} role="button">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium terminal-font truncate">{preset.name}</p>
          {preset.isStarred && <Star className="h-3 w-3 fill-current text-yellow-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs">
            {preset.type === 'all' ? 'All Types' : preset.type}
          </Badge>
          {preset.category && (
            <Badge variant="outline" className="text-xs">
              {preset.category}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatLastUsed(preset.lastUsed)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!preset.isDefault && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation()
              onToggleStar(preset.id, !preset.isStarred)
            }}
          >
            <Star className={`h-3.5 w-3.5 ${preset.isStarred ? 'fill-current' : ''}`} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation()
            handleSharePreset(preset)
          }}
        >
          <Share2 className="h-3.5 w-3.5" />
        </Button>
        {!preset.isDefault && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDeletePreset(preset.id)
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="terminal-font gap-2">
          <Bookmark className="h-4 w-4" />
          <span className="hidden sm:inline">My Presets</span>
          {presets.filter(p => !p.isDefault).length > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {presets.filter(p => !p.isDefault).length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="terminal-font">Filter Presets</SheetTitle>
          <SheetDescription className="terminal-font text-xs">
            Save and quickly apply your favorite filter combinations
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {defaultPresets.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground terminal-font uppercase tracking-wide mb-3">
                Quick Filters
              </h3>
              <div className="space-y-1">
                {defaultPresets.map(preset => (
                  <PresetItem key={preset.id} preset={preset} />
                ))}
              </div>
            </div>
          )}
          
          {starredPresets.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground terminal-font uppercase tracking-wide mb-3">
                Starred
              </h3>
              <div className="space-y-1">
                {starredPresets.map(preset => (
                  <PresetItem key={preset.id} preset={preset} />
                ))}
              </div>
            </div>
          )}
          
          {regularPresets.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground terminal-font uppercase tracking-wide mb-3">
                My Presets
              </h3>
              <div className="space-y-1">
                {regularPresets.map(preset => (
                  <PresetItem key={preset.id} preset={preset} />
                ))}
              </div>
            </div>
          )}
          
          {presets.filter(p => !p.isDefault).length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-sm text-muted-foreground terminal-font mb-2">
                No saved presets yet
              </p>
              <p className="text-xs text-muted-foreground terminal-font">
                Apply filters and click &quot;Save Preset&quot; to save them
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

