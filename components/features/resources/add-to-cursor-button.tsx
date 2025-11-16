'use client'

import { useState } from 'react'
import { Loader2, Lock } from 'lucide-react'
import { CursorLogo } from '@/components/ui/cursor-logo'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'
import type { ResourceMetadata } from '@/types/resources'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/clipboard'
import { motion, useReducedMotion } from 'framer-motion'
import { shimmer } from '@/lib/animations'

interface AddToCursorButtonProps {
  resource: ResourceMetadata
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
  className?: string
}

function sanitizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

function sanitizeText(text: string): string {
  return text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\.env/g, '(.)env')
}

export function AddToCursorButton({
  resource,
  variant = 'default',
  size = 'default',
  showLabel = true,
  className = '',
}: AddToCursorButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const needsPermissions = resource.type === 'mcp'

  const generateDeepLink = async (): Promise<string | null> => {
    try {
      if (resource.type === 'mcp') {
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
      }

      if (resource.type === 'command') {
        const response = await fetch(`/api/resources/download/${resource.slug}`)
        if (!response.ok) throw new Error('Failed to fetch command content')

        const rawText = await response.text()
        const taskNameMatch = rawText.match(/<task\s+name=["']([^"']+)["']>/i)
        const rawName = taskNameMatch ? taskNameMatch[1] : resource.title
        const sanitizedName = sanitizeName(rawName)

        const taskStartIndex = rawText.indexOf('<task')
        const taskEndIndex = rawText.lastIndexOf('</task>')

        let promptText = rawText
        if (taskStartIndex !== -1 && taskEndIndex !== -1 && taskEndIndex > taskStartIndex) {
          promptText = rawText.substring(taskStartIndex, taskEndIndex + '</task>'.length)
        }

        let sanitizedText = sanitizeText(promptText)

        sanitizedText = sanitizedText.replace(/\\\|/g, '|')
        sanitizedText = sanitizedText.replace(/\\`/g, '`')
        sanitizedText = sanitizedText.replace(/\\"/g, '"')
        sanitizedText = sanitizedText.replace(/\\'/g, "'")

        const encodedName = encodeURIComponent(sanitizedName)
        let encodedText = encodeURIComponent(sanitizedText)
        encodedText = encodedText.replace(/%20/g, '+')

        return `cursor://anysphere.cursor-deeplink/command?name=${encodedName}&text=${encodedText}`
      }

      if (resource.type === 'rule') {
        const response = await fetch(`/api/resources/download/${resource.slug}`)
        if (!response.ok) throw new Error('Failed to fetch rule content')

        const rawText = await response.text()
        const sanitizedText = sanitizeText(rawText)
        const rawName = resource.frontmatter?.name || resource.title
        const sanitizedName = sanitizeName(rawName)
        const encodedName = encodeURIComponent(sanitizedName)
        const encodedText = encodeURIComponent(sanitizedText).replace(/%20/g, '+')

        return `cursor://anysphere.cursor-deeplink/rule?name=${encodedName}&text=${encodedText}`
      }

      return null
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

      console.log('Generated deep link:', deepLink)
      console.log('Decoded name:', decodeURIComponent(deepLink.match(/name=([^&]+)/)?.[1] || ''))
      console.log(
        'Text length:',
        decodeURIComponent(deepLink.match(/text=(.+)$/)?.[1] || '').length
      )

      window.location.href = deepLink
      const message =
        resource.type === 'mcp'
          ? 'Opening Cursor to install MCP server...'
          : resource.type === 'command'
            ? 'Opening Cursor to add command...'
            : 'Opening Cursor to add rule...'
      toast.success(message)
    } catch (error) {
      console.error('Add to Cursor error:', error)
      toast.error('Failed to open Cursor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContextMenu = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const deepLink = await generateDeepLink()
      if (!deepLink) {
        toast.error('Failed to generate deep link')
        return
      }

      const success = await copyToClipboard(deepLink, true)
      if (success) {
        toast.success('Deep link copied to clipboard')
      } else {
        toast.error('Failed to copy to clipboard')
      }
    } catch (error) {
      console.error('Copy deep link error:', error)
      toast.error('Failed to copy deep link')
    }
  }

  if (resource.type === 'hook') return null

  const getPaddingClasses = () => {
    if (size === 'sm') return 'px-4 py-2'
    if (size === 'lg') return 'px-6 py-2.5'
    if (size === 'icon') return 'p-0'
    return 'px-4 py-2'
  }

  const getFontSizeClasses = () => {
    if (size === 'sm' || size === 'icon') return 'text-sm'
    if (size === 'lg') return 'text-base'
    return 'text-sm'
  }

  return (
    <ShimmerButton
      onClick={handleAddToCursor}
      onContextMenu={handleContextMenu}
      disabled={isLoading}
      shimmerColor="rgba(255, 255, 255, 0.8)"
      shimmerSize="0.05em"
      shimmerDuration="3s"
      borderRadius="6px"
      background="rgba(0, 0, 0, 1)"
      className={cn('gap-2', getPaddingClasses(), getFontSizeClasses(), className)}
      aria-label="Add to Cursor"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          {showLabel && size !== 'icon' && <span>Loading...</span>}
        </>
      ) : (
        <>
          {needsPermissions && (
            <motion.div
              variants={shouldReduceMotion ? {} : shimmer}
              initial="initial"
              animate="animate"
            >
              <Lock className="h-3.5 w-3.5 shrink-0" />
            </motion.div>
          )}
          <CursorLogo size={22} className="shrink-0" />
          {showLabel && size !== 'icon' && <span>Add to Cursor</span>}
        </>
      )}
    </ShimmerButton>
  )
}
