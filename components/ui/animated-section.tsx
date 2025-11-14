'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import type { Variants } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
}

export function AnimatedSection({
  children,
  variants,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
