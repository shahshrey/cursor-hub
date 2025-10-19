'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { ResourceMetadata, ResourceIndex, ResourceType } from '@/types/resources'
import { ResourceCard } from './resource-card'
import { ResourceFilters } from './resource-filters'
import { ResourceGridSkeleton } from './resource-card-skeleton'
import { ResourcePreviewModal } from './resource-preview-modal'
import { debounce } from '@/lib/search'

interface ResourceBrowserProps {
  initialResources: ResourceMetadata[]
  categories: Record<ResourceType, string[]>
}

type SortOption = 'name' | 'downloads' | 'recent'

export function ResourceBrowser({ initialResources, categories }: ResourceBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<ResourceType | 'all'>('all')
  const [activeCategory, setActiveCategory] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [isSearching, setIsSearching] = useState(false)
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
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
    <div className="space-y-8">
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
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {isSearching ? (
              'Searching...'
            ) : (
              <>
                Showing <span className="font-semibold">{filteredResources.length}</span> of{' '}
                <span className="font-semibold">{initialResources.length}</span> resources
              </>
            )}
          </p>
        </div>

        {isSearching ? (
          <ResourceGridSkeleton count={8} />
        ) : filteredResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.slug}
                resource={resource}
                downloadCount={0}
                onPreview={() => handlePreview(resource)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
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

