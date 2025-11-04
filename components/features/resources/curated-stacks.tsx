'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MagicCard } from '@/components/ui/magic-card'

interface CuratedStack {
  id: string
  icon: string
  name: string
  description: string
  resourceCount: number
  category: string
}

const curatedStacks: CuratedStack[] = [
  {
    id: 'nextjs',
    icon: '▲',
    name: 'Next.js',
    description: 'Full-stack React framework essentials',
    resourceCount: 12,
    category: 'nextjs-vercel'
  },
  {
    id: 'typescript',
    icon: 'TS',
    name: 'TypeScript',
    description: 'Type-safe development tools',
    resourceCount: 15,
    category: 'development'
  },
  {
    id: 'react',
    icon: '⚛️',
    name: 'React',
    description: 'Modern React development stack',
    resourceCount: 18,
    category: 'development'
  },
  {
    id: 'database',
    icon: '🗄️',
    name: 'Database',
    description: 'Database management & queries',
    resourceCount: 8,
    category: 'database'
  },
]

export function CuratedStacks() {
  const router = useRouter()
  
  const handleStackClick = (category: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('category', category)
    router.push(url.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground terminal-font">
          Popular Collections
        </h3>
        <p className="text-sm text-muted-foreground">
          Curated resource collections for major frameworks and technologies
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {curatedStacks.map((stack) => (
          <Card key={stack.id} className="border-none p-0 shadow-none">
            <MagicCard gradientColor="#262626" className="p-0">
              <button
                onClick={() => handleStackClick(stack.category)}
                className="bg-card/60 rounded-xl p-5 cursor-pointer text-left w-full h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl font-bold">
                    {stack.icon}
                  </div>
                  <span className="terminal-font text-xs text-terminal-green bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/30">
                    ~{stack.resourceCount}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-foreground mb-2">
                  {stack.name}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {stack.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-primary">
                  <span className="terminal-font">Browse Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </MagicCard>
          </Card>
        ))}
      </div>
    </div>
  )
}

