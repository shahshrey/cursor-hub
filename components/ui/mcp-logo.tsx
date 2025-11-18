'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface McpLogoProps {
  size?: number
  className?: string
  variant?: 'color' | 'transparent'
}

export function McpLogo({ size = 24, className, variant = 'color' }: McpLogoProps) {
  const imageSrc = variant === 'transparent' ? '/mcp/mcp_transparent.png' : '/mcp/mcp2.png'

  return (
    <Image
      src={imageSrc}
      alt="MCP"
      width={size}
      height={size}
      className={cn('inline-block', className)}
      unoptimized
    />
  )
}
