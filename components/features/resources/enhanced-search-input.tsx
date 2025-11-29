'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import type { ResourceMetadata } from '@/types/resources'

interface EnhancedSearchInputProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
  totalCount: number
  onSelectSuggestion?: (suggestion: string) => void
}

const SEARCH_HISTORY_KEY = 'cursor-resources-search-history'
const MAX_HISTORY = 10
const MAX_SUGGESTIONS = 8

export function EnhancedSearchInput({
  value,
  onChange,
  resultsCount,
  totalCount,
  onSelectSuggestion,
}: EnhancedSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [modifierKey, setModifierKey] = useState('Ctrl')

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      navigator.platform.includes('Mac')
    ) {
      setModifierKey('⌘')
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored))
      } catch {
        setSearchHistory([])
      }
    }
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.trim().length < 2) {
        setSuggestions([])
        return
      }

      try {
        const response = await fetch(
          `/api/resources/search?q=${encodeURIComponent(value)}&limit=${MAX_SUGGESTIONS}`
        )
        if (response.ok) {
          const data = await response.json()
          const titles = (data.results || [])
            .slice(0, MAX_SUGGESTIONS)
            .map((r: ResourceMetadata) => r.title)
          const uniqueTitles = Array.from(new Set(titles)) as string[]
          setSuggestions(uniqueTitles)
        } else {
          setSuggestions([])
        }
      } catch {
        setSuggestions([])
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 200)
    return () => clearTimeout(timeoutId)
  }, [value])

  const saveToHistory = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) return

    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase())
      const updated = [query, ...filtered].slice(0, MAX_HISTORY)
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allSuggestions =
      value.trim().length >= 2 ? suggestions : searchHistory.slice(0, MAX_SUGGESTIONS)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < allSuggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0 && allSuggestions[selectedIndex]) {
      e.preventDefault()
      const selected = allSuggestions[selectedIndex]
      onChange(selected)
      saveToHistory(selected)
      if (onSelectSuggestion) onSelectSuggestion(selected)
      setIsFocused(false)
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setIsFocused(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    saveToHistory(suggestion)
    if (onSelectSuggestion) onSelectSuggestion(suggestion)
    setIsFocused(false)
    inputRef.current?.blur()
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  const removeHistoryItem = (item: string) => {
    setSearchHistory(prev => {
      const updated = prev.filter(q => q !== item)
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFocused])

  const displaySuggestions =
    value.trim().length >= 2 ? suggestions : searchHistory.slice(0, MAX_SUGGESTIONS)

  const showSuggestions = isFocused && displaySuggestions.length > 0

  return (
    <div ref={containerRef} className="relative flex-1 w-full lg:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search resources... (⌘K)"
          value={value}
          onChange={e => {
            onChange(e.target.value)
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20 h-12 text-base terminal-font"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 hover:bg-transparent"
              onClick={() => {
                onChange('')
                inputRef.current?.focus()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          {value && (
            <div className="text-xs text-muted-foreground terminal-font">
              {resultsCount}/{totalCount}
            </div>
          )}
          {!value && (
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted border border-border rounded">
                {modifierKey}
              </kbd>
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted border border-border rounded">
                K
              </kbd>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto"
          >
            <div className="p-2">
              {value.trim().length < 2 && searchHistory.length > 0 && (
                <div className="flex items-center justify-between px-2 py-1 mb-1">
                  <span className="text-xs font-semibold text-muted-foreground terminal-font">
                    Recent Searches
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="h-6 text-xs terminal-font"
                  >
                    Clear
                  </Button>
                </div>
              )}
              {displaySuggestions.map((suggestion, index) => (
                <motion.button
                  key={`${suggestion}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors terminal-font flex items-center justify-between group ${
                    selectedIndex === index
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1">
                    <Search className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <span className="truncate">{suggestion}</span>
                  </span>
                  {value.trim().length < 2 && searchHistory.includes(suggestion) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        removeHistoryItem(suggestion)
                      }}
                      className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
