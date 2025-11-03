'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Command, FileCode, Zap, Terminal, ArrowRight } from 'lucide-react'
import type { ResourceType } from '@/types/resources'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ResourceTypeShowcaseProps {
  typeCounts: Record<ResourceType, number>
  categories: Record<ResourceType, string[]>
}

const TYPE_CONFIG: Record<ResourceType, { icon: typeof Command; label: string; description: string; color: string }> = {
  command: {
    icon: Command,
    label: 'Commands',
    description: 'Powerful automation commands to streamline your workflow',
    color: 'text-blue-500',
  },
  rule: {
    icon: FileCode,
    label: 'Rules',
    description: 'Coding standards and best practices for consistent code quality',
    color: 'text-purple-500',
  },
  mcp: {
    icon: Zap,
    label: 'MCPs',
    description: 'Model Context Protocol integrations for enhanced AI capabilities',
    color: 'text-yellow-500',
  },
  hook: {
    icon: Terminal,
    label: 'Hooks',
    description: 'Git hooks and automation scripts for development workflows',
    color: 'text-green-500',
  },
}

export function ResourceTypeShowcase({ typeCounts, categories }: ResourceTypeShowcaseProps) {
  const types: ResourceType[] = ['command', 'rule', 'mcp', 'hook']

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore by <span className="text-primary">Resource Type</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover resources organized by type to find exactly what you need
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((type, index) => {
          const config = TYPE_CONFIG[type]
          const Icon = config.icon
          const count = typeCounts[type]
          const categoryCount = categories[type]?.length || 0

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-primary/10 ${config.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                  <CardTitle className="text-xl">{config.label}</CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">{categoryCount}</span> categories available
                    </div>
                    <Link href={`/browse?type=${type}`}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Browse {config.label}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

