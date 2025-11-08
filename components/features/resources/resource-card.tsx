'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getFileIcon, getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'
import { AddToCursorButton } from './add-to-cursor-button'
import { MagicCard } from '@/components/ui/magic-card'
import { McpLogo } from '@/components/ui/mcp-logo'
import { ANIMATIONS, countRollUp } from '@/lib/animations'
import { useEffect, useState } from 'react'

interface ResourceCardProps {
  resource: ResourceMetadata
  downloadCount?: number
  isFavorited?: boolean
  onPreview?: () => void
}

export function ResourceCard({
  resource,
  downloadCount = 0,
  isFavorited = false,
  onPreview,
}: ResourceCardProps) {
  const FileIconComponent = getFileIcon(resource.extension)
  const TypeIconComponent = getResourceTypeIcon(resource.type)
  const shouldReduceMotion = useReducedMotion()
  const [displayCount, setDisplayCount] = useState(downloadCount)

  useEffect(() => {
    if (downloadCount !== displayCount) {
      setDisplayCount(downloadCount)
    }
  }, [downloadCount])

  const cardVariants = shouldReduceMotion ? {} : {
    hover: ANIMATIONS.cardHover,
    tap: ANIMATIONS.tap
  }

  return (
    <motion.div 
      layoutId={`card-${resource.slug}`}
      whileHover={cardVariants.hover}
      whileTap={cardVariants.tap}
    >
      <Card className="w-full max-w-sm border-none p-0 shadow-none">
        <MagicCard
          gradientColor="#262626"
          className="p-0"
        >
          <CardHeader className="border-b p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <FileIconComponent className="h-5 w-5 shrink-0 text-muted-foreground" />
                {resource.type === 'mcp' ? (
                  <McpLogo size={24} className="shrink-0" />
                ) : (
                  <TypeIconComponent className="w-6 h-6 shrink-0 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
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
            <motion.div layoutId={`title-${resource.slug}`}>
              <CardTitle className="text-lg font-bold line-clamp-2 mb-2 leading-tight">
                {resource.title}
              </CardTitle>
            </motion.div>
          <CardDescription className="text-xs">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs font-medium">
                {resource.category}
              </Badge>
              <span className="text-muted-foreground font-mono text-[10px]">
                {resource.extension} • {formatBytes(resource.fileSize)}
              </span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
            {resource.description || resource.excerpt}
          </p>
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-[10px] font-medium px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t bg-muted/20 p-5 flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-full font-medium">
            <Download className="h-3.5 w-3.5" />
            <motion.span
              key={displayCount}
              variants={shouldReduceMotion ? {} : countRollUp}
              initial="hidden"
              animate="visible"
            >
              {displayCount} downloads
            </motion.span>
          </div>
          <div className="flex gap-2 w-full">
            {resource.type === 'hook' ? (
              <>
                <DownloadButton resource={resource} size="sm" className="flex-1 font-semibold h-9" />
                <Button variant="outline" size="sm" onClick={onPreview} className="px-4 h-9">
                  <Eye className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <AddToCursorButton resource={resource} size="sm" className="flex-1 font-semibold h-9" />
                <Button variant="outline" size="sm" onClick={onPreview} className="px-4 h-9">
                  <Eye className="h-4 w-4" />
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

