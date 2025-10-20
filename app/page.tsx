import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, Search } from "lucide-react"
import { getResourceIndex } from '@/lib/resources'
import { PopularResources } from '@/components/features/resources/popular-resources'
import { CategoryNavigation } from '@/components/features/resources/category-navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const index = getResourceIndex()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="border-b border-primary-300/20 bg-gradient-to-b from-[rgb(var(--color-bg-primary))] via-[rgb(var(--color-bg-secondary))] to-[rgb(var(--color-bg-primary))]">
        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
          <div className="flex justify-center mb-10">
            <Badge variant="outline" className="px-5 py-2.5 border-primary-300/30 bg-primary-300/10 text-primary-300 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Cursor Resources Management
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-10 leading-tight">
            <span className="text-white">Discover & Download</span>
            <br />
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary-200))] via-[rgb(var(--color-primary-300))] to-[rgb(var(--color-primary-400))] bg-clip-text text-transparent inline-block animate-in fade-in duration-700">
              Cursor Resources
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto mb-12 leading-relaxed">
            Browse, search, and download <span className="text-[rgb(var(--color-yellow-500))] font-bold">{index.totalCount}+</span> Cursor commands, rules, MCP tools, and hooks.
            {user && <span className="block mt-3 text-primary-300 font-medium">✨ Save your favorites for quick access</span>}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/browse">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20 text-base px-8 h-14 font-semibold">
                <Search className="w-5 h-5 mr-2" />
                Browse All Resources
              </Button>
            </Link>
            {user && (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="hover:scale-105 transition-all border-2 h-14 px-8 text-base font-semibold hover:bg-accent">
                  View My Favorites
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>


      <Suspense fallback={<PopularResourcesSkeleton />}>
        <PopularResources limit={10} />
      </Suspense>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Explore by <span className="text-primary">Category</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a category to discover the resources you need
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <CategoryNavigation 
            counts={{
              commands: index.resources.filter(r => r.type === 'command').length,
              rules: index.resources.filter(r => r.type === 'rule').length,
              mcps: index.resources.filter(r => r.type === 'mcp').length,
              hooks: index.resources.filter(r => r.type === 'hook').length,
            }}
          />
        </div>
      </section>

      <section className="border-t py-16 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use our powerful search and filtering tools to find exactly what you need
          </p>
          <Link href="/browse">
            <Button size="lg" variant="outline" className="group">
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Search All Resources
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function PopularResourcesSkeleton() {
  return (
    <section className="border-y py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-4 space-y-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
