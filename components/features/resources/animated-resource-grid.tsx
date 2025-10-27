'use client'

import { useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
import type { ResourceMetadata } from '@/types/resources'
import { ResourceCard } from './resource-card'
import { createClient } from '@/lib/supabase/client'

interface AnimatedResourceGridProps {
  resources: ResourceMetadata[]
  onPreview: (resource: ResourceMetadata) => void
}

export function AnimatedResourceGrid({ resources, onPreview }: AnimatedResourceGridProps) {
  const parent = useRef(null)
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration: 300,
        easing: 'ease-out'
      })
    }
  }, [])

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const supabase = createClient()
      const slugs = resources.map(r => r.slug)
      
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

    if (resources.length > 0) {
      fetchDownloadCounts()
    }
  }, [resources])

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

  return (
    <div 
      ref={parent}
      className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {resources.map((resource) => (
        <ResourceCard
          key={resource.slug}
          resource={resource}
          downloadCount={downloadCounts[resource.slug] || 0}
          onPreview={() => onPreview(resource)}
        />
      ))}
    </div>
  )
}

