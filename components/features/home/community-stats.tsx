'use client'

import { motion } from 'framer-motion'
import { Database, Folder, Layers, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CommunityStatsProps {
  totalResources: number
  categoryCount: number
  typeCounts: Record<string, number>
}

export function CommunityStats({ totalResources, categoryCount, typeCounts }: CommunityStatsProps) {
  const stats = [
    {
      icon: Database,
      label: 'Total Resources',
      value: totalResources.toLocaleString(),
      description: 'Curated by the community',
    },
    {
      icon: Folder,
      label: 'Categories',
      value: categoryCount.toString(),
      description: 'Organized topics',
    },
    {
      icon: Layers,
      label: 'Resource Types',
      value: '4',
      description: 'Commands, Rules, MCPs, Hooks',
    },
    {
      icon: TrendingUp,
      label: 'Growing',
      value: '509+',
      description: 'And counting',
    },
  ]

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
          Community <span className="text-primary">Powered</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Real resources shared by developers, for developers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

