import { Suspense } from 'react'
import { getResourceIndex } from '@/lib/resources'
import { TerminalResourceBrowser } from '@/components/features/resources/terminal-resource-browser'
import { Header } from '@/components/features/home/header'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ResourceGridSkeleton } from '@/components/features/resources/resource-card-skeleton'
import { CursorLogo } from '@/components/ui/cursor-logo'

export const revalidate = 86400

export default async function BrowsePage() {
  const index = getResourceIndex()

  const initialData = index.resources.slice(0, 24)

  return (
    <div className="min-h-screen">
      <Header />

      <section className="container mx-auto px-4 py-8">
        <Suspense fallback={<ResourceGridSkeleton />}>
          <TerminalResourceBrowser
            initialResources={initialData}
            totalCount={index.totalCount}
            categories={index.categories}
          />
        </Suspense>
      </section>
    </div>
  )
}
