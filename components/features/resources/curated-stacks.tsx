'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    id: 'nodejs',
    icon: '🟢',
    name: 'Node.js',
    description: 'Backend & API development',
    resourceCount: 10,
    category: 'development'
  },
  {
    id: 'python',
    icon: '🐍',
    name: 'Python',
    description: 'Data science & web development',
    resourceCount: 14,
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
  {
    id: 'testing',
    icon: '🧪',
    name: 'Testing',
    description: 'Testing frameworks & tools',
    resourceCount: 11,
    category: 'testing'
  },
  {
    id: 'deployment',
    icon: '🚀',
    name: 'Deployment',
    description: 'CI/CD & deployment automation',
    resourceCount: 7,
    category: 'deployment'
  }
]

export function CuratedStacks() {
  const handleStackClick = (category: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('category', category)
    window.location.href = url.toString()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-terminal-green terminal-font text-sm">$</span>
          <h3 className="text-xl font-bold text-foreground terminal-font">
            Popular Collections
          </h3>
        </div>
        <p className="text-sm text-muted-foreground pl-5">
          Curated resource collections for major frameworks and technologies
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {curatedStacks.map((stack) => (
          <button
            key={stack.id}
            onClick={() => handleStackClick(stack.category)}
            className="group bg-card/60 border border-border rounded-xl p-5 hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl font-bold">
                {stack.icon}
              </div>
              <span className="terminal-font text-xs text-terminal-green bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/30">
                ~{stack.resourceCount}
              </span>
            </div>

            <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {stack.name}
            </h4>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {stack.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
              <span className="terminal-font">Browse Collection</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

