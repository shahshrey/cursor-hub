'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Loader2, Copy, Check } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { toast } from 'sonner'

interface AddToCursorButtonProps {
  resource: ResourceMetadata
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
  className?: string
}

export function AddToCursorButton({
  resource,
  variant = 'default',
  size = 'default',
  showLabel = true,
  className = '',
}: AddToCursorButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const generateDeepLink = async (): Promise<string | null> => {
    try {
      const response = await fetch(`/api/resources/download/${resource.slug}`)
      if (!response.ok) throw new Error('Failed to fetch MCP config')

      const text = await response.text()
      const mcpConfig = JSON.parse(text)
      
      const firstServerKey = Object.keys(mcpConfig.mcpServers || {})[0]
      if (!firstServerKey) throw new Error('No MCP server configuration found')

      const serverConfig = mcpConfig.mcpServers[firstServerKey]
      
      const configData = {
        command: serverConfig.command,
        args: serverConfig.args,
        ...(serverConfig.env && { env: serverConfig.env }),
        ...(serverConfig.description && { description: serverConfig.description }),
      }

      const base64Config = btoa(JSON.stringify(configData))
      const encodedName = encodeURIComponent(firstServerKey)
      
      return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodedName}&config=${base64Config}`
    } catch (error) {
      console.error('Error generating deep link:', error)
      return null
    }
  }

  const handleAddToCursor = async () => {
    try {
      setIsLoading(true)
      const deepLink = await generateDeepLink()
      
      if (!deepLink) {
        toast.error('Failed to generate installation link')
        return
      }

      window.location.href = deepLink
      toast.success('Opening Cursor to install MCP server...')
    } catch (error) {
      console.error('Add to Cursor error:', error)
      toast.error('Failed to open Cursor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    try {
      setIsLoading(true)
      const deepLink = await generateDeepLink()
      
      if (!deepLink) {
        toast.error('Failed to generate installation link')
        return
      }

      await navigator.clipboard.writeText(deepLink)
      setIsCopied(true)
      toast.success('Installation link copied to clipboard')
      
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Copy error:', error)
      toast.error('Failed to copy link')
    } finally {
      setIsLoading(false)
    }
  }

  if (resource.type !== 'mcp') return null

  return (
    <div className="flex gap-2 w-full">
      <Button 
        variant={variant} 
        size={size} 
        onClick={handleAddToCursor} 
        disabled={isLoading}
        className={className}
        aria-label="Add to Cursor"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-1" />
        ) : (
          <Plus className="h-4 w-4 mr-1" />
        )}
        {showLabel && 'Add to Cursor'}
      </Button>
      
      <Button
        variant="outline"
        size={size}
        onClick={handleCopyLink}
        disabled={isLoading}
        className="px-3"
        aria-label="Copy installation link"
        title="Copy installation link"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

