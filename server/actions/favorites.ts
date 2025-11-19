'use server'

import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import type { ResourceType } from '@/types/resources'
import { revalidatePath } from 'next/cache'
import {
  getFavorites as queryGetFavorites,
  getFavoritesByType as queryGetFavoritesByType,
  isFavorited as queryIsFavorited,
} from '@/server/queries/favorites'

/**
 * Toggles the authenticated user's favorite status for a resource identified by `slug`.
 *
 * @param slug - The unique resource identifier (slug) to toggle favorite for
 * @param type - The resource type being favorited or unfavorited
 * @returns An object with:
 *  - `success`: `true` if the toggle operation completed successfully, `false` otherwise.
 *  - `isFavorited`: `true` if the resource is favorited after the operation, `false` otherwise.
 *  - `error` (optional): A human-readable error message when `success` is `false`.
 */
export async function toggleFavorite(
  slug: string,
  type: ResourceType
): Promise<{ success: boolean; isFavorited: boolean; error?: string }> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { success: false, isFavorited: false, error: 'Not authenticated' }
    }

    const supabase = createClient()

    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_slug', slug)
      .maybeSingle()

    if (existing) {
      const { error } = await supabase.from('favorites').delete().eq('id', existing.id)

      if (error) {
        return { success: false, isFavorited: true, error: error.message }
      }

      revalidatePath('/dashboard')
      return { success: true, isFavorited: false }
    } else {
      const { error } = await supabase.from('favorites').insert({
        user_id: userId,
        resource_slug: slug,
        resource_type: type,
      })

      if (error) {
        return { success: false, isFavorited: false, error: error.message }
      }

      revalidatePath('/dashboard')
      return { success: true, isFavorited: true }
    }
  } catch (error) {
    console.error('Toggle favorite error:', error)
    return {
      success: false,
      isFavorited: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Fetches the authenticated user's favorite resources.
 *
 * @returns An array of favorite records for the authenticated user; each item contains `resource_slug`, `resource_type`, and `created_at`. Returns an empty array if the user is not authenticated.
 */
export async function getFavorites(): Promise<
  Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>
> {
  const { userId } = await auth()
  if (!userId) return []
  return queryGetFavorites(userId)
}

/**
 * Fetches the authenticated user's favorites filtered by resource type.
 *
 * @param type - The resource type to filter favorites by
 * @returns An array of favorite records each containing `resource_slug`, `resource_type`, and `created_at`. Returns an empty array if the user is not authenticated.
 */
export async function getFavoritesByType(
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const { userId } = await auth()
  if (!userId) return []
  return queryGetFavoritesByType(userId, type)
}

/**
 * Determines whether the authenticated user has favorited the resource identified by `slug`.
 *
 * @param slug - The resource identifier (slug) to check
 * @returns `true` if the authenticated user has favorited the resource identified by `slug`, `false` otherwise
 */
export async function isFavorited(slug: string): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  return queryIsFavorited(userId, slug)
}