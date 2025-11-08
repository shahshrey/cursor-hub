'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getFileIcon, getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'
import { AddToCursorButton } from './add-to-cursor-button'
import { ANIMATIONS } from '@/lib/animations'
import { useReducedMotion } from 'framer-motion'

interface ResourceListViewProps {
  resource: ResourceMetadata
  downloadCount?: number
  isFavorited?: boolean
  onPreview?: () => void
}

export function ResourceListView({
  resource,
  downloadCount = 0,
  isFavorited = false,
  onPreview,
}: ResourceListViewProps) {
  const FileIconComponent = getFileIcon(resource.extension)
  const typeIcon = getResourceTypeIcon(resource.type)
  const shouldReduceMotion = useReducedMotion()

  const cardVariants = shouldReduceMotion ? {} : {
    hover: ANIMATIONS.cardHover,
    tap: ANIMATIONS.tap
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
              <FileIconComponent className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl">{typeIcon}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {resource.description || resource.excerpt}
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
                  <span>{downloadCount} downloads</span>
                </div>
                {resource.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
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

