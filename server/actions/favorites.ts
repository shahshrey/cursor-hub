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
 * Toggle the authenticated user's favorite status for a resource.
 *
 * @param slug - The unique slug identifying the resource to toggle
 * @param type - The resource type
 * @returns `success` is `true` when the operation succeeded, `false` otherwise; `isFavorited` indicates whether the resource is favorited after the operation; `error` contains a message when `success` is `false`.
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

    const supabase = await createClient()

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
 * @returns An array of favorite entries for the current user. Each entry contains `resource_slug`, `resource_type`, and `created_at`. Returns an empty array if the user is not authenticated.
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
 * @returns An array of favorite records with `resource_slug`, `resource_type`, and `created_at`. Returns an empty array if the user is not authenticated.
 */
export async function getFavoritesByType(
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const { userId } = await auth()
  if (!userId) return []
  return queryGetFavoritesByType(userId, type)
}

/**
 * Check whether the currently authenticated user has favorited the resource identified by `slug`.
 *
 * @param slug - The resource identifier (slug) to check
 * @returns `true` if the current user has favorited the resource, `false` otherwise
 */
export async function isFavorited(slug: string): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  return queryIsFavorited(userId, slug)
}