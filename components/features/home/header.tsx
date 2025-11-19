'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Home } from 'lucide-react'
import { CursorLogo } from '@/components/ui/cursor-logo'
import { FavoritesLink } from './favorites-link'

/**
 * Renders the application's sticky top navigation with branding and authentication-aware controls.
 *
 * The header shows "Cursor Hub" branding on the left and a navigation group on the right:
 * when the user is signed out it shows "Sign In" and "Sign Up" actions; when signed in it
 * shows a favorites link, a "Dashboard" button, and the user menu button.
 *
 * @returns The header JSX element containing branding and authentication-dependent navigation.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <CursorLogo size={32} className="text-foreground" />
          <span className="font-bold text-lg hidden sm:inline-block">Cursor Hub</span>
        </Link>

        <nav className="flex items-center gap-3">
          <SignedOut>
            <Link href="/signin">
              <Button variant="ghost" size="sm" className="min-h-[44px] touch-manipulation">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <RainbowButton size="sm" className="shadow-md min-h-[44px] touch-manipulation">
                Sign Up
              </RainbowButton>
            </Link>
          </SignedOut>

          <SignedIn>
            <FavoritesLink />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="min-h-[44px] touch-manipulation">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9',
                  userButtonPopoverCard: 'bg-card border-border',
                  userButtonPopoverActionButton: 'hover:bg-accent',
                },
              }}
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}