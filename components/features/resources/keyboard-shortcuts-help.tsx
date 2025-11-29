'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Keyboard, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SHORTCUTS = [
  { key: '/', description: 'Focus search bar' },
  { key: '⌘K / Ctrl+K', description: 'Quick search (global)' },
  { key: 'Esc', description: 'Clear all filters' },
  { key: 'Ctrl+S / ⌘S', description: 'Save current filters as preset' },
  { key: '↑↓', description: 'Navigate suggestions' },
  { key: 'Enter', description: 'Select suggestion or preview resource' },
  { key: '?', description: 'Show this help' },
]

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable

      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (isInputField) return
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && cardRef.current) {
      const previouslyFocused = document.activeElement as HTMLElement
      cardRef.current.focus()

      return () => {
        previouslyFocused?.focus()
      }
    }
  }, [isOpen])

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="sm"
        className="terminal-font text-xs fixed bottom-4 right-4 z-20"
        onClick={() => setIsOpen(true)}
        aria-label="Show keyboard shortcuts (press ?)"
        title="Press ? for shortcuts"
      >
        <Keyboard className="w-4 h-4 mr-1.5" />
        <span className="hidden sm:inline">Shortcuts</span>
        <kbd className="hidden sm:inline ml-1.5 px-1.5 py-0.5 text-[10px] bg-muted border border-border rounded">
          ?
        </kbd>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card
                ref={cardRef}
                className="relative z-10 max-w-md w-full mx-4 p-6 border-terminal-green/30"
                role="dialog"
                aria-modal="true"
                aria-labelledby="shortcuts-title"
                tabIndex={-1}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close shortcuts help"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5 text-terminal-green" />
                    <h3 id="shortcuts-title" className="text-lg font-bold terminal-font">
                      Keyboard Shortcuts
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {SHORTCUTS.map(shortcut => (
                      <div
                        key={shortcut.key}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="text-sm text-muted-foreground terminal-font">
                          {shortcut.description}
                        </span>
                        <kbd className="px-3 py-1 text-xs font-mono bg-muted border border-border rounded">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
