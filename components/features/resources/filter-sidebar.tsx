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

  const CategoryFilters = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold terminal-font uppercase tracking-wide">Categories</h3>
        {activeCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange('')}
            className="h-7 text-xs terminal-font"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Badge
          variant={!activeCategory ? 'default' : 'outline'}
          className="cursor-pointer text-xs px-3 py-1.5 w-full justify-between transition-all hover:scale-105"
          onClick={() => onCategoryChange('')}
        >
          <span>All Categories</span>
          {filterCounts && (
            <span className="ml-auto text-xs opacity-70">
              ({getCategoryCount()})
            </span>
          )}
        </Badge>
        <div className="flex flex-col gap-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {categories.map((category) => {
            const count = getCategoryCount(category)
            const isDisabled = count === 0
            return (
              <Badge
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer text-xs px-3 py-1.5 w-full justify-between transition-all ${
                  isDisabled 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'hover:scale-105'
                }`}
                onClick={() => {
                  if (!isDisabled) {
                    onCategoryChange(category)
                    setIsMobileOpen(false)
                  }
                }}
                title={isDisabled ? 'No resources match this combination' : undefined}
              >
                <span className={isDisabled ? 'line-through' : ''}>{category}</span>
                {filterCounts && (
                  <span className="ml-auto text-xs opacity-70">
                    ({count})
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
          <Button variant="outline" size="sm" className="lg:hidden terminal-font">
            <Filter className="w-4 h-4 mr-2" />
            Categories
            {activeCategory && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                1
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="terminal-font">Filter by Category</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <CategoryFilters />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

