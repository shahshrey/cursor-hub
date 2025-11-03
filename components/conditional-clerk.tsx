'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const ClerkProvider = dynamic(() => import('@clerk/nextjs').then(m => m.ClerkProvider), {
  ssr: true,
})

interface ConditionalClerkProps {
  children: ReactNode
  appearance?: {
    variables?: {
      colorPrimary?: string
    }
  }
}

export function ConditionalClerk({ children, appearance }: ConditionalClerkProps) {
  const pathname = usePathname()
  const needsAuth = pathname.startsWith('/dashboard') || 
                    pathname.startsWith('/browse') ||
                    pathname.startsWith('/signin') ||
                    pathname.startsWith('/sign-in') ||
                    pathname.startsWith('/signup') ||
                    pathname.startsWith('/sign-up')
  
  if (!needsAuth) {
    return <>{children}</>
  }
  
  return <ClerkProvider appearance={appearance}>{children}</ClerkProvider>
}

