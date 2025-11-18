<task name="Performance Audit">

<task_objective>
Conduct comprehensive performance audit with metrics, bottleneck identification, and optimization recommendations. This workflow takes the target area as input (frontend, backend, or full), analyzes technology stack and code performance, examines database, network, and memory performance, runs profiling and benchmarking, and outputs prioritized optimization recommendations with measurable impact.
</task_objective>

<detailed_sequence_steps>
# Performance Audit - Detailed Sequence of Steps

## 1. Technology Stack Analysis

1. Identify the primary language, framework, and runtime environment from project files.

2. Review build tools and optimization configurations (webpack.config.js, vite.config.js, next.config.js).

3. Check for performance monitoring tools already in place through dependencies and configuration.

4. Analyze bundle analysis output if available: `npm run build -- --analyze`.

5. Review dependencies and their sizes: `npm list --depth=0 --prod`.

## 2. Code Performance Analysis

1. Identify inefficient algorithms and data structures through code review.

2. Look for nested loops and O(n²) operations that could be optimized.

3. Check for unnecessary computations and redundant operations.

4. Review memory allocation patterns and potential leaks.

5. Analyze computational complexity of critical code paths.

## 3. Database Performance

1. Analyze database queries for efficiency using slow query logs.

2. Check for missing indexes and slow queries through EXPLAIN analysis.

3. Review connection pooling and database configuration settings.

4. Identify N+1 query problems and excessive database calls in application code.

5. Examine query patterns and opportunities for caching.

## 4. Frontend Performance (if applicable)

1. Analyze bundle size and chunk optimization using bundle analyzer.

2. Check for unused code and dependencies that can be removed.

3. Review image optimization and lazy loading implementation.

4. Examine render performance and re-render cycles using React DevTools or similar.

5. Check for memory leaks in UI components through DevTools profiling.

## 5. Network Performance

1. Review API call patterns and caching strategies in network tab.

2. Check for unnecessary network requests that could be eliminated or batched.

3. Analyze payload sizes and compression settings.

4. Examine CDN usage and static asset optimization.

5. Identify opportunities for request deduplication and parallelization.

## 6. Asynchronous Operations

1. Review async/await usage and promise handling patterns.

2. Check for blocking operations and race conditions.

3. Analyze task queuing and background processing efficiency.

4. Identify opportunities for parallel execution of independent operations.

5. Examine error handling in asynchronous code paths.

## 7. Memory Usage

1. Check for memory leaks and excessive memory consumption using profiling tools.

2. Review garbage collection patterns and frequency.

3. Analyze object lifecycle and cleanup procedures.

4. Identify large objects and unnecessary data retention.

5. Monitor memory growth over time under typical load.

## 8. Build & Deployment Performance

1. Analyze build times and optimization opportunities through build output.

2. Review dependency bundling and tree shaking effectiveness.

3. Check for development vs production optimizations.

4. Examine deployment pipeline efficiency and caching.

5. Measure build time baseline: `time npm run build`.

## 9. Performance Monitoring

1. Check existing performance metrics and monitoring setup.

2. Identify key performance indicators (KPIs) to track.

3. Review alerting and performance thresholds configuration.

4. Suggest performance testing strategies for continuous validation.

5. Evaluate observability stack for completeness.

## 10. Benchmarking & Profiling

1. Run performance profiling tools appropriate for the stack (Chrome DevTools, Node.js profiler).

2. Create benchmarks for critical code paths to measure optimization impact.

3. Measure before and after optimization impact quantitatively.

4. Document performance baselines for future comparison.

5. Identify the highest impact optimization opportunities.

## 11. Optimization Recommendations

1. Prioritize optimizations by impact and effort using impact/effort matrix.

2. Provide specific code examples and alternatives with line numbers.

3. Suggest architectural improvements for scalability.

4. Recommend appropriate performance tools and libraries.

5. Create actionable implementation plan with estimated effort and impact.

</detailed_sequence_steps>

</task>
