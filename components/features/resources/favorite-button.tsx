'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Loader2 } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import { toggleFavorite } from '@/server/actions/favorites'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
  resourceSlug: string
  resourceType: ResourceType
  initialIsFavorited?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
}

export function FavoriteButton({
  resourceSlug,
  resourceType,
  initialIsFavorited = false,
  variant = 'ghost',
  size = 'sm',
  showLabel = false,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleToggle = async () => {
    try {
      setIsLoading(true)

      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.info('Please sign in to save favorites', {
          action: {
            label: 'Sign In',
            onClick: () => router.push(`/signin?redirect=${window.location.pathname}`),
          },
        })
        setIsLoading(false)
        return
      }

      const previousState = isFavorited
      setIsFavorited(!isFavorited)

      const result = await toggleFavorite(resourceSlug, resourceType)

      if (!result.success) {
        setIsFavorited(previousState)
        toast.error(result.error || 'Failed to update favorite')
      } else {
        if (result.isFavorited) {
          toast.success('Added to favorites')
        } else {
          toast.success('Removed from favorites')
        }
        setIsFavorited(result.isFavorited)
      }
    } catch (error) {
      console.error('Favorite toggle error:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={isFavorited ? 'text-red-500 hover:text-red-600' : ''}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
      )}
      {showLabel && <span className="ml-1">{isFavorited ? 'Favorited' : 'Favorite'}</span>}
    </Button>
  )
}

