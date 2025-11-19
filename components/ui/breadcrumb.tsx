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
 * Render a breadcrumb navigation starting with a Home link followed by the provided items.
 *
 * The last item is marked as the current page (aria-current="page"); items with an `href` are rendered as links, while items without an `href` are rendered as plain text.
 *
 * @param items - Array of breadcrumb items to render after the Home link. Each item should include a `label` and may include an `href`.
 * @param className - Optional class names to apply to the outer nav container.
 * @returns The rendered breadcrumb React element.
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
          <div key={index} className="flex items-center gap-2">
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