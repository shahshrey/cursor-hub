import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MagicCard } from '@/components/ui/magic-card'

export function ResourceCardSkeleton() {
  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard gradientColor="#262626" className="p-0">
        <CardHeader className="border-b p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="border-t p-4 flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2 w-full">
            <Skeleton className="h-9 flex-1 rounded-md" />
            <Skeleton className="h-9 w-12 rounded-md" />
          </div>
        </CardFooter>
      </MagicCard>
    </Card>
  )
}

export function ResourceGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ResourceCardSkeleton key={i} />
      ))}
    </div>
  )
}

