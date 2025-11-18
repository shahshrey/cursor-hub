'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface TerminalSearchProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
  totalCount: number
}

export function TerminalSearch({ value, onChange, resultsCount, totalCount }: TerminalSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search resources..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-12 h-12 text-base terminal-font"
      />
      {value && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground terminal-font">
          {resultsCount}/{totalCount}
        </div>
      )}
    </div>
  )
}
