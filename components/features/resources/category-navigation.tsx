import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Terminal, FileText, FileCode, Zap } from 'lucide-react'

interface CategoryCard {
  type: string
  title: string
  description: string
  count: number
  icon: React.ReactNode
  color: string
  borderColor: string
}

interface CategoryNavigationProps {
  counts: {
    commands: number
    rules: number
    mcps: number
    hooks: number
  }
}

export function CategoryNavigation({ counts }: CategoryNavigationProps) {
  const categories: CategoryCard[] = [
    {
      type: 'command',
      title: 'Commands',
      description: 'Automated tasks and workflows for development',
      count: counts.commands,
      icon: <Zap className="w-8 h-8" />,
      color: 'text-yellow-500',
      borderColor: 'border-yellow-500/30 hover:border-yellow-500/60',
    },
    {
      type: 'rule',
      title: 'Rules',
      description: 'AI agent rules and coding guidelines',
      count: counts.rules,
      icon: <FileText className="w-8 h-8" />,
      color: 'text-primary-300',
      borderColor: 'border-primary-300/30 hover:border-primary-300/60',
    },
    {
      type: 'mcp',
      title: 'MCP Servers',
      description: 'Model Context Protocol integrations',
      count: counts.mcps,
      icon: <FileCode className="w-8 h-8" />,
      color: 'text-green-400',
      borderColor: 'border-green-400/30 hover:border-green-400/60',
    },
    {
      type: 'hook',
      title: 'Shell Hooks',
      description: 'Git hooks and automation scripts',
      count: counts.hooks,
      icon: <Terminal className="w-8 h-8" />,
      color: 'text-purple-400',
      borderColor: 'border-purple-400/30 hover:border-purple-400/60',
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.type} 
          href={`/browse?type=${category.type}`}
          className="group"
        >
          <Card className={`h-full transition-all duration-300 ${category.borderColor} hover:bg-card/80 hover:shadow-lg hover:-translate-y-1`}>
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-accent/50 ${category.color} group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <Badge variant="secondary" className="text-lg font-semibold px-3">
                    {category.count}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {category.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:gap-3 transition-all">
                  Browse {category.title}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

