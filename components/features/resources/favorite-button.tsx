'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Loader2 } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import { toggleFavorite } from '@/server/actions/favorites'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { heartBounce } from '@/lib/animations'

interface FavoriteButtonProps {
  resourceSlug: string
  resourceType: ResourceType
  initialIsFavorited?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showLabel?: boolean
}

/**
 * A favorite toggle button that manages and displays a resource's favorited state.
 *
 * Renders a button that performs an optimistic update of the favorite state, requires the user to be signed in to change state (unauthenticated clicks prompt sign-in), calls the server action to persist changes, shows success/error toasts, dispatches a global `favorite-changed` CustomEvent on successful updates, and triggers a brief heart animation when a resource is added to favorites (respects reduced-motion preferences).
 *
 * @param resourceSlug - The unique slug identifying the resource to favorite or unfavorite.
 * @param resourceType - The resource's type used by the server action to identify resource kind.
 * @param initialIsFavorited - Initial favorited state for the resource.
 * @param variant - Button visual variant.
 * @param size - Button size.
 * @param showLabel - If true, renders a text label next to the icon reflecting the current state.
 * @returns The FavoriteButton React element.
 */
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
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const handleToggle = async () => {
    try {
      setIsLoading(true)

      if (!isSignedIn) {
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
          setShouldAnimate(true)
          setTimeout(() => setShouldAnimate(false), 600)
        } else {
          toast.success('Removed from favorites')
        }
        setIsFavorited(result.isFavorited)
        window.dispatchEvent(new CustomEvent('favorite-changed'))
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
      className={`transition-all duration-200 ${isFavorited ? 'text-red-500 hover:text-red-600' : ''}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <motion.div
          variants={shouldReduceMotion ? {} : heartBounce}
          initial="initial"
          animate={shouldAnimate ? 'animate' : 'initial'}
        >
          <Heart className={`h-4 w-4 transition-all ${isFavorited ? 'fill-current' : ''}`} />
        </motion.div>
      )}
      {showLabel && <span className="ml-1">{isFavorited ? 'Favorited' : 'Favorite'}</span>}
    </Button>
  )
}