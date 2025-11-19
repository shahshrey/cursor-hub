'use server'

import { createClient } from '@/lib/supabase/server'
import type { ResourceType } from '@/types/resources'

/**
 * Retrieve the total number of favorite records for the specified user.
 *
 * @returns The count of favorites for `userId`; returns `0` if the caller is unauthorized or an error occurs.
 */
export async function getFavoritesCount(userId: string): Promise<number> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    console.error('Unauthorized access attempt')
    return 0
  }

  const { count, error } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (error) {
    console.error('Get favorites count error:', error)
    return 0
  }

  return count || 0
}

/**
 * Fetches the favorites for the specified user, ordered by `created_at` descending.
 *
 * @returns An array of favorite records with fields `resource_slug`, `resource_type`, and `created_at`; returns an empty array on unauthorized access or if an error occurs.
 */
export async function getFavorites(
  userId: string
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    console.error('Unauthorized access attempt')
    return []
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('resource_slug, resource_type, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Get favorites error:', error)
    return []
  }

  return data as Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>
}

/**
 * Retrieve the favorites for a user filtered by resource type, ordered by newest first.
 *
 * @param userId - ID of the user whose favorites to retrieve
 * @param type - Resource type to filter favorites by
 * @returns An array of favorites with fields `resource_slug`, `resource_type`, and `created_at`; returns an empty array if the caller is not authorized for the user or if an error occurs
 */
export async function getFavoritesByType(
  userId: string,
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    console.error('Unauthorized access attempt')
    return []
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('resource_slug, resource_type, created_at')
    .eq('user_id', userId)
    .eq('resource_type', type)
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Get favorites by type error:', error)
    return []
  }

  return data as Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>
}

/**
 * Checks whether the specified resource is favorited by the given user.
 *
 * @param userId - ID of the user to check favorites for
 * @param resourceSlug - Slug identifier of the resource to check
 * @returns `true` if a favorite record exists for the given user and resource slug, `false` otherwise
 */
export async function isFavorited(userId: string, resourceSlug: string): Promise<boolean> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    console.error('Unauthorized access attempt')
    return false
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('resource_slug', resourceSlug)
    .maybeSingle()

  if (error) {
    console.error('Check favorite error:', error)
    return false
  }

  return !!data
}