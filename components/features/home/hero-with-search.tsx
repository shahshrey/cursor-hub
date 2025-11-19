'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { EnhancedSearchInput } from '@/components/features/resources/enhanced-search-input'

interface HeroWithSearchProps {
  totalResources: number
  userId: string | null
}

/**
 * Renders the animated hero section with a searchable input, resource badge, and action buttons.
 *
 * @param totalResources - Total number of community-shared resources shown in the badge.
 * @param userId - Current user's ID; when present the primary action links to the dashboard, otherwise to the signup page.
 * @returns The hero section element containing the heading, description, controlled search input, and navigation controls.
 */
export function HeroWithSearch({ totalResources, userId }: HeroWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/browse')
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/browse?q=${encodeURIComponent(suggestion)}`)
  }

  return (
    <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-primary/10 border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">
            {totalResources.toLocaleString()}+ resources shared by the community
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Discover & Share</span>
          <br />
          <span className="text-primary">Cursor Hub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          A community-driven hub for Cursor commands, rules, MCPs, and hooks. Find what you need or
          share your own resources with fellow developers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1">
              <EnhancedSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                resultsCount={0}
                totalCount={totalResources}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </div>
            <RainbowButton type="submit" size="lg" className="px-8 h-12">
              Search
            </RainbowButton>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={userId ? '/dashboard' : '/signup'}>
            <RainbowButton size="lg" className="text-lg px-8 py-6 group">
              {userId ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </RainbowButton>
          </Link>
          <Link href="/browse">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Browse All Resources
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}