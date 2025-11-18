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

export async function getFavorites(): Promise<
  Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>
> {
  const { userId } = await auth()
  if (!userId) return []
  return queryGetFavorites(userId)
}

export async function getFavoritesByType(
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  const { userId } = await auth()
  if (!userId) return []
  return queryGetFavoritesByType(userId, type)
}

export async function isFavorited(slug: string): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  return queryIsFavorited(userId, slug)
}
