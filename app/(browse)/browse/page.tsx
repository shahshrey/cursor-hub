import { Suspense } from 'react'
import { getResourceIndex } from '@/lib/resources'
import { ResourceBrowser } from '@/components/features/resources/resource-browser'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ResourceGridSkeleton } from '@/components/features/resources/resource-card-skeleton'

export default async function BrowsePage() {
  const index = getResourceIndex()

  return (
    <div className="min-h-screen">
      <div className="border-b bg-gradient-to-b from-card/50 to-transparent backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-5">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse All Resources</h1>
              <p className="text-muted-foreground text-base">
                Explore <Badge variant="outline" className="ml-1 font-semibold">{index.totalCount}</Badge> commands, rules, MCPs, and hooks
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-10">
        <Suspense fallback={<ResourceGridSkeleton />}>
          <ResourceBrowser 
            initialResources={index.resources} 
            categories={index.categories}
          />
        </Suspense>
      </section>
    </div>
  )
}

