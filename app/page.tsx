import { auth } from '@clerk/nextjs/server'
import { Header } from '@/components/features/home/header'
import { HeroWithSearch } from '@/components/features/home/hero-with-search'
import { FeaturedResources } from '@/components/features/home/featured-resources'
import { ResourceTypeShowcase } from '@/components/features/home/resource-type-showcase'
import { CommunityStats } from '@/components/features/home/community-stats'
import { getHomePageData } from '@/server/queries/home'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Sparkles } from 'lucide-react'
import { CursorLogo } from '@/components/ui/cursor-logo'

export const revalidate = 3600

export default async function Home() {
  const { userId } = await auth()
  const data = await getHomePageData()

  return (
    <div className="min-h-screen">
      <Header />

      <HeroWithSearch totalResources={data.totalResources} userId={userId} />

      <FeaturedResources
        resources={data.popularResources}
        title="Popular Resources"
        subtitle="Most downloaded resources from the community"
        viewAllHref="/browse?sort=downloads"
      />

      <ResourceTypeShowcase typeCounts={data.typeCounts} categories={data.categories} />

      <FeaturedResources
        resources={data.recentResources}
        title="Recently Added"
        subtitle="Latest resources shared by the community"
        viewAllHref="/browse?sort=recent"
      />

      <CommunityStats
        totalResources={data.totalResources}
        categoryCount={data.categoryCount}
        typeCounts={data.typeCounts}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Join the Community</h2>
                  <p className="text-xl text-muted-foreground">
                    Share your resources and help fellow developers build better software.
                  </p>
                </div>
                <Link href={userId ? '/dashboard' : '/signup'}>
                  <RainbowButton size="lg" className="text-lg px-10 py-6 whitespace-nowrap group">
                    {userId ? 'Go to Dashboard' : 'Get Started Free'}
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </RainbowButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CursorLogo size={32} className="text-foreground" />
              <span className="text-muted-foreground">© 2025 Cursor Hub. Built with Cursor.</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://cursor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About Cursor
              </a>
              <Link
                href="/browse"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
