'use server'

import { createClient } from '@/lib/supabase/server'
import type { ResourceType } from '@/types/resources'

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
