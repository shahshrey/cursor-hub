'use server'

import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import type { ResourceType } from '@/types/resources'

/**
 * Retrieves the total number of favorites for the specified user.
 *
 * @param userId - The ID of the user whose favorites will be counted
 * @returns The total count of favorites for `userId`, or `0` if the request is unauthorized or an error occurs
 */
export async function getFavoritesCount(userId: string): Promise<number> {
  const { authorized, supabase } = await authorizeUser(userId)

  if (!authorized || !supabase) {
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
 * Verifies that the currently authenticated user matches the provided userId and, if so, returns a Supabase client.
 *
 * @param userId - The expected authenticated user's id to validate against the current session
 * @returns `authorized` is `true` when the authenticated user id equals `userId`, `false` otherwise; `supabase` is a Supabase client when `authorized` is `true`, `null` when `authorized` is `false`
 */
async function authorizeUser(userId: string) {
  const { userId: currentUserId } = await auth()

  if (!currentUserId || currentUserId !== userId) {
    console.error('Unauthorized access attempt')
    return { authorized: false, supabase: null }
  }

  return { authorized: true, supabase: createClient() }
}

/**
 * Retrieves the list of favorites for the specified user ordered by newest first.
 *
 * @param userId - ID of the user whose favorites to fetch.
 * @returns An array of favorite records containing `resource_slug`, `resource_type`, and `created_at`; an empty array if the caller is unauthorized or an error occurs.
 */
export async function getFavorites(
  userId: string
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const { authorized, supabase } = await authorizeUser(userId)

  if (!authorized || !supabase) {
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
 * Retrieves a user's favorites filtered by resource type.
 *
 * @param userId - The ID of the user whose favorites to retrieve
 * @param type - The resource type to filter favorites by
 * @returns An array of favorite entries each containing `resource_slug`, `resource_type`, and `created_at`; returns an empty array if the user is not authorized or an error occurs
 */
export async function getFavoritesByType(
  userId: string,
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const { authorized, supabase } = await authorizeUser(userId)

  if (!authorized || !supabase) {
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
 * Determines whether a specific resource is favorited by the specified user.
 *
 * @param userId - The ID of the user whose favorites to check
 * @param resourceSlug - The slug identifying the resource to check
 * @returns `true` if the user has favorited the resource identified by `resourceSlug`, `false` otherwise.
 */
export async function isFavorited(userId: string, resourceSlug: string): Promise<boolean> {
  const { authorized, supabase } = await authorizeUser(userId)

  if (!authorized || !supabase) {
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