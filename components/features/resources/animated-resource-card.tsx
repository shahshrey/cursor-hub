'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getFileIcon, getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'
import { scaleIn } from '@/lib/animations'
import { MagicCard } from '@/components/ui/magic-card'

interface AnimatedResourceCardProps {
  resource: ResourceMetadata
  downloadCount?: number
  isFavorited?: boolean
  onPreview?: () => void
}

export function AnimatedResourceCard({
  resource,
  downloadCount = 0,
  isFavorited = false,
  onPreview,
}: AnimatedResourceCardProps) {
  const FileIconComponent = getFileIcon(resource.extension)
  const typeIcon = getResourceTypeIcon(resource.type)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={scaleIn}
    >
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        <MagicCard
          className="h-full rounded-xl"
          gradientSize={250}
          gradientOpacity={0.6}
        >
          <Card className="group hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 flex flex-col h-full border-transparent bg-transparent relative overflow-hidden">
            <CardHeader className="space-y-3 relative z-10">
            <div className="flex items-start justify-between gap-2">
              <motion.div 
                className="flex items-center gap-2.5 min-w-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FileIconComponent className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-2xl shrink-0">{typeIcon}</span>
              </motion.div>
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
            <CardTitle className="text-lg font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
              {resource.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs">
                {resource.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {resource.extension} • {formatBytes(resource.fileSize)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 relative z-10">
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {resource.description || resource.excerpt}
            </CardDescription>
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

          <CardFooter className="flex flex-col gap-3 pt-4 border-t relative z-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
              <Download className="h-4 w-4" />
              <span>{downloadCount} downloads</span>
            </div>
            <div className="flex gap-2 w-full">
              <DownloadButton resource={resource} size="sm" className="flex-1 font-semibold" />
              <Button variant="outline" size="sm" onClick={onPreview} className="px-4">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
          </Card>
        </MagicCard>
      </motion.div>
    </motion.div>
  )
}

