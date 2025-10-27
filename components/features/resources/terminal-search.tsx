'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface TerminalSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  resultsCount?: number
  totalCount?: number
}

export function TerminalSearch({ 
  value, 
  onChange, 
  placeholder = "Search resources...",
  resultsCount,
  totalCount
}: TerminalSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-terminal-green terminal-font text-sm">⎿</span>
          <h2 className="text-lg font-bold text-foreground terminal-font">
            $ search <span className="text-muted-foreground">(resources)</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4 pl-6">
          Build your personalized development stack
        </p>
      </div>

      <div className={cn(
        "relative bg-card/60 border rounded-lg transition-all",
        isFocused ? "border-primary/50" : "border-border"
      )}>
        <div className="flex items-center gap-3 p-4">
          <span className="text-terminal-green terminal-font font-bold text-lg">{'>'}</span>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 terminal-font text-foreground placeholder:text-muted-foreground"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {(resultsCount !== undefined && totalCount !== undefined) && (
        <div className="flex items-start gap-2 pl-6">
          <span className="text-terminal-green terminal-font text-sm">⎿</span>
          <div className="space-y-1">
            <p className="terminal-font text-sm">
              <span className="text-muted-foreground">Found(</span>
              <span className="text-terminal-green font-bold">{resultsCount}</span>
              <span className="text-muted-foreground"> results)</span>
            </p>
            {value && (
              <p className="text-xs text-muted-foreground">
                Searching for: <span className="text-foreground">"{value}"</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

