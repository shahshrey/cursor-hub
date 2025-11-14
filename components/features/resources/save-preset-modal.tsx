'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import type { ResourceType } from '@/types/resources'

interface SavePresetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, isStarred: boolean) => void
  currentFilters: {
    type: ResourceType | 'all'
    category: string
    searchQuery: string
    sortBy: 'name' | 'downloads' | 'recent'
  }
}

export function SavePresetModal({ isOpen, onClose, onSave, currentFilters }: SavePresetModalProps) {
  const [presetName, setPresetName] = useState('')
  const [isStarred, setIsStarred] = useState(false)

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim(), isStarred)
      setPresetName('')
      setIsStarred(false)
      onClose()
    }
  }

  const handleClose = () => {
    setPresetName('')
    setIsStarred(false)
    onClose()
  }

  const filterDescription = () => {
    const parts: string[] = []
    if (currentFilters.type !== 'all') parts.push(`Type: ${currentFilters.type}`)
    if (currentFilters.category) parts.push(`Category: ${currentFilters.category}`)
    if (currentFilters.searchQuery) parts.push(`Search: "${currentFilters.searchQuery}"`)
    parts.push(`Sort: ${currentFilters.sortBy}`)
    return parts.join(' • ')
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="terminal-font">Save Filter Preset</DialogTitle>
          <DialogDescription className="text-xs terminal-font">
            {filterDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="preset-name" className="terminal-font text-sm">
              Preset Name
            </Label>
            <Input
              id="preset-name"
              placeholder="e.g., My Favorite MCPs"
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              className="terminal-font"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={isStarred ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsStarred(!isStarred)}
              className="terminal-font"
            >
              <Star className={`h-4 w-4 mr-2 ${isStarred ? 'fill-current' : ''}`} />
              {isStarred ? 'Starred' : 'Star this preset'}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="terminal-font">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!presetName.trim()} className="terminal-font">
            Save Preset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
