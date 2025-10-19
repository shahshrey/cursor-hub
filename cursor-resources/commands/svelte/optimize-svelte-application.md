<task name="Optimize Svelte Application">

<task_objective>
Optimize Svelte/SvelteKit applications for performance, including bundle size reduction, rendering optimization, and loading performance. Input: Application codebase, build configuration, performance metrics, and optimization goals. Process: Analyze current performance with profiling tools, identify bottlenecks in bundle size and rendering, implement code splitting and lazy loading, optimize component reactivity, improve asset loading, configure caching strategies, and measure improvements. Output: Optimized application with reduced bundle size, improved Core Web Vitals, faster rendering performance, optimized asset delivery, comprehensive performance report with before/after metrics, and documentation of optimizations applied.
</task_objective>

<detailed_sequence_steps>
# Optimize Svelte Application - Detailed Sequence of Steps

## 1. Establish Performance Baseline

1. Measure current bundle size:
   ```bash
   npm run build
   ```
   - Note total bundle size
   - Identify largest chunks
   - Check for duplicate dependencies

2. Run Lighthouse audit:
   - Open application in Chrome
   - Run Lighthouse performance audit
   - Note Core Web Vitals scores (LCP, FID, CLS)
   - Review opportunities and diagnostics

3. Analyze bundle with visualizer:
   ```bash
   npm install -D rollup-plugin-visualizer
   ```
   ```javascript
   // vite.config.js
   import { visualizer } from 'rollup-plugin-visualizer';
   
   export default defineConfig({
     plugins: [
       sveltekit(),
       visualizer({ open: true })
     ]
   });
   ```
   Run build and review bundle composition.

4. Profile component rendering:
   - Use Chrome DevTools Performance tab
   - Record user interactions
   - Identify slow components

5. Document baseline metrics:
   ```markdown
   ## Baseline Performance
   - Bundle size: 450 KB
   - LCP: 3.2s
   - FID: 150ms
   - CLS: 0.15
   - Time to Interactive: 4.1s
   ```

## 2. Optimize Bundle Size with Code Splitting

1. Implement route-based code splitting (automatic in SvelteKit):
   ```
   src/routes/
   ├── +page.svelte      ← Loaded on demand
   ├── about/
   │   └── +page.svelte  ← Separate chunk
   └── admin/
       └── +page.svelte  ← Separate chunk
   ```

2. Use dynamic imports for heavy components:
   ```svelte
   <script>
     let HeavyComponent;
     let showHeavy = false;
     
     async function loadHeavy() {
       if (!HeavyComponent) {
         const module = await import('./HeavyComponent.svelte');
         HeavyComponent = module.default;
       }
       showHeavy = true;
     }
   </script>
   
   <button onclick={loadHeavy}>Show Heavy Component</button>
   {#if showHeavy && HeavyComponent}
     <svelte:component this={HeavyComponent} />
   {/if}
   ```

3. Lazy load below-the-fold content:
   ```svelte
   <script>
     import { onMount } from 'svelte';
     import { browser } from '$app/environment';
     
     let BelowFold;
     
     onMount(async () => {
       if (browser) {
         const module = await import('./BelowFold.svelte');
         BelowFold = module.default;
       }
     });
   </script>
   
   <!-- Critical above-fold content -->
   <header>...</header>
   <main>...</main>
   
   <!-- Lazy loaded below-fold -->
   {#if BelowFold}
     <svelte:component this={BelowFold} />
   {/if}
   ```

4. Split vendor chunks strategically:
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks(id) {
             if (id.includes('node_modules')) {
               if (id.includes('chart')) return 'charts';
               if (id.includes('date')) return 'date-utils';
               return 'vendor';
             }
           }
         }
       }
     }
   });
   ```

## 3. Optimize Dependencies

1. Analyze and remove unused dependencies:
   ```bash
   npx depcheck
   ```
   Remove unused packages from package.json.

2. Use lighter alternatives:
   ```javascript
   // Replace moment.js (heavy) with date-fns (light)
   // Before
   import moment from 'moment';
   moment(date).format('YYYY-MM-DD');
   
   // After
   import { format } from 'date-fns';
   format(date, 'yyyy-MM-dd');
   ```

3. Use tree-shakeable imports:
   ```javascript
   // Bad: Imports entire library
   import _ from 'lodash';
   _.debounce(fn, 300);
   
   // Good: Tree-shakeable
   import { debounce } from 'lodash-es';
   debounce(fn, 300);
   ```

4. Configure external dependencies for CDN:
   ```javascript
   // For specific use cases
   build: {
     rollupOptions: {
       external: ['chart.js']
     }
   }
   ```

## 4. Optimize Component Rendering

1. Use $state.raw for large immutable data:
   ```javascript
   // Before: Reactive tracking overhead
   let largeDataset = $state([...thousands of items]);
   
   // After: No reactive tracking
   let largeDataset = $state.raw([...thousands of items]);
   ```

2. Optimize derived computations with lazy evaluation:
   ```javascript
   // Expensive computation only when accessed
   let filtered = $derived.lazy(() => 
     items.filter(item => expensiveFilter(item))
   );
   ```

3. Use keyed each blocks for efficient updates:
   ```svelte
   <!-- Bad: Unkeyed list -->
   {#each items as item}
     <Item data={item} />
   {/each}
   
   <!-- Good: Keyed list -->
   {#each items as item (item.id)}
     <Item data={item} />
   {/each}
   ```

4. Implement virtual scrolling for long lists:
   ```bash
   npm install svelte-virtual-list
   ```
   ```svelte
   <script>
     import VirtualList from 'svelte-virtual-list';
     
     let items = [...thousands of items];
   </script>
   
   <VirtualList {items} let:item>
     <Item data={item} />
   </VirtualList>
   ```

5. Minimize re-renders by avoiding inline functions:
   ```svelte
   <!-- Bad: Creates new function on each render -->
   <button onclick={() => handleClick(item.id)}>
     Click
   </button>
   
   <!-- Good: Stable function reference -->
   <script>
     function handleItemClick(event) {
       handleClick(event.currentTarget.dataset.id);
     }
   </script>
   <button data-id={item.id} onclick={handleItemClick}>
     Click
   </button>
   ```

## 5. Optimize Images and Assets

1. Use optimized image formats:
   ```svelte
   <picture>
     <source srcset="image.webp" type="image/webp" />
     <source srcset="image.jpg" type="image/jpeg" />
     <img src="image.jpg" alt="Description" />
   </picture>
   ```

2. Implement lazy loading for images:
   ```svelte
   <img 
     src="image.jpg" 
     alt="Description" 
     loading="lazy"
     decoding="async"
   />
   ```

3. Use appropriate image sizes with srcset:
   ```svelte
   <img
     srcset="
       small.jpg 480w,
       medium.jpg 768w,
       large.jpg 1200w
     "
     sizes="(max-width: 768px) 100vw, 50vw"
     src="medium.jpg"
     alt="Responsive image"
   />
   ```

4. Optimize SVG icons:
   ```bash
   npm install -D vite-plugin-svgr
   ```
   ```javascript
   // Inline small SVGs as components
   import Logo from './logo.svg?component';
   ```

5. Configure asset optimization in Vite:
   ```javascript
   export default defineConfig({
     build: {
       assetsInlineLimit: 4096, // Inline assets < 4kb
     }
   });
   ```

## 6. Implement Preloading Strategies

1. Preload critical resources:
   ```svelte
   <!-- src/app.html -->
   <head>
     <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
     <link rel="preconnect" href="https://api.example.com" />
   </head>
   ```

2. Prefetch routes on hover:
   ```svelte
   <script>
     import { preloadData } from '$app/navigation';
     
     function handleMouseEnter() {
       preloadData('/about');
     }
   </script>
   
   <a href="/about" onmouseenter={handleMouseEnter}>
     About
   </a>
   ```

3. Preload critical components:
   ```javascript
   // +layout.svelte - preload common components
   import './Header.svelte';
   import './Footer.svelte';
   ```

## 7. Configure Caching and CDN

1. Set up cache headers in load functions:
   ```typescript
   // +page.server.ts
   export async function load({ fetch, setHeaders }) {
     const data = await fetch('/api/data').then(r => r.json());
     
     setHeaders({
       'cache-control': 'public, max-age=3600'
     });
     
     return { data };
   }
   ```

2. Configure service worker for offline support:
   ```javascript
   // src/service-worker.js
   import { build, files, version } from '$service-worker';
   
   const CACHE = `cache-${version}`;
   const ASSETS = [...build, ...files];
   
   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
     );
   });
   ```

3. Use CDN for static assets:
   ```javascript
   // svelte.config.js
   kit: {
     paths: {
       assets: process.env.NODE_ENV === 'production' 
         ? 'https://cdn.example.com'
         : ''
     }
   }
   ```

## 8. Optimize CSS and Styling

1. Use scoped styles to enable tree-shaking:
   ```svelte
   <style>
     /* Scoped by default, only included if component used */
     .button { ... }
   </style>
   ```

2. Minimize global CSS:
   ```css
   /* app.css - Only essential global styles */
   :root {
     --primary: #0066cc;
   }
   
   * { box-sizing: border-box; }
   ```

3. Use Tailwind with PurgeCSS:
   ```javascript
   // tailwind.config.js
   export default {
     content: ['./src/**/*.{html,js,svelte,ts}'],
     // Unused classes automatically removed
   };
   ```

4. Defer non-critical CSS:
   ```html
   <link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
   ```

## 9. Optimize Data Loading

1. Implement parallel data fetching:
   ```typescript
   // +page.server.ts
   export async function load({ fetch }) {
     // Parallel requests
     const [users, posts, comments] = await Promise.all([
       fetch('/api/users').then(r => r.json()),
       fetch('/api/posts').then(r => r.json()),
       fetch('/api/comments').then(r => r.json())
     ]);
     
     return { users, posts, comments };
   }
   ```

2. Implement pagination for large datasets:
   ```typescript
   export async function load({ url, fetch }) {
     const page = parseInt(url.searchParams.get('page') || '1');
     const limit = 20;
     
     const data = await fetch(`/api/items?page=${page}&limit=${limit}`)
       .then(r => r.json());
     
     return { items: data.items, page, hasMore: data.hasMore };
   }
   ```

3. Use streaming for large responses:
   ```typescript
   export async function load({ fetch }) {
     return {
       streamed: {
         slowData: fetch('/api/slow').then(r => r.json())
       }
     };
   }
   ```

4. Implement data caching in load functions:
   ```typescript
   const cache = new Map();
   
   export async function load({ fetch, params }) {
     const cacheKey = `user-${params.id}`;
     
     if (cache.has(cacheKey)) {
       return { user: cache.get(cacheKey) };
     }
     
     const user = await fetch(`/api/users/${params.id}`).then(r => r.json());
     cache.set(cacheKey, user);
     
     return { user };
   }
   ```

## 10. Configure Build Optimizations

1. Enable compression in production:
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       minify: 'terser',
       terserOptions: {
         compress: {
           drop_console: true,
           drop_debugger: true
         }
       }
     }
   });
   ```

2. Configure chunk size warnings:
   ```javascript
   build: {
     chunkSizeWarningLimit: 500,
     rollupOptions: {
       output: {
         manualChunks: (id) => {
           // Strategic chunking
         }
       }
     }
   }
   ```

3. Enable source maps only in development:
   ```javascript
   build: {
     sourcemap: process.env.NODE_ENV === 'development'
   }
   ```

## 11. Optimize for Core Web Vitals

1. Improve LCP (Largest Contentful Paint):
   - Preload hero images
   - Optimize above-the-fold content
   - Use CDN for assets
   - Implement proper caching

2. Improve FID (First Input Delay):
   - Minimize JavaScript execution
   - Break up long tasks
   - Use web workers for heavy computation
   - Defer non-critical scripts

3. Improve CLS (Cumulative Layout Shift):
   - Add explicit dimensions to images:
   ```svelte
   <img src="image.jpg" width="800" height="600" alt="..." />
   ```
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

## 12. Implement Performance Monitoring

1. Add performance tracking:
   ```typescript
   // src/hooks.server.ts
   export async function handle({ event, resolve }) {
     const start = Date.now();
     const response = await resolve(event);
     const duration = Date.now() - start;
     
     console.log(`${event.request.method} ${event.url.pathname} - ${duration}ms`);
     
     return response;
   }
   ```

2. Set up Web Vitals tracking:
   ```bash
   npm install web-vitals
   ```
   ```javascript
   // +layout.svelte
   import { onMount } from 'svelte';
   
   onMount(async () => {
     const { getCLS, getFID, getLCP } = await import('web-vitals');
     
     getCLS(console.log);
     getFID(console.log);
     getLCP(console.log);
   });
   ```

## 13. Test Performance Improvements

1. Run build and measure new bundle size:
   ```bash
   npm run build
   ```

2. Run Lighthouse audit again and compare scores.

3. Test on slow 3G network:
   - Use Chrome DevTools Network throttling
   - Test on actual devices

4. Profile rendering performance with DevTools.

5. Load test with realistic traffic (if applicable).

## 14. Document Optimizations

1. Create performance report:
   ```markdown
   ## Performance Optimization Results
   
   ### Bundle Size
   - Before: 450 KB
   - After: 280 KB
   - Improvement: 38% reduction
   
   ### Core Web Vitals
   - LCP: 3.2s → 1.8s (44% improvement)
   - FID: 150ms → 80ms (47% improvement)
   - CLS: 0.15 → 0.05 (67% improvement)
   
   ### Optimizations Applied
   1. Implemented code splitting for routes
   2. Lazy loaded below-fold components
   3. Optimized images with WebP format
   4. Implemented virtual scrolling for lists
   5. Configured aggressive caching
   6. Replaced heavy dependencies
   ```

2. Document optimization techniques used.

3. Create performance budget for future development.

## 15. Set Up Continuous Performance Monitoring

1. Add performance checks to CI/CD:
   ```yaml
   - name: Bundle size check
     run: npm run build && node scripts/check-bundle-size.js
   ```

2. Set up Lighthouse CI:
   ```bash
   npm install -D @lhci/cli
   ```

3. Configure bundle size limits:
   ```javascript
   // package.json
   "bundlewatch": {
     "files": [
       {
         "path": ".svelte-kit/output/**/*.js",
         "maxSize": "300kb"
       }
     ]
   }
   ```

4. Schedule regular performance audits.

</detailed_sequence_steps>

</task>

