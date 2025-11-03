'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Search } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { ResourceMarquee } from './resource-marquee'
import { CursorLogo } from '@/components/ui/cursor-logo'

interface HeroSectionProps {
  totalCount: number
  user: { id: string } | null
}

export function HeroSection({ totalCount, user }: HeroSectionProps) {
  return (
    <section className="border-b border-primary-300/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg-primary))]/50 via-transparent to-[rgb(var(--color-bg-primary))]/50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />
      
      <motion.div 
        className="container mx-auto px-4 py-24 md:py-32 text-center relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center gap-6 mb-10"
          variants={staggerItem}
        >
          <CursorLogo 
            size={96}
            className="text-foreground drop-shadow-2xl"
          />
          <Badge variant="outline" className="px-5 py-2.5 border-primary-300/30 bg-primary-300/10 text-primary-300 text-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Awesome Cursor Resources
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-10 leading-tight"
          variants={staggerItem}
        >
          <span className="text-white">Discover & Download</span>
          <br />
          <span className="text-white">
            Cursor Resources
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto mb-12 leading-relaxed"
          variants={staggerItem}
        >
          Browse, search, and download{' '}
          <motion.span 
            className="text-[rgb(var(--color-yellow-500))] font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {totalCount}+
          </motion.span>{' '}
          Cursor commands, rules, MCP tools, and shell scripts.
          {user && (
            <span className="block mt-3 text-primary-300 font-medium">
              ✨ Save your favorites for quick access
            </span>
          )}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          variants={staggerItem}
        >
          <Link href="/browse">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-base px-8 h-14 font-semibold group"
              >
                <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Browse All Resources
              </Button>
            </motion.div>
          </Link>
          {user && (
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 h-14 px-8 text-base font-semibold hover:bg-accent"
                >
                  View My Favorites
                </Button>
              </motion.div>
            </Link>
          )}
        </motion.div>

        <motion.div variants={staggerItem}>
          <ResourceMarquee />
        </motion.div>
      </motion.div>
    </section>
  )
}

