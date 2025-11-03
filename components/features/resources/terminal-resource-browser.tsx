'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ResourceMetadata, ResourceType } from '@/types/resources'
import { ResourceCard } from './resource-card'
import { ChipFilters } from './chip-filters'
import { TerminalSearch } from './terminal-search'
import { CuratedStacks } from './curated-stacks'
import { ResourceGridSkeleton } from './resource-card-skeleton'
import { debounce } from '@/lib/search'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const ResourcePreviewModal = dynamic(() => import('./resource-preview-modal').then(m => m.ResourcePreviewModal), {
  ssr: false,
})

interface TerminalResourceBrowserProps {
  initialResources: ResourceMetadata[]
  totalCount: number
  categories: Record<ResourceType, string[]>
}

type SortOption = 'name' | 'downloads' | 'recent'

const sortLabels: Record<SortOption, string> = {
  name: 'Alphabetical',
  downloads: 'Most Downloaded',
  recent: 'Recently Added'
}

export function TerminalResourceBrowser({ initialResources, totalCount, categories }: TerminalResourceBrowserProps) {
  const searchParams = useSearchParams()
  const urlType = searchParams?.get('type') as ResourceType | null
  const urlCategory = searchParams?.get('category') || ''
  
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<ResourceType | 'all'>(urlType || 'all')
  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [sortBy, setSortBy] = useState<SortOption>('downloads')
  const [isSearching, setIsSearching] = useState(false)
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(24)
  const [searchResults, setSearchResults] = useState<ResourceMetadata[]>(initialResources)
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})
  
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

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const supabase = createClient()
      const slugs = searchResults.map(r => r.slug)
      
      const { data, error } = await supabase
        .from('resources')
        .select('slug, download_count')
        .in('slug', slugs)
      
      if (data && !error) {
        const counts: Record<string, number> = {}
        data.forEach(item => {
          counts[item.slug] = item.download_count
        })
        setDownloadCounts(counts)
      }
    }

    if (searchResults.length > 0) {
      fetchDownloadCounts()
    }
  }, [searchResults])

  useEffect(() => {
    const handleDownloadEvent = async (event: Event) => {
      const customEvent = event as CustomEvent<{ slug: string }>
      const slug = customEvent.detail.slug
      
      setDownloadCounts(prev => ({
        ...prev,
        [slug]: (prev[slug] || 0) + 1
      }))
      
      setTimeout(async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('resources')
          .select('download_count')
          .eq('slug', slug)
          .single()
        
        if (data && !error) {
          setDownloadCounts(prev => ({
            ...prev,
            [slug]: data.download_count
          }))
        }
      }, 100)
    }

    window.addEventListener('resource-downloaded', handleDownloadEvent)
    return () => window.removeEventListener('resource-downloaded', handleDownloadEvent)
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2 && activeType === 'all' && !activeCategory) {
        setSearchResults(initialResources)
        return
      }

      setIsSearching(true)
      try {
        const params = new URLSearchParams()
        if (debouncedQuery) params.set('q', debouncedQuery)
        if (activeType !== 'all') params.set('type', activeType)
        if (activeCategory) params.set('category', activeCategory)
        params.set('limit', '500')

        const response = await fetch(`/api/resources/search?${params}`)
        const data = await response.json()
        setSearchResults(data.results || [])
      } catch (error) {
        console.error('Search failed:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    fetchResults()
  }, [debouncedQuery, activeType, activeCategory, initialResources])

  const debouncedSearch = useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const query = args[0] as string
        setDebouncedQuery(query)
      }, 300),
    []
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    debouncedSearch(query)
  }

  const filteredResources = useMemo(() => {
    let results = [...searchResults]

    results = results.sort((a, b) => {
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
  }, [searchResults, sortBy])

  const availableCategories = useMemo(() => {
    if (activeType === 'all') {
      return [...new Set(searchResults.map((r) => r.category))].sort()
    }
    return categories[activeType] || []
  }, [activeType, categories, searchResults])

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
              <span className="text-foreground font-semibold">{totalCount}</span> resources
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
              {paginatedResources.map((resource) => (
                <ResourceCard
                  key={resource.slug}
                  resource={resource}
                  downloadCount={downloadCounts[resource.slug] || 0}
                  onPreview={() => handlePreview(resource)}
                />
              ))}
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

      <ResourcePreviewModal
        resource={previewResource}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </>
  )
}

