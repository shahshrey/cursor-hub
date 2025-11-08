'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { FilterCounts } from '@/lib/filter-counts'
import type { ResourceType } from '@/types/resources'

interface FilterSidebarProps {
  activeCategory: string
  categories: string[]
  onCategoryChange: (category: string) => void
  filterCounts?: FilterCounts
  activeType?: ResourceType | 'all'
}

export function FilterSidebar({ activeCategory, categories, onCategoryChange, filterCounts, activeType = 'all' }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const getCategoryCount = (category?: string): number => {
    if (!filterCounts) return 0
    
    if (!category) {
      return activeType === 'all' 
        ? filterCounts.byType.all 
        : filterCounts.byType[activeType]
    }

    if (activeType === 'all') {
      return filterCounts.byCategory[category] || 0
    }

    return filterCounts.byCategoryAndType[category]?.[activeType] || 0
  }

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.localeCompare(b))
  }, [categories])

  const renderButtonClasses = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return 'flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-xs font-medium uppercase tracking-wide transition opacity-40 pointer-events-none'
    }

    if (isActive) {
      return 'flex w-full items-center justify-between rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
    }

    return 'flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-xs font-medium uppercase tracking-wide transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
  }

  const CategoryFilters = () => (
    <nav aria-label="Resource categories" className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold terminal-font uppercase tracking-wide">Categories</h3>
        {activeCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange('')}
            className="h-7 text-xs terminal-font"
            aria-label="Clear category filter"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-3" role="list">
        <button
          type="button"
          onClick={() => {
            onCategoryChange('')
            setIsMobileOpen(false)
          }}
          aria-pressed={!activeCategory}
          className={renderButtonClasses(!activeCategory, false)}
        >
          <span>All categories</span>
          {filterCounts && (
            <span className="text-[11px] font-medium text-muted-foreground">
              {getCategoryCount().toLocaleString()}
            </span>
          )}
        </button>
        <div className="flex flex-col gap-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-1" role="list">
          {sortedCategories.map((category) => {
            const count = getCategoryCount(category)
            const isDisabled = count === 0
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  if (!isDisabled) {
                    onCategoryChange(category)
                    setIsMobileOpen(false)
                  }
                }}
                aria-pressed={isActive}
                className={renderButtonClasses(isActive, isDisabled)}
                aria-disabled={isDisabled}
                title={isDisabled ? 'No resources match this combination' : undefined}
              >
                <span className={isDisabled ? 'line-through' : undefined}>{category}</span>
                {filterCounts && (
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {count.toLocaleString()}
                  </span>
                )}
              </button>
            )
          })}
          {sortedCategories.length === 0 && (
            <span className="text-xs text-muted-foreground terminal-font">No categories available</span>
          )}
        </div>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-32 space-y-6">
          <CategoryFilters />
        </div>
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="terminal-font lg:hidden">
            <Filter className="w-4 h-4 mr-2" />
            Categories
            {activeCategory && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="terminal-font">Filter by category</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <CategoryFilters />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

