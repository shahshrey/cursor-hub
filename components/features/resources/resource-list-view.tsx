'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'
import { AddToCursorButton } from './add-to-cursor-button'
import { McpLogo } from '@/components/ui/mcp-logo'
import { ANIMATIONS } from '@/lib/animations'
import { useReducedMotion } from 'framer-motion'

interface ResourceListViewProps {
  resource: ResourceMetadata
  downloadCount?: number
  isFavorited?: boolean
  onPreview?: () => void
  highlightTags?: string
  highlightQuery?: string
}

export function ResourceListView({
  resource,
  downloadCount = 0,
  isFavorited = false,
  onPreview,
  highlightTags = '',
  highlightQuery = '',
}: ResourceListViewProps) {
  const TypeIconComponent = getResourceTypeIcon(resource.type)
  const shouldReduceMotion = useReducedMotion()
  const highlightMatches = (text: string, query: string) => {
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return text
    const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <mark key={index} className="rounded-sm bg-terminal-green/20 px-0.5 text-foreground">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }
  const downloadLabel =
    downloadCount === 0 ? 'Be the first to try' : `${downloadCount.toLocaleString()} downloads`

  const cardVariants = shouldReduceMotion
    ? {}
    : {
        hover: ANIMATIONS.cardHover,
        tap: ANIMATIONS.tap,
      }

  return (
    <motion.div
      layoutId={`list-card-${resource.slug}`}
      whileHover={cardVariants.hover}
      whileTap={cardVariants.tap}
    >
      <Card className="w-full border-none shadow-none hover:bg-accent/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 shrink-0">
              {resource.type === 'mcp' ? (
                <McpLogo size={20} />
              ) : (
                <TypeIconComponent className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {highlightMatches(resource.title, highlightQuery)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {highlightMatches(resource.description || resource.excerpt, highlightQuery)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {resource.type}
                  </Badge>
                  <FavoriteButton
                    resourceSlug={resource.slug}
                    resourceType={resource.type}
                    initialIsFavorited={isFavorited}
                    size="icon"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {resource.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {resource.extension} • {formatBytes(resource.fileSize)}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="h-3 w-3" />
                  <span>{downloadLabel}</span>
                </div>
                {resource.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`text-xs ${
                          highlightTags && tag.toLowerCase().includes(highlightTags)
                            ? 'bg-terminal-green/15 border-terminal-green/40 text-foreground'
                            : ''
                        }`}
                      >
                        {highlightTags ? highlightMatches(tag, highlightTags) : tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                    {highlightTags && (
                      <Badge variant="secondary" className="text-[11px]">
                        Tags match: {highlightTags}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {resource.type === 'hook' ? (
                <>
                  <DownloadButton resource={resource} size="sm" className="font-semibold" />
                  <Button variant="outline" size="sm" onClick={onPreview}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <AddToCursorButton resource={resource} size="sm" className="font-semibold" />
                  <Button variant="outline" size="sm" onClick={onPreview}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
