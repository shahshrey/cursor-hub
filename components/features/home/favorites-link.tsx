'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

/**
 * Display a favorites action button that shows the current favorites count and navigates to the dashboard.
 *
 * Fetches the count from /api/favorites/count on mount and updates it when a global `favorite-changed` event is dispatched.
 *
 * @returns A React element rendering the favorites button. While the count is unknown it renders a disabled placeholder; once loaded it renders a link/button showing the count and an accessible label that includes the count when greater than zero.
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
      } catch (error) {
        console.error('Failed to fetch favorites count:', error)
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
    return (
      <Button
        variant="ghost"
        size="sm"
        className="relative min-h-[44px] touch-manipulation"
        disabled
      >
        <Heart className="w-4 h-4 mr-1.5 animate-pulse opacity-50" />
        <span className="hidden sm:inline">Favorites</span>
      </Button>
    )
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