import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function SSOCallback() {
  return <AuthenticateWithRedirectCallback />
}
