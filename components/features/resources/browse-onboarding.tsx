'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Lightbulb, Search, Filter, Sparkles, ArrowRight } from 'lucide-react'

interface OnboardingTip {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  action?: string
  position: 'search' | 'discovery' | 'filters' | 'general'
}

const onboardingTips: OnboardingTip[] = [
  {
    id: 'search',
    icon: <Search className="w-4 h-4" />,
    title: 'Smart Search',
    description: 'Use keywords like "authentication", "database", or "testing" to find exactly what you need.',
    action: 'Try searching now',
    position: 'search'
  },
  {
    id: 'discovery',
    icon: <Sparkles className="w-4 h-4" />,
    title: 'Explore Collections',
    description: 'Browse curated collections for popular frameworks and technologies.',
    action: 'Explore collections',
    position: 'discovery'
  },
  {
    id: 'filters',
    icon: <Filter className="w-4 h-4" />,
    title: 'Filter by Type',
    description: 'Use type filters (Commands, Rules, MCPs, Hooks) to narrow down your search.',
    action: 'Try filters',
    position: 'filters'
  },
  {
    id: 'favorites',
    icon: <Lightbulb className="w-4 h-4" />,
    title: 'Save & Organize',
    description: 'Star your favorite resources and create filter presets for quick access.',
    action: 'Learn more',
    position: 'general'
  }
]

export function BrowseOnboarding() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissedTips, setDismissedTips] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('browse-onboarding-seen')
    const dismissed = localStorage.getItem('browse-onboarding-dismissed')

    if (!hasSeenOnboarding && !dismissed) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }

    if (dismissed) {
      setDismissedTips(new Set(JSON.parse(dismissed)))
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('browse-onboarding-seen', 'true')
  }

  const handleDismissTip = (tipId: string) => {
    const newDismissed = new Set(dismissedTips)
    newDismissed.add(tipId)
    setDismissedTips(newDismissed)
    localStorage.setItem('browse-onboarding-dismissed', JSON.stringify([...newDismissed]))

    // Move to next tip
    const remainingTips = onboardingTips.filter(tip => !newDismissed.has(tip.id))
    if (remainingTips.length > 0) {
      setCurrentTip(0) // Reset to first remaining tip
    } else {
      setIsVisible(false)
    }
  }

  const handleAction = (tip: OnboardingTip) => {
    // Handle specific actions
    switch (tip.id) {
      case 'search':
        // Focus search input
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        searchInput?.focus()
        break
      case 'discovery':
        // Scroll to discovery section
        const discoverySection = document.querySelector('[data-section="discovery"]')
        discoverySection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      case 'filters':
        // Focus on type filters
        const filterButton = document.querySelector('[aria-label*="filter"]')
        filterButton?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
    }
    handleDismissTip(tip.id)
  }

  const availableTips = onboardingTips.filter(tip => !dismissedTips.has(tip.id))
  const activeTip = availableTips[currentTip]

  if (!isVisible || !activeTip) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <Card className="p-4 bg-card/95 backdrop-blur-xl border-border/60 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
            {activeTip.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm text-foreground">
                {activeTip.title}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDismissTip(activeTip.id)}
                className="h-6 w-6 p-0 hover:bg-muted/50 flex-shrink-0"
                aria-label="Dismiss tip"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {activeTip.description}
            </p>

            <div className="flex items-center gap-2">
              {activeTip.action && (
                <Button
                  size="sm"
                  onClick={() => handleAction(activeTip)}
                  className="text-xs h-7 px-3"
                >
                  {activeTip.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-xs h-7 px-3 hover:bg-muted/50"
              >
                Skip all tips
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-1 mt-3">
              {availableTips.map((tip, index) => (
                <div
                  key={tip.id}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentTip ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
