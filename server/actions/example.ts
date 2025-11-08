'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function exampleAction(formData: FormData) {
  const { userId } = await auth()
  
  if (!userId) throw new Error('Unauthorized')

  const supabase = createClient()
  
  const exampleField = formData.get('example') as string

  if (!exampleField) {
    throw new Error('Example field is required')
  }

  revalidatePath('/')
  
  return { success: true, userId }
}