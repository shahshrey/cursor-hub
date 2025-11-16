'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Search,
  Filter,
  RefreshCcw,
  Sparkles,
  Triangle,
  FlaskConical,
  Database,
  Wrench,
} from 'lucide-react'
import type { ResourceType } from '@/types/resources'

interface EmptyStateProps {
  searchQuery: string
  activeType: ResourceType | 'all'
  activeCategory: string
  onClearFilters: () => void
  onSuggestedSearch?: (query: string) => void
  onSuggestedCategory?: (category: string) => void
}

const SUGGESTED_SEARCHES = [
  'Next.js deployment',
  'React hooks',
  'TypeScript testing',
  'Database migrations',
  'API security',
]

const POPULAR_CATEGORIES = [
  { name: 'nextjs-vercel', icon: Triangle, label: 'Next.js' },
  { name: 'testing', icon: FlaskConical, label: 'Testing' },
  { name: 'database', icon: Database, label: 'Database' },
  { name: 'devtools', icon: Wrench, label: 'Dev Tools' },
]

export function EmptyState({
  searchQuery,
  activeType,
  activeCategory,
  onClearFilters,
  onSuggestedSearch,
  onSuggestedCategory,
}: EmptyStateProps) {
  const hasActiveFilters = searchQuery.trim().length >= 2 || activeType !== 'all' || activeCategory

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="text-7xl terminal-font opacity-30 mb-4">└─╼</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground/20" />
            </div>
          </div>

          <h3 className="text-3xl font-bold terminal-font">No resources found</h3>

          <p className="text-sm text-muted-foreground max-w-md mx-auto terminal-font leading-relaxed">
            {hasActiveFilters ? (
              <>
                We couldn't find any resources matching{' '}
                {searchQuery && (
                  <span className="text-foreground font-semibold">"{searchQuery}"</span>
                )}
                {activeType !== 'all' && (
                  <span className="text-foreground font-semibold"> in {activeType}s</span>
                )}
                {activeCategory && (
                  <span className="text-foreground font-semibold"> under {activeCategory}</span>
                )}
              </>
            ) : (
              'It looks like there are no resources available right now.'
            )}
          </p>
        </div>

        {hasActiveFilters && (
          <Card className="p-6 space-y-6 border-terminal-green/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold terminal-font">
                <Sparkles className="w-4 h-4 text-terminal-green" />
                <span>Try these suggestions:</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-font">
                    <Search className="w-3.5 h-3.5" />
                    <span>Popular searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_SEARCHES.map(suggestion => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        className="text-xs terminal-font"
                        onClick={() => onSuggestedSearch?.(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-font">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Browse by category</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CATEGORIES.map(category => {
                      const IconComponent = category.icon
                      return (
                        <Button
                          key={category.name}
                          variant="outline"
                          size="sm"
                          className="text-xs terminal-font"
                          onClick={() => onSuggestedCategory?.(category.name)}
                        >
                          <IconComponent className="w-3.5 h-3.5 mr-1.5" />
                          {category.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                onClick={onClearFilters}
                variant="outline"
                className="terminal-font w-full sm:w-auto"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground terminal-font">
            <span className="text-terminal-green">⎿</span> Tip: Use the search bar to find specific
            resources or browse by categories on the left
          </p>
        </div>
      </div>
    </div>
  )
}
