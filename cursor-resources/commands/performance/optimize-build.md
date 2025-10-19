<task name="Optimize Build">

<task_objective>
Optimize build processes and speed for faster development cycles and deployments. This workflow takes the build system type as input, analyzes current build performance and configuration, implements optimizations across dependencies, caching, bundling, and asset processing, and outputs significantly improved build times with comprehensive validation and monitoring.
</task_objective>

<detailed_sequence_steps>
# Optimize Build - Detailed Sequence of Steps

## 1. Build System Analysis

1. Identify the build system in use (Webpack, Vite, Rollup, Gradle, Maven, Cargo, etc.).

2. Review build configuration files and settings to understand current optimization level.

3. Analyze current build times and output sizes as baseline metrics.

4. Map the complete build pipeline and dependencies to identify optimization opportunities.

## 2. Performance Baseline

1. Measure current build times for clean build (from scratch) scenario.

2. Measure current build times for incremental build (with cache) scenario.

3. Compare development vs production build times and configurations.

4. Document bundle sizes and asset sizes as baseline metrics.

5. Identify the slowest parts of the build process using profiling tools.

## 3. Dependency Optimization

1. Analyze build dependencies and their impact on build time.

2. Remove unused dependencies from build process to reduce processing overhead.

3. Update build tools to latest stable versions for performance improvements.

4. Consider alternative, faster build tools where appropriate (e.g., esbuild, swc).

## 4. Caching Strategy

1. Enable and optimize build caching for faster incremental builds.

2. Configure persistent cache for CI/CD environments to speed up pipeline builds.

3. Set up shared cache for team development to benefit all developers.

4. Implement incremental compilation where possible (TypeScript, Babel).

## 5. Bundle Analysis

1. Analyze bundle composition and sizes using bundle analyzer tools.

2. Identify large dependencies and duplicates that inflate bundle size.

3. Use bundle analyzers specific to your build tool (webpack-bundle-analyzer, rollup-plugin-visualizer).

4. Look for opportunities to split bundles and reduce initial load.

## 6. Code Splitting and Lazy Loading

1. Implement dynamic imports and code splitting for on-demand loading.

2. Set up route-based splitting for SPAs to load code only when needed.

3. Configure vendor chunk separation to improve caching.

4. Optimize chunk sizes and loading strategies for best performance.

## 7. Asset Optimization

1. Optimize images through compression, format conversion, and lazy loading.

2. Minify CSS and JavaScript for smaller file sizes.

3. Configure tree shaking to remove dead code automatically.

4. Implement asset compression (gzip, brotli) for reduced transfer sizes.

## 8. Development Build Optimization

1. Enable fast refresh/hot reloading for instant feedback during development.

2. Use development-specific optimizations to prioritize speed over optimization.

3. Configure source maps for better debugging without impacting build speed.

4. Optimize development server settings for faster iteration cycles.

## 9. Production Build Optimization

1. Enable all production optimizations for smallest bundle size.

2. Configure dead code elimination to remove unused code.

3. Set up proper minification and compression for all assets.

4. Optimize for smaller bundle sizes while maintaining functionality.

## 10. Parallel Processing

1. Enable parallel processing where supported by the build tool.

2. Configure worker threads for build tasks to utilize multiple CPU cores.

3. Optimize for multi-core systems with parallel job configuration.

4. Use parallel compilation for TypeScript/Babel to speed up transpilation.

## 11. File System Optimization

1. Optimize file watching and polling for efficient change detection.

2. Configure proper include/exclude patterns to avoid unnecessary processing.

3. Use efficient file loaders and processors appropriate for file types.

4. Minimize file I/O operations to reduce build overhead.

## 12. CI/CD Build Optimization

1. Optimize CI build environments and resources (CPU, memory allocation).

2. Implement proper caching strategies for CI to reuse artifacts across builds.

3. Use build matrices efficiently to avoid redundant builds.

4. Configure parallel CI jobs where beneficial to reduce total pipeline time.

## 13. Memory Usage Optimization

1. Monitor and optimize memory usage during builds to prevent slowdowns.

2. Configure heap sizes for build tools appropriate for project size.

3. Identify and fix memory leaks in build process.

4. Use memory-efficient compilation options where available.

## 14. Output Optimization

1. Configure compression and encoding for optimized output files.

2. Optimize file naming and hashing strategies for efficient caching.

3. Set up proper asset manifests for cache management.

4. Implement efficient asset serving strategies.

## 15. Monitoring and Profiling

1. Set up build time monitoring to track performance over time.

2. Use build profiling tools to identify bottlenecks in the build process.

3. Track bundle size changes over time to prevent size creep.

4. Monitor build performance regressions and alert on degradation.

## 16. Tool-Specific Optimizations

1. For Webpack: Configure optimization.splitChunks, use thread-loader for parallel processing, enable optimization.usedExports for tree shaking, configure resolve.modules and resolve.extensions.

2. For Vite: Configure build.rollupOptions, use esbuild for faster transpilation, optimize dependency pre-bundling, configure build.chunkSizeWarningLimit.

3. For TypeScript: Use incremental compilation, configure project references, optimize tsconfig.json settings, use skipLibCheck when appropriate.

## 17. Environment-Specific Configuration

1. Separate development and production configurations for appropriate optimizations.

2. Use environment variables for build optimization flags.

3. Configure feature flags for conditional builds to reduce unnecessary code.

4. Optimize for target environments (browser versions, Node.js versions).

## 18. Testing Build Optimizations

1. Test build outputs for correctness after optimizations.

2. Verify all optimizations work in target environments.

3. Check for any breaking changes from optimizations.

4. Measure and document performance improvements with before/after metrics.

## 19. Documentation and Maintenance

1. Document all optimization changes and their impact on build performance.

2. Create build performance monitoring dashboard for team visibility.

3. Set up alerts for build performance regressions to catch issues early.

4. Regular review and updates of build configuration to maintain optimal performance.

</detailed_sequence_steps>

</task>
