'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Fuse from 'fuse.js'
import type { ResourceMetadata, ResourceType } from '@/types/resources'
import { FlipResourceCard } from './flip-resource-card'
import { ChipFilters } from './chip-filters'
import { TerminalSearch } from './terminal-search'
import { CuratedStacks } from './curated-stacks'
import { StackBuilder } from './stack-builder'
import { StackBuilderButton } from './stack-builder-button'
import { ResourcePreviewModal } from './resource-preview-modal'
import { ResourceGridSkeleton } from './resource-card-skeleton'
import { debounce } from '@/lib/search'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

interface TerminalResourceBrowserProps {
  initialResources: ResourceMetadata[]
  categories: Record<ResourceType, string[]>
}

type SortOption = 'name' | 'downloads' | 'recent'

const sortLabels: Record<SortOption, string> = {
  name: 'Alphabetical',
  downloads: 'Most Downloaded',
  recent: 'Recently Added'
}

export function TerminalResourceBrowser({ initialResources, categories }: TerminalResourceBrowserProps) {
  const searchParams = useSearchParams()
  const urlType = searchParams?.get('type') as ResourceType | null
  const urlCategory = searchParams?.get('category') || ''
  
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<ResourceType | 'all'>(urlType || 'all')
  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [sortBy, setSortBy] = useState<SortOption>('downloads')
  const [isSearching, setIsSearching] = useState(false)
  const [stack, setStack] = useState<ResourceMetadata[]>([])
  const [isStackOpen, setIsStackOpen] = useState(false)
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(24)
  
  useEffect(() => {
    if (urlType) setActiveType(urlType)
    if (urlCategory) setActiveCategory(urlCategory)
  }, [urlType, urlCategory])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedQuery, activeType, activeCategory, sortBy])

  useEffect(() => {
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }, [currentPage])

  const debouncedSearch = useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const query = args[0] as string
        setDebouncedQuery(query)
        setIsSearching(false)
      }, 300),
    []
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    debouncedSearch(query)
  }

  const fuse = useMemo(
    () =>
      new Fuse(initialResources, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'description', weight: 0.3 },
          { name: 'searchContent', weight: 0.2 },
          { name: 'tags', weight: 0.1 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [initialResources]
  )

  const filteredResources = useMemo(() => {
    let results = initialResources

    if (activeType !== 'all') {
      results = results.filter((r) => r.type === activeType)
    }

    if (activeCategory) {
      results = results.filter((r) => r.category === activeCategory)
    }

    if (debouncedQuery.trim().length >= 2) {
      const searchResults = fuse.search(debouncedQuery)
      const filtered = searchResults.map((r) => r.item)
      results = filtered.filter((item) => {
        if (activeType !== 'all' && item.type !== activeType) return false
        if (activeCategory && item.category !== activeCategory) return false
        return true
      })
    }

    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'downloads':
          return 0
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return results
  }, [initialResources, activeType, activeCategory, debouncedQuery, sortBy, fuse])

  const availableCategories = useMemo(() => {
    if (activeType === 'all') {
      return [...new Set(initialResources.map((r) => r.category))].sort()
    }
    return categories[activeType] || []
  }, [activeType, categories, initialResources])

  const handleClearFilters = () => {
    setSearchQuery('')
    setDebouncedQuery('')
    setActiveType('all')
    setActiveCategory('')
    setSortBy('downloads')
  }

  const handlePreview = (resource: ResourceMetadata) => {
    setPreviewResource(resource)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setTimeout(() => setPreviewResource(null), 200)
  }

  const handleAddToStack = (resource: ResourceMetadata) => {
    if (!stack.find(r => r.slug === resource.slug)) {
      setStack([...stack, resource])
    }
  }

  const handleRemoveFromStack = (resourceSlug: string) => {
    setStack(stack.filter(r => r.slug !== resourceSlug))
  }

  const handleClearStack = () => {
    setStack([])
  }

  const cycleSortOption = () => {
    const options: SortOption[] = ['downloads', 'name', 'recent']
    const currentIndex = options.indexOf(sortBy)
    const nextIndex = (currentIndex + 1) % options.length
    setSortBy(options[nextIndex])
  }

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredResources.slice(startIndex, endIndex)
  }, [filteredResources, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)

  return (
    <>
      <div className="space-y-10">
        <TerminalSearch 
          value={searchQuery}
          onChange={handleSearchChange}
          resultsCount={filteredResources.length}
          totalCount={initialResources.length}
        />

        <ChipFilters
          activeType={activeType}
          onTypeChange={setActiveType}
          activeCategory={activeCategory}
          categories={availableCategories}
          onCategoryChange={setActiveCategory}
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground terminal-font">
              <span className="text-terminal-green">⎿</span> Displaying{' '}
              <span className="text-foreground font-bold">{filteredResources.length}</span> of{' '}
              <span className="text-foreground font-semibold">{initialResources.length}</span> resources
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={cycleSortOption}
            className="terminal-font"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortLabels[sortBy]}
          </Button>
        </div>

        {isSearching ? (
          <ResourceGridSkeleton count={8} />
        ) : filteredResources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedResources.map((resource) => {
                return (
                  <FlipResourceCard
                    key={resource.slug}
                    resource={resource}
                    onPreview={handlePreview}
                    onAddToStack={handleAddToStack}
                    isInStack={stack.some(r => r.slug === resource.slug)}
                  />
                )
              })}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="terminal-font"
                >
                  ← Previous
                </Button>
                
                <div className="flex items-center gap-2 terminal-font text-sm">
                  <span className="text-muted-foreground">Page</span>
                  <span className="text-terminal-green font-bold">{currentPage}</span>
                  <span className="text-muted-foreground">of</span>
                  <span className="text-foreground font-semibold">{totalPages}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="terminal-font"
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-8xl mb-6 terminal-font">404</div>
            <h3 className="text-2xl font-bold mb-3 terminal-font">No resources found</h3>
            <p className="text-base text-muted-foreground mb-6 max-w-md">
              Try adjusting your filters or search query to find what you're looking for
            </p>
            <Button onClick={handleClearFilters} variant="outline" className="terminal-font">
              Clear All Filters
            </Button>
          </div>
        )}

        <div className="pt-10 border-t border-border">
          <CuratedStacks />
        </div>
      </div>

      <StackBuilder
        isOpen={isStackOpen}
        onClose={() => setIsStackOpen(false)}
        stack={stack}
        onRemoveFromStack={handleRemoveFromStack}
        onClearStack={handleClearStack}
      />

      <StackBuilderButton
        count={stack.length}
        onClick={() => setIsStackOpen(true)}
      />

      <ResourcePreviewModal
        resource={previewResource}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </>
  )
}

