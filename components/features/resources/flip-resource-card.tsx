'use client'

import type { ResourceMetadata } from '@/types/resources'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye, Star, Check } from 'lucide-react'
import { FavoriteButton } from './favorite-button'
import { DownloadButton } from './download-button'
import { AddToCursorButton } from './add-to-cursor-button'

interface FlipResourceCardProps {
  resource: ResourceMetadata
  onPreview?: (resource: ResourceMetadata) => void
  onAddToStack?: (resource: ResourceMetadata) => void
  isInStack?: boolean
}

export function FlipResourceCard({ resource, onPreview, onAddToStack, isInStack }: FlipResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'command': return '⚡'
      case 'rule': return '📋'
      case 'mcp': return '🔌'
      case 'hook': return '🪝'
      default: return '📦'
    }
  }

  const downloadCount = resource.downloadCount ?? 0

  return (
    <div className="flip-card min-h-[280px] h-full">
      <div className="flip-card-inner h-full min-h-[280px]">
        <div className="flip-card-front">
          <div className="h-full min-h-[280px] bg-card/80 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl">
                    {getTypeIcon(resource.type)}
                  </div>
                  {Math.random() > 0.5 && (
                    <div className="verified-badge">
                      <Check className="w-3 h-3 text-[#1DA1F2]" />
                    </div>
                  )}
                </div>
                <div className="download-badge terminal-font">
                  <Download className="w-3 h-3" />
                  {downloadCount > 1000 ? `${(downloadCount / 1000).toFixed(1)}K` : downloadCount}
                </div>
              </div>

              <Badge variant="secondary" className="w-fit mb-3 text-xs">
                {resource.category}
              </Badge>

              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                {resource.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                {resource.description}
              </p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview?.(resource)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <FavoriteButton 
                  resourceSlug={resource.slug} 
                  resourceType={resource.type}
                  size="sm" 
                  variant="ghost"
                />
                {resource.type === 'mcp' ? (
                  <AddToCursorButton resource={resource} size="sm" showLabel={false} variant="ghost" />
                ) : (
                <DownloadButton resource={resource} size="sm" showLabel={false} variant="ghost" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flip-card-back">
          <div className="h-full min-h-[280px] bg-card/80 border border-primary/50 rounded-xl p-6 overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground line-clamp-2">{resource.title}</h3>
                <Badge variant="secondary" className="text-xs capitalize shrink-0 ml-2">
                  {resource.type}
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Description</div>
                  <p className="text-sm text-foreground line-clamp-4">
                    {resource.description}
                  </p>
                </div>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPreview?.(resource)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                  {resource.type === 'mcp' ? (
                    <AddToCursorButton resource={resource} size="sm" showLabel={false} />
                  ) : (
                <DownloadButton resource={resource} size="sm" className="flex-1" />
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => onAddToStack?.(resource)}
                  disabled={isInStack}
                  variant={isInStack ? 'secondary' : 'default'}
                  className="w-full"
                >
                  {isInStack ? 'In Collection' : 'Add to Collection'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

