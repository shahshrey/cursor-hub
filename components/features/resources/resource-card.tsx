'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'
import { AddToCursorButton } from './add-to-cursor-button'
import { MagicCard } from '@/components/ui/magic-card'
import { McpLogo } from '@/components/ui/mcp-logo'
import { ANIMATIONS } from '@/lib/animations'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ResourceCardProps {
  resource: ResourceMetadata
  downloadCount?: number
  isFavorited?: boolean
  onPreview?: () => void
  highlightTags?: string
  highlightQuery?: string
}

export function ResourceCard({
  resource,
  downloadCount = 0,
  isFavorited = false,
  onPreview,
  highlightTags = '',
  highlightQuery = '',
}: ResourceCardProps) {
  const TypeIconComponent = getResourceTypeIcon(resource.type)
  const shouldReduceMotion = useReducedMotion()
  const [displayCount, setDisplayCount] = useState(downloadCount)
  const [isExpanded, setIsExpanded] = useState(false)
  const typeLabel = resource.type.toUpperCase()
  const downloadLabel =
    displayCount === 0
      ? 'Be the first to try'
      : `${displayCount.toLocaleString()} download${displayCount === 1 ? '' : 's'}`

  const description = resource.description || resource.excerpt || ''
  const CHAR_LIMIT = 150
  const shouldShowExpand = description.length > CHAR_LIMIT

  const getTruncatedText = (text: string, limit: number) => {
    if (text.length <= limit) return text
    const truncated = text.slice(0, limit)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...'
  }

  const displayDescription =
    isExpanded || !shouldShowExpand ? description : getTruncatedText(description, CHAR_LIMIT)
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

  useEffect(() => {
    if (downloadCount !== displayCount) {
      setDisplayCount(downloadCount)
    }
  }, [downloadCount])

  const cardVariants = shouldReduceMotion
    ? {}
    : {
        hover: ANIMATIONS.cardHover,
        tap: ANIMATIONS.tap,
      }

  return (
    <motion.div
      layoutId={`card-${resource.slug}`}
      whileHover={cardVariants.hover}
      whileTap={cardVariants.tap}
      className="h-full"
    >
      <Card className="w-full max-w-sm border-none p-0 shadow-none h-full">
        <MagicCard gradientColor="#262626" className="p-0 h-full flex flex-col">
          <CardHeader className="border-b p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {resource.type === 'mcp' ? (
                  <McpLogo size={24} className="shrink-0" />
                ) : (
                  <TypeIconComponent className="w-6 h-6 shrink-0 text-muted-foreground" />
                )}
                <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
                  {typeLabel}
                </Badge>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" className="text-[11px] font-semibold px-2.5 py-0.5">
                  {downloadLabel}
                </Badge>
                <FavoriteButton
                  resourceSlug={resource.slug}
                  resourceType={resource.type}
                  initialIsFavorited={isFavorited}
                  size="icon"
                />
              </div>
            </div>
            <motion.div layoutId={`title-${resource.slug}`}>
              <CardTitle className="text-lg font-bold line-clamp-2 mb-2 leading-tight">
                {highlightMatches(resource.title, highlightQuery)}
              </CardTitle>
            </motion.div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{resource.category}</span>
              <span className="text-border">•</span>
              <span className="font-mono">{resource.extension.toUpperCase()}</span>
              <span className="text-border">•</span>
              <span className="font-mono">{formatBytes(resource.fileSize)}</span>
            </div>
          </CardHeader>

          <CardContent className="p-5 flex-1">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground/90">
                {highlightMatches(displayDescription, highlightQuery)}
              </p>
              {shouldShowExpand && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-7 text-xs text-muted-foreground hover:text-foreground p-0"
                  aria-label={isExpanded ? 'Show less' : 'Read more'}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      Read more
                    </>
                  )}
                </Button>
              )}
            </div>
            {resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`text-[10px] font-medium px-2 py-0.5 ${
                      highlightTags && tag.toLowerCase().includes(highlightTags)
                        ? 'bg-terminal-green/15 border-terminal-green/40 text-foreground'
                        : ''
                    }`}
                  >
                    {highlightTags ? highlightMatches(tag, highlightTags) : tag}
                  </Badge>
                ))}
                {resource.tags.length > 3 && (
                  <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">
                    +{resource.tags.length - 3}
                  </Badge>
                )}
                {highlightTags && (
                  <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0.5">
                    Tags match: {highlightTags}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t bg-muted/20 p-5">
            <div className="flex gap-2 w-full">
              {resource.type === 'hook' ? (
                <>
                  <DownloadButton
                    resource={resource}
                    size="sm"
                    className="flex-1 font-semibold h-9"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview?.()}
                    className="px-4 h-9"
                    aria-label={`Preview ${resource.title}`}
                    disabled={!onPreview}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Preview</span>
                  </Button>
                </>
              ) : (
                <>
                  <AddToCursorButton
                    resource={resource}
                    size="sm"
                    className="flex-1 font-semibold h-9"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview?.()}
                    className="px-4 h-9"
                    aria-label={`Preview ${resource.title}`}
                    disabled={!onPreview}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Preview</span>
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </MagicCard>
      </Card>
    </motion.div>
  )
}
