import { Suspense } from 'react'
import { getResourceIndex } from '@/lib/resources'
import { TerminalResourceBrowser } from '@/components/features/resources/terminal-resource-browser'
import { Header } from '@/components/features/home/header'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ResourceGridSkeleton } from '@/components/features/resources/resource-card-skeleton'
import Image from 'next/image'

export const revalidate = 86400

export default async function BrowsePage() {
  const index = getResourceIndex()

  const initialData = index.resources.slice(0, 24)

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="border-b border-border backdrop-blur-xl bg-card/30 sticky top-16 z-10">
        <div className="container mx-auto px-4 py-5">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/cursor-branding/icon-192x192.png"
                alt="Cursor"
                width={48}
                height={48}
                className="rounded-lg"
                priority
              />
            <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl md:text-4xl font-bold terminal-font">
                    Resources Hub
                  </h1>
                  <span className="terminal-font text-terminal-green text-sm bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/30">
                    {index.totalCount}+
                  </span>
                </div>
                <p className="text-muted-foreground text-sm terminal-font">
                  <span className="text-terminal-green">⎿</span> Browse, collect, and download Cursor resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-10">
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

