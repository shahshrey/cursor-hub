import { auth } from '@clerk/nextjs/server'

export async function getExampleData() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }
  
  return { userId }
}