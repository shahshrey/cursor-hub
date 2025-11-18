<task name="Audit Next.js Performance">

<task_objective>
Conduct comprehensive performance analysis of Next.js applications with actionable optimization recommendations. Takes audit type flags (--lighthouse, --bundle, --runtime, --all) as input, analyzes application build output, bundle composition, runtime performance metrics, and Core Web Vitals, then generates detailed report with performance scores, bottleneck identification, specific optimization strategies for images/CSS/JavaScript, and implementation roadmap prioritized by impact.
</task_objective>

<detailed_sequence_steps>

## 1. Pre-Audit Setup and Validation

1. Verify application build status
   - Check if .next/ directory exists
   - Verify build is recent (check timestamp)
   - If no build or outdated, run: npm run build
   - Ensure build completes successfully

2. Check application runtime status
   - Verify if app is running on port 3000
   - If not running, start with: npm run dev (for development audit) or npm start (for production audit)
   - Wait for server to be ready
   - Verify health check endpoint responds

3. Install required audit tools
   - Check for Lighthouse CLI: lighthouse --version
   - If not installed: npm install -g lighthouse
   - Check for bundle analyzer: verify @next/bundle-analyzer in package.json
   - Install if missing: npm install --save-dev @next/bundle-analyzer

4. Read and analyze configuration files
   - Parse next.config.js for current optimizations
   - Review package.json for dependencies and scripts
   - Check tsconfig.json for TypeScript settings
   - Review vercel.json if present

## 2. Lighthouse Performance Audit

1. Run comprehensive Lighthouse audit
   - Execute: lighthouse http://localhost:3000 --output=json --output=html --output-path=./lighthouse-audit --chrome-flags="--headless" --preset=perf
   - Wait for completion (may take 30-60 seconds)
   - Verify reports generated successfully

2. Run mobile-specific audit
   - Execute: lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-mobile --preset=perf --form-factor=mobile --throttling-method=devtools
   - Simulate 3G network conditions
   - Test mobile viewport dimensions

3. Parse Lighthouse results
   - Extract performance score (0-100)
   - Extract Core Web Vitals: LCP, FID, CLS, TTFB
   - Extract loading metrics: FCP, Speed Index, TTI, TBT
   - Identify opportunities (largest improvements available)
   - Identify diagnostics (issues affecting performance)

4. Categorize Lighthouse findings
   - Critical issues (red flags, >1s impact)
   - Medium priority (orange flags, 200ms-1s impact)
   - Low priority optimizations (<200ms impact)
   - Best practices violations

## 3. Bundle Size Analysis

1. Configure bundle analyzer
   - Ensure next.config.js includes @next/bundle-analyzer wrapper
   - Set ANALYZE=true environment variable
   - Configure webpack to generate analysis data

2. Generate bundle analysis
   - Execute: ANALYZE=true npm run build
   - Wait for build completion
   - Analyzer should auto-open browser with visualization
   - If not, check .next/analyze/ for reports

3. Analyze bundle composition
   - Check total bundle size
   - Identify First Load JS size (critical metric)
   - Break down by chunk types: main, framework, vendor, pages
   - Identify largest dependencies
   - Check for duplicate dependencies

4. Calculate bundle metrics
   - Total JavaScript size (compressed and uncompressed)
   - Per-page bundle sizes
   - Shared chunks size
   - Framework overhead
   - Compare against Next.js recommended thresholds (First Load JS < 200KB warning, < 300KB error)

5. Identify optimization opportunities
   - Large dependencies that could be replaced
   - Unused code that could be tree-shaken
   - Opportunities for dynamic imports
   - Code that should be moved to Server Components
   - Duplicate code across chunks

## 4. Runtime Performance Analysis

1. Implement performance monitoring
   - Check for Web Vitals tracking in _app.tsx
   - Verify reportWebVitals is exported
   - Check if analytics endpoint exists

2. Collect Core Web Vitals data
   - Largest Contentful Paint (LCP): target < 2.5s
   - First Input Delay (FID): target < 100ms
   - Cumulative Layout Shift (CLS): target < 0.1
   - Time to First Byte (TTFB): target < 800ms
   - First Contentful Paint (FCP): target < 1.8s

3. Analyze JavaScript execution
   - Measure Total Blocking Time (TBT): target < 200ms
   - Identify long tasks (>50ms)
   - Check for main thread blocking
   - Measure hydration time

4. Test under various conditions
   - Fast 3G network simulation
   - Slow 3G network simulation
   - Desktop performance
   - Mobile performance
   - Different device capabilities

## 5. Resource Optimization Analysis

1. Analyze image optimization
   - Scan codebase for <img> tags vs next/image usage
   - Check image formats (PNG, JPG vs WebP, AVIF)
   - Verify proper width/height attributes
   - Check for missing priority attribute on LCP images
   - Identify oversized images
   - Check responsive image sizing

2. Analyze CSS optimization
   - Measure CSS bundle size
   - Check for unused CSS (if Tailwind, verify purging)
   - Identify critical CSS not inlined
   - Check for CSS-in-JS bundle impact
   - Verify CSS module usage

3. Analyze JavaScript optimization
   - Check for large third-party scripts
   - Identify unoptimized libraries (moment.js vs date-fns)
   - Check for inefficient imports (import * vs named imports)
   - Verify code splitting implementation
   - Check for unnecessary polyfills

4. Analyze font optimization
   - Check for next/font usage vs external font loading
   - Verify font-display: swap or optional
   - Check for excessive font variants loaded
   - Measure font loading impact on LCP

## 6. Server-Side Performance Analysis

1. Analyze data fetching patterns
   - Check getServerSideProps usage and duration
   - Verify appropriate use of getStaticProps with revalidation
   - Check API route response times
   - Identify N+1 query problems
   - Check database query optimization

2. Analyze caching strategy
   - Review Cache-Control headers
   - Check ISR (Incremental Static Regeneration) usage
   - Verify CDN caching configuration
   - Check API response caching

3. Analyze middleware performance
   - Measure middleware execution time
   - Check for blocking operations in middleware
   - Verify edge function efficiency

## 7. Generate Optimization Recommendations

1. Prioritize recommendations by impact
   - High impact (>500ms improvement): Critical fixes
   - Medium impact (200-500ms improvement): Important optimizations
   - Low impact (<200ms improvement): Nice-to-have improvements

2. Create image optimization recommendations
   - Replace <img> with next/image: estimate 30-50% size reduction
   - Convert images to WebP/AVIF: estimate 20-40% size reduction
   - Implement lazy loading: improve initial load time
   - Add blur placeholders: improve perceived performance
   - Optimize LCP image with priority prop

3. Create bundle optimization recommendations
   - Replace large libraries with smaller alternatives
   - Implement dynamic imports for non-critical code
   - Enable modularizeImports in next.config.js
   - Remove unused dependencies
   - Optimize tree-shaking

4. Create code splitting recommendations
   - Identify components for dynamic imports
   - Split vendor bundles more granularly
   - Implement route-based code splitting
   - Use React.lazy for client components

5. Create caching recommendations
   - Implement aggressive caching with ISR
   - Configure appropriate Cache-Control headers
   - Use SWR or React Query for client-side caching
   - Implement service worker for offline support

## 8. Performance Report Generation

1. Create executive summary
   - Overall performance score (0-100)
   - Core Web Vitals status (pass/fail for each)
   - Top 3 critical issues
   - Estimated total improvement potential (in seconds)
   - Performance grade (A-F)

2. Create detailed metrics section
   - All Lighthouse scores and metrics
   - Bundle size breakdown with visualizations
   - Core Web Vitals detailed analysis
   - Network waterfall summary
   - Resource timing breakdown

3. Create optimization opportunities section
   - For each opportunity:
     - Issue description
     - Current impact (time/size)
     - Potential improvement
     - Implementation difficulty (easy/medium/hard)
     - Code examples
     - Estimated effort
     - Priority ranking

4. Create implementation roadmap
   - Week 1: Critical performance fixes (high impact, quick wins)
   - Week 2-3: Image and asset optimization
   - Week 4: Bundle optimization and code splitting
   - Ongoing: Performance monitoring and regression prevention

5. Create monitoring setup recommendations
   - Configure Vercel Analytics or alternative
   - Setup performance budgets in CI/CD
   - Implement automated Lighthouse CI
   - Create performance dashboard

## 9. Validation and Follow-up

1. Provide testing recommendations
   - How to test each optimization
   - What metrics to track
   - How to measure improvement
   - Regression testing strategy

2. Create performance budget
   - Set bundle size limits (per page and total)
   - Set Core Web Vitals targets
   - Define acceptable ranges for all metrics
   - Configure webpack performance hints

3. Setup continuous monitoring
   - Add performance tests to CI/CD
   - Configure alerts for performance regression
   - Setup automated Lighthouse runs
   - Track metrics over time

4. Generate summary checklist
   - [ ] All images using next/image
   - [ ] Bundle size under thresholds
   - [ ] Core Web Vitals passing
   - [ ] Code splitting implemented
   - [ ] Caching strategy optimized
   - [ ] Third-party scripts optimized
   - [ ] Performance monitoring active
   - [ ] Performance budgets enforced

</detailed_sequence_steps>

</task>

