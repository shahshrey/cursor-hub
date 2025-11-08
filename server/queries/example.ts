import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/supabase'

type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export async function getExampleData() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  const supabase = createClient()
  
  return { userId }
}