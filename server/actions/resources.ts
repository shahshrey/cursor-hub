'use server'

import { createClient } from '@/lib/supabase/server'

export async function incrementDownload(slug: string): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.rpc('increment_download_count', { resource_slug_param: slug })
  } catch (error) {
    console.error('Failed to increment download count:', error)
  }
}

export async function getDownloadCount(slug: string): Promise<number> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('resources')
      .select('download_count')
      .eq('slug', slug)
      .single()

    if (error || !data) return 0
    return data.download_count
  } catch (error) {
    console.error('Failed to get download count:', error)
    return 0
  }
}

export async function getPopularResources(
  limit: number = 10
): Promise<Array<{ slug: string; download_count: number }>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.rpc('get_popular_resources', { limit_count: limit })

    if (error || !data) return []
    return data
  } catch (error) {
    console.error('Failed to get popular resources:', error)
    return []
  }
}

