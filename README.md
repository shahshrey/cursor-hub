# Cursor Resources Management Website

A comprehensive platform for browsing, searching, previewing, and downloading 450+ Cursor resources including commands, rules, MCP tools, and shell scripts. Built with Next.js 15.3, Supabase, TypeScript, and Tailwind CSS v4.

## 🚀 Features

### Core Functionality
- **Browse 459 Resources** - Commands, Rules, MCPs, and Hooks all in one place
- **Powerful Search** - Fuzzy search with Fuse.js across titles, descriptions, and content
- **Advanced Filtering** - Filter by type, category, and sort by name/downloads/recent
- **Preview Modal** - Syntax-highlighted previews with markdown rendering
- **One-Click Downloads** - Download any resource with automatic tracking
- **Favorites System** - Save favorites (requires authentication)
- **Popular Resources** - See most downloaded resources
- **Real-Time Stats** - Live resource counts and download analytics

### Technical Stack
- **Next.js 15.3** with App Router and Server Components
- **Supabase** for authentication and analytics database
- **TypeScript** with strict mode and generated types
- **Tailwind CSS v4** for modern styling
- **shadcn/ui** component library
- **Fuse.js** for client-side fuzzy search
- **Shiki** for syntax highlighting
- **React Markdown** for markdown rendering
- **Vitest** for testing

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd cursor-resources-hub
npm install
```

### 2. Index Cursor Resources

Generate the searchable index from all cursor-resources files:

```bash
npm run resources:index
```

This will create `public/data/resources-index.json` with metadata for all 459 resources.

### 3. Set Up Supabase

Start local Supabase development stack:

```bash
npm run db:start
```

This will output your local Supabase credentials. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-db-start
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse resources!

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth routes (signin, signup)
│   ├── (dashboard)/             # Protected dashboard with favorites
│   ├── api/resources/download/  # Download API routes
│   └── page.tsx                 # Main resource browser page
├── components/features/resources/
│   ├── resource-browser.tsx     # Main grid with search/filters
│   ├── resource-card.tsx        # Individual resource card
│   ├── resource-filters.tsx     # Search and filter controls
│   ├── resource-preview-modal.tsx  # Preview with syntax highlighting
│   ├── download-button.tsx      # Download with tracking
│   ├── favorite-button.tsx      # Favorite toggle
│   ├── favorites-dashboard.tsx  # User favorites view
│   ├── popular-resources.tsx    # Most downloaded section
│   └── code-block.tsx          # Syntax highlighting
├── lib/
│   ├── resources.ts            # Resource utilities
│   ├── search.ts               # Fuse.js search logic
│   ├── file-utils.ts           # File helpers
│   └── supabase/              # Supabase clients
├── server/
│   ├── actions/
│   │   ├── auth.ts            # Auth (signUp, signIn, signOut)
│   │   ├── favorites.ts       # Favorite operations
│   │   └── resources.ts       # Download tracking
│   └── queries/
│       └── resources.ts       # Resource content loading
├── scripts/
│   └── index-resources.ts     # Build-time indexer
├── cursor-resources/          # 459 resource files
│   ├── commands/              # 254 command files
│   ├── rules/                 # 111 rule files
│   ├── mcps/                  # 55 MCP configs
│   └── hooks/                 # 39 shell scripts
├── supabase/migrations/       # Database schema
├── types/
│   ├── resources.ts           # Resource types
│   └── supabase.ts            # Generated DB types
└── public/data/
    └── resources-index.json   # Generated index (gitignored)
```

## 🔧 Available Scripts

```bash
# Development
npm run dev                 # Start dev server with Turbopack
npm run build              # Index resources + build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Resources
npm run resources:index    # Generate searchable resource index

# Database
npm run db:start           # Start local Supabase
npm run db:stop            # Stop local Supabase
npm run db:reset           # Reset database to migrations
npm run db:types           # Generate TypeScript types from schema
npm run db:push            # Push migrations to remote

# Testing
npm run test               # Run tests in watch mode
npm run test:ui            # Open Vitest UI
npm run test:coverage      # Generate coverage report
```

## 📖 How It Works

### Build-Time Indexing

The `scripts/index-resources.ts` script scans all files in `cursor-resources/` and generates a searchable JSON index with:
- Extracted metadata (title, description, tags)
- File information (size, extension, path)
- Searchable content for Fuse.js
- Category groupings

### Client-Side Search

Fuse.js provides instant, fuzzy search without server requests:
- Searches across titles, descriptions, tags, and content
- Typo-tolerant matching (threshold: 0.4)
- 300ms debounced search
- Results update in real-time

### Database-Backed Analytics

Supabase stores only what needs persistence:
- Download counts per resource
- User favorites with RLS policies
- Popular resources queries

### Preview System

Resource preview modal features:
- Syntax highlighting with Shiki (VS Code theme)
- Markdown rendering with react-markdown
- Copy to clipboard functionality
- Direct download from modal

## 🔐 Authentication Features

- **Optional Authentication** - Browse and download without login
- **Favorites** - Sign in to save favorites across devices
- **Protected Dashboard** - View and manage all your favorites
- **Secure RLS** - Row Level Security ensures data privacy

## 🎨 UI Components

Built with shadcn/ui:
- Cards, Badges, Buttons
- Tabs for filtering
- Dialog for previews
- Skeleton loaders
- Toast notifications (Sonner)

## 🚨 Important Guidelines

1. **Run `npm run resources:index`** after adding/modifying files in `cursor-resources/`
2. **Always regenerate types** after database schema changes (`npm run db:types`)
3. **Use migrations** for all database changes (never modify schema directly)
4. **Test downloads** to ensure download tracking increments properly

## 📊 Database Schema

### Resources Table
Tracks download counts for analytics:
```sql
CREATE TABLE public.resources (
  slug TEXT PRIMARY KEY,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Favorites Table  
User-specific favorites with RLS:
```sql
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  resource_slug TEXT NOT NULL,
  resource_type TEXT CHECK (resource_type IN ('command', 'rule', 'mcp', 'hook')),
  UNIQUE(user_id, resource_slug)
);
```

## 🎯 Performance

- **Fast Initial Load** - Static HTML with pre-generated index
- **Instant Search** - Client-side Fuse.js (no network latency)
- **Optimized Bundle** - Code splitting and lazy loading
- **Efficient Database** - Minimal queries (only favorites and downloads)

## 📝 Environment Variables

Required:
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📄 License

MIT

---

**Built with** ❤️ **using Next.js 15.3, Supabase, and shadcn/ui**