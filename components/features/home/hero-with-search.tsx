'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, Terminal, ScrollText, Cpu, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { EnhancedSearchInput } from '@/components/features/resources/enhanced-search-input'
import type { ResourceType } from '@/types/resources'

interface HeroWithSearchProps {
  totalResources: number
  userId: string | null
  typeCounts: Record<ResourceType, number>
  topCategories: { name: string; count: number }[]
}

const typeQuickLinks: {
  type: ResourceType
  label: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { type: 'command', label: 'Commands', icon: Terminal },
  { type: 'rule', label: 'Rules', icon: ScrollText },
  { type: 'mcp', label: 'MCPs', icon: Cpu },
  { type: 'hook', label: 'Hooks', icon: GitBranch },
]

export function HeroWithSearch({
  totalResources,
  userId,
  typeCounts,
  topCategories,
}: HeroWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const popularSearches = topCategories.slice(0, 6).map(category => category.name)

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

  const handleTypeNavigate = (type: ResourceType) => {
    router.push(`/browse?type=${type}`)
  }

  const handleCategoryNavigate = (category: string) => {
    router.push(`/browse?category=${encodeURIComponent(category)}`)
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
                quickSuggestions={popularSearches}
              />
            </div>
            <RainbowButton type="submit" size="lg" className="px-8 h-12">
              Search
            </RainbowButton>
          </form>
        </motion.div>

        {popularSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm"
          >
            <span className="text-muted-foreground">Try:</span>
            {popularSearches.map(suggestion => (
              <Button
                key={suggestion}
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-full h-8 px-3"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-3"
              onClick={() => router.push('/browse?sort=downloads')}
            >
              Trending now
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-3xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {typeQuickLinks.map(item => {
            const Icon = item.icon
            const count = typeCounts[item.type] || 0
            return (
              <Button
                key={item.type}
                type="button"
                variant="outline"
                className="justify-between h-12 px-3 text-left"
                onClick={() => handleTypeNavigate(item.type)}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{item.label}</span>
                </span>
                <span className="text-xs text-muted-foreground font-mono">{count}</span>
              </Button>
            )
          })}
        </motion.div>

        {topCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8 text-sm"
          >
            <span className="text-muted-foreground">Popular categories:</span>
            {topCategories.map(category => (
              <Button
                key={category.name}
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-full h-8 px-3"
                onClick={() => handleCategoryNavigate(category.name)}
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  {category.count}
                </span>
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-3"
              onClick={() => router.push('/browse')}
            >
              View all
            </Button>
          </motion.div>
        )}

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
