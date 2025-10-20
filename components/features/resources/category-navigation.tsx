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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.type} 
          href={`/browse?type=${category.type}`}
          className="group focus-visible:outline-none"
        >
          <Card className={`h-full transition-all duration-300 ${category.borderColor} hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-xl bg-accent/50 ${category.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {category.icon}
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                    {category.count}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-4 transition-all">
                  Browse {category.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

