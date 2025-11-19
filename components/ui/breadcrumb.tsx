'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Render a breadcrumb navigation bar starting with a Home link followed by the provided items.
 *
 * @param items - Array of breadcrumb entries; each entry must have a `label` and may include an `href`. The last item is rendered as the current page (`aria-current="page"`). Non-final items with `href` render as links; non-final items without `href` render as plain text.
 * @param className - Optional additional CSS class names applied to the root `<nav>` element.
 * @returns A `<nav>` element containing the breadcrumb trail. 
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)}>
      <Link
        href="/"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={item.href || item.label} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            {isLast ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-muted-foreground">{item.label}</span>
            )}
          </div>
        )
      })}
    </nav>
  )
}