import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, FileCode, FileText, Terminal, Zap, Search } from "lucide-react"
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
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-8">
            <Badge variant="outline" className="px-4 py-2 border-primary-300/30 bg-primary-300/10 text-primary-300">
              <Sparkles className="w-3 h-3 mr-2" />
              Cursor Resources Management
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
            <span className="text-white">Discover & Download</span>
            <br />
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary-200))] via-[rgb(var(--color-primary-300))] to-[rgb(var(--color-primary-400))] bg-clip-text text-transparent">
              Cursor Resources
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[rgb(var(--color-text-secondary))] max-w-3xl mx-auto mb-10 leading-relaxed">
            Browse, search, and download <span className="text-[rgb(var(--color-yellow-500))] font-semibold">{index.totalCount}+</span> Cursor commands, rules, MCP tools, and shell scripts.
            {user && <span className="block mt-2 text-primary-300">Save your favorites for quick access.</span>}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/browse">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                <Search className="w-5 h-5 mr-2" />
                Browse All Resources
              </Button>
            </Link>
            {user && (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="hover:scale-105 transition-all">
                  View My Favorites
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-primary-300/20 py-16 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-primary-300/30 hover:border-yellow-500/50 hover:bg-card/60 transition-all duration-300 group">
              <CardContent className="pt-6 text-center">
                <Zap className="w-10 h-10 mx-auto mb-3 text-[rgb(var(--color-yellow-500))] group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold mb-1 text-white">{index.resources.filter(r => r.type === 'command').length}</div>
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">Commands</div>
              </CardContent>
            </Card>
            <Card className="border-primary-300/30 hover:border-primary-300/50 hover:bg-card/60 transition-all duration-300 group">
              <CardContent className="pt-6 text-center">
                <FileText className="w-10 h-10 mx-auto mb-3 text-[rgb(var(--color-primary-300))] group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold mb-1 text-white">{index.resources.filter(r => r.type === 'rule').length}</div>
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">Rules</div>
              </CardContent>
            </Card>
            <Card className="border-primary-300/30 hover:border-green-400/50 hover:bg-card/60 transition-all duration-300 group">
              <CardContent className="pt-6 text-center">
                <FileCode className="w-10 h-10 mx-auto mb-3 text-green-400 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold mb-1 text-white">{index.resources.filter(r => r.type === 'mcp').length}</div>
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">MCPs</div>
              </CardContent>
            </Card>
            <Card className="border-primary-300/30 hover:border-purple-400/50 hover:bg-card/60 transition-all duration-300 group">
              <CardContent className="pt-6 text-center">
                <Terminal className="w-10 h-10 mx-auto mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold mb-1 text-white">{index.resources.filter(r => r.type === 'hook').length}</div>
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">Hooks</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Suspense fallback={<PopularResourcesSkeleton />}>
        <PopularResources limit={10} />
      </Suspense>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by <span className="text-primary-300">Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a category to discover the resources you need
          </p>
        </div>
        
        <CategoryNavigation 
          counts={{
            commands: index.resources.filter(r => r.type === 'command').length,
            rules: index.resources.filter(r => r.type === 'rule').length,
            mcps: index.resources.filter(r => r.type === 'mcp').length,
            hooks: index.resources.filter(r => r.type === 'hook').length,
          }}
        />
      </section>

      <section className="border-t py-16 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't find what you're looking for?
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
