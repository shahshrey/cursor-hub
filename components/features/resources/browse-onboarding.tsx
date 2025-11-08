'use client'

import { useState, useEffect } from 'react'
import { X, Search, Filter, Star, Keyboard, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string
  icon: React.ReactNode
  position: 'center' | 'top' | 'bottom'
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Resources Hub',
    description: 'A curated collection of commands, rules, MCPs, and hooks for Cursor. Let\'s show you around!',
    icon: <Hand className="w-8 h-8" />,
    position: 'center'
  },
  {
    id: 'search',
    title: 'Search Anything',
    description: 'Search across all resources instantly. Try "Next.js", "testing", or "database"',
    icon: <Search className="w-6 h-6" />,
    target: 'search-input',
    position: 'top'
  },
  {
    id: 'filters',
    title: 'Smart Filters',
    description: 'Filter by type (Commands, Rules, MCPs, Hooks) and categories. Counts update in real-time!',
    icon: <Filter className="w-6 h-6" />,
    target: 'filter-bar',
    position: 'top'
  },
  {
    id: 'presets',
    title: 'Save Your Presets',
    description: 'Found the perfect filter combo? Save it as a preset for quick access later!',
    icon: <Star className="w-6 h-6" />,
    target: 'preset-button',
    position: 'top'
  },
  {
    id: 'shortcuts',
    title: 'Pro Tips',
    description: 'Press "/" to focus search • Esc to clear • ↑↓ to navigate • Enter to preview',
    icon: <Keyboard className="w-6 h-6" />,
    position: 'center'
  }
]

const ONBOARDING_KEY = 'cursor-resources-onboarding-completed'

export function BrowseOnboarding() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const hasCompleted = localStorage.getItem(ONBOARDING_KEY)
    if (!hasCompleted) {
      setTimeout(() => {
        setIsOpen(true)
        setShouldShow(true)
      }, 800)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, 'skipped')
    setIsOpen(false)
    setTimeout(() => setShouldShow(false), 300)
  }

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'completed')
    setIsOpen(false)
    setTimeout(() => setShouldShow(false), 300)
  }

  if (!shouldShow) return null

  const step = ONBOARDING_STEPS[currentStep]
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          />
          
          <Card className={`relative z-10 max-w-md w-full mx-4 p-6 border-2 border-terminal-green/30 shadow-2xl ${
            step.position === 'center' ? 'animate-in fade-in zoom-in' : 'animate-in slide-in-from-top'
          }`}>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={handleSkip}
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-terminal-green/10 border border-terminal-green/30 flex items-center justify-center text-terminal-green">
                {step.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold terminal-font">{step.title}</h3>
                <p className="text-sm text-muted-foreground terminal-font">
                  {step.description}
                </p>
              </div>

              <div className="w-full space-y-4 pt-2">
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-terminal-green transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="terminal-font text-xs"
                  >
                    Skip Tour
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground terminal-font">
                      {currentStep + 1} of {ONBOARDING_STEPS.length}
                    </span>
                    <Button
                      onClick={handleNext}
                      className="terminal-font"
                    >
                      {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
