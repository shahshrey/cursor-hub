'use server'

import { createClient } from '@/lib/supabase/server'
import type { ResourceType } from '@/types/resources'
import { revalidatePath } from 'next/cache'

export async function toggleFavorite(
  slug: string,
  type: ResourceType
): Promise<{ success: boolean; isFavorited: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, isFavorited: false, error: 'Not authenticated' }
    }

    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('resource_slug', slug)
      .single()

    if (existing) {
      const { error } = await supabase.from('favorites').delete().eq('id', existing.id)

      if (error) {
        return { success: false, isFavorited: true, error: error.message }
      }

      revalidatePath('/dashboard')
      return { success: true, isFavorited: false }
    } else {
      const { error } = await supabase.from('favorites').insert({
        user_id: user.id,
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
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
      .from('favorites')
      .select('resource_slug, resource_type, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch (error) {
    console.error('Get favorites error:', error)
    return []
  }
}

export async function getFavoritesByType(
  type: ResourceType
): Promise<Array<{ resource_slug: string; resource_type: ResourceType; created_at: string }>> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
      .from('favorites')
      .select('resource_slug, resource_type, created_at')
      .eq('user_id', user.id)
      .eq('resource_type', type)
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch (error) {
    console.error('Get favorites by type error:', error)
    return []
  }
}

export async function isFavorited(slug: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('resource_slug', slug)
      .single()

    if (error || !data) return false
    return true
  } catch (error) {
    return false
  }
}

