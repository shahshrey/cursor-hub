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
  const typeIcon = getResourceTypeIcon(resource.type)
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
          <CardHeader className="border-b p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileIconComponent className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-2xl shrink-0">{typeIcon}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className="text-xs font-medium">
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
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {resource.title}
              </CardTitle>
            </motion.div>
          <CardDescription className="text-xs">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs">
                {resource.category}
              </Badge>
              <span className="text-muted-foreground">
                {resource.extension} • {formatBytes(resource.fileSize)}
              </span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {resource.description || resource.excerpt}
          </p>
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t p-4 flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
            <Download className="h-4 w-4" />
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
                <DownloadButton resource={resource} size="sm" className="flex-1 font-semibold" />
                <Button variant="outline" size="sm" onClick={onPreview} className="px-4">
                  <Eye className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <AddToCursorButton resource={resource} size="sm" className="flex-1 font-semibold" />
                <Button variant="outline" size="sm" onClick={onPreview} className="px-4">
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

