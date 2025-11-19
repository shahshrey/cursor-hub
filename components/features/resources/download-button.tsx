'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { toast } from 'sonner'

interface DownloadButtonProps {
  resource: ResourceMetadata
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
  className?: string
}

/**
 * Renders a button that downloads the given resource when clicked and manages download state.
 *
 * Displays an icon (and optional label), shows success/error toasts, and dispatches a
 * `resource-downloaded` CustomEvent with `{ slug }` on successful download.
 *
 * @param resource - Metadata for the resource to download (used to build the download request and filename)
 * @param showLabel - Whether to display the textual label next to the icon; defaults to `true`
 * @returns The download button element
 */
export function DownloadButton({
  resource,
  variant = 'default',
  size = 'default',
  showLabel = true,
  className = '',
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      const response = await fetch(`/api/resources/download/${resource.slug}`)

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = resource.fileName
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success(`Downloaded ${resource.fileName}`)

      window.dispatchEvent(
        new CustomEvent('resource-downloaded', {
          detail: { slug: resource.slug },
        })
      )
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download resource')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isDownloading}
      className={className}
      aria-label={`Download ${resource.fileName}`}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-1" />
      ) : (
        <Download className="h-4 w-4 mr-1" />
      )}
      {showLabel && (isDownloading ? 'Downloading...' : 'Download')}
    </Button>
  )
}