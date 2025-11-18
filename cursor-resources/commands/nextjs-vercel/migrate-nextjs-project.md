<task name="Migrate Next.js Project">

<task_objective>
Provide comprehensive migration assistance for Next.js applications transitioning between major versions and patterns. Takes migration type flags (--pages-to-app, --js-to-ts, --class-to-hooks, --analyze) as input, analyzes current project structure (Pages Router vs App Router, JavaScript vs TypeScript usage, component patterns), and executes systematic migration with pre-migration analysis, incremental conversion of pages/components/API routes, validation at each step, and generates detailed migration report with recommendations for modernization.
</task_objective>

<detailed_sequence_steps>

## 1. Pre-Migration Analysis

1. Detect Next.js version and project structure
   - Read package.json to identify Next.js version
   - Check for pages/ directory (Pages Router)
   - Check for app/ directory (App Router)
   - Determine if hybrid setup exists
   - Read tsconfig.json to detect TypeScript usage

2. Analyze project complexity
   - Count total pages in pages/ directory
   - Count API routes in pages/api/
   - Check for custom _app.js/_app.tsx
   - Check for custom _document.js/_document.tsx
   - Check for custom _error.js or 404.js
   - Detect middleware.ts existence
   - Calculate complexity score (1-10 scale)

3. Identify potential migration blockers
   - Custom server usage (server.js/server.ts)
   - Custom _document with getInitialProps
   - Unusual webpack configurations
   - Deprecated Next.js features
   - Third-party dependencies with compatibility issues

4. Generate pre-migration report
   - Current structure summary (pages/app, JS/TS)
   - Total files to migrate count
   - Complexity assessment
   - Identified blockers with severity
   - Estimated migration effort
   - Recommended migration order

## 2. Pages Router to App Router Migration

1. Create backup of current project
   - Execute: tar -czf project-backup-[timestamp].tar.gz (exclude node_modules, .next, .git)
   - Store backup in safe location
   - Verify backup integrity

2. Create App Router directory structure
   - Create app/ directory at root
   - Create app/globals/ for global styles
   - Create app/api/ for API routes
   - Setup initial folder structure

3. Generate root layout (app/layout.tsx)
   - Extract _app.js logic into layout
   - Convert getInitialProps to server components if needed
   - Import global CSS
   - Setup font optimization (next/font/google)
   - Add metadata export
   - Preserve any providers or wrappers

4. Migrate individual pages
   - For each page in pages/ directory:
     - Create corresponding app/ route directory
     - Extract page component
     - Convert getServerSideProps to async server component
     - Convert getStaticProps to async server component with revalidation
     - Convert getStaticPaths to generateStaticParams
     - Transform Head component usage to metadata export
     - Remove next/router usage, replace with next/navigation
     - Update image imports to use next/image
     - Create page.tsx in appropriate route folder

5. Migrate API routes
   - For each API route in pages/api/:
     - Create corresponding app/api/ route directory
     - Convert handler function to route handlers
     - Transform: export default function handler(req, res) 
       → export async function GET/POST/etc(request: NextRequest)
     - Replace req.method checks with separate exports (GET, POST, PUT, DELETE)
     - Update request/response handling to use NextRequest/NextResponse
     - Migrate middleware logic if present
     - Create route.ts in appropriate folder

6. Handle dynamic routes
   - Convert [param].js to [param]/page.tsx
   - Convert [...slug].js to [...slug]/page.tsx
   - Update route parameter access from router.query to params prop
   - Update generateStaticParams for static generation

7. Migrate layouts and templates
   - Convert nested _app-like layouts to layout.tsx files
   - Create template.tsx for pages needing client-side state preservation
   - Setup proper layout hierarchy
   - Preserve layout nesting structure

## 3. JavaScript to TypeScript Migration

1. Initialize TypeScript configuration
   - Install TypeScript dependencies: typescript, @types/react, @types/react-dom, @types/node
   - Generate tsconfig.json with: npx tsc --init
   - Configure tsconfig.json with Next.js optimal settings
   - Set strict: true, baseUrl: ".", paths: {"@/*": ["./*"]}
   - Add Next.js plugin to compilerOptions

2. Rename files incrementally
   - Find all .js and .jsx files (exclude node_modules, .next)
   - For each file:
     - Determine if contains JSX (check for JSX syntax)
     - Rename .js to .ts or .jsx to .tsx accordingly
     - Skip if TypeScript version already exists

3. Add basic type annotations
   - Add React imports where missing in TSX files
   - Add function parameter types (start with any, refine later)
   - Add return type annotations for exported functions
   - Add interface definitions for props
   - Convert PropTypes to TypeScript interfaces

4. Refine type definitions
   - Replace any types with specific types
   - Create shared type definitions in types/ directory
   - Add generics where appropriate
   - Ensure proper typing for async functions
   - Add event handler types (React.ChangeEvent, etc.)

5. Fix TypeScript compilation errors
   - Run: npx tsc --noEmit
   - Address errors by priority (syntax errors first)
   - Fix type mismatches
   - Add missing imports
   - Resolve module resolution issues

6. Update imports and exports
   - Ensure all imports have proper extensions
   - Update default imports vs named imports
   - Fix any circular dependencies
   - Add type-only imports where needed (import type)

## 4. Class Components to Function Components Migration

1. Identify class components
   - Scan for files with "class [Name] extends Component"
   - Scan for "class [Name] extends React.Component"
   - Scan for "class [Name] extends PureComponent"
   - Create list of components to convert

2. For each class component, extract component parts
   - Identify component name
   - Extract state initialization (this.state = {...})
   - Extract lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount)
   - Extract class methods
   - Extract render method content
   - Extract propTypes or prop interfaces

3. Convert to function component structure
   - Create function component skeleton: const [Name]: React.FC<Props> = (props) => {}
   - Add React and hooks imports (useState, useEffect, etc.)

4. Convert state to useState hooks
   - For each state property:
     - Create: const [propertyName, setPropertyName] = useState(initialValue)
     - Replace all this.state.propertyName with propertyName
     - Replace all this.setState({ propertyName: value }) with setPropertyName(value)

5. Convert lifecycle methods to useEffect hooks
   - componentDidMount → useEffect(() => { ... }, [])
   - componentDidUpdate → useEffect(() => { ... }) or with dependencies
   - componentWillUnmount → useEffect(() => { return () => { ... } }, [])
   - Combine related lifecycle logic into single useEffect where appropriate

6. Convert class methods to function definitions
   - Convert: methodName = () => {} → const methodName = () => {}
   - Update all this.methodName references to just methodName
   - Replace this.props with props parameter

7. Convert render method
   - Extract JSX from render() { return (...) }
   - Place directly in return statement of function component
   - Remove all "this." references
   - Update event handlers to reference local functions

8. Handle context usage
   - Convert static contextType to useContext hook
   - Replace this.context with useContext(ContextName)

## 5. Validation and Testing

1. Run build validation
   - Execute: npm run build
   - Check for build errors
   - Verify all pages compile
   - Check bundle sizes (should be similar or smaller)
   - Review build output for warnings

2. Run TypeScript validation
   - Execute: npx tsc --noEmit
   - Fix any type errors
   - Ensure no implicit any types
   - Verify all imports resolve correctly

3. Run linting
   - Execute: npm run lint
   - Fix ESLint errors and warnings
   - Update ESLint config if needed for new patterns

4. Test application functionality
   - Start dev server: npm run dev
   - Manually test critical pages
   - Verify routing works correctly
   - Test API endpoints
   - Check dynamic routes
   - Verify data fetching works
   - Test client-side interactions

5. Run test suite (if exists)
   - Execute: npm test
   - Fix failing tests
   - Update test snapshots if needed
   - Add new tests for converted components

## 6. Cleanup and Optimization

1. Remove old Pages Router files (after validation)
   - Move pages/ directory to pages.old/ (don't delete yet)
   - Keep for reference until confident migration is complete
   - Document what was moved and when

2. Update configuration files
   - Update next.config.js for App Router optimizations
   - Remove Pages Router specific config
   - Add App Router specific config (experimental features)
   - Update any custom webpack config

3. Update imports and paths
   - Search for any hardcoded /pages/ paths
   - Update to /app/ paths
   - Fix any broken imports
   - Update documentation references

4. Optimize bundle splitting
   - Configure webpack splitChunks for App Router
   - Setup proper chunk naming
   - Implement dynamic imports where beneficial

## 7. Migration Report Generation

1. Collect migration statistics
   - Total files migrated count
   - Pages converted: count
   - Components converted: count
   - API routes migrated: count
   - TypeScript conversion: percentage complete
   - Build size before vs after

2. Document migration decisions
   - Why certain patterns were chosen
   - Trade-offs made
   - Deferred migrations (if any)
   - Custom solutions implemented

3. Create issues and warnings list
   - Files that failed migration
   - Components with warnings
   - Deprecated patterns still in use
   - Technical debt introduced

4. Generate recommendations
   - Further optimizations to consider
   - Testing improvements needed
   - Documentation updates required
   - Performance enhancements available

5. Create migration summary document
   - Executive summary of migration
   - Detailed statistics
   - Before/after comparisons
   - Known issues and workarounds
   - Next steps and follow-up tasks
   - Rollback procedure if needed

## 8. Post-Migration Tasks

1. Update documentation
   - Update README with new structure
   - Document new patterns used
   - Update contributing guides
   - Create migration notes for team

2. Update CI/CD pipelines
   - Ensure build commands work
   - Update deployment scripts
   - Verify environment variables
   - Test deployment process

3. Monitor application performance
   - Compare Core Web Vitals before/after
   - Check bundle sizes
   - Monitor runtime performance
   - Track error rates

4. Provide team training (if applicable)
   - Document new patterns for team
   - Highlight breaking changes
   - Provide examples of new patterns
   - Schedule knowledge sharing session

</detailed_sequence_steps>

</task>

