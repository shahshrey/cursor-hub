CURSOR HUB - PRODUCT REQUIREMENTS DOCUMENT
==========================================

## tl;dr

Cursor Hub is a comprehensive resource management platform that solves the discoverability problem for Cursor IDE resources by providing a centralized repository with 525+ commands, rules, MCP tools, and shell scripts. Users can instantly search, filter, preview, and download community-contributed resources with syntax highlighting, favorites management, and real-time analytics. The platform targets Cursor IDE developers, DevOps engineers, and AI-assisted coding practitioners who need quick access to productivity-enhancing tools and configurations.

## Goals

### Business Goals

1. **Establish Market Leadership** - Become the primary resource hub for Cursor IDE users, achieving 10,000+ monthly active users within 6 months
2. **Drive User Engagement** - Achieve 40% user retention rate with authenticated users favoriting an average of 8+ resources
3. **Build Community Network Effects** - Grow resource contributions from community, reaching 600+ resources within first year
4. **Generate Platform Insights** - Collect analytics on 100,000+ downloads to identify trending patterns and high-value resource categories
5. **Enable Monetization Pathways** - Build foundation for premium features (advanced filtering, private collections, team sharing) with 15% conversion-ready user base

### User Goals

1. **Instant Resource Discovery** - Find relevant Cursor resources in under 30 seconds through powerful search and intelligent filtering across 459+ items
2. **Risk-Free Evaluation** - Preview resource content with syntax highlighting before downloading to ensure compatibility and quality
3. **Efficient Workflow Integration** - Download and integrate resources with one click, saving 20+ minutes per resource adoption cycle
4. **Personalized Organization** - Create custom collections through favorites and filter presets to organize frequently-used resources
5. **Stay Current** - Access the latest community contributions and track popular resources through real-time download metrics

### Non-Goals

1. **Resource Editing/Creation** - Not building an IDE or code editor; users cannot modify resources within the platform (external contribution workflow only)
2. **Version Control Integration** - Not integrating with Git or version control systems for resource management
3. **Multi-Language Translation** - English-only interface and resource descriptions in initial versions

## User Stories

### Cursor Developer (Primary Persona)
- As a Cursor developer, I want to search for "deployment automation" commands, so that I can find relevant DevOps workflows without manually browsing hundreds of files
- As a Cursor developer, I want to preview a rule file with syntax highlighting, so that I can verify it matches my coding standards before downloading
- As a Cursor developer, I want to download a resource with one click, so that I can quickly integrate it into my Cursor project without copy-paste errors
- As a Cursor developer, I want to save my favorite resources, so that I can quickly access them across different projects and machines
- As a Cursor developer, I want to see which resources are most downloaded, so that I can identify community-vetted, high-quality tools

### DevOps Engineer (Secondary Persona)
- As a DevOps engineer, I want to filter resources by "deployment" and "CI/CD" categories, so that I can find automation scripts specific to my infrastructure needs
- As a DevOps engineer, I want to save filter presets for "Kubernetes commands" and "Docker automation", so that I can instantly switch between my common search contexts
- As a DevOps engineer, I want to share a filtered view URL with my team, so that they can access the same curated resource list for our project

### AI-Assisted Developer (Emerging Persona)
- As an AI-assisted developer, I want to browse MCP (Model Context Protocol) tools, so that I can enhance my AI coding workflows with specialized context providers
- As an AI-assisted developer, I want to see real-time download counts and recent additions, so that I can stay updated on the latest AI productivity tools
- As an AI-assisted developer, I want keyboard shortcuts for navigation, so that I can rapidly browse resources without leaving my keyboard-centric workflow

### New Cursor User (Onboarding Persona)
- As a new Cursor user, I want to see curated resource stacks for common use cases, so that I can quickly get started without learning the entire ecosystem
- As a new Cursor user, I want quick filters for popular categories, so that I can explore without understanding advanced filtering options

## Functional Requirements

### Resource Discovery & Browsing (Priority: Critical)

- **Advanced Search Engine**: Fuzzy search powered by Fuse.js across titles, descriptions, content, and tags with 0.4 threshold tolerance and 300ms debounce
  - Weighted scoring: Title (40%), Description (30%), Content (20%), Tags (10%)
  - Minimum 2 character search length
  - Real-time results update with loading states
  - Search query persistence in URL parameters

- **Multi-Level Filtering System**: Type-based and category-based filtering with dynamic counts
  - 4 resource types: Commands (254), Rules (111), MCPs (55), Hooks (39)
  - Category filters per type (20+ unique categories)
  - Filter count badges showing available items per category
  - Active filter chips with individual removal
  - "Clear all filters" bulk action

- **Sorting Options**: Three sorting modes with one-click cycling
  - Alphabetical (A-Z by title)
  - Most Downloaded (descending download count)
  - Recently Added (newest first by creation date)
  - Sort state preserved in URL

- **Pagination System**: 24 resources per page with navigation controls
  - Previous/Next buttons with disabled states
  - Current page indicator with total pages
  - Scroll-to-top on page change (smooth scroll to y=300)

- **Filter Presets**: Save and restore filter configurations
  - Create custom presets with name and star status
  - Maximum 10 presets per user (localStorage-based)
  - Preset dropdown with usage count tracking
  - Star/unstar presets for prioritization
  - Delete preset functionality
  - Keyboard shortcut (Ctrl+S) to save current filters

- **URL-Encoded Filter Sharing**: Shareable links with complete filter state
  - Encodes type, category, search query, sort order
  - Automatic filter restoration from URL parameters
  - Toast notification on filter load

### Resource Interaction (Priority: Critical)

- **Resource Cards**: Information-dense cards with metadata
  - Title, description excerpt (truncated to 150 characters)
  - Resource type badge with color coding
  - Category label
  - File size and extension indicator
  - Real-time download count with icon
  - Action buttons: Preview, Download, Favorite (if authenticated)

- **Preview Modal**: Full-content preview before download
  - Syntax highlighting using Shiki (VS Code theme)
  - Markdown rendering with GitHub-flavored markdown
  - Line numbers for code blocks
  - Copy-to-clipboard button
  - Direct download from preview
  - Modal keyboard shortcuts (ESC to close)
  - Lazy-loaded for performance (dynamic import)

- **Download System**: One-click download with analytics tracking
  - Client-side file saving using FileSaver.js
  - Original filename preservation
  - Non-blocking download count increment using after()
  - Custom browser event (resource-downloaded) for real-time UI updates
  - Rate limiting: 60 downloads per 15-minute window per IP
  - Preview mode bypass for content inspection (X-Preview-Mode header)

- **Download Analytics**: Real-time tracking and display
  - Database increment on every download
  - Supabase function: increment_download_count() with conflict handling
  - Local state updates via custom events
  - Deferred database sync (100ms delay) after optimistic update
  - Public read access via RLS policies

### User Management & Personalization (Priority: High)

- **Authentication via Clerk**: Optional authentication with social login
  - Email/password signup and signin
  - OAuth providers support (Google, GitHub, etc.)
  - SSO callback handling
  - Protected route middleware for dashboard
  - User session management with cookies

- **Favorites System**: Authenticated users can save resources
  - Toggle favorite button on resource cards
  - Unique constraint: one favorite per resource per user
  - Supabase storage with RLS policies (user_id = auth.uid())
  - Dashboard view of all favorited resources
  - Sort favorites by date added (newest first)
  - Filter favorites by type
  - Real-time favorite status updates via server actions
  - Path revalidation after favorite toggle

- **User Dashboard**: Personalized control panel
  - Welcome card with user email display
  - Favorites grid with same card layout as browse page
  - Sign-out functionality
  - Navigation to browse resources
  - Real-time favorite count

### Enhanced UX Features (Priority: Medium)

- **Keyboard Shortcuts**: Power-user navigation
  - `/` - Focus search input
  - `ESC` - Clear all active filters
  - `Ctrl+S` - Save current filter preset
  - Keyboard shortcuts help modal (accessible via ? key)

- **Quick Filters**: One-click preset categories
  - Pre-configured filters for popular use cases
  - Visual filter chips below search bar
  - Shown only when no active filters exist
  - Toast confirmation on filter application

- **Curated Stacks**: Bundled resource collections
  - Thematic collections (e.g., "DevOps Essentials", "AI Workflow Tools")
  - Displayed on landing page and browse page (when unfiltered)
  - Stack cards with resource count and description
  - Click to apply stack filters automatically

- **Onboarding Experience**: First-time user guidance
  - Browse page tour highlighting key features
  - LocalStorage flag to show once per browser
  - Dismissible onboarding overlay
  - Feature callouts for search, filters, presets

- **Empty States**: Helpful guidance when no results
  - Contextual messages based on active filters
  - Suggested searches based on filter context
  - Suggested categories to explore
  - "Clear filters" quick action
  - Friendly illustration and copy

- **Loading States**: Performance perception optimization
  - Skeleton loaders for resource cards (8-card grid)
  - Loading message with search query context
  - Spinner indicators for async operations
  - Optimistic UI updates for favorites and downloads

### Landing Page (Priority: High)

- **Hero Section**: Value proposition and instant search
  - Animated gradient background with particles
  - Large search bar with autocomplete suggestions
  - Total resource count badge
  - CTA buttons: "Browse Resources", "Sign Up"
  - Auto-focus search on page load

- **Featured Resources Section**: Showcase popular/recent items
  - Two sections: "Popular Resources" and "Recently Added"
  - 6-8 resource cards per section
  - "View All" link to filtered browse page
  - Horizontal scroll on mobile

- **Resource Type Showcase**: Category overview
  - Visual cards for each resource type (Command, Rule, MCP, Hook)
  - Type-specific count badges
  - Category list per type
  - Click to filter browse page by type

- **Community Stats**: Social proof and engagement metrics
  - Total resources count with animated counter
  - Category diversity count
  - Type distribution breakdown
  - Visual chart/graph representation

- **Join CTA**: Conversion-focused call-to-action
  - Gradient card with benefit copy
  - "Get Started Free" button (authenticated: "Go to Dashboard")
  - Social proof elements

### Technical Infrastructure (Priority: Critical)

- **Resource Indexing**: Build-time static generation
  - Script: scripts/index-resources.ts
  - Scans cursor-resources/ directory recursively
  - Extracts frontmatter metadata (gray-matter)
  - Generates searchable content excerpts (first 500 chars)
  - Outputs to public/data/resources-index.json
  - Runs on npm run build (pre-build step)
  - In-memory caching for runtime access

- **API Endpoints**: RESTful resource operations
  - GET /api/resources/search - Fuzzy search with query params (q, type, category, limit)
  - GET /api/resources/download/[slug] - Download resource with tracking
  - GET /api/resources/summary - Aggregate stats (total, by type, by category)
  - Rate limiting on all endpoints (60 req/15min for download, 120 req/15min for search)
  - Error handling with structured responses (NotFoundError, ValidationError)
  - Input validation: slug length (max 200), special character sanitization

- **Database Schema**: Supabase PostgreSQL
  - Table: resources (slug PK, download_count, created_at, updated_at)
  - Table: favorites (id UUID PK, user_id TEXT FK Clerk, resource_slug, resource_type, created_at)
  - Indexes: download_count DESC, user_id, resource_slug
  - RLS policies: public read for resources, user-scoped CRUD for favorites
  - Triggers: auto-update updated_at on resources
  - Functions: increment_download_count(), get_popular_resources()

- **Type Safety**: Full TypeScript coverage
  - Generated Supabase types (types/supabase.ts)
  - Resource metadata types (types/resources.ts)
  - Strict mode enabled
  - Server action return types
  - Zod validation for environment variables

- **Performance Optimizations**: Sub-second load times
  - Static generation for landing page (revalidate: 3600)
  - Incremental Static Regeneration for browse page (revalidate: 86400)
  - React Server Components for zero-JS initial load
  - Dynamic imports for heavy components (preview modal)
  - Client-side caching of search index
  - Debounced search (300ms)
  - Virtual scrolling candidate (not yet implemented)
  - Image optimization with Next.js Image component

## User Experience

### Entry Point & First-Time User Experience

**Landing Page Discovery**: Users discover Cursor Hub through community forums, social media, or search engines. The landing page immediately communicates value with:
- Large hero headline: "Discover 459+ Cursor Resources"
- Animated particle background creating modern, tech-forward aesthetic
- Prominent search bar inviting immediate exploration
- Social proof via resource counts and category diversity stats

**Onboarding Flow**: First-time visitors can explore without authentication:
1. Land on homepage with hero search
2. Browse featured "Popular Resources" and "Recently Added" carousels
3. Click "Browse Resources" to enter main application
4. See onboarding overlay explaining search, filters, and keyboard shortcuts (shown once)
5. Explore resources freely with preview and download capabilities
6. Encounter "Sign in to favorite" prompt when attempting to save favorites
7. Optional: Sign up via Clerk modal (email or OAuth)

### Core Experience

**Step 1: Resource Discovery**
- UI Elements: Enhanced search input (shadcn/ui Input component), filter sidebar (Tabs from Radix UI), horizontal filter bar (custom component with Badge chips)
- User enters search query or selects type/category filter
- Data Validation: Minimum 2 characters for search, debounced to prevent excessive queries
- Navigation: Search results update in real-time with smooth fade-in animation (Framer Motion)
- Feedback: Loading skeleton shows 8 placeholder cards during fetch
- State: Search query and filters sync to URL for shareable links

**Step 2: Resource Evaluation**
- UI Elements: Resource card grid (3-column on desktop, responsive), preview modal (Radix Dialog)
- User clicks "Preview" button on resource card
- Modal opens with full resource content
- Data Validation: File path sanitization to prevent directory traversal
- Navigation: Modal includes "Download" and "Close" actions
- Feedback: Syntax highlighting loads with Shiki, markdown renders with react-markdown
- State: Modal URL does not change (client-side state only)

**Step 3: Resource Download**
- UI Elements: Download button with download icon (Lucide React), toast notification (Sonner)
- User clicks "Download" from card or preview modal
- Data Validation: Slug validation, allowed extensions check (.md, .mdc, .json, .sh)
- Navigation: File downloads via browser, user remains on page
- Feedback: Toast shows "Downloaded [filename]", download count increments immediately (optimistic UI)
- State: Download count updates in database via after() hook, real-time sync via custom event

**Step 4: Personalization (Authenticated Users)**
- UI Elements: Favorite button (heart icon toggle), dashboard page, filter preset dropdown
- User signs in via Clerk modal
- Can now favorite resources (heart icon turns red when active)
- Can save filter presets (Ctrl+S or button in filter bar)
- Data Validation: Clerk JWT verification, unique constraint on favorites
- Navigation: Dashboard accessible via header menu
- Feedback: Toast confirmations for all actions ("Added to favorites", "Preset saved")
- State: Favorites persist in Supabase with RLS policies, presets in localStorage

**Step 5: Advanced Filtering & Curation**
- UI Elements: Filter sidebar (category tree), sort dropdown, quick filters (chip buttons), curated stacks (card carousel)
- User applies multiple filters (type + category + search + sort)
- Can save combination as preset for future reuse
- Can share filter state via URL with team members
- Data Validation: Filter combinations validated against available resources
- Navigation: Filter state in URL, browser back/forward works correctly
- Feedback: Active filter chips show at top, removal buttons on each
- State: Filter counts update dynamically based on current result set

### Advanced Features & Edge Cases

**Keyboard Shortcuts Power User Flow**:
- Press `/` to focus search without mouse
- Type query, press Enter to apply
- Press `ESC` to clear all filters instantly
- Press `Ctrl+S` to save current filter preset
- Press `?` to view all keyboard shortcuts (help modal)

**Empty State Handling**:
- No results for search: Suggest alternative queries and popular categories
- No favorites yet: Show getting started guide with "Browse Resources" CTA
- All filters too restrictive: Show filter count breakdown and suggest removing filters

**Error Scenarios**:
- Network failure during search: Show error toast, retry button
- Rate limit exceeded: Show friendly message with retry countdown
- Invalid resource slug: 404 page with navigation to browse
- Authentication failure: Redirect to sign-in with return URL

**Mobile Experience**:
- Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
- Touch-optimized buttons with larger tap targets
- Swipeable filter chips
- Bottom sheet for filter sidebar on mobile
- Collapsible sections to save vertical space

**Performance Edge Cases**:
- Large search results (500+ items): Pagination prevents DOM bloat
- Simultaneous searches: Debouncing ensures only latest query executes
- Slow network: Skeleton loaders maintain perceived performance
- Large resource preview: Lazy-loaded modal code-splits preview bundle

### UI/UX Highlights

**Component Strategy**:
- Primary: shadcn/ui components (Button, Card, Badge, Dialog, Tabs, Separator, Avatar, Skeleton, Input, Label)
- Custom components extend shadcn/ui base with Tailwind utility classes
- Radix UI primitives for accessibility (Dialog, Tabs, Separator, Avatar)
- Lucide React icon library for consistent iconography
- @lobehub/icons for brand logos (Cursor, MCP)

**Styling**:
- Tailwind CSS v4 with @theme directive for design tokens
- Custom color palette: terminal-green (#00FF00), primary (brand purple), muted grays
- Custom font: "terminal-font" class for monospace aesthetic
- Dark mode optimized (shadcn/ui theme system with next-themes)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**Interactions**:
- Framer Motion animations: fade-in, slide-up, stagger children
- Border animations: shimmer effect on cards, beam animation on hero
- Hover states: scale transforms, color shifts, shadow increases
- Loading states: skeleton pulse animations, spinner rotations
- Toast notifications: slide-in from bottom-right with auto-dismiss

**Advanced Animations**:
- Particles background on landing page (custom canvas animation)
- Marquee component for scrolling resource showcase
- Rainbow button gradient animation for primary CTAs
- Magic card hover effect with gradient borders
- Light rays effect on hero section

## Narrative

Sarah, a senior DevOps engineer at a fast-growing SaaS company, just adopted Cursor IDE after hearing about its AI-powered coding capabilities. Excited to supercharge her infrastructure-as-code workflow, she searches online for "Cursor DevOps automation" and discovers Cursor Hub.

Landing on the homepage, Sarah immediately sees "459+ Cursor Resources" with a prominent search bar. She types "kubernetes deployment" and within seconds sees 12 relevant results—commands for cluster management, rules for Terraform best practices, and MCP tools for cloud monitoring. She clicks "Preview" on a "Kubernetes Auto-Deploy" command and sees the full script with syntax highlighting. Perfect! She downloads it with one click.

Over the next week, Sarah discovers she's constantly returning to Cursor Hub. She signs up to save her favorite resources and realizes she needs different filters for different projects. She creates three filter presets: "K8s Essentials" (filtered to deployment + Kubernetes category), "Terraform Workflows" (rules + terraform category), and "Monitoring Scripts" (hooks + observability). Now she can switch contexts instantly with Ctrl+S shortcuts.

When onboarding a new junior engineer, Sarah shares a URL filtered to "DevOps Commands in CI/CD category"—the new hire gets a curated list immediately without needing to learn the platform. Sarah notices the download counts on her favorited resources have grown from hundreds to thousands, validating her choices and helping her discover trending new tools.

Cursor Hub transformed Sarah's experience from "frustrating resource hunt across scattered GitHub repos" to "instant access to community-vetted tools, organized exactly how I need them." Her team's productivity increased measurably—they estimate saving 4 hours per week previously spent searching for and validating resources. The company benefits from standardized tooling, and Sarah becomes an advocate, contributing 5 of her own automation scripts to the platform.

## Success Metrics

### User-Centric Metrics

1. **Time to First Download**: Average time from landing page to first resource download < 2 minutes (measured via analytics events)
2. **Search Success Rate**: Percentage of searches resulting in download or preview > 65% (search query tracking + action correlation)
3. **User Retention**: 7-day return rate > 40% for authenticated users, 15% for anonymous users (Clerk analytics + browser fingerprinting)
4. **Favorites Engagement**: Average favorites per authenticated user > 8 within first month (Supabase query on favorites table)
5. **Feature Adoption**: Keyboard shortcuts used by > 25% of power users (10+ visits), filter presets used by > 35% of authenticated users (localStorage analytics)

### Business Metrics

1. **Monthly Active Users (MAU)**: Grow to 10,000 MAU within 6 months, 50,000 within 1 year (Clerk + analytics tracking)
2. **Download Volume**: Track 100,000+ total downloads within first 6 months, 500,000 within 1 year (Supabase resources table aggregate)
3. **Authentication Conversion**: 20% of users create account within 3 visits (Clerk signup funnel)
4. **Resource Coverage**: Maintain 90%+ of resources with >10 downloads (indicating quality curation) (Supabase query on download_count distribution)
5. **Community Growth**: Attract 50+ external resource contributions within 1 year (GitHub PRs + submission forms)

### Technical Metrics

1. **Page Load Performance**: Landing page Largest Contentful Paint (LCP) < 1.5s, browse page < 2.0s (Vercel Analytics)
2. **Search Response Time**: 95th percentile search query response < 400ms (API route logging)
3. **Uptime & Availability**: 99.9% uptime for API endpoints and database (Vercel + Supabase monitoring)
4. **Error Rate**: < 0.5% of API requests result in 5xx errors (error tracking middleware)
5. **Database Performance**: Favorite toggle < 200ms, download increment < 100ms (Supabase query analytics)

### Tracking Plan

**Key Events to Track**:
1. `page_view` - Landing, Browse, Dashboard (with referrer)
2. `search_query` - Query string, result count, filters applied
3. `resource_preview` - Resource slug, type, category
4. `resource_download` - Resource slug, authenticated status, download count at time
5. `favorite_toggle` - Resource slug, action (add/remove)
6. `filter_applied` - Filter type (type/category/sort), value
7. `preset_saved` - Preset name, filter configuration
8. `preset_loaded` - Preset ID, usage count
9. `keyboard_shortcut_used` - Shortcut key, action performed
10. `signup_completed` - Source (landing/browse/dashboard), OAuth provider
11. `empty_state_action` - Action taken (suggested search/category, clear filters)
12. `share_link_created` - Filter configuration, shared via URL copy

**Cohort Segments**:
- New visitors (0-3 visits)
- Returning users (4-10 visits)
- Power users (11+ visits or 5+ favorites)
- Authenticated vs. anonymous
- Mobile vs. desktop
- Referral source (search, social, direct, community forums)

## Technical Considerations

This section outlines the engineering architecture, trade-offs, and implementation details that support the product features and capabilities defined above.

### Overall Architecture Philosophy

Cursor Hub follows a **server-first, progressively enhanced** architecture pattern:
- Static generation with incremental revalidation for content pages (landing, browse)
- Client-side state management for search and filters (instant feedback, shareable URLs)
- Server actions for mutations (favorites, downloads) with optimistic UI updates
- Hybrid data fetching: static index for searches, database for analytics/favorites

### Key Technical Decisions & Trade-offs

**Decision 1: Client-Side Search vs. Server-Side Search**
- **Choice**: Client-side fuzzy search with Fuse.js
- **Reasoning**: 459 resources (~2MB JSON) fits in memory, enables instant results without network latency, reduces server costs
- **Trade-off**: Initial bundle size increase (~150KB for Fuse.js), search complexity limited by client hardware
- **Mitigation**: Lazy load search index after initial page render, use web workers for large result sets (future)

**Decision 2: Build-Time Indexing vs. Runtime Indexing**
- **Choice**: Build-time static JSON generation (scripts/index-resources.ts)
- **Reasoning**: Resource content changes infrequently (commit-based updates), eliminates runtime filesystem I/O, enables CDN caching
- **Trade-off**: Requires rebuild to add new resources, no real-time updates
- **Mitigation**: GitHub Actions auto-rebuild on cursor-resources/ changes, 1-hour ISR revalidation for browse page

**Decision 3: Clerk vs. Supabase Auth**
- **Choice**: Clerk for authentication, Supabase for data storage
- **Reasoning**: Clerk provides superior UX (embeddable components, OAuth without backend), GDPR compliance out-of-box, easier social login
- **Trade-off**: External dependency, higher cost at scale, Clerk user IDs (TEXT) instead of UUID
- **Mitigation**: Store Clerk user_id in favorites table, can migrate to Supabase Auth by updating RLS policies

**Decision 4: Database vs. File System for Download Tracking**
- **Choice**: Supabase PostgreSQL for download counts and favorites
- **Reasoning**: Enables analytics queries (popular resources, user favorites), ACID guarantees, horizontal scalability
- **Trade-off**: Network latency for writes, database costs
- **Mitigation**: Use Next.js after() for non-blocking increments, optimistic UI updates, batch queries with .in()

## UI Architecture

### Supported Frameworks & Libraries

**Frontend Framework**:
- Next.js 16.0 (canary) with App Router for React Server Components
- React 19.0 with concurrent features (Suspense, Transitions)
- TypeScript 5 with strict mode enabled

**Component Libraries**:
- **Primary**: shadcn/ui (Radix UI + Tailwind CSS)
  - Benefits: Accessible by default, copy-paste customization, tree-shakeable
  - Components used: Button, Card, Badge, Dialog, Tabs, Input, Separator, Avatar, Skeleton
- **Icons**: Lucide React (tree-shakeable icon library, 300+ icons)
- **Branding**: @lobehub/icons (Cursor logo, MCP logo)

**Styling Frameworks**:
- **Tailwind CSS v4** with @theme directive for design tokens
  - Custom theme variables in app/globals.css:
    ```css
    @theme {
      --color-terminal-green: #00ff00;
      --color-primary: #8b5cf6; /* purple-500 */
      --font-terminal: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      --radius: 0.5rem;
    }
    ```
  - Utility-first approach with custom classes for branding (terminal-font, terminal-green)
  - JIT (Just-In-Time) compilation for optimal bundle size
  - Dark mode with class strategy (next-themes integration)

**Animation Libraries**:
- **Framer Motion 12.x** for declarative animations
  - Page transitions: fade-in, slide-up with stagger
  - Hover interactions: scale, color shift
  - Layout animations: shared layout transitions (AnimatePresence)
  - Performance: GPU-accelerated transforms, automatic will-change optimization
- **Custom Canvas Animations**: Particles background (requestAnimationFrame)

### Component Architecture Patterns

**Server Components (Default)**:
- Landing page (app/page.tsx), Browse page (app/(browse)/browse/page.tsx)
- Fetch data directly in component (no useState/useEffect)
- Benefits: Zero JavaScript for static content, faster initial load, SEO-friendly
- Example: `export default async function BrowsePage()` with `getResourceIndex()` call

**Client Components ('use client')**:
- Interactive components: TerminalResourceBrowser, ResourceCard, FavoriteButton, SearchInput
- Use React hooks: useState, useEffect, useSearchParams, useMemo
- Minimize client bundle: dynamic imports for heavy components (ResourcePreviewModal)
- Example: `const ResourcePreviewModal = dynamic(() => import('./resource-preview-modal'))`

**Server Actions ('use server')**:
- Mutations: toggleFavorite(), incrementDownload()
- Return structured responses: `{ success: boolean, error?: string }`
- Trigger revalidation: `revalidatePath('/dashboard')` after favorite toggle
- Error handling: try-catch with console.error, never throw to client

**Composition Patterns**:
- Compound components: FilterSidebar with ActiveFilters, HorizontalFilterBar
- Render props: EmptyState with suggested actions callback
- Higher-order components: withAuth() for protected routes (middleware-based)

### State Management Strategy

**Server State**:
- Favorites: Fetched via server actions (getFavorites()), cached by React Server Components
- Download counts: Fetched from Supabase, merged with static resource metadata
- No Redux/Zustand needed for server data

**Client State**:
- URL state: Search query, filters, sort order (useSearchParams hook)
  - Why: Shareable links, browser back/forward support, no prop drilling
  - Sync: useEffect to set local state from URL on mount
- Local state: Modal open/close, form inputs, optimistic UI updates (useState)
- Persistent state: Filter presets, onboarding dismissed flag (localStorage via custom hooks)

**Optimistic Updates Pattern**:
```typescript
// Example: Favorite toggle
const handleFavorite = async () => {
  setIsFavorited(!isFavorited) // Optimistic update
  const result = await toggleFavorite(slug)
  if (!result.success) {
    setIsFavorited(!isFavorited) // Rollback on error
    toast.error(result.error)
  }
}
```

### Responsive Design Breakpoints

- **Mobile-first approach**: Base styles for 320px+ screens
- **Breakpoints**:
  - `sm: 640px` - 2-column resource grid, horizontal scrolling for filters
  - `md: 768px` - Sidebar filters visible, 2-column grid
  - `lg: 1024px` - 3-column grid, full-width filter sidebar
  - `xl: 1280px` - Increased padding, larger typography
  - `2xl: 1536px` - Max-width container (1400px), spacious layout

### Accessibility Considerations

- **Keyboard Navigation**: All interactive elements focusable, visible focus states
- **ARIA Labels**: Buttons, dialogs, tabs have descriptive aria-label attributes
- **Screen Reader Support**: Semantic HTML (nav, main, article, section), alt text on images
- **Color Contrast**: WCAG AA compliant (4.5:1 for text, 3:1 for UI components)
- **Focus Management**: Modal traps focus, ESC to close, return focus to trigger element

## API & Backend

### Data Fetching Strategy

**Static Data (Build Time)**:
- Resource index generated at build time (scripts/index-resources.ts)
- Output: public/data/resources-index.json (gitignored, regenerated on deploy)
- Access: File system read via getResourceIndex() with in-memory caching
- Revalidation: ISR on browse page (revalidate: 86400 seconds = 24 hours)

**Dynamic Data (Runtime)**:
- Favorites: Supabase client with RLS policies
  - Server-side: createClient() from @supabase/ssr with cookie handling
  - Client-side: createBrowserClient() for real-time subscriptions (future)
- Download counts: Supabase query via server actions
  - Fetched on-demand in ResourceCard component
  - Cached in client state, updated via custom events

**API Routes (Next.js Route Handlers)**:
- GET /api/resources/search: Server-side Fuse.js search with query params
  - Params: q (query), type (command|rule|mcp|hook), category (string), limit (number)
  - Response: `{ results: ResourceMetadata[], count: number }`
  - Rate limit: 120 requests per 15 minutes per IP
- GET /api/resources/download/[slug]: Download resource file with tracking
  - Params: slug (string, URL parameter)
  - Headers: X-Preview-Mode (optional, bypasses download tracking)
  - Response: File content with Content-Disposition attachment header
  - Rate limit: 60 requests per 15 minutes per IP
- GET /api/resources/summary: Aggregate statistics
  - Response: `{ totalCount: number, typeCounts: Record<ResourceType, number>, categoryCount: number }`

### Authentication & Authorization

**Clerk Integration**:
- Middleware: Protected routes via clerkMiddleware() in middleware.ts
  - Public routes: Landing, Browse, Resource Preview, Download
  - Protected routes: Dashboard, Favorites
  - Redirect: Unauthenticated users to /signin with returnUrl parameter
- User object: Accessed via auth() in Server Components, useAuth() in Client Components
- Session management: Cookie-based (encrypted JWT), automatic refresh

**Authorization Patterns**:
- Row-Level Security (RLS) in Supabase for favorites table
  - Policy: `auth.uid() = user_id` for SELECT, INSERT, DELETE
  - Clerk user ID stored as TEXT in user_id column
  - Server actions verify Clerk auth before Supabase operations
- Resource downloads: Public (no auth required)

### Hosting & Deployment

**Vercel Platform**:
- Deployment: Git-based (GitHub integration), automatic deployments on push to main
- Edge Network: Global CDN for static assets (/_next/static/*)
- Serverless Functions: API routes auto-deployed as Vercel Functions (10s timeout)
- Environment Variables: Managed via Vercel dashboard, injected at build and runtime
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (client-side)
  - CLERK_SECRET_KEY (server-side)
  - NEXT_PUBLIC_SUPABASE_URL (client + server)
  - NEXT_PUBLIC_SUPABASE_ANON_KEY (client + server)
  - SUPABASE_SERVICE_ROLE_KEY (server-only, optional for admin operations)

**Build Process**:
1. Install dependencies: npm install
2. Generate resource index: npm run resources:index
3. Build Next.js app: next build (generates .next/ directory)
4. Static generation: Pre-renders landing page, browse page (first load)
5. Deploy: Upload .next/ to Vercel, configure routing, edge functions

**CI/CD Pipeline** (GitHub Actions, future):
- Trigger: Push to cursor-resources/ directory
- Steps: Checkout → Install → Index resources → Build → Test → Deploy
- Preview deployments: Every PR gets unique URL
- Production deployments: Only main branch

### Database

**Supabase PostgreSQL**:
- Version: PostgreSQL 15.x with pg_jsonb, pg_trgm extensions
- Hosting: Supabase managed instance (global regions, automatic backups)
- Connection: Server-side via @supabase/supabase-js with connection pooling

**Schema Design**:
```sql
-- resources table (download tracking)
CREATE TABLE public.resources (
  slug TEXT PRIMARY KEY,                    -- Unique resource identifier (e.g., 'deployment-automation-command')
  download_count INTEGER DEFAULT 0 NOT NULL,-- Total downloads (incremented on each download)
  created_at TIMESTAMPTZ DEFAULT NOW(),     -- First download timestamp
  updated_at TIMESTAMPTZ DEFAULT NOW()      -- Last download timestamp (auto-updated via trigger)
);

-- favorites table (user bookmarks)
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,                    -- Clerk user ID (e.g., 'user_2abc123...')
  resource_slug TEXT NOT NULL,              -- References resources.slug (no FK constraint)
  resource_type TEXT NOT NULL CHECK (resource_type IN ('command', 'rule', 'mcp', 'hook')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_favorite UNIQUE(user_id, resource_slug) -- Prevent duplicate favorites
);

-- Indexes for query performance
CREATE INDEX idx_resources_download_count ON public.resources(download_count DESC); -- For popular resources query
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);                    -- For user favorites lookup
CREATE INDEX idx_favorites_resource_slug ON public.favorites(resource_slug);        -- For favorite count (future)
CREATE INDEX idx_favorites_resource_type ON public.favorites(resource_type);        -- For type filtering (future)
```

**Database Functions** (PL/pgSQL):
```sql
-- Increment download count (upsert pattern)
CREATE FUNCTION public.increment_download_count(resource_slug_param TEXT) RETURNS void AS $$
BEGIN
  INSERT INTO public.resources (slug, download_count) VALUES (resource_slug_param, 1)
  ON CONFLICT (slug) DO UPDATE SET
    download_count = public.resources.download_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get popular resources (top N by download count)
CREATE FUNCTION public.get_popular_resources(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(slug TEXT, download_count INTEGER) AS $$
BEGIN
  RETURN QUERY SELECT r.slug, r.download_count
  FROM public.resources r ORDER BY r.download_count DESC LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Migrations**:
- Tool: Supabase CLI (supabase db diff, supabase db push)
- Location: supabase/migrations/ directory (timestamped SQL files)
- Execution: Manual via npm run db:push or automatic on Supabase dashboard
- Type generation: npm run db:types generates types/supabase.ts after migration

### External Services & APIs

**Clerk** (Authentication):
- API: Clerk Backend API for user management (create, update, delete)
- Webhook: Sync user events to Supabase (future: create profile on signup)
- Cost: Free tier (5,000 MAU), Pro tier ($25/mo for 5K+ MAU)

**Supabase** (Database + Storage):
- Database API: REST + GraphQL auto-generated from schema
- Realtime: WebSocket subscriptions for live updates (not yet used)
- Storage: File uploads for user-contributed resources (future)
- Cost: Free tier (500MB DB, 1GB bandwidth/month), Pro tier ($25/mo)

**Vercel** (Hosting + Analytics):
- Analytics: Web Vitals tracking (LCP, FID, CLS), custom events
- Logs: Serverless function logs (stdout, stderr)
- Cost: Hobby tier (free), Pro tier ($20/mo)

**Third-Party Libraries** (No API keys required):
- Fuse.js: Client-side fuzzy search (MIT license)
- Shiki: Syntax highlighting (MIT license)
- FileSaver.js: Browser downloads (MIT license)

## Performance & Scalability

### Optimizations

**Bundle Size Reduction**:
- Tree-shaking: ES modules for all libraries, Webpack 5 auto tree-shaking
- Code splitting: Dynamic imports for ResourcePreviewModal (~50KB saved on initial load)
- Font optimization: Next.js font optimization for custom fonts (SF Mono subset)
- Image optimization: Next.js Image component with WebP/AVIF formats, lazy loading
- CSS purging: Tailwind CSS JIT compiler removes unused classes

**Runtime Performance**:
- Debouncing: 300ms search debounce prevents excessive renders
- Memoization: useMemo for filteredResources, filterCounts to avoid recalculation
- Virtualization: Consider react-window for 1000+ result grids (future)
- Lazy loading: Intersection Observer for below-the-fold images
- RequestAnimationFrame: Particles animation optimized with RAF

**Network Optimization**:
- Static assets: Served from Vercel Edge CDN with aggressive caching (Cache-Control: public, max-age=31536000)
- API responses: Gzip compression (automatic via Vercel)
- Prefetching: Next.js Link prefetches on hover (IntersectionObserver)
- Resource hints: preconnect to Supabase, Clerk domains

**Database Optimization**:
- Indexes: download_count DESC index for popular resources O(1) lookup
- Connection pooling: Supabase Supavisor pools connections (max 60 by default)
- Query optimization: Batch queries with .in() instead of N+1 loops
- Caching: In-memory cache for resource index (invalidate on rebuild)

### Accessibility

**WCAG 2.1 Level AA Compliance**:
- Color contrast: All text meets 4.5:1 ratio (7:1 for large text)
- Keyboard navigation: All controls accessible via Tab/Shift+Tab, Enter to activate
- Focus indicators: 2px solid outline on all focusable elements
- Screen reader support: Semantic HTML5 (nav, main, section, article), ARIA labels

**Assistive Technology Testing**:
- VoiceOver (macOS): Landing page, browse page, dashboard navigation tested
- NVDA (Windows): Modal dialogs, form inputs announced correctly
- Keyboard-only navigation: Complete user flow possible without mouse

**Accessible Patterns**:
- Buttons: Clear labels ("Preview resource", not just "Preview")
- Dialogs: aria-labelledby for title, aria-describedby for description, focus trap
- Forms: Labels associated with inputs (htmlFor), error messages linked (aria-invalid)
- Loading states: aria-live="polite" for dynamic content updates

### Scalability Considerations

**Current Limits** (based on architecture):
- Resource count: 1,000 resources (~5MB JSON) before client-side search degrades
- Concurrent users: 10,000 CCU (Vercel Function limits, Supabase connection pooling)
- Database size: 100,000 favorites (rows) before query optimization needed
- Download throughput: 10 downloads/second (Supabase write limits)

**Horizontal Scaling Strategies** (future):
- Search service: Migrate to Algolia or Typesense for 10,000+ resources
- Database: Supabase read replicas for analytics queries (separate from transactional writes)
- CDN: Separate static asset CDN (Cloudflare R2) for resource files
- Caching: Redis layer for popular resource metadata (reduce DB load)

**Monitoring & Alerting**:
- Application monitoring: Vercel Analytics for Web Vitals, custom events
- Database monitoring: Supabase dashboard for query performance, connection counts
- Error tracking: Sentry integration for runtime errors (future)
- Uptime monitoring: Pingdom/UptimeRobot for endpoint health checks

**Load Testing Plan** (before production launch):
- Tool: k6 or Artillery for synthetic load generation
- Scenarios:
  1. Search load: 1,000 concurrent searches (varied queries, types, categories)
  2. Download spike: 500 downloads/minute (popular resource)
  3. Favorites churn: 100 authenticated users toggling favorites rapidly
- Success criteria: p95 response time < 500ms, error rate < 1%

## Integration Points

### External Dependencies

1. **Clerk Authentication Service**
   - Purpose: User authentication, session management, OAuth integrations
   - Integration: @clerk/nextjs SDK, middleware protection, server-side auth()
   - Failure mode: Graceful degradation (browse/download still work), cached session fallback
   - Documentation: https://clerk.com/docs/nextjs

2. **Supabase Database**
   - Purpose: Favorites storage, download tracking, analytics queries
   - Integration: @supabase/supabase-js client, Row-Level Security policies
   - Failure mode: Optimistic UI continues, background retry with exponential backoff
   - Documentation: https://supabase.com/docs/guides/database

3. **Vercel Hosting Platform**
   - Purpose: Deployment, serverless functions, edge network, analytics
   - Integration: Git-based deployment, automatic HTTPS, environment variables
   - Failure mode: N/A (platform-level redundancy)
   - Documentation: https://vercel.com/docs

4. **GitHub Repository** (cursor-resources/ directory)
   - Purpose: Source of truth for resource files (commands, rules, mcps, hooks)
   - Integration: Manual file additions via PR, automatic indexing on build
   - Failure mode: Stale resources if index not regenerated (mitigated by ISR)
   - Documentation: Internal README.md

### Internal System Interfaces

1. **Resource Indexing Script** (scripts/index-resources.ts)
   - Input: cursor-resources/ directory (459 files in 4 subdirectories)
   - Output: public/data/resources-index.json (searchable metadata)
   - Execution: Build time (npm run build), manual (npm run resources:index)
   - Schema: ResourceIndex type (resources array, categories map, totalCount, generatedAt)

2. **Search API** (app/api/resources/search/route.ts)
   - Input: Query parameters (q, type, category, limit)
   - Processing: Server-side Fuse.js search with filters
   - Output: JSON response { results: ResourceMetadata[], count: number }
   - Rate limit: 120 requests per 15 minutes per IP (middleware)

3. **Download API** (app/api/resources/download/[slug]/route.ts)
   - Input: Resource slug (URL parameter)
   - Processing: Validate slug, read file content, increment download count (after)
   - Output: File content with appropriate headers (attachment or text/plain)
   - Rate limit: 60 requests per 15 minutes per IP

4. **Favorites Server Actions** (server/actions/favorites.ts)
   - Functions: toggleFavorite(), getFavorites(), getFavoritesByType(), isFavorited()
   - Integration: Clerk auth + Supabase client with RLS
   - Response: Structured { success, isFavorited, error? }
   - Side effects: revalidatePath('/dashboard') after mutation

### Data Flow Diagram

```
User Browser
    ↓ (page load)
Next.js Server Component (app/page.tsx)
    ↓ (getResourceIndex())
Resource Index (public/data/resources-index.json) [Build-Time Generated]
    ↓ (return metadata)
Landing Page Rendered
    ↓ (user search)
Client Component (TerminalResourceBrowser)
    ↓ (fetch /api/resources/search?q=...)
API Route Handler (app/api/resources/search/route.ts)
    ↓ (Fuse.js search)
Search Results Returned
    ↓ (user clicks download)
Download API (app/api/resources/download/[slug]/route.ts)
    ↓ (validate slug, read file)
File Content → User Browser
    ↓ (after() hook)
incrementDownload() Server Action
    ↓ (Supabase query)
resources.download_count += 1
    ↓ (custom event: resource-downloaded)
Client State Updated (optimistic)
    ↓ (sync after 100ms)
Fetch Latest Download Count from Supabase
```

### Third-Party API Contracts

**Clerk Backend API**:
- Endpoint: https://api.clerk.com/v1/users
- Authentication: Bearer token (CLERK_SECRET_KEY)
- Usage: User management operations (not yet implemented)
- Rate limits: 100 requests/second per API key

**Supabase REST API**:
- Endpoint: https://[project-ref].supabase.co/rest/v1/
- Authentication: Bearer token (SUPABASE_ANON_KEY with RLS, or SERVICE_ROLE_KEY for admin)
- Usage: Favorites CRUD, download count queries
- Rate limits: 500 requests/second per project (free tier)

**Supabase Realtime** (future):
- Endpoint: wss://[project-ref].supabase.co/realtime/v1/
- Authentication: WebSocket auth via JWT
- Usage: Live download count updates, collaborative filtering
- Rate limits: 100 concurrent connections (free tier)

### Security Considerations

**Input Validation**:
- Slug validation: Regex check for alphanumeric + hyphens, max 200 characters
- File path sanitization: Prevent directory traversal (../../etc/passwd)
- Extension whitelist: Only .md, .mdc, .json, .sh allowed for downloads
- SQL injection: Parameterized queries via Supabase client (automatic escaping)

**Rate Limiting**:
- Middleware: Custom rate limiter with in-memory store (lib/middleware/rate-limit.ts)
- Sliding window: 15-minute windows per IP address
- Response: 429 Too Many Requests with Retry-After header

**Authentication Security**:
- JWT validation: Clerk automatically validates tokens in middleware
- CSRF protection: SameSite=Lax cookies (default in Next.js)
- XSS prevention: React auto-escapes JSX, no dangerouslySetInnerHTML usage
- HTTPS only: Enforced by Vercel, HSTS headers enabled

**Database Security**:
- Row-Level Security: All tables have RLS policies (users can only access own favorites)
- Least privilege: Anon key has minimal permissions (public read, user-scoped write)
- Service role key: Stored server-side only, never exposed to client
- Connection encryption: TLS 1.3 for all Supabase connections

---

**Document Version**: 1.0
**Last Updated**: November 14, 2025
**Author**: Cursor Hub Product Team
**Status**: Living Document (updated as features evolve)

---

This PRD reflects the current state of Cursor Hub as implemented in the codebase. For feature requests or updates, submit a GitHub issue or contact the product team.

