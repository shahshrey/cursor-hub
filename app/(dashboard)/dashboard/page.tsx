import { auth, currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignOutButton } from '@clerk/nextjs'
import { getFavorites } from '@/server/actions/favorites'
import { getResourceIndex } from '@/lib/resources'
import { FavoritesDashboard } from '@/components/features/resources/favorites-dashboard'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()
  
  const favorites = await getFavorites()
  const resourcesIndex = getResourceIndex()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline">Browse Resources</Button>
          </Link>
          <SignOutButton>
            <Button variant="outline">
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            You are signed in as {user?.emailAddresses[0]?.emailAddress}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            User ID: {userId}
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
        <FavoritesDashboard favorites={favorites} resourcesIndex={resourcesIndex.resources} />
      </div>
    </div>
  )
}