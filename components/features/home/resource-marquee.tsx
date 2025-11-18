'use client'

import { Marquee } from '@/components/ui/marquee'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FileText, Terminal, Code2, Wrench } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'

interface ResourceItem {
  name: string
  type: 'command' | 'rule' | 'hook' | 'mcp'
  category?: string
}

const SAMPLE_RESOURCES: ResourceItem[] = [
  { name: 'Systematic Code Review', type: 'command', category: 'code-review' },
  { name: 'Next.js Best Practices', type: 'rule', category: 'nextjs-vercel' },
  { name: 'Pre-commit Validator', type: 'hook', category: 'git' },
  { name: 'Firecrawl Search', type: 'mcp', category: 'web' },
  { name: 'Deploy to Vercel', type: 'command', category: 'deployment' },
  { name: 'TypeScript Standards', type: 'rule', category: 'languages' },
  { name: 'Test Runner Hook', type: 'hook', category: 'testing' },
  { name: 'Database Tools', type: 'mcp', category: 'database' },
  { name: 'Performance Audit', type: 'command', category: 'performance' },
  { name: 'Security Guidelines', type: 'rule', category: 'security' },
  { name: 'Git Workflow', type: 'hook', category: 'git-workflow' },
  { name: 'Brave Search', type: 'mcp', category: 'web' },
]

const getIcon = (type: ResourceItem['type']) => {
  switch (type) {
    case 'command':
      return Terminal
    case 'rule':
      return FileText
    case 'hook':
      return Code2
    case 'mcp':
      return Wrench
  }
}

const getColorClass = (type: ResourceItem['type']) => {
  switch (type) {
    case 'command':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    case 'rule':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    case 'hook':
      return 'bg-green-500/10 text-green-400 border-green-500/30'
    case 'mcp':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  }
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const Icon = getIcon(resource.type)
  const colorClass = getColorClass(resource.type)

  return (
    <Card className="border-none p-0 shadow-none">
      <MagicCard
        className="rounded-xl p-0"
        gradientSize={150}
        gradientColor="#262626"
        gradientOpacity={0.8}
        gradientFrom="#9E7AFF"
        gradientTo="#FE8BBB"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 backdrop-blur-sm min-w-fit">
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {resource.name}
            </span>
            {resource.category && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {resource.category}
              </span>
            )}
          </div>
          <Badge variant="outline" className="ml-2 text-xs capitalize">
            {resource.type}
          </Badge>
        </div>
      </MagicCard>
    </Card>
  )
}

export function ResourceMarquee() {
  const firstRow = SAMPLE_RESOURCES.slice(0, 6)
  const secondRow = SAMPLE_RESOURCES.slice(6, 12)

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgb(var(--color-bg-primary))] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[rgb(var(--color-bg-primary))] to-transparent z-10" />

      <div className="space-y-4">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((resource, idx) => (
            <ResourceCard key={idx} resource={resource} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:35s]">
          {secondRow.map((resource, idx) => (
            <ResourceCard key={idx} resource={resource} />
          ))}
        </Marquee>
      </div>
    </div>
  )
}
