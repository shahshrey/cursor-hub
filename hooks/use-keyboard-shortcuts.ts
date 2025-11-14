'use client'

import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
  callback: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch =
          shortcut.ctrl === undefined || shortcut.ctrl === (event.ctrlKey || event.metaKey)
        const altMatch = shortcut.alt === undefined || shortcut.alt === event.altKey
        const shiftMatch = shortcut.shift === undefined || shortcut.shift === event.shiftKey
        const metaMatch = shortcut.meta === undefined || shortcut.meta === event.metaKey

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          altMatch &&
          shiftMatch &&
          metaMatch
        ) {
          event.preventDefault()
          shortcut.callback()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts, enabled])
}
