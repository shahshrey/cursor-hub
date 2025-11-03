# Next.js Performance Audit Report
**Date:** November 3, 2025  
**Application:** Cursor Resources Hub  
**Framework:** Next.js 16.0.0 (Turbopack)  
**Audit Type:** Comprehensive Performance Analysis

---

## Executive Summary

### Overall Performance Grade: **D (66/100)**

The application currently has significant performance issues that are impacting user experience. The main bottlenecks are **authentication redirects (2.2s delay)**, **large static data payload (984KB)**, and **heavy client-side JavaScript execution**.

### Key Metrics Snapshot

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Performance Score** | 66/100 | 90+ | ❌ Critical |
| **First Contentful Paint** | 4,795ms | <1,800ms | ❌ Critical |
| **Largest Contentful Paint** | 4,795ms | <2,500ms | ❌ Critical |
| **Total Blocking Time** | 232ms | <200ms | ⚠️ Warning |
| **Cumulative Layout Shift** | 0.03 | <0.1 | ✅ Good |
| **Speed Index** | 4,902ms | <3,400ms | ❌ Critical |
| **Time to Interactive** | ~5,200ms | <3,800ms | ❌ Critical |

### Potential Improvement: **~3-4 seconds** reduction in load time

---

## Critical Issues (Fix Immediately)

### 1. 🔴 Authentication Redirect Chain (2.2s delay)
**Impact:** Massive - accounts for 46% of initial load time  
**Current:** 3 redirects through Clerk authentication  
**Estimated Savings:** 2,200ms

**Problem:**
```
1. http://localhost:3000/ → 572ms
2. Clerk handshake API call → 717ms  
3. Return with JWT token → 912ms
Total: 2,201ms wasted
```

**Solution:**
```typescript
// Consider implementing authentication bypass for public pages
// middleware.ts - optimize Clerk configuration

export const config = {
  matcher: [
    // Exclude public pages from auth checks
    '/((?!^/$|^/browse$|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/dashboard(.*)',
    '/api/resources/download(.*)',
  ],
}

// OR use Clerk's beforeAuth to skip handshake on public routes
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/browse']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});
```

**Priority:** 🔥 CRITICAL - Implement within 1-2 days

---

### 2. 🔴 984KB Resources Index File
**Impact:** High - blocking initial page load  
**Current:** Single massive JSON file loaded on every page  
**Estimated Savings:** 1,500-2,000ms on slower connections

**Problem:**
- `/public/data/resources-index.json` is 984KB
- Loaded even on homepage where only summary is needed
- Contains full metadata for all 459 resources
- Blocks rendering until fully downloaded

**Solutions:**

**Option A: Split by Resource Type (Recommended)**
```typescript
// Generate separate index files per type
public/data/
  ├── commands-index.json (250KB)
  ├── rules-index.json (350KB)
  ├── mcps-index.json (200KB)
  └── hooks-index.json (184KB)

// Load only what's needed
export async function getCommandsIndex() {
  const res = await fetch('/data/commands-index.json')
  return res.json()
}
```

**Option B: Paginated API Endpoints**
```typescript
// app/api/resources/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const type = searchParams.get('type')
  const limit = 50
  
  // Return paginated results
  const start = (page - 1) * limit
  const filtered = allResources
    .filter(r => !type || r.type === type)
    .slice(start, start + limit)
  
  return Response.json({
    resources: filtered,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  })
}
```

**Option C: Summary + On-Demand Loading**
```typescript
// Homepage only loads summary (5KB)
public/data/resources-summary.json: {
  totalCount: 459,
  categories: {...},
  stats: {...}
}

// Browse page loads full data
// Use SWR for caching
import useSWR from 'swr'

export function useBrowseResources() {
  const { data } = useSWR('/data/resources-index.json', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return data
}
```

**Priority:** 🔥 CRITICAL - Implement within 2-3 days

---

### 3. 🔴 Client-Side Heavy Search with Fuse.js
**Impact:** Medium-High - causes main thread blocking  
**Current:** 459 resources searched client-side on every keystroke  
**Estimated Savings:** 500-800ms improvement in TTI

**Problem:**
```typescript
// terminal-resource-browser.tsx - Line 83-96
const fuse = useMemo(
  () =>
    new Fuse(initialResources, {  // All 459 resources
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'searchContent', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
      ],
      threshold: 0.4,
    }),
  [initialResources]  // Heavy computation on mount
)
```

**Solutions:**

**Option A: Server-Side Search API**
```typescript
// app/api/resources/search/route.ts
import Fuse from 'fuse.js'
import { getResourceIndex } from '@/lib/resources'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query || query.length < 2) {
    return Response.json({ results: [] })
  }
  
  const index = getResourceIndex()
  const fuse = new Fuse(index.resources, {...})
  const results = fuse.search(query).slice(0, 50)
  
  return Response.json({ results })
}

// Client component
const { data } = useSWR(
  query ? `/api/resources/search?q=${query}` : null,
  fetcher,
  { keepPreviousData: true }
)
```

**Option B: Web Worker for Search**
```typescript
// workers/search.worker.ts
import Fuse from 'fuse.js'

let fuse: Fuse<any>

self.onmessage = (e) => {
  if (e.data.type === 'INIT') {
    fuse = new Fuse(e.data.resources, e.data.options)
  } else if (e.data.type === 'SEARCH') {
    const results = fuse.search(e.data.query)
    self.postMessage({ results })
  }
}

// Component
const searchWorker = useMemo(
  () => new Worker(new URL('./search.worker.ts', import.meta.url)),
  []
)
```

**Option C: Lightweight Search Alternative**
```typescript
// Replace Fuse.js with simple filter (saves ~15KB bundle)
function simpleSearch(resources, query) {
  const terms = query.toLowerCase().split(' ')
  return resources.filter(resource => {
    const searchText = `${resource.title} ${resource.description}`.toLowerCase()
    return terms.every(term => searchText.includes(term))
  })
}
```

**Priority:** 🔴 HIGH - Implement within 3-5 days

---

## High Priority Issues

### 4. 🟡 Duplicate Animation Libraries
**Impact:** Medium - unnecessary bundle bloat  
**Current:** Both `framer-motion` (12.23.24) AND `motion` (12.23.24) installed  
**Bundle Impact:** ~50KB duplication  
**Estimated Savings:** 50KB bundle, 200-300ms parse time

**Solution:**
```bash
# Remove one package (they're the same library)
npm uninstall motion  # Keep framer-motion

# Update imports
# Before:
import { motion } from 'motion'
# After:
import { motion } from 'framer-motion'
```

**Files to update:**
- `components/ui/light-rays.tsx`
- `components/features/resources/resource-preview-modal.tsx`
- Any other files importing from 'motion'

**Priority:** 🟡 HIGH - Implement within 1 week

---

### 5. 🟡 Excessive Framer Motion Usage
**Impact:** Medium - heavy animations slow initial render  
**Current:** 114 instances across 34 files  
**Bundle Impact:** Framer Motion is ~40KB gzipped

**Problem Areas:**
1. **Landing page** - Multiple animated sections on critical path
2. **Resource cards** - All cards animate on scroll
3. **Light rays effect** - Decorative animation running on all pages

**Solutions:**

**Reduce Motion on Initial Load:**
```typescript
// Only animate after initial render
const [shouldAnimate, setShouldAnimate] = useState(false)

useEffect(() => {
  setShouldAnimate(true)
}, [])

<motion.div
  initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
  animate={{ opacity: 1 }}
>
```

**Respect User Preferences:**
```typescript
import { useReducedMotion } from 'framer-motion'

export function AnimatedCard({ children }) {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    return <div>{children}</div>
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}
```

**Lazy Load Heavy Animations:**
```typescript
// Don't load light rays on mobile or slow connections
const LightRays = dynamic(
  () => import('@/components/ui/light-rays').then(m => m.LightRays),
  { ssr: false }
)

export default function Layout({ children }) {
  const [showEffects, setShowEffects] = useState(false)
  
  useEffect(() => {
    if (window.innerWidth > 1024 && 
        navigator.connection?.effectiveType !== 'slow-2g') {
      setShowEffects(true)
    }
  }, [])
  
  return (
    <>
      {showEffects && <LightRays />}
      {children}
    </>
  )
}
```

**Priority:** 🟡 MEDIUM-HIGH - Implement within 1-2 weeks

---

### 6. 🟡 Missing Code Splitting
**Impact:** Medium - large initial bundle  
**Current:** First Load JS: ~680KB (uncompressed)

**Large Chunks Identified:**
- `512-8f5e89a9857e3f80.js` - 196KB
- `4bd1b696-628cfb3caad2bc1d.js` - 196KB  
- `framework-e2c84bf8dbc6c531.js` - 180KB
- `482.eb49d6dfff0618be.js` - 172KB
- `379-539bf772a815bc24.js` - 156KB

**Solutions:**

**Dynamic Import Modal Components:**
```typescript
// Current - loaded immediately
import { ResourcePreviewModal } from './resource-preview-modal'

// Better - load only when needed
const ResourcePreviewModal = dynamic(
  () => import('./resource-preview-modal').then(m => m.ResourcePreviewModal),
  { ssr: false, loading: () => <div>Loading preview...</div> }
)
```

**Route-based Code Splitting:**
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-avatar',
      'lucide-react',
      'framer-motion'
    ],
  },
}
```

**Lazy Load Heavy Dependencies:**
```typescript
// components/features/resources/resource-preview-modal.tsx
// Shiki syntax highlighter is ~100KB - load on demand

const [Highlighter, setHighlighter] = useState(null)

useEffect(() => {
  if (isOpen && needsSyntaxHighlight) {
    import('shiki').then(module => setHighlighter(module))
  }
}, [isOpen])
```

**Priority:** 🟡 MEDIUM - Implement within 2 weeks

---

## Medium Priority Optimizations

### 7. 🟢 Server-Side Rendering Opportunities
**Impact:** Low-Medium - better perceived performance  
**Current:** Browse page uses ISR with 1h revalidation (good!)  
**Opportunity:** More aggressive caching

**Recommendations:**
```typescript
// app/(browse)/browse/page.tsx
export const revalidate = 3600  // Current: 1 hour

// Optimize to:
export const revalidate = 86400  // 24 hours - resources don't change often

// OR use on-demand revalidation
// When resources are updated, trigger:
// await revalidatePath('/browse')
```

**Add Static Generation for Common Filters:**
```typescript
// app/(browse)/browse/[type]/page.tsx
export async function generateStaticParams() {
  return [
    { type: 'commands' },
    { type: 'rules' },
    { type: 'mcps' },
    { type: 'hooks' },
  ]
}

export default async function TypePage({ params }) {
  const resources = getResourcesByType(params.type)
  return <ResourceBrowser resources={resources} />
}
```

**Priority:** 🟢 MEDIUM - Implement within 2-3 weeks

---

### 8. 🟢 Image Optimization Review
**Status:** ✅ Already well optimized  
**Current Implementation:**
- ✅ Using `next/image` for all images
- ✅ Priority prop on above-fold images
- ✅ Proper width/height attributes
- ✅ Lazy loading on footer images

**Minor Improvements:**
```typescript
// Add placeholder blur for better UX
<Image
  src="/cursor-branding/logo-horizontal-light.svg"
  alt="Cursor"
  width={400}
  height={250}
  priority
  placeholder="blur"  // Add this
  blurDataURL="data:image/svg+xml;base64,..."  // Generate blur
/>
```

**Priority:** 🟢 LOW - Optional improvement

---

### 9. 🟢 Font Loading Optimization
**Status:** ✅ Already well optimized  
**Current:** Using `next/font/google` with Inter  
**Improvement:** Minor tuning possible

**Current Implementation:**
```typescript
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400', '600', '700'],  // 3 weights
  display: 'swap',
})
```

**Optimization:**
```typescript
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,  // Add explicit preload
  fallback: ['system-ui', 'arial'],  // Better fallback
  adjustFontFallback: true,  // Reduce CLS
})
```

**Priority:** 🟢 LOW - Already good

---

## Bundle Analysis Summary

### Current Bundle Composition

| Chunk Type | Size | Impact |
|------------|------|--------|
| Framework (Next.js + React) | 180KB | Expected |
| Main application code | 136KB | Acceptable |
| Polyfills | 112KB | Consider reducing |
| Vendor chunks (libraries) | ~400KB | High - needs optimization |
| **Total First Load JS** | **~680KB** | ⚠️ Above recommended 500KB |

### Recommended Bundle Optimizations

1. **Remove duplicate libraries** (-50KB)
2. **Dynamic imports for modals** (-100KB from initial)
3. **Optimize Radix UI imports** (-30KB)
4. **Replace/optimize Fuse.js** (-15KB or move to worker)
5. **Tree-shake unused Lucide icons** (-20KB)

**Target:** Reduce First Load JS to **<500KB**

---

## Performance Budget Recommendations

### Set Hard Limits in next.config.ts

```typescript
// next.config.ts
const nextConfig = {
  // Set performance budgets
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.performance = {
        maxAssetSize: 200000,  // 200KB
        maxEntrypointSize: 500000,  // 500KB
        hints: 'error',  // Fail build if exceeded
      }
    }
    return config
  },
}
```

### Recommended Budgets

| Asset Type | Current | Target | Max |
|------------|---------|--------|-----|
| Individual chunks | 196KB | 100KB | 150KB |
| First Load JS | 680KB | 400KB | 500KB |
| Images | Well optimized | - | 200KB |
| Fonts | 48KB | - | 100KB |
| JSON Data | 984KB | 50KB | 100KB |

---

## Implementation Roadmap

### 🔥 Week 1: Critical Fixes (Estimated Impact: -3s load time)

**Day 1-2: Fix Authentication Redirects**
- [ ] Configure Clerk middleware to skip public routes
- [ ] Test homepage loads without handshake redirect
- [ ] Verify authentication still works on protected routes
- **Expected Impact:** -2,200ms

**Day 3-4: Split Resources Index**
- [ ] Implement resource index splitting by type
- [ ] Create lightweight summary endpoint for homepage
- [ ] Update browse page to fetch only needed data
- **Expected Impact:** -1,500ms on slow connections

**Day 5: Remove Duplicate Dependencies**
- [ ] Remove `motion` package, keep `framer-motion`
- [ ] Update all imports
- [ ] Test all animations still work
- **Expected Impact:** -50KB bundle, -300ms parse time

### 🟡 Week 2-3: High Priority Optimizations (Estimated Impact: -1s)

**Week 2: Optimize Search**
- [ ] Implement server-side search API endpoint
- [ ] Add SWR for search result caching
- [ ] OR implement Web Worker search
- [ ] Add loading states for better UX
- **Expected Impact:** -500ms TTI

**Week 2-3: Reduce Animation Overhead**
- [ ] Audit all Framer Motion usage
- [ ] Add reduced motion preference checks
- [ ] Lazy load decorative animations
- [ ] Remove unnecessary animations from critical path
- **Expected Impact:** -400ms FCP

**Week 3: Implement Code Splitting**
- [ ] Dynamic import all modal components
- [ ] Lazy load syntax highlighter (Shiki)
- [ ] Configure `optimizePackageImports` in next.config
- [ ] Split large vendor chunks
- **Expected Impact:** -200KB initial bundle

### 🟢 Week 4: Medium Priority & Polish (Estimated Impact: -500ms)

**Performance Monitoring**
- [ ] Set up Vercel Analytics (or alternative)
- [ ] Configure performance budgets in webpack
- [ ] Add Lighthouse CI to GitHub Actions
- [ ] Create performance dashboard

**Caching Optimization**
- [ ] Increase ISR revalidation to 24h
- [ ] Implement on-demand revalidation
- [ ] Add static generation for common routes
- [ ] Configure CDN caching headers

**Final Optimizations**
- [ ] Add image blur placeholders
- [ ] Optimize font fallbacks
- [ ] Review and remove unused dependencies
- [ ] Minify and compress all assets

---

## Testing & Validation Checklist

### Before Each Optimization

- [ ] Run `npm run build` and note bundle sizes
- [ ] Run Lighthouse audit and record scores
- [ ] Test on slow 3G network simulation
- [ ] Test on mobile device

### After Each Optimization

- [ ] Verify functionality still works
- [ ] Compare before/after Lighthouse scores
- [ ] Measure bundle size reduction
- [ ] Test on multiple browsers
- [ ] Monitor error rates in production

### Success Criteria

- [ ] Performance score > 90
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] TBT < 200ms
- [ ] CLS < 0.1
- [ ] First Load JS < 500KB

---

## Monitoring & Continuous Improvement

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   ```typescript
   // app/layout.tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

2. **Lighthouse CI** (GitHub Actions)
   ```yaml
   # .github/workflows/lighthouse.yml
   name: Lighthouse CI
   on: [pull_request]
   jobs:
     lighthouse:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Audit URLs using Lighthouse
           uses: treosh/lighthouse-ci-action@v9
           with:
             urls: |
               http://localhost:3000
               http://localhost:3000/browse
             budgetPath: ./budget.json
   ```

3. **Performance Budget File**
   ```json
   {
     "timings": [
       { "metric": "first-contentful-paint", "budget": 1800 },
       { "metric": "largest-contentful-paint", "budget": 2500 },
       { "metric": "interactive", "budget": 3800 }
     ],
     "resourceSizes": [
       { "resourceType": "script", "budget": 500 },
       { "resourceType": "image", "budget": 200 },
       { "resourceType": "document", "budget": 50 },
       { "resourceType": "total", "budget": 1000 }
     ]
   }
   ```

### Alert Thresholds

Set up alerts for:
- Performance score drops below 85
- FCP > 2s
- LCP > 3s
- Bundle size increases by >10%
- Any new resource >100KB

---

## Estimated Final Results

### Current State (Baseline)

- Performance Score: **66/100**
- FCP: **4,795ms**
- LCP: **4,795ms**
- Total Bundle: **~680KB**
- Load Time (3G): **~8s**

### After All Optimizations (Projected)

- Performance Score: **92-95/100** (+26-29 points)
- FCP: **1,200-1,500ms** (-3,300ms / 69% faster)
- LCP: **1,800-2,200ms** (-3,000ms / 63% faster)
- Total Bundle: **~400KB** (-280KB / 41% smaller)
- Load Time (3G): **~3s** (-5s / 63% faster)

### ROI by Priority

| Priority | Effort | Impact | ROI |
|----------|--------|--------|-----|
| 🔥 Critical (Weeks 1) | 3-5 days | -3s | 🔥🔥🔥🔥🔥 |
| 🟡 High (Weeks 2-3) | 1-2 weeks | -1s | 🔥🔥🔥 |
| 🟢 Medium (Week 4) | 1 week | -500ms | 🔥🔥 |

---

## Appendix: Detailed Lighthouse Report

### Performance Breakdown

```
Performance: 66/100
├─ First Contentful Paint: 11/100 (4,795ms)
├─ Largest Contentful Paint: 31/100 (4,795ms)
├─ Total Blocking Time: 86/100 (232ms)
├─ Cumulative Layout Shift: 96/100 (0.03)
└─ Speed Index: 65/100 (4,902ms)
```

### Top Opportunities

1. **Avoid multiple page redirects** - 2,201ms savings
2. **Reduce unused JavaScript** - Potential savings
3. **Minify JavaScript** - Potential savings
4. **Use HTTP/2** - Already implemented ✅
5. **Enable text compression** - Already implemented ✅

### Network Analysis

- Total Requests: 31
- Total Transfer Size: 979KB
- Largest Requests:
  1. Next.js dev tools: 221KB
  2. React DOM: 182KB
  3. Vendor bundle: 153KB
  4. Next.js client: 123KB

---

## Questions or Issues?

For questions about this audit or implementation help:
1. Review Next.js 16 performance docs
2. Check Clerk authentication docs for public route handling
3. Consult bundle analyzer reports in `.next/analyze/`

**Report Generated:** November 3, 2025  
**Next Review:** After Week 1 implementations

