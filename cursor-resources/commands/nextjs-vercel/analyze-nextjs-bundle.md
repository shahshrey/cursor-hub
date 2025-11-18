<task name="Analyze Next.js Bundle">

<task_objective>
Analyze and optimize Next.js application bundle size with detailed recommendations for reducing JavaScript payload. Takes analysis mode flags (--build, --analyze, --report) as input, configures and runs webpack-bundle-analyzer, analyzes build output to identify bundle composition (client bundles, server bundles, vendor dependencies, page-specific chunks), calculates metrics against performance thresholds, identifies optimization opportunities (large dependencies, duplicate code, tree-shaking opportunities, code splitting gaps), and generates comprehensive report with prioritized action items and implementation examples.
</task_objective>

<detailed_sequence_steps>

## 1. Pre-Analysis Setup and Configuration

1. Analyze current project state
   - Read next.config.js for existing configuration
   - Parse package.json for dependencies and scripts
   - Check tsconfig.json for TypeScript settings
   - Verify if .next/ build directory exists
   - Check build recency (timestamp)

2. Verify bundle analyzer installation
   - Check if @next/bundle-analyzer is in devDependencies
   - If missing, install: npm install --save-dev @next/bundle-analyzer
   - Verify cross-env is available for setting environment variables
   - Check for other analysis tools (webpack-bundle-analyzer, source-map-explorer)

3. Configure bundle analyzer in next.config.js
   - Import @next/bundle-analyzer
   - Wrap existing Next.js config with withBundleAnalyzer
   - Enable analyzer when ANALYZE=true environment variable is set
   - Configure webpack optimization settings for better analysis

4. Add analysis scripts to package.json
   - Add "analyze": "cross-env ANALYZE=true next build"
   - Add "analyze:server": "cross-env BUNDLE_ANALYZE=server next build"
   - Add "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"
   - Add "build:analyze": "npm run build && npm run analyze"

## 2. Execute Bundle Analysis Build

1. Clean previous build artifacts
   - Remove .next/ directory: rm -rf .next
   - Remove .next/analyze/ if exists
   - Clear cache directories if needed

2. Run production build with analysis
   - Execute: ANALYZE=true npm run build
   - Monitor build progress and output
   - Watch for build warnings or errors
   - Wait for bundle analyzer to complete

3. Capture build output
   - Record build completion time
   - Capture bundle size warnings from Next.js
   - Note any performance hints from webpack
   - Save build logs for reference

4. Verify analysis reports generated
   - Check for .next/analyze/client.html
   - Check for .next/analyze/server.html (if server analysis)
   - Verify browser opened with visualization
   - Confirm report files are accessible

## 3. Analyze Bundle Composition

1. Parse client-side bundles
   - Identify main bundle (application entry point)
   - Identify framework bundle (Next.js and React runtime)
   - Identify vendor bundles (node_modules code)
   - Identify page-specific bundles (per-route chunks)
   - List shared bundles (common code across pages)

2. Calculate bundle metrics
   - Total JavaScript size (parsed, gzipped, brotli)
   - First Load JS size (critical for performance)
   - Per-page bundle sizes
   - Shared chunk sizes
   - Framework overhead size
   - Individual chunk sizes

3. Identify largest dependencies
   - Sort dependencies by size (descending)
   - List top 10 largest packages
   - Calculate percentage of total bundle for each
   - Identify unexpectedly large packages
   - Check for duplicate versions of same package

4. Analyze chunk distribution
   - Count total number of chunks
   - Analyze chunk size distribution
   - Identify oversized chunks (>250KB warning threshold)
   - Check for proper code splitting
   - Verify lazy loading implementation

5. Check for duplicate code
   - Identify modules included in multiple chunks
   - Find duplicate dependencies across chunks
   - Check for vendor code duplication
   - Identify opportunities for better splitting

## 4. Compare Against Performance Thresholds

1. Check First Load JS thresholds
   - Warning threshold: 200KB (Next.js recommendation)
   - Error threshold: 300KB (Next.js recommendation)
   - Calculate current First Load JS for each page
   - Flag pages exceeding thresholds

2. Evaluate individual chunk sizes
   - Warning threshold: 150KB per chunk
   - Error threshold: 250KB per chunk
   - List all chunks exceeding thresholds
   - Prioritize by severity

3. Assess total bundle size
   - Warning threshold: 1MB total
   - Error threshold: 2MB total
   - Calculate current total size
   - Compare against thresholds

4. Check framework overhead
   - Typical Next.js + React size: ~85-90KB gzipped
   - Identify if overhead is excessive
   - Check for unnecessary framework features

## 5. Identify Optimization Opportunities

1. Find large dependencies to replace
   - moment.js → date-fns or day.js (reduce ~70KB)
   - lodash → lodash-es or individual imports (reduce 50-70KB)
   - Full icon libraries → tree-shakable alternatives
   - Heavy UI frameworks → lighter alternatives

2. Identify tree-shaking opportunities
   - Find libraries with barrel exports (import * from)
   - Check for unused exports in modules
   - Verify sideEffects configuration in package.json
   - Find opportunities to import specific functions

3. Locate code splitting gaps
   - Find large components not using dynamic imports
   - Identify admin/dashboard code in main bundle
   - Find third-party widgets not lazy loaded
   - Check for modal/dialog components that could be split

4. Find duplicate dependencies
   - Run: npm ls [package-name] to check for duplicates
   - Identify different versions of same package
   - Find packages that can be deduplicated
   - Check peer dependency conflicts

5. Identify unused code
   - Find imported but unused functions
   - Locate dead code paths
   - Check for deprecated package usage
   - Find development-only code in production bundle

## 6. Generate Optimization Recommendations

1. Create immediate action items (high impact, easy)
   - Replace <img> tags with next/image
   - Convert full lodash imports to specific function imports
   - Replace moment.js with date-fns
   - Enable modularizeImports in next.config.js
   - Remove unused dependencies

2. Create medium-term improvements
   - Implement dynamic imports for heavy components
   - Split vendor bundles more granularly
   - Optimize third-party script loading
   - Implement route-based code splitting
   - Configure webpack splitChunks optimization

3. Create long-term strategies
   - Migrate to Server Components where possible
   - Implement micro-frontends for large apps
   - Setup performance budgets in CI/CD
   - Establish bundle size monitoring
   - Create architectural guidelines for bundle management

4. Provide code examples for each recommendation
   - Show before/after code samples
   - Include configuration snippets
   - Demonstrate import optimization patterns
   - Show dynamic import implementation
   - Provide webpack config examples

## 7. Calculate Impact Estimates

1. Estimate size reduction for each optimization
   - Calculate potential savings in KB
   - Estimate percentage improvement
   - Rank by impact (high/medium/low)

2. Estimate implementation effort
   - Easy: <1 hour (import changes, config tweaks)
   - Medium: 1-4 hours (code splitting, refactoring)
   - Hard: >4 hours (major architecture changes)

3. Calculate ROI (Return on Investment)
   - Size reduction / implementation effort
   - Prioritize high ROI optimizations
   - Create priority matrix

4. Estimate performance improvement
   - Translate bundle size reduction to load time improvement
   - Estimate impact on Core Web Vitals (LCP, TTI)
   - Calculate estimated improvement in Lighthouse score

## 8. Configure Webpack Optimizations

1. Optimize splitChunks configuration
   - Create vendor chunk for node_modules
   - Create common chunk for shared code (minChunks: 2)
   - Create UI libraries chunk (react, react-dom, UI frameworks)
   - Create utils chunk (lodash, date-fns, helpers)
   - Set appropriate priority for each cache group

2. Enable additional optimizations
   - Enable concatenateModules for scope hoisting
   - Configure compression plugin (gzip/brotli)
   - Optimize module IDs (deterministic)
   - Enable tree-shaking with sideEffects: false

3. Configure package-specific optimizations
   - Enable optimizePackageImports for icon libraries
   - Configure modularizeImports for UI libraries
   - Setup custom import patterns
   - Add transforms for specific packages

4. Update next.config.js with optimizations
   - Add experimental.optimizePackageImports array
   - Configure compiler.removeConsole for production
   - Enable experimental.optimizeCss if applicable
   - Add webpack configuration function

## 9. Setup Continuous Bundle Monitoring

1. Create performance budgets
   - Set maxAssetSize in webpack config (250KB)
   - Set maxEntrypointSize (350KB)
   - Configure hints: 'error' for production
   - Define budgets per page or route

2. Setup automated bundle analysis in CI/CD
   - Create GitHub Action workflow for bundle analysis
   - Install @lhci/cli for Lighthouse CI
   - Configure bundle-analyzer in CI
   - Setup PR comments with bundle size changes

3. Create bundle size tracking
   - Store bundle sizes in git or database
   - Track size changes over time
   - Create alerts for size regressions
   - Generate trend reports

4. Configure alerting
   - Alert on bundle size threshold breaches
   - Notify on significant size increases (>5%)
   - Flag new large dependencies
   - Monitor for duplicate packages

## 10. Generate Comprehensive Analysis Report

1. Create executive summary section
   - Current total bundle size
   - First Load JS size per page
   - Overall grade (A-F based on thresholds)
   - Top 3 optimization opportunities
   - Estimated total size reduction potential

2. Create detailed metrics section
   - Bundle size breakdown table
   - Chart of largest dependencies
   - Chunk size distribution
   - Framework overhead analysis
   - Page-by-page bundle analysis

3. Create optimization opportunities section
   - For each opportunity:
     - Description of issue
     - Current size impact
     - Potential size reduction
     - Implementation difficulty
     - Priority level
     - Code examples (before/after)
     - Step-by-step implementation guide

4. Create dependency analysis section
   - List of all production dependencies with sizes
   - Highlight largest dependencies
   - Flag duplicate dependencies
   - Suggest lighter alternatives
   - Show import optimization examples

5. Create implementation roadmap
   - Week 1: Quick wins (import optimization, remove unused deps)
   - Week 2: Code splitting implementation
   - Week 3: Library replacements
   - Week 4: Webpack configuration optimization
   - Ongoing: Monitoring and regression prevention

6. Create monitoring and maintenance section
   - How to run bundle analysis regularly
   - Setting up performance budgets
   - Configuring CI/CD integration
   - Creating bundle size tracking dashboard
   - Establishing review process for new dependencies

## 11. Provide Actionable Next Steps

1. Prioritize recommendations by impact
   - Critical: Items exceeding error thresholds
   - High: Items exceeding warning thresholds
   - Medium: Significant optimization opportunities (20-50KB savings)
   - Low: Minor optimizations (<20KB savings)

2. Create implementation checklist
   - [ ] Remove unused dependencies
   - [ ] Optimize imports (lodash, icons, etc.)
   - [ ] Implement code splitting for heavy components
   - [ ] Replace large dependencies with alternatives
   - [ ] Configure webpack optimizations
   - [ ] Setup performance budgets
   - [ ] Add bundle analysis to CI/CD
   - [ ] Enable ongoing monitoring

3. Provide testing guidelines
   - How to verify each optimization
   - What metrics to track
   - How to measure improvements
   - Regression testing approach

4. Create follow-up schedule
   - Weekly: Monitor bundle sizes
   - Monthly: Review new dependencies
   - Quarterly: Comprehensive bundle audit
   - Annually: Architecture review for bundle management

</detailed_sequence_steps>

</task>

