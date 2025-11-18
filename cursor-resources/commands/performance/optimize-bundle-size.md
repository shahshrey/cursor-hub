<task name="Optimize Bundle Size">

<task_objective>
Reduce and optimize bundle sizes through analysis, configuration, and code splitting strategies. This workflow takes the build tool type as input (Webpack, Vite, or Rollup), analyzes current bundle composition and sizes, implements optimizations including code splitting, tree shaking, and dependency optimization, and outputs significantly reduced bundle sizes with monitoring and validation.
</task_objective>

<detailed_sequence_steps>
# Optimize Bundle Size - Detailed Sequence of Steps

## 1. Bundle Analysis and Assessment

1. Analyze current bundle size and composition using webpack-bundle-analyzer or similar tools.

2. Identify large dependencies and unused code across all bundles.

3. Assess current build configuration and optimization settings.

4. Create baseline measurements for optimization tracking and comparison.

5. Document current performance metrics and loading times for validation.

## 2. Build Tool Configuration

1. Configure build tool optimization settings for production builds.

2. Enable code splitting and chunk optimization features in build configuration.

3. Configure tree shaking and dead code elimination settings.

4. Set up bundle analyzers and visualization tools for ongoing monitoring.

5. Optimize build performance and output sizes through configuration tuning.

## 3. Code Splitting and Lazy Loading

1. Implement route-based code splitting for single-page applications to load only needed code.

2. Set up dynamic imports for components and modules using import() syntax.

3. Configure lazy loading for non-critical resources to defer loading.

4. Optimize chunk sizes and loading strategies for best user experience.

5. Implement progressive loading patterns to prioritize critical content.

## 4. Tree Shaking and Dead Code Elimination

1. Configure build tools for optimal tree shaking capabilities.

2. Mark packages as side-effect free where appropriate in package.json.

3. Optimize import statements for better tree shaking by using named imports.

4. Use ES6 modules and avoid CommonJS where possible for better optimization.

5. Implement babel plugins for automatic import optimization (babel-plugin-import).

## 5. Dependency Optimization

1. Analyze and audit package dependencies for size impact using tools like bundlephobia.

2. Replace large libraries with smaller alternatives where functionality allows.

3. Use specific imports instead of importing entire libraries to reduce bundle size.

4. Implement dependency deduplication strategies to avoid duplicate code.

5. Configure external dependencies and CDN usage for commonly shared libraries.

## 6. Asset Optimization

1. Optimize images through compression and format conversion (WebP, AVIF).

2. Implement responsive image loading strategies with srcset and picture elements.

3. Configure asset minification and compression for all static resources.

4. Set up efficient file loaders and processors for different asset types.

5. Optimize font loading and subsetting to include only needed characters.

## 7. Module Federation and Micro-frontends

1. Implement module federation for large applications to share code across applications.

2. Configure shared dependencies and runtime optimization to avoid duplication.

3. Set up micro-frontend architecture for code sharing across teams.

4. Optimize remote module loading and caching strategies.

5. Implement federation performance monitoring to track shared module impact.

## 8. Performance Monitoring and Measurement

1. Set up bundle size monitoring and tracking over time.

2. Configure automated bundle analysis in CI/CD pipelines.

3. Monitor bundle size changes over time with historical tracking.

4. Set up performance budgets and alerts to prevent size creep.

5. Track loading performance metrics in production environments.

## 9. Progressive Loading Strategies

1. Implement resource hints (preload, prefetch, dns-prefetch) for critical resources.

2. Configure service workers for caching strategies to improve repeat visits.

3. Set up intersection observer for lazy loading of images and components.

4. Optimize critical resource loading priorities using priority hints.

5. Implement adaptive loading based on connection speed and device capabilities.

## 10. Validation and Continuous Monitoring

1. Set up automated bundle size validation in CI/CD pipelines.

2. Configure bundle size thresholds and alerts to catch regressions.

3. Implement bundle size regression testing with fail conditions.

4. Monitor real-world loading performance with RUM tools.

5. Set up automated optimization recommendations based on analysis.

</detailed_sequence_steps>

</task>
