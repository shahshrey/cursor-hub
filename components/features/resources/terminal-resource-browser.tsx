'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ResourceMetadata, ResourceType, ResourceDownloadData } from '@/types/resources'
import { ResourceCard } from './resource-card'
import { HorizontalFilterBar } from './horizontal-filter-bar'
import { FilterSidebar } from './filter-sidebar'
import { CuratedStacks } from './curated-stacks'
import { ActiveFilters } from './active-filters'
import { ResourceGridSkeleton } from './resource-card-skeleton'
import { debounce } from '@/lib/search'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { calculateFilterCounts, type FilterCounts } from '@/lib/filter-counts'
import { useFilterPresets } from '@/hooks/use-filter-presets'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { SavePresetModal } from './save-preset-modal'
import { parseUrlFilters } from '@/lib/preset-url-encoding'
import { toast } from 'sonner'
import { BrowseOnboarding } from './browse-onboarding'
import { QuickFilters } from './quick-filters'
import { EmptyState } from './empty-state'
import { KeyboardShortcutsHelp } from './keyboard-shortcuts-help'
import type { FilterPreset } from '@/lib/preset-storage'

const ResourcePreviewModal = dynamic(
  () => import('./resource-preview-modal').then(m => m.ResourcePreviewModal),
  {
    ssr: false,
  }
)

interface TerminalResourceBrowserProps {
  initialResources: ResourceMetadata[]
  totalCount: number
  categories: Record<ResourceType, string[]>
}

type SortOption = 'name' | 'downloads' | 'recent'

const sortLabels: Record<SortOption, string> = {
  name: 'Alphabetical',
  downloads: 'Most Downloaded',
  recent: 'Recently Added',
}

export function TerminalResourceBrowser({
  initialResources,
  totalCount,
  categories,
}: TerminalResourceBrowserProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const urlType = searchParams?.get('type') as ResourceType | null
  const urlCategory = searchParams?.get('category') || ''
  const urlQuery = searchParams?.get('q') || ''
  const urlSort = (searchParams?.get('sort') as SortOption) || 'downloads'

  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery)
  const [activeType, setActiveType] = useState<ResourceType | 'all'>(urlType || 'all')
  const [activeCategory, setActiveCategory] = useState(urlCategory)
  const [sortBy, setSortBy] = useState<SortOption>(urlSort)
  const [isSearching, setIsSearching] = useState(false)
  const [previewResource, setPreviewResource] = useState<ResourceMetadata | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(24)
  const [searchResults, setSearchResults] = useState<ResourceMetadata[]>(initialResources)
  const [allResourcesForCounts, setAllResourcesForCounts] = useState<ResourceMetadata[] | null>(
    null
  )
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})
  const [isSavePresetOpen, setIsSavePresetOpen] = useState(false)

  useEffect(() => {
    // Initialize params from current searchParams to preserve other query params
    const params = new URLSearchParams(searchParams?.toString())

    if (searchQuery) params.set('q', searchQuery)
    else params.delete('q')

    if (activeType !== 'all') params.set('type', activeType)
    else params.delete('type')

    if (activeCategory) params.set('category', activeCategory)
    else params.delete('category')

    if (sortBy !== 'downloads') params.set('sort', sortBy)
    else params.delete('sort')

    const newSearch = params.toString()
    const newUrl = newSearch ? `${pathname}?${newSearch}` : pathname

    const currentSearch = searchParams?.toString() || ''
    const currentUrl = currentSearch ? `${pathname}?${currentSearch}` : pathname

    // Only replace if the URL has actually changed
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false })
    }

    const filterState = {
      searchQuery,
      activeType,
      activeCategory,
      sortBy,
      timestamp: Date.now(),
    }
    localStorage.setItem('browse-filters', JSON.stringify(filterState))
  }, [searchQuery, activeType, activeCategory, sortBy, pathname, router, searchParams])

  useEffect(() => {
    const hasActiveFilters =
      debouncedQuery.trim().length >= 2 || activeType !== 'all' || activeCategory

    if (hasActiveFilters) {
      setAllResourcesForCounts(null)
    } else if (!allResourcesForCounts) {
      const fetchAllForCounts = async () => {
        try {
          const params = new URLSearchParams()
          params.set('limit', '1000')

          const response = await fetch(`/api/resources/search?${params}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setAllResourcesForCounts(data.results || [])
        } catch (error) {
          console.error('Failed to fetch all resources for counts:', error)
        }
      }

      fetchAllForCounts()
    }
  }, [debouncedQuery, activeType, activeCategory, allResourcesForCounts])

  const filterCounts = useMemo(() => {
    const hasActiveFilters =
      debouncedQuery.trim().length >= 2 || activeType !== 'all' || activeCategory
    const resourcesForCounts = hasActiveFilters
      ? searchResults
      : allResourcesForCounts || initialResources
    return calculateFilterCounts(resourcesForCounts)
  }, [
    searchResults,
    allResourcesForCounts,
    debouncedQuery,
    activeType,
    activeCategory,
    initialResources,
  ])

  const { presets, createPreset, removePreset, modifyPreset, usePreset } = useFilterPresets()

  useKeyboardShortcuts([
    {
      key: '/',
      callback: () => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
        searchInput?.focus()
      },
    },
    {
      key: 'Escape',
      callback: () => {
        if (searchQuery || activeType !== 'all' || activeCategory) {
          handleClearFilters()
          toast.success('Filters cleared')
        }
      },
    },
    {
      key: 's',
      ctrl: true,
      callback: () => {
        if (searchQuery || activeType !== 'all' || activeCategory) {
          setIsSavePresetOpen(true)
        }
      },
    },
  ])

  useEffect(() => {
    if (urlType) setActiveType(urlType)
    if (urlCategory) setActiveCategory(urlCategory)

    if (searchParams) {
      const urlFilters = parseUrlFilters(searchParams)
      if (urlFilters) {
        if (urlFilters.type) setActiveType(urlFilters.type)
        if (urlFilters.category) setActiveCategory(urlFilters.category)
        if (urlFilters.searchQuery) {
          setSearchQuery(urlFilters.searchQuery)
          setDebouncedQuery(urlFilters.searchQuery)
        }
        if (urlFilters.sortBy) setSortBy(urlFilters.sortBy)
        toast.success('Filters loaded from shared link')
      }
    }
  }, [urlType, urlCategory, searchParams])

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
        data.forEach((item: ResourceDownloadData) => {
          counts[item.slug] = item.download_count || 0
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
        [slug]: (prev[slug] || 0) + 1,
      }))

      setTimeout(async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('resources')
          .select('download_count')
          .eq('slug', slug)
          .single()

        if (data && !error) {
          const resourceData = data as { download_count: number | null }
          setDownloadCounts(prev => ({
            ...prev,
            [slug]: resourceData.download_count || 0,
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
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
      return [...new Set(searchResults.map(r => r.category))].sort()
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

  const handleClearType = () => {
    setActiveType('all')
  }

  const handleClearCategory = () => {
    setActiveCategory('')
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
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

  const handleSavePreset = (name: string, isStarred: boolean) => {
    const preset = createPreset({
      name,
      type: activeType,
      category: activeCategory,
      searchQuery,
      sortBy,
      isStarred,
    })

    if (preset) {
      toast.success(`Preset "${name}" saved successfully`)
    } else {
      toast.error('Failed to save preset. Maximum 10 presets allowed.')
    }
  }

  const handleLoadPreset = (preset: FilterPreset) => {
    setActiveType(preset.type)
    setActiveCategory(preset.category)
    setSearchQuery(preset.searchQuery)
    setDebouncedQuery(preset.searchQuery)
    setSortBy(preset.sortBy)
    usePreset(preset.id)
    toast.success(`Preset "${preset.name}" applied`)
  }

  const handleDeletePreset = (presetId: string) => {
    const success = removePreset(presetId)
    if (success) {
      toast.success('Preset deleted')
    } else {
      toast.error('Failed to delete preset')
    }
  }

  const handleToggleStarPreset = (presetId: string, isStarred: boolean) => {
    modifyPreset(presetId, { isStarred })
  }

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredResources.slice(startIndex, endIndex)
  }, [filteredResources, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)

  return (
    <>
      <BrowseOnboarding />
      <KeyboardShortcutsHelp />

      <div className="space-y-6">
        {!searchQuery && activeType === 'all' && !activeCategory && (
          <div className="pb-4">
            <CuratedStacks />
          </div>
        )}

        <HorizontalFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          resultsCount={filteredResources.length}
          totalCount={totalCount}
          activeType={activeType}
          onTypeChange={setActiveType}
          activeCategory={activeCategory}
          categories={availableCategories}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortClick={cycleSortOption}
          filterCounts={filterCounts}
          presets={presets}
          onSavePreset={() => setIsSavePresetOpen(true)}
          onLoadPreset={handleLoadPreset}
          onDeletePreset={handleDeletePreset}
          onToggleStarPreset={handleToggleStarPreset}
        />

        {!searchQuery && activeType === 'all' && !activeCategory && (
          <QuickFilters
            onFilterClick={filter => {
              if (filter.category) {
                setActiveCategory(filter.category)
                toast.success(`Filtered by ${filter.label}`)
              }
              if (filter.type && filter.type !== 'all') {
                setActiveType(filter.type)
              }
            }}
            activeCategory={activeCategory}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            activeCategory={activeCategory}
            categories={availableCategories}
            onCategoryChange={setActiveCategory}
            filterCounts={filterCounts}
            activeType={activeType}
          />

          <div className="flex-1 min-w-0">
            <ActiveFilters
              activeType={activeType}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onClearType={handleClearType}
              onClearCategory={handleClearCategory}
              onClearSearch={handleClearSearch}
            />

            <div className="mt-4 mb-2">
              <p className="text-xs text-muted-foreground terminal-font">
                <span className="text-terminal-green">⎿</span> Showing{' '}
                <span className="text-foreground font-bold">{filteredResources.length}</span> of{' '}
                <span className="text-foreground font-semibold">{totalCount}</span> resources
                {activeType !== 'all' && filterCounts && (
                  <span className="ml-2">
                    ({filterCounts.byType[activeType]} {activeType}s
                    {activeCategory && ` in ${activeCategory}`})
                  </span>
                )}
              </p>
            </div>

            {isSearching ? (
              <ResourceGridSkeleton
                count={8}
                message={
                  debouncedQuery ? `Searching for "${debouncedQuery}"...` : 'Loading resources...'
                }
              />
            ) : filteredResources.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {paginatedResources.map(resource => (
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
              <EmptyState
                searchQuery={debouncedQuery}
                activeType={activeType}
                activeCategory={activeCategory}
                onClearFilters={handleClearFilters}
                onSuggestedSearch={query => {
                  setSearchQuery(query)
                  setDebouncedQuery(query)
                  toast.success(`Searching for "${query}"`)
                }}
                onSuggestedCategory={category => {
                  setActiveCategory(category)
                  handleClearFilters()
                  setActiveCategory(category)
                  toast.success(`Browsing ${category}`)
                }}
              />
            )}
          </div>
        </div>
      </div>

      <ResourcePreviewModal
        resource={previewResource}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />

      <SavePresetModal
        isOpen={isSavePresetOpen}
        onClose={() => setIsSavePresetOpen(false)}
        onSave={handleSavePreset}
        currentFilters={{
          type: activeType,
          category: activeCategory,
          searchQuery,
          sortBy,
        }}
      />
    </>
  )
}
