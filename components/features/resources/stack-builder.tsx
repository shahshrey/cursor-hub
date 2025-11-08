'use client'

import { useState } from 'react'
import type { ResourceMetadata } from '@/types/resources'
import { Button } from '@/components/ui/button'
import { X, Copy, Check, ShoppingCart, Share2, Trash2, Download, Package, Zap, Clipboard, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'
import { McpLogo } from '@/components/ui/mcp-logo'

interface StackBuilderProps {
  isOpen: boolean
  onClose: () => void
  stack: ResourceMetadata[]
  onRemoveFromStack: (resourceSlug: string) => void
  onClearStack: () => void
}

export function StackBuilder({ 
  isOpen, 
  onClose, 
  stack,
  onRemoveFromStack,
  onClearStack 
}: StackBuilderProps) {
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const handleDownloadAll = async () => {
    for (const resource of stack) {
      const response = await fetch(`/api/resources/download/${resource.slug}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = resource.fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  const handleCopyList = async () => {
    const list = stack.map(r => `- ${r.title} (${r.fileName})`).join('\n')
    await navigator.clipboard.writeText(list)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async (platform: 'twitter' | 'threads') => {
    const text = `Check out my Cursor resources collection! ${stack.length} resources for enhanced productivity 🚀`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else {
      window.open(`https://threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    }
    setShareMenuOpen(false)
  }

  const stackByType = stack.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = []
    }
    acc[resource.type].push(resource)
    return acc
  }, {} as Record<string, ResourceMetadata[]>)

  const typeIcons: Record<string, typeof Zap | typeof Clipboard | typeof GitBranch> = {
    command: Zap,
    rule: Clipboard,
    mcp: Package,
    hook: GitBranch
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "stack-builder-sidebar",
        isOpen && "open"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Resource Collection</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {stack.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearStack}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All ({stack.length})
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {stack.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package className="w-16 h-16 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Your collection is empty
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add resources to your collection to download them all at once
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(stackByType).map(([type, resources]) => {
                  const IconComponent = typeIcons[type]
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-2 mb-3">
                        {type === 'mcp' ? (
                          <McpLogo size={24} />
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                        <h4 className="font-semibold text-foreground capitalize">
                          {type} ({resources.length})
                        </h4>
                      </div>
                    <div className="space-y-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.slug}
                          className="bg-card/40 border border-border rounded-lg p-3 group hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm text-foreground truncate">
                                {resource.title}
                              </h5>
                              <p className="text-xs text-muted-foreground truncate">
                                {resource.category}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveFromStack(resource.slug)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )
                })}
              </div>
            )}
          </div>

          {stack.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              <div className="bg-card/40 border border-border rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">
                      Collection Ready
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stack.length} {stack.length === 1 ? 'resource' : 'resources'} in your collection. Download them individually or all at once.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleDownloadAll}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopyList}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy List
                    </>
                  )}
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Collection
                </Button>
                
                {shareMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Share on X
                    </button>
                    <button
                      onClick={() => handleShare('threads')}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10 transition-colors w-full text-left border-t border-border"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                      </svg>
                      Share on Threads
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

