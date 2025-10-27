'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StackBuilderButtonProps {
  count: number
  onClick: () => void
  className?: string
}

export function StackBuilderButton({ count, onClick, className }: StackBuilderButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-8 right-8 z-30 rounded-full shadow-2xl h-16 w-16 p-0",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "transition-all hover:scale-110",
        count > 0 && "animate-pulse-glow",
        className
      )}
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-terminal-green text-black text-xs font-bold terminal-font rounded-full h-5 w-5 flex items-center justify-center border-2 border-background">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
    </Button>
  )
}

