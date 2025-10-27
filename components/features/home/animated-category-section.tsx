'use client'

import { motion } from 'framer-motion'
import { CategoryNavigation } from '@/components/features/resources/category-navigation'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface AnimatedCategorySectionProps {
  counts: {
    commands: number
    rules: number
    mcps: number
    hooks: number
  }
}

export function AnimatedCategorySection({ counts }: AnimatedCategorySectionProps) {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div 
        className="text-center mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-5"
          variants={staggerItem}
        >
          Explore by <span className="text-primary">Category</span>
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          variants={staggerItem}
        >
          Choose a category to discover the resources you need
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <CategoryNavigation counts={counts} />
      </motion.div>
    </section>
  )
}

