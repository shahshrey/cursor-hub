'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Copy, Loader2 } from 'lucide-react'
import type { ResourceMetadata } from '@/types/resources'
import { CodeBlock } from './code-block'
import { DownloadButton } from './download-button'
import { formatBytes, getLanguageFromExtension } from '@/lib/file-utils'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ParsedMarkdown {
  frontmatter: Record<string, string | boolean>
  content: string
  type: 'rule' | 'command' | 'plain'
}

function parseMarkdownWithFrontmatter(text: string): ParsedMarkdown {
  // Check for YAML frontmatter (rules)
  const yamlFrontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const yamlMatch = text.match(yamlFrontmatterRegex)
  
  if (yamlMatch) {
    const [, frontmatterText, content] = yamlMatch
    const frontmatter: Record<string, string | boolean> = {}
    
    // Simple YAML parser
    frontmatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim()
        frontmatter[key] = value === 'false' ? false : value === 'true' ? true : value
      }
    })
    
    return { frontmatter, content, type: 'rule' }
  }
  
  // Check for task/command structure
  const taskRegex = /<task name="([^"]+)">\s*\n(?:<task_objective>\s*\n([\s\S]*?)\n<\/task_objective>\s*\n)?(?:<detailed_sequence_steps>\s*\n)?([\s\S]*?)(?:\n<\/detailed_sequence_steps>\s*\n)?<\/task>/
  const taskMatch = text.match(taskRegex)
  
  if (taskMatch) {
    const [, taskName, taskObjective = '', detailedSteps = ''] = taskMatch
    const frontmatter: Record<string, string | boolean> = {
      name: taskName,
      objective: taskObjective.trim(),
    }
    
    return { 
      frontmatter, 
      content: detailedSteps.trim(), 
      type: 'command' 
    }
  }
  
  return { frontmatter: {}, content: text, type: 'plain' }
}

interface ResourcePreviewModalProps {
  resource: ResourceMetadata | null
  isOpen: boolean
  onClose: () => void
}

export function ResourcePreviewModal({ resource, isOpen, onClose }: ResourcePreviewModalProps) {
  const [content, setContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { copied, copy } = useCopyToClipboard()

  useEffect(() => {
    if (isOpen && resource) {
      setIsLoading(true)
      fetch(`/api/resources/download/${resource.slug}`)
        .then((res) => res.text())
        .then((text) => {
          setContent(text)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Failed to load content:', error)
          toast.error('Failed to load resource content')
          setIsLoading(false)
        })
    } else {
      setContent(null)
    }
  }, [isOpen, resource])

  const handleCopyAll = async () => {
    if (content) {
      const success = await copy(content)
      if (success) {
        toast.success('Copied entire file to clipboard')
      } else {
        toast.error('Failed to copy')
      }
    }
  }

  if (!resource) return null

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }

    if (!content) {
      return (
        <div className="text-center py-12 text-muted-foreground">Failed to load content</div>
      )
    }

    const language = getLanguageFromExtension(resource.extension)

    if (resource.extension === '.md' || resource.extension === '.mdc') {
      const { frontmatter, content: markdownContent, type } = parseMarkdownWithFrontmatter(content)
      
      return (
        <div className="space-y-6">
          {/* Command-specific header */}
          {type === 'command' && frontmatter.name && (
            <div className="space-y-4 pb-6 border-b">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{frontmatter.name}</h3>
                  <Badge>Command</Badge>
                </div>
              </div>
              
              {frontmatter.objective && (
                <div className="rounded-lg bg-accent/50 border border-accent p-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Objective
                  </h4>
                  <p className="text-sm leading-relaxed text-foreground/90">{frontmatter.objective}</p>
                </div>
              )}
            </div>
          )}

          {/* Rule-specific header */}
          {type === 'rule' && Object.keys(frontmatter).length > 0 && (
            <div className="space-y-3 pb-6 border-b">
              {frontmatter.description && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{frontmatter.description}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 text-xs">
                {frontmatter.alwaysApply !== undefined && (
                  <Badge variant={frontmatter.alwaysApply ? 'default' : 'secondary'}>
                    {frontmatter.alwaysApply ? '✓ Auto-apply' : 'Manual trigger'}
                  </Badge>
                )}
                {frontmatter.category && (
                  <Badge variant="outline">
                    {frontmatter.category}
                  </Badge>
                )}
                {frontmatter.tags && (
                  <>
                    {frontmatter.tags.split(',').slice(0, 5).map((tag: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Markdown content */}
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 className="text-2xl font-semibold mb-4 mt-6" {...props} />,
                h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-3 mt-8 border-b pb-2" {...props} />,
                h3: ({ ...props }) => <h3 className="text-lg font-semibold mb-2 mt-6" {...props} />,
                h4: ({ ...props }) => <h4 className="text-base font-semibold mb-2 mt-4" {...props} />,
                p: ({ ...props }) => <p className="mb-4 leading-7" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4" {...props} />,
                li: ({ ...props }) => <li className="leading-7" {...props} />,
                strong: ({ ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                em: ({ ...props }) => <em className="italic" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 italic text-muted-foreground" {...props} />
                ),
                hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
                code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const codeContent = String(children).replace(/\n$/, '')
                  
                  if (!inline && match) {
                    return <CodeBlock code={codeContent} language={match[1]} />
                  }
                  
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      )
    }

    return <CodeBlock code={content} language={language} showLineNumbers={true} />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl mb-2">{resource.title}</DialogTitle>
              <DialogDescription className="text-sm">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="secondary">{resource.type}</Badge>
                  <Badge variant="outline">{resource.category}</Badge>
                  <span className="text-muted-foreground">
                    {resource.extension} • {formatBytes(resource.fileSize)}
                  </span>
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">{renderContent()}</div>

        <div className="flex items-center justify-between gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCopyAll} disabled={!content}>
            <Copy className="h-4 w-4 mr-1" />
            {copied ? 'Copied!' : 'Copy Entire File'}
          </Button>
          <div className="flex gap-2">
            <DownloadButton resource={resource} variant="default" />
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

