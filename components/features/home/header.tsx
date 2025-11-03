'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Home } from 'lucide-react'
import { CursorLogo } from '@/components/ui/cursor-logo'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <CursorLogo size={32} className="text-foreground" />
          <span className="font-bold text-lg hidden sm:inline-block">Cursor Resources</span>
        </Link>
        
        <nav className="flex items-center gap-3">
          <SignedOut>
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="shadow-md">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "bg-card border-border",
                  userButtonPopoverActionButton: "hover:bg-accent",
                }
              }}
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}

