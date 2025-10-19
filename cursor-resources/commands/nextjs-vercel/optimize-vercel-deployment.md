<task name="Optimize Vercel Deployment">

<task_objective>
Optimize and deploy Next.js applications to Vercel with comprehensive performance monitoring and configuration best practices. Takes target environment argument (production, preview, development) and optional flags (--analyze, --preview) as input, performs pre-deployment validation (build checks, environment variables, security headers), executes optimized deployment with proper configuration, implements post-deployment monitoring (Core Web Vitals tracking, health checks, performance validation), and provides rollback strategy with detailed deployment report.
</task_objective>

<detailed_sequence_steps>

## 1. Pre-Deployment Analysis and Validation

1. Verify current deployment state
   - Check current working directory
   - Verify Git status (check for uncommitted changes)
   - Identify current Git branch
   - Check Vercel CLI installation and version
   - Verify existing build output in .next/

2. Analyze project configuration
   - Read and validate next.config.js structure
   - Check for vercel.json existence and configuration
   - Parse package.json for scripts and dependencies
   - Review .env.local and environment variable usage
   - Check .env.example for documentation

3. Validate environment variables
   - Verify all required environment variables are defined
   - Check Vercel dashboard for production/preview/development variables
   - Ensure no secrets in code or config files
   - Validate .gitignore includes .env.local

4. Run pre-deployment checklist
   - [ ] Build passes without errors
   - [ ] All tests pass (if test suite exists)
   - [ ] TypeScript compiles without errors
   - [ ] Linting passes
   - [ ] No console.errors in production code
   - [ ] Security headers configured
   - [ ] Performance baseline established

## 2. Configuration Optimization

1. Optimize next.config.js
   - Configure image optimization (formats: webp, avif)
   - Set device sizes for responsive images
   - Configure experimental.optimizePackageImports for common libraries
   - Enable SWC minification (default in Next.js 13+)
   - Configure compiler.removeConsole for production

2. Create or optimize vercel.json
   - Set framework: "nextjs"
   - Configure build and dev commands
   - Set install command
   - Define regions for deployment (e.g., ["iad1", "sfo1", "lhr1"])
   - Configure function settings (runtime, maxDuration, memory)
   - Setup cron jobs if needed

3. Configure security headers
   - Add X-Frame-Options: DENY
   - Add X-Content-Type-Options: nosniff
   - Add Referrer-Policy: strict-origin-when-cross-origin
   - Add Strict-Transport-Security for HTTPS
   - Add X-XSS-Protection: 1; mode=block
   - Configure Content-Security-Policy
   - Add Permissions-Policy for sensitive features

4. Configure caching headers
   - Set Cache-Control for API routes (s-maxage, stale-while-revalidate)
   - Configure static asset caching
   - Setup ISR revalidation times
   - Configure CDN caching strategy

5. Setup redirects and rewrites
   - Configure legacy URL redirects
   - Setup www to non-www redirect (or vice versa)
   - Configure API proxy rewrites if needed
   - Add trailing slash redirects

## 3. Build Optimization

1. Run production build
   - Clean previous build: rm -rf .next
   - Execute: npm run build
   - Monitor build output for warnings
   - Check bundle sizes against thresholds
   - Verify no build errors

2. Run bundle analysis (optional)
   - Execute: ANALYZE=true npm run build
   - Review bundle sizes in analyzer
   - Identify opportunities for optimization
   - Check for unexpected large dependencies

3. Run TypeScript type checking
   - Execute: npm run type-check or npx tsc --noEmit
   - Fix any type errors
   - Ensure strict mode compliance

4. Run linting
   - Execute: npm run lint
   - Fix critical errors
   - Review warnings

5. Validate build output
   - Check .next/static/ for proper chunking
   - Verify no excessive chunk sizes
   - Confirm proper code splitting
   - Check server-side rendering works

## 4. Performance Monitoring Setup

1. Install Vercel Analytics
   - Add @vercel/analytics package if not present
   - Import Analytics component in app/layout.tsx or _app.tsx
   - Add <Analytics /> component to layout
   - Verify analytics script loads

2. Install Speed Insights
   - Add @vercel/speed-insights package
   - Import SpeedInsights component
   - Add <SpeedInsights /> component to layout
   - Configure sampling rate if needed

3. Setup custom Web Vitals reporting
   - Create or update reportWebVitals function in _app.tsx
   - Implement reporting to analytics endpoint
   - Track LCP, FID, CLS, TTFB, FCP metrics
   - Add custom performance markers if needed

4. Configure error tracking (optional)
   - Setup Sentry or error tracking service
   - Add error boundary components
   - Configure source maps for production
   - Test error reporting flow

## 5. Deployment Execution

1. Determine deployment type and target
   - Production deployment: main/master branch → production environment
   - Preview deployment: feature branches → preview environment
   - Development deployment: specific environment for testing

2. Execute production deployment
   - Run: vercel --prod
   - Or: vercel --prod --env-file .env.production
   - Monitor deployment progress
   - Note deployment URL
   - Wait for build completion

3. Execute preview deployment
   - Run: vercel (without --prod flag)
   - Or: vercel --alias preview-branch-name.vercel.app
   - Get shareable preview URL
   - Verify preview environment variables applied

4. Handle deployment with specific settings
   - Deploy with build analytics: ANALYZE=true vercel --prod
   - Deploy with meta tags: vercel --prod --meta performance=true
   - Deploy to specific project: vercel --prod --cwd ./path/to/project

5. Monitor deployment process
   - Watch build logs in real-time
   - Check for build warnings or errors
   - Verify deployment completes successfully
   - Record deployment URL and ID

## 6. Post-Deployment Validation

1. Run health checks
   - Verify application loads at deployment URL
   - Check homepage responds with 200 status
   - Test navigation to key pages
   - Verify API endpoints respond correctly
   - Check database connectivity (if applicable)
   - Test authentication flow (if applicable)

2. Validate Core Web Vitals
   - Wait 5-10 minutes for initial metrics
   - Check Vercel Analytics dashboard
   - Verify LCP < 2.5s (good threshold)
   - Verify FID < 100ms (good threshold)
   - Verify CLS < 0.1 (good threshold)

3. Run Lighthouse audit on deployed URL
   - Execute: lighthouse [deployment-url] --view
   - Check performance score (target: >90)
   - Verify accessibility score
   - Check best practices score
   - Review SEO score

4. Test critical user flows
   - Test user registration/login
   - Test key interactive features
   - Verify forms work correctly
   - Test payment flows (if applicable)
   - Validate third-party integrations

5. Verify security headers
   - Check response headers with curl or browser DevTools
   - Confirm all security headers present
   - Test CSP doesn't block legitimate resources
   - Verify HTTPS redirects working

## 7. Performance Monitoring and Analysis

1. Monitor initial traffic
   - Watch Analytics dashboard for first visitors
   - Check error rates in first 24 hours
   - Monitor Core Web Vitals trends
   - Track geographic performance distribution

2. Compare performance metrics
   - Compare against previous deployment
   - Check for performance regressions
   - Validate optimization improvements
   - Track bundle size changes

3. Monitor server-side metrics
   - Check function invocation counts
   - Monitor function execution times
   - Track cold start frequency
   - Review error logs

4. Analyze edge network performance
   - Check edge cache hit rates
   - Monitor bandwidth usage
   - Review request distribution across regions
   - Validate CDN performance

## 8. Rollback Strategy and Incident Response

1. Document current deployment
   - Save deployment URL
   - Save deployment ID
   - Note deployment timestamp
   - Record environment variable snapshot

2. Prepare rollback procedure
   - List recent deployments: vercel list
   - Identify previous stable deployment
   - Document rollback command: vercel rollback [deployment-url]
   - Test rollback in preview first

3. Execute rollback if needed
   - Run: vercel rollback [previous-deployment-url]
   - Or use instant alias switching: vercel alias set [previous-deployment-url] [production-domain]
   - Verify rollback successful
   - Monitor for issue resolution

4. Post-rollback actions
   - Investigate root cause of issue
   - Fix issues in separate branch
   - Test fixes thoroughly
   - Redeploy when ready

## 9. Deployment Report Generation

1. Collect deployment metrics
   - Deployment ID and URL
   - Build time and duration
   - Bundle sizes (before/after if optimization performed)
   - Deployment timestamp
   - Git commit hash and message
   - Deployment status (success/failure)

2. Document environment configuration
   - Target environment (production/preview/development)
   - Regions deployed to
   - Environment variables used (count, not values)
   - Node.js version
   - Next.js version

3. Record performance baseline
   - Initial Core Web Vitals scores
   - Lighthouse scores
   - Bundle sizes
   - API response times
   - Error rates

4. List post-deployment tasks
   - [ ] Monitor analytics for first 24 hours
   - [ ] Review error logs daily for first week
   - [ ] Compare performance against baseline
   - [ ] Update documentation if needed
   - [ ] Communicate deployment to team/stakeholders

5. Create deployment summary
   - Success/failure status
   - Key metrics and improvements
   - Any issues encountered and resolutions
   - Recommendations for future deployments
   - Links to deployment, analytics, and logs

## 10. Optimization Recommendations

1. Provide environment-specific optimizations
   - Production: aggressive caching, monitoring, error tracking
   - Preview: feature flags, A/B testing, stakeholder sharing
   - Development: fast iteration, debug tools, local testing

2. Suggest cost optimizations
   - Optimize function execution duration
   - Reduce bandwidth with better compression
   - Minimize build minutes with caching
   - Optimize edge function usage

3. Recommend ongoing maintenance
   - Regular dependency updates
   - Periodic bundle size audits
   - Monthly performance reviews
   - Quarterly security audits

4. Provide scaling recommendations
   - When to consider upgrading Vercel plan
   - Database scaling considerations
   - CDN optimization strategies
   - Global distribution improvements

</detailed_sequence_steps>

</task>

