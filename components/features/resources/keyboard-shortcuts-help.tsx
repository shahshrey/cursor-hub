'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Keyboard, X } from 'lucide-react'

const SHORTCUTS = [
  { key: '/', description: 'Focus search bar' },
  { key: 'Esc', description: 'Clear all filters' },
  { key: 'Ctrl+S', description: 'Save current filters as preset' },
]

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="terminal-font text-xs fixed bottom-4 right-4 z-20"
        onClick={() => setIsOpen(true)}
      >
        <Keyboard className="w-4 h-4 mr-1.5" />
        Shortcuts
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <Card className="relative z-10 max-w-md w-full mx-4 p-6 border-terminal-green/30">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-terminal-green" />
                <h3 className="text-lg font-bold terminal-font">Keyboard Shortcuts</h3>
              </div>

              <div className="space-y-2">
                {SHORTCUTS.map((shortcut) => (
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
        </div>
      )}
    </>
  )
}

