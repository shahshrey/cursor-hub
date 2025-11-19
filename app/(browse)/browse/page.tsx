import { Suspense } from 'react'
import { getResourceIndex } from '@/lib/resources'
import { TerminalResourceBrowser } from '@/components/features/resources/terminal-resource-browser'
import { Header } from '@/components/features/home/header'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ResourceGridSkeleton } from '@/components/features/resources/resource-card-skeleton'
import { CursorLogo } from '@/components/ui/cursor-logo'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export const revalidate = 86400

/**
 * Render the Browse Resources page with header, navigation, and resource browser.
 *
 * Renders a top Header, a sticky navigation bar with a back link and branding (including total count),
 * a Breadcrumb labeled "Browse Resources", and a TerminalResourceBrowser initialized with the first
 * 24 resources from the resource index.
 *
 * @returns A React element for the Browse Resources page containing the header, sticky nav, breadcrumb,
 * and resource browser populated with initial resources, total count, and categories.
 */
export default async function BrowsePage() {
  const index = getResourceIndex()

  const initialData = index.resources.slice(0, 24)

  return (
    <div className="min-h-screen">
      <Header />

      <div className="border-b border-border backdrop-blur-xl bg-card/30 sticky top-16 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="flex items-center gap-3 min-w-0">
                <CursorLogo size={32} className="text-foreground shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-bold terminal-font truncate">
                      Cursor Hub
                    </h1>
                    <span className="terminal-font text-terminal-green text-xs bg-terminal-green/10 px-2 py-0.5 rounded border border-terminal-green/30 shrink-0">
                      {index.totalCount}+
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Browse Resources' }]} className="mb-6" />
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