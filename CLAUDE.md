# Next.js 15.3 + Clerk + Supabase + TypeScript Best Practices

> **Technical Documentation for Cursor Resources Hub**  
> This document outlines the development patterns and best practices used in building the Cursor Resources Hub - a platform for browsing, searching, and downloading Cursor commands, rules, MCP tools, and shell scripts.
>
> **Authentication:** Clerk handles all user authentication and session management  
> **Database:** Supabase is used exclusively for data persistence (resources, favorites, download counts)

## 🚀 Core Principles

### 1. Type Generation is Non-Negotiable

```bash
# After ANY schema change:
supabase gen types --local > types/supabase.ts

# Automate with git hooks:
# .husky/pre-commit
if git diff --cached --name-only | grep -q "supabase/migrations"; then
  npm run types:generate
  git add types/supabase.ts
fi
```

### 2. Server-First Architecture (Next.js 15.3)

```typescript
// ✅ Server Components by default
export default async function Page() {
  const data = await getServerData() // Direct DB calls
  return <ClientComponent initialData={data} />
}

// ✅ Use after() for non-blocking operations
import { after } from 'next/server'

export async function createPost(data: PostInput) {
  const post = await db.posts.create(data)
  
  after(async () => {
    // Non-blocking: analytics, cache warming, webhooks
    await trackEvent('post_created', { postId: post.id })
    await sendNotification(post.authorId)
  })
  
  return post
}
```

### 3. Authentication & Database Separation

**Authentication (Clerk):**
```typescript
// server/actions/myAction.ts
import { auth } from '@clerk/nextjs/server'

export async function myAction() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
}
```

**Database (Supabase - Data Only, No Auth):**
```typescript
// lib/supabase/client.ts - Browser only (for realtime download counts)
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// lib/supabase/server.ts - Server only (for data operations)
// NOTE: Using @supabase/supabase-js directly since we don't need Supabase Auth
// Authentication is handled entirely by Clerk
// RLS is disabled on user tables, authorization checked in Server Actions
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export const createClient = () => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  )
}
```

**Key Architecture Decisions:**
1. **Clerk handles ALL authentication** - No Supabase Auth used
2. **Supabase is data-only** - Just PostgreSQL storage
3. **RLS disabled on user tables** - Authorization via Clerk `auth()` in Server Actions
4. **No cookie management needed** - Supabase client doesn't need session handling
5. **Clerk user IDs stored as TEXT** - Format: `user_xxx` (not UUIDs)
### Supabase Migration-First Development

When working with Supabase databases, **ALWAYS** use migrations for ANY schema changes:
### Core Rules

1. **NEVER modify the database directly** - No manual CREATE TABLE, ALTER TABLE, etc.
    
2. **ALWAYS create a migration file** for schema changes:
    
    ```bash
    supabase migration new descriptive_name_here
    ```
    
3. **Migration naming convention**:
    
    - `create_[table]_table` - New tables
    - `add_[column]_to_[table]` - New columns
    - `update_[table]_[change]` - Modifications
    - `create_[name]_index` - Indexes
    - `add_[table]_rls` - RLS policies
4. **After EVERY migration**:
    ```bash
    supabase db reset                          # Apply locally
    supabase gen types --local > types/supabase.ts  # Update types
    ```
5. **Example workflow for adding a field**:
    ```bash
    # Wrong ❌
    ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0;
    
    # Right ✅
    supabase migration new add_views_to_posts
    # Then write SQL in the generated file
    # Then: supabase db reset && npm run db:types
    ```
6. **Include in EVERY migration**:
    
    - Add proper indexes
    - Consider adding triggers for updated_at
    - **RLS Policy Note**: When using Clerk auth, disable RLS on user tables and handle authorization in Server Actions
7. **Commit both**:
    
    - Migration file (`supabase/migrations/*.sql`)
    - Updated types (`types/supabase.ts`)

This ensures reproducible database states across all environments and team members.

## 📁 Project Structure (Next.js 15.3 + Clerk + Supabase)

```
├── app/                      # App Router
│   ├── (auth)/              # Clerk auth routes (signin/signup)
│   ├── (dashboard)/         # Protected routes (Clerk middleware)
│   ├── api/                 # API routes
│   └── globals.css          # Tailwind v4
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── features/            # Feature components
├── lib/
│   └── supabase/           # Supabase DB clients (data only)
├── server/                  # Server-only code
│   ├── queries/            # DB queries (Clerk auth + Supabase data)
│   └── actions/            # Server Actions (Clerk auth + Supabase data)
├── hooks/                   # Client hooks
├── test/                    # Test utilities
│   └── setup.ts            # Vitest setup
├── types/
│   └── supabase.ts         # Generated DB types
├── supabase/
│   ├── migrations/         # Database migrations
│   └── config.toml         # Supabase configuration
└── middleware.ts            # Clerk authentication middleware
```

## 🎯 Next.js 15.3 Patterns

### Server Actions with Revalidation

```typescript
// server/actions/posts.ts
'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { after } from 'next/server'

export async function createPost(formData: PostInput) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .insert(formData)
    .select()
    .single()

  if (error) throw error

  // Immediate revalidation
  revalidateTag('posts')
  revalidatePath('/dashboard')
  
  // Deferred operations
  after(async () => {
    await notifySubscribers(data.id)
  })

  return data
}
```

### Form Component with Prefetching

```typescript
// Using Next.js 15.3 stable Form component
import Form from 'next/form'

export function SearchForm() {
  return (
    <Form action="/search" prefetch={true}>
      <input name="q" placeholder="Search..." />
      <button type="submit">Search</button>
    </Form>
  )
}
```

### Connection API for Performance

```typescript
// Warm connections early for better performance
import { connection } from 'next/server'

export default async function Layout({ children }) {
  // Pre-warm database connection
  await connection()
  
  // Pre-connect to external services
  await fetch('https://api.service.com/warmup', { 
    method: 'HEAD' 
  })
  
  return <>{children}</>
}
```

## 🔐 Authentication Pattern (Clerk)

The application uses Clerk for authentication and user management:
- Sign up/Sign in pages at `/signup` and `/signin`
- Protected dashboard routes under `app/(dashboard)/`
- Clerk middleware for route protection
- Server actions use Clerk `auth()` for user context

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(['/', '/browse', '/signin(.*)', '/signup(.*)'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
  return NextResponse.next()
})

// app/(dashboard)/layout.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const { userId } = await auth()
  
  if (!userId) redirect('/signin')
  
  return <>{children}</>
}

// server/actions - Use Clerk auth + Supabase data in server actions
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function myAction() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  
  const supabase = createClient()
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
  
  return data
}
```

### Clerk + Supabase Integration Pattern

When using Clerk for authentication with Supabase as data storage:

1. **Database Schema**: Use `TEXT` columns for user IDs (not UUID)
   ```sql
   CREATE TABLE favorites (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id TEXT NOT NULL,  -- Clerk user ID (user_xxx format)
     -- other columns
   );
   ```

2. **Disable RLS**: Since Clerk manages auth, disable RLS and control access in Server Actions
   ```sql
   ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;
   ```

3. **Authorization in Server Actions**: Check Clerk auth before database operations
   ```typescript
   export async function toggleFavorite(slug: string) {
     const { userId } = await auth()
     if (!userId) return { error: 'Unauthorized' }
     
     const supabase = createClient()
     await supabase.from('favorites').insert({ user_id: userId, resource_slug: slug })
   }
   ```

4. **No Supabase Auth**: Supabase client configured to not handle sessions
   ```typescript
   createSupabaseClient(url, key, {
     auth: {
       persistSession: false,
       autoRefreshToken: false,
       detectSessionInUrl: false
     }
   })
   ```

## 🎨 UI Components (shadcn/ui + Tailwind v4)

### Tailwind v4 Configuration

```css
/* app/globals.css */
@import "tailwindcss";

/* Define design tokens in @theme */
@theme {
  --color-primary: oklch(24% 0.15 256);
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(10% 0 0);
  
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius: 0.5rem;
}

/* No more @tailwind directives or @layer needed */
```

### Component Setup

```bash
# Initialize shadcn/ui with Tailwind v4
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button form card toast
```

```typescript
// Feature component using shadcn/ui
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function PostCard({ post }: { post: Post }) {
  const { toast } = useToast()
  
  async function handleLike() {
    const result = await likePost(post.id)
    
    toast({
      title: result.success ? "Liked!" : "Error",
      variant: result.success ? "default" : "destructive",
    })
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
      <CardFooter>
        <Button onClick={handleLike}>Like</Button>
      </CardFooter>
    </Card>
  )
}
```

## 🔥 Real-time Subscriptions

```typescript
// hooks/use-realtime.ts
export function useRealtime<T extends keyof Database['public']['Tables']>(
  table: T,
  filter?: string
) {
  const [data, setData] = useState<Tables<T>[]>([])
  const supabase = createClient() // Client-side only

  useEffect(() => {
    const channel = supabase
      .channel(`realtime:${table}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table, filter },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData(prev => [payload.new as Tables<T>, ...prev])
          }
          // Handle UPDATE, DELETE
        }
      )
      .subscribe()

    return () => { channel.unsubscribe() }
  }, [table, filter])

  return data
}
```

## 🧪 Testing Infrastructure (Vitest)

### When to Test

- **Business logic** in utilities and hooks
- **Server Actions** with mocked Supabase client
- **Component behavior** not visual appearance
- **Error states** and edge cases

### Setup

```bash
npm i -D vitest @testing-library/react @testing-library/user-event @vitejs/plugin-react jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})

// test/setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: {}, error: null })),
        })),
      })),
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    },
  }),
}))
```

### Testing Patterns

```typescript
// components/features/posts/__tests__/post-card.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostCard } from '../post-card'

describe('PostCard', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'Test content',
    author: { name: 'John' },
  }

  it('renders post content', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('calls onLike when like button clicked', async () => {
    const onLike = vi.fn()
    const user = userEvent.setup()
    
    render(<PostCard post={mockPost} onLike={onLike} />)
    await user.click(screen.getByRole('button', { name: /like/i }))
    
    expect(onLike).toHaveBeenCalledWith(mockPost.id)
  })
})

// server/actions/__tests__/posts.test.ts
import { createPost } from '../posts'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server')

describe('createPost', () => {
  it('creates post and returns data', async () => {
    const mockSupabase = {
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({ 
              data: { id: '1', title: 'New Post' }, 
              error: null 
            })),
          })),
        })),
      })),
    }
    
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    
    const result = await createPost({ title: 'New Post', content: 'Content' })
    expect(result).toEqual({ id: '1', title: 'New Post' })
  })

  it('throws error on database failure', async () => {
    const mockSupabase = {
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({ 
              data: null, 
              error: new Error('Database error') 
            })),
          })),
        })),
      })),
    }
    
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    
    await expect(createPost({ title: 'Test', content: 'Test' }))
      .rejects.toThrow('Database error')
  })
})
```

## 📊 Database Patterns

### Type-Safe Queries

```typescript
// server/queries/posts.ts
import type { Database } from '@/types/supabase'

type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export async function getPosts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!inner(username, avatar_url)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
```

### Row Level Security

```sql
-- Always enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public read, authenticated write
CREATE POLICY "Public posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);
```

## 🚀 Performance Optimization

### Parallel Data Loading

```typescript
// Load data in parallel in Server Components
export default async function DashboardPage() {
  const [posts, profile, stats] = await Promise.all([
    getPosts(),
    getProfile(),
    getStats()
  ])
  
  return (
    <Dashboard 
      posts={posts} 
      profile={profile} 
      stats={stats} 
    />
  )
}
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
    </>
  )
}

async function PostsList() {
  const posts = await getPosts() // This can be slow
  return <>{posts.map(post => <PostCard key={post.id} post={post} />)}</>
}
```

## 🔧 Development Workflow

### Essential Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "db:types": "supabase gen types --local > types/supabase.ts",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"
  }
}
```

### Environment Variables

```typescript
// lib/env.ts - Validated env vars
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

## ⚡ Key Commands

```bash
# Development
npm run dev --turbo          # Fast refresh with Turbopack
supabase start              # Local Supabase

# Testing
npm run test                # Run tests in watch mode
npm run test:ui            # Open Vitest UI
npm run test:coverage      # Generate coverage report

# Database
supabase db reset           # Reset + migrate
supabase gen types --local > types/supabase.ts

# UI Components
npx shadcn@latest add       # Add components

# Production
npm run build              # Type-safe build
supabase db push          # Deploy migrations
```

## 🚨 Critical Rules

1. **Always regenerate types after schema changes**
2. **Use Server Components by default, Client Components when needed**
3. **Separate server and client Supabase instances**
4. **Use `after()` for non-blocking operations**
5. **Enable RLS on all tables**
6. **Compose UI with shadcn/ui components**
7. **Validate environment variables with Zod**
8. **Use Server Actions for mutations**
9. **Implement proper error boundaries**
10. **Stream data with Suspense for better UX**
11. **Test business logic, not implementation details**