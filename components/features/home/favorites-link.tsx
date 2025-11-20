'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

export function FavoritesLink() {
  const [favoritesCount, setFavoritesCount] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchFavoritesCount = async () => {
      try {
        const response = await fetch('/api/favorites/count')
        if (response.ok) {
          const data = await response.json()
          if (isMounted) {
            setFavoritesCount(data.count || 0)
          }
        } else {
          if (isMounted) {
            setFavoritesCount(0)
          }
        }
      } catch (error) {
        console.error('Failed to fetch favorites count:', error)
        if (isMounted) {
          setFavoritesCount(0)
        }
      }
    }
    fetchFavoritesCount()

    const handleFavoriteChange = () => {
      fetchFavoritesCount()
    }

    window.addEventListener('favorite-changed', handleFavoriteChange)
    return () => {
      isMounted = false
      window.removeEventListener('favorite-changed', handleFavoriteChange)
    }
  }, [])

  if (favoritesCount === null) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="relative min-h-[44px] touch-manipulation"
        disabled
        aria-label="Favorites (loading)"
      >
        <Heart className="w-4 h-4 mr-1.5 animate-pulse opacity-50" />
        <span className="hidden sm:inline">Favorites</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative min-h-[44px] touch-manipulation"
      aria-label={`Favorites${favoritesCount > 0 ? ` (${favoritesCount})` : ''}`}
      asChild
    >
      <Link href="/dashboard">
        <Heart className="w-4 h-4 mr-1.5" />
        <span className="hidden sm:inline">Favorites</span>
        {favoritesCount > 0 && (
          <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px]">
            {favoritesCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
