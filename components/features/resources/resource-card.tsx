'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { getFileIcon, getResourceTypeIcon, formatBytes } from '@/lib/file-utils'
import { DownloadButton } from './download-button'
import { FavoriteButton } from './favorite-button'

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

  return (
    <Card className="group hover:shadow-lg hover:shadow-primary-300/20 hover:-translate-y-1 transition-all duration-200 flex flex-col h-full border-primary-300/30 hover:border-primary-300/50 hover:bg-card/80">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FileIconComponent className="h-5 w-5 shrink-0 text-muted-foreground" />
            <span className="text-2xl shrink-0">{typeIcon}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <FavoriteButton
              resourceSlug={resource.slug}
              resourceType={resource.type}
              initialIsFavorited={isFavorited}
              size="icon"
            />
            <Badge variant="secondary" className="text-xs">
              {resource.type}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
          {resource.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {resource.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {resource.extension} • {formatBytes(resource.fileSize)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3 text-sm">
          {resource.description || resource.excerpt}
        </CardDescription>
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
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

      <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Download className="h-4 w-4" />
          <span>{downloadCount}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <DownloadButton resource={resource} size="sm" />
        </div>
      </CardFooter>
    </Card>
  )
}

