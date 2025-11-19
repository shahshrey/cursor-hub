'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Filter } from 'lucide-react'
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

/**
 * Render a category filter sidebar with a desktop permanent panel and a mobile sheet.
 *
 * Renders category badges, counts (when provided), and controls to select or clear the active category.
 *
 * @param activeCategory - The currently selected category; use an empty string to indicate no selection.
 * @param categories - Array of category names to display as filter options.
 * @param onCategoryChange - Callback invoked when the user selects a category or clears the selection. Receives the selected category string ('' to clear).
 * @param filterCounts - Optional counts used to display totals. Expected shape includes `byType`, `byCategory`, and `byCategoryAndType`; missing values are treated as zero.
 * @param activeType - The currently active resource type or `'all'`; determines which counts from `filterCounts` are shown. Defaults to `'all'`.
 * @returns The sidebar UI and the mobile sheet containing the category filters as a React element.
 */
export function FilterSidebar({
  activeCategory,
  categories,
  onCategoryChange,
  filterCounts,
  activeType = 'all',
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const getCategoryCount = (category?: string): number => {
    if (!filterCounts) return 0

    if (!category) {
      return activeType === 'all' ? filterCounts.byType.all : filterCounts.byType[activeType]
    }

    if (activeType === 'all') {
      return filterCounts.byCategory[category] || 0
    }

    return filterCounts.byCategoryAndType[category]?.[activeType] || 0
  }

  const CategoryFilters = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-terminal-green" />
          <h3 className="text-sm font-bold terminal-font uppercase tracking-wide">Categories</h3>
        </div>
        {activeCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange('')}
            className="h-7 text-xs terminal-font hover:text-terminal-green"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Badge
          variant={!activeCategory ? 'default' : 'outline'}
          className="cursor-pointer text-xs px-4 py-2 w-full justify-between transition-all hover:scale-[1.02] hover:border-terminal-green/50 font-semibold"
          onClick={() => onCategoryChange('')}
        >
          <span>All Categories</span>
          {filterCounts && (
            <span className="ml-auto text-xs bg-background text-foreground px-2 py-0.5 rounded-full">
              {getCategoryCount()}
            </span>
          )}
        </Badge>
        <div className="flex flex-col gap-1.5 max-h-[calc(100vh-300px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {categories.map(category => {
            const count = getCategoryCount(category)
            const isDisabled = count === 0
            return (
              <Badge
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer text-xs px-4 py-2 w-full justify-between transition-all ${
                  isDisabled
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:scale-[1.02] hover:border-terminal-green/50'
                } ${activeCategory === category ? 'shadow-sm' : ''}`}
                onClick={() => {
                  if (!isDisabled) {
                    onCategoryChange(category)
                    setIsMobileOpen(false)
                  }
                }}
                title={isDisabled ? 'No resources match this combination' : undefined}
              >
                <span className={`${isDisabled ? 'line-through' : ''} truncate`}>{category}</span>
                {filterCounts && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      isDisabled ? 'opacity-50' : 'bg-background text-foreground'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-32 space-y-6">
          <CategoryFilters />
        </div>
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="lg:hidden terminal-font min-h-[44px] touch-manipulation w-full"
            aria-label={`Open categories filter${activeCategory ? ' (1 active)' : ''}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Categories
            {activeCategory && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                1
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[90vw] max-w-sm">
          <SheetHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-terminal-green" />
              <SheetTitle className="terminal-font text-lg">Filter by Category</SheetTitle>
            </div>
          </SheetHeader>
          <div className="mt-6 pb-6">
            <CategoryFilters />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}