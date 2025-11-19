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
 * Renders a download button for a resource that handles fetching the file, saving it to the user device, showing success/error toasts, and dispatching a `resource-downloaded` event on success.
 *
 * @param resource - Metadata of the resource to download (must include `slug` and `fileName`)
 * @param variant - Visual variant of the button; defaults to `'default'`
 * @param size - Size of the button; defaults to `'default'`
 * @param showLabel - Whether to display the textual label next to the icon; defaults to `true`
 * @param className - Additional CSS class names to apply to the button
 * @returns A button element that initiates the resource download when activated
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