'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

/**
 * Render a dashboard link that displays the user's favorites count.
 *
 * Fetches the current favorites count on mount, refreshes it when a global
 * `favorite-changed` event is dispatched, and renders nothing until the
 * initial count has been loaded. When rendered, the link contains a "Favorites"
 * button and an optional numeric badge shown only when the count is greater than 0.
 *
 * @returns A React element linking to `/dashboard` that contains a "Favorites" button;
 * `null` while the initial favorites count is still loading.
 */
export function FavoritesLink() {
  const [favoritesCount, setFavoritesCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchFavoritesCount = async () => {
      try {
        const response = await fetch('/api/favorites/count')
        if (response.ok) {
          const data = await response.json()
          setFavoritesCount(data.count || 0)
        } else {
          setFavoritesCount(0)
        }
      } catch {
        setFavoritesCount(0)
      }
    }
    fetchFavoritesCount()

    const handleFavoriteChange = () => {
      fetchFavoritesCount()
    }

    window.addEventListener('favorite-changed', handleFavoriteChange)
    return () => window.removeEventListener('favorite-changed', handleFavoriteChange)
  }, [])

  if (favoritesCount === null) {
    return null
  }

  return (
    <Link href="/dashboard">
      <Button
        variant="ghost"
        size="sm"
        className="relative min-h-[44px] touch-manipulation"
        aria-label={`Favorites${favoritesCount > 0 ? ` (${favoritesCount})` : ''}`}
      >
        <Heart className="w-4 h-4 mr-1.5" />
        <span className="hidden sm:inline">Favorites</span>
        {favoritesCount > 0 && (
          <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px]">
            {favoritesCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}