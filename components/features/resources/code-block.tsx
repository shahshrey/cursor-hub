'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { toast } from 'sonner'

interface CodeBlockProps {
  code: string
  language: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()

  const handleCopy = async () => {
    const success = await copy(code)
    if (success) {
      toast.success('Copied to clipboard')
    } else {
      toast.error('Failed to copy')
    }
  }

  const lines = code.split('\n')

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="absolute left-2 top-2 text-xs text-muted-foreground">{language}</div>
      <pre className="bg-zinc-950 text-zinc-50 rounded-lg p-4 overflow-x-auto mt-8">
        <code className="text-sm font-mono">
          {showLineNumbers ? (
            <div className="table">
              {lines.map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-zinc-600 select-none">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </div>
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  )
}

