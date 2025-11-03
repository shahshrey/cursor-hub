'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Fuse from 'fuse.js'
import type { ResourceMetadata, ResourceType } from '@/types/resources'
import { AnimatedResourceGrid } from './animated-resource-grid'
import { ResourceFilters } from './resource-filters'
import { ResourceGridSkeleton } from './resource-card-skeleton'
import { ResourcePreviewModal } from './resource-preview-modal'
import { debounce } from '@/lib/search'
import { Button } from '@/components/ui/button'

interface ResourceBrowserProps {
  initialResources: ResourceMetadata[]
  categories: Record<ResourceType, string[]>
}

type SortOption = 'name' | 'downloads' | 'recent'

export function ResourceBrowser({ initialResources, categories }: ResourceBrowserProps) {
  const searchParams = useSearchParams()
  const urlType = searchParams?.get('type') as ResourceType | null
  const urlCategory = searchParams?.get('category') || ''
  
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<ResourceType | 'all'>(urlType || 'all')
  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [isSearching, setIsSearching] = useState(false)
  
  // Update filters when URL params change
  useEffect(() => {
    if (urlType) {
      setActiveType(urlType)
    }
    if (urlCategory) {
      setActiveCategory(urlCategory)
    }
  }, [urlType, urlCategory])
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

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
          return (b.downloadCount ?? 0) - (a.downloadCount ?? 0)
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
    setSortBy('name')
  }

  const handlePreview = (resource: ResourceMetadata) => {
    setPreviewResource(resource)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setTimeout(() => setPreviewResource(null), 200)
  }

  return (
    <div className="space-y-10">
      <ResourceFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeCategory={activeCategory}
        categories={availableCategories}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            {isSearching ? (
              <p className="text-base text-muted-foreground">Searching...</p>
            ) : (
              <div className="space-y-1">
                <p className="text-base font-medium text-foreground">
                  Showing <span className="text-primary font-bold">{filteredResources.length}</span> of{' '}
                  <span className="font-semibold">{initialResources.length}</span> resources
                </p>
                {(searchQuery || activeType !== 'all' || activeCategory) && (
                  <p className="text-sm text-muted-foreground">
                    {searchQuery && `Searching for "${searchQuery}"`}
                    {activeType !== 'all' && ` • Type: ${activeType}`}
                    {activeCategory && ` • Category: ${activeCategory}`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {isSearching ? (
          <ResourceGridSkeleton count={8} />
        ) : filteredResources.length > 0 ? (
          <AnimatedResourceGrid 
            resources={filteredResources}
            onPreview={handlePreview}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 text-7xl">🔍</div>
            <h3 className="text-xl font-bold mb-3">No resources found</h3>
            <p className="text-base text-muted-foreground mb-6 max-w-md">
              Try adjusting your filters or search query to find what you&apos;re looking for
            </p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <ResourcePreviewModal
        resource={previewResource}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  )
}

