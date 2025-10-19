<task name="Scaffold Next.js Application">

<task_objective>
Create a new Next.js application with optimized configuration and best practices. Takes a project name as input, detects environment capabilities (Node.js, npm versions), applies optional flags (--typescript, --tailwind, --app-router), and generates a production-ready Next.js application with proper directory structure, configuration files, starter components, development scripts, and comprehensive documentation.
</task_objective>

<detailed_sequence_steps>

## 1. Environment Analysis and Setup

1. Verify current working directory and environment
   - Check Node.js version compatibility (minimum 16.x)
   - Verify npm version
   - Confirm package.json existence if working in existing project

2. Parse command arguments
   - Extract project name from arguments
   - Detect --typescript flag for TypeScript setup
   - Detect --tailwind flag for Tailwind CSS integration
   - Detect --app-router flag for App Router vs Pages Router
   - Set defaults: TypeScript enabled, App Router enabled for Next.js 13+

3. Validate project name and directory
   - Ensure project name is valid (lowercase, no spaces)
   - Check if directory already exists
   - Create project directory if needed

## 2. Initialize Next.js Project

1. Run Next.js initialization command
   - Execute: `npx create-next-app@latest [project-name]` with appropriate flags
   - Or manually initialize if custom configuration needed
   - Install core dependencies: next, react, react-dom

2. Install TypeScript dependencies (if --typescript)
   - Install: typescript, @types/react, @types/react-dom, @types/node
   - Generate tsconfig.json with optimized settings

3. Install Tailwind CSS (if --tailwind)
   - Install: tailwindcss, postcss, autoprefixer
   - Generate tailwind.config.js and postcss.config.js
   - Configure content paths for proper purging

4. Install development tools
   - Install: eslint, eslint-config-next
   - Install: prettier (optional but recommended)
   - Install: husky, lint-staged for git hooks (optional)

## 3. Configure Next.js Optimizations

1. Create optimized next.config.js
   - Enable experimental.optimizePackageImports for common libraries
   - Configure images with webp/avif formats
   - Set device sizes for responsive images
   - Add security headers (X-Frame-Options, X-Content-Type-Options)
   - Configure redirects and rewrites if needed

2. Configure TypeScript (if applicable)
   - Set strict mode enabled
   - Configure path aliases (@/* for root imports)
   - Set incremental compilation
   - Configure Next.js plugin
   - Optimize module resolution with "bundler"

3. Setup ESLint configuration
   - Extend next/core-web-vitals
   - Add custom rules for image optimization
   - Configure no-html-link-for-pages rule

4. Setup Prettier (optional)
   - Create .prettierrc with project standards
   - Add format scripts to package.json

## 4. Create Project Structure

1. Create directory structure
   - app/ directory (App Router) or pages/ directory (Pages Router)
   - components/ for reusable components
   - components/ui/ for UI primitives
   - lib/ for utilities and configurations
   - public/ for static assets
   - types/ for TypeScript definitions (if TypeScript)
   - styles/ for global styles

2. Create environment files
   - .env.local for local development variables
   - .env.example as template (safe to commit)
   - Add .env.local to .gitignore

3. Setup .gitignore
   - Ensure .next/, node_modules/, .env.local are ignored
   - Add common IDE and OS files

## 5. Generate Starter Components

1. Create root layout (App Router)
   - Generate app/layout.tsx with metadata
   - Import global CSS
   - Setup font optimization (Inter from next/font/google)
   - Include children prop with proper types

2. Create home page
   - Generate app/page.tsx or pages/index.tsx
   - Add welcome message and basic structure
   - Include responsive design with Tailwind or CSS modules

3. Create global styles
   - Generate app/globals.css or styles/globals.css
   - Add CSS reset and base styles
   - Configure color variables and themes
   - Add responsive breakpoints

4. Create example API route (optional)
   - Generate app/api/hello/route.ts or pages/api/hello.ts
   - Demonstrate basic API handler pattern
   - Include proper types and error handling

## 6. Configure Development Scripts

1. Add npm scripts to package.json
   - dev: Start development server
   - build: Create production build
   - start: Start production server
   - lint: Run ESLint
   - type-check: Run TypeScript compiler (if TypeScript)
   - format: Run Prettier
   - format:check: Check formatting without changes

2. Setup Git hooks (if husky installed)
   - Pre-commit hook for linting
   - Pre-push hook for type checking and tests

## 7. Generate Documentation

1. Create comprehensive README.md
   - Project overview and features
   - Prerequisites and requirements
   - Installation instructions (npm install)
   - Development workflow (npm run dev)
   - Build instructions (npm run build)
   - Deployment guidelines (Vercel, other platforms)
   - Project structure explanation
   - Contributing guidelines

2. Add code comments
   - Document key configuration choices
   - Add examples in starter components
   - Include JSDoc comments for functions

## 8. Validation and Testing

1. Run initial build
   - Execute: npm run build
   - Verify build completes without errors
   - Check bundle sizes are reasonable

2. Run linting and type checking
   - Execute: npm run lint
   - Execute: npm run type-check (if TypeScript)
   - Fix any issues that arise

3. Test development server
   - Execute: npm run dev
   - Verify server starts on port 3000
   - Check that pages load correctly
   - Test hot reloading functionality

4. Verify all configuration files
   - next.config.js is valid
   - tsconfig.json compiles properly (if TypeScript)
   - tailwind.config.js works correctly (if Tailwind)
   - .env.example contains all necessary variables

## 9. Post-Scaffolding Report

1. Generate summary report
   - List all created files and directories
   - Show installed dependencies and versions
   - Display configuration choices made
   - Provide next steps and recommendations

2. Output quality checklist
   - Next.js configured with App Router (if selected)
   - TypeScript setup complete (if selected)
   - Tailwind CSS configured (if selected)
   - ESLint and Prettier configured
   - Security headers configured
   - Image optimization enabled
   - Development scripts working
   - Environment variables template created
   - README documentation complete
   - Project builds successfully

3. Provide next steps
   - How to start development server
   - Where to add new pages/components
   - How to configure environment variables
   - Deployment instructions
   - Additional features to consider (authentication, database, etc.)

</detailed_sequence_steps>

</task>

