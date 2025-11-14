'use server'

import { auth } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  const { userId } = await auth()
  return userId
}
