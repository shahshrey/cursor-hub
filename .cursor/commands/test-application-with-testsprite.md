<task name="Test Application with TestSprite">

<task_objective>
Execute comprehensive end-to-end testing of the Cursor Hub application using TestSprite MCP tools. The workflow bootstraps TestSprite with project configuration (port 3000, frontend type, codebase scope), generates code summaries and standardized PRDs, creates frontend test plans covering all major features (search, filtering, authentication, favorites, downloads, keyboard shortcuts, landing page performance, etc.), generates and executes automated test code, and produces a detailed markdown test report with pass/fail analysis, severity ratings, console error logs, and actionable recommendations for fixing identified issues.
</task_objective>

<detailed_sequence_steps>

## Step 1: Bootstrap TestSprite Testing Environment

### Purpose
Initialize TestSprite with project configuration to prepare for test execution.

### Actions
1. Verify the application is running locally on port 3000
   - If not running, instruct user to start the dev server: `npm run dev`

2. Use **mcp_TestSprite_testsprite_bootstrap_tests** tool with parameters:
   - `localPort`: 3000
   - `type`: frontend
   - `projectPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management (absolute path)
   - `testScope`: codebase
   - `pathname`: / (root path)

3. Verify bootstrap success and note any instructions from the tool's response

### Expected Output
- Confirmation that project is running on port 3000
- Instructions to proceed to next step (generate code summary)

---

## Step 2: Generate Code Summary

### Purpose
Analyze the codebase to extract technology stack and feature list for test plan generation.

### Actions
1. Use **mcp_TestSprite_testsprite_generate_code_summary** tool with parameter:
   - `projectRootPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management (absolute path)

2. The tool will analyze staged changes and request feature extraction from specific file line ranges

3. Create `testsprite_tests/tmp/code_summary.json` with the following structure:
   ```json
   {
     "tech_stack": [
       "TypeScript",
       "Next.js 16.0",
       "React 19.0",
       "Supabase",
       "PostgreSQL",
       "Clerk Authentication",
       "Tailwind CSS v4",
       "shadcn/ui",
       "Radix UI",
       "Framer Motion",
       "Fuse.js",
       "Vitest",
       "Playwright"
     ],
     "features": [
       {
         "name": "Resource Discovery & Browsing",
         "description": "Advanced search and filtering system for 459+ Cursor resources",
         "files": ["app/(browse)/browse/page.tsx", "components/features/resources/terminal-resource-browser.tsx"]
       },
       {
         "name": "Resource Preview & Download",
         "description": "One-click resource preview with syntax highlighting and download functionality",
         "files": ["components/features/resources/resource-preview-modal.tsx", "components/features/resources/resource-card.tsx"]
       },
       {
         "name": "Favorites System",
         "description": "Authenticated users can save and manage favorite resources",
         "files": ["components/features/resources/favorite-button.tsx", "server/actions/favorites.ts"]
       },
       {
         "name": "Filter Presets & URL Sharing",
         "description": "Save custom filter configurations and share via URL parameters",
         "files": ["hooks/use-filter-presets.ts", "lib/preset-storage.ts", "lib/preset-url-encoding.ts"]
       },
       {
         "name": "Keyboard Shortcuts",
         "description": "Power-user navigation with keyboard shortcuts",
         "files": ["hooks/use-keyboard-shortcuts.ts", "components/features/resources/keyboard-shortcuts-help.tsx"]
       },
       {
         "name": "Landing Page & Hero Section",
         "description": "Animated landing page with particle background and instant search",
         "files": ["app/page.tsx", "components/features/home/hero-with-search.tsx"]
       },
       {
         "name": "Authentication & User Dashboard",
         "description": "Clerk authentication with favorites management and protected routes",
         "files": ["app/(auth)/signin/page.tsx", "app/(dashboard)/dashboard/page.tsx", "middleware.ts"]
       },
       {
         "name": "Download Analytics & Tracking",
         "description": "Real-time download count tracking with rate limiting",
         "files": ["app/api/resources/download/[slug]/route.ts", "lib/middleware/rate-limit.ts"]
       },
       {
         "name": "Breadcrumb Navigation",
         "description": "Contextual breadcrumb navigation component",
         "files": ["components/ui/breadcrumb.tsx"]
       },
       {
         "name": "Curated Stacks & Quick Filters",
         "description": "Pre-configured filter collections for common use cases",
         "files": ["components/features/resources/curated-stacks.tsx", "components/features/resources/quick-filters.tsx"]
       },
       {
         "name": "Onboarding Experience",
         "description": "First-time user guidance with dismissible overlays",
         "files": ["components/features/resources/browse-onboarding.tsx"]
       },
       {
         "name": "Empty States & Loading States",
         "description": "Contextual messages and skeleton loaders for better UX",
         "files": ["components/features/resources/empty-state.tsx", "components/features/resources/resource-card-skeleton.tsx"]
       }
     ]
   }
   ```

4. Ask user to review and verify the content after writing the file

### Expected Output
- File created: `testsprite_tests/tmp/code_summary.json`
- Contains tech_stack array and features array with descriptions and file paths

---

## Step 3: Generate Standardized PRD

### Purpose
Create a standardized Product Requirements Document based on existing PRD.md and code summary.

### Actions
1. Use **mcp_TestSprite_testsprite_generate_standardized_prd** tool with parameter:
   - `projectPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management (absolute path)

2. The tool will read the existing PRD.md file and code_summary.json to create a standardized format

3. This step prepares the foundation for test plan generation

### Expected Output
- Standardized PRD format created internally by TestSprite
- Confirmation to proceed to test plan generation

---

## Step 4: Generate Frontend Test Plan

### Purpose
Create comprehensive test cases covering all major features identified in the code summary.

### Actions
1. Use **mcp_TestSprite_testsprite_generate_frontend_test_plan** tool with parameters:
   - `projectPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management (absolute path)
   - `needLogin`: true (since application has authentication features)

2. The tool will generate test cases including:
   - Fuzzy Search Functionality
   - Multi-level Filtering and URL Persistence
   - Resource Preview Modal Rendering
   - One-click Download with Rate Limiting and Analytics
   - Favorites Toggle and Real-time Dashboard Updates
   - Filter Presets Save, Star, Delete, and Keyboard Shortcut
   - Keyboard Shortcuts Functionality
   - Landing Page Animation and Performance
   - Authentication Flow and Protected Routes
   - Onboarding Overlays Display and Dismissal
   - Rate Limiter for Search and Download Excess Requests
   - Breadcrumb Navigation Contextual Accuracy
   - Curated Stacks and Quick Filters Functionality
   - Empty and Loading States Display

### Expected Output
- File created: `testsprite_tests/testsprite_frontend_test_plan.json`
- Contains array of test cases with id, title, description, category, priority, and steps

---

## Step 5: Execute Tests and Generate Report

### Purpose
Run automated tests against the application and generate a comprehensive test report with findings.

### Actions
1. Use **mcp_TestSprite_testsprite_generate_code_and_execute** tool with parameters:
   - `projectName`: Cursor-Resources-Management
   - `projectPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management (absolute path)
   - `testIds`: [] (empty array means run all tests)
   - `additionalInstruction`: "" (empty string unless specific instructions needed)

2. The tool will:
   - Execute terminal command: `node /Users/shrey/.npm/_npx/8ddf6bea01b2519d/node_modules/@testsprite/testsprite-mcp/dist/index.js generateCodeAndExecute`
   - Run all test cases from the test plan
   - Generate raw test results in `testsprite_tests/tmp/raw_report.md`

3. After test execution completes, analyze the raw report and create the final report:
   - Read `testsprite_tests/tmp/raw_report.md`
   - Read template from: `/Users/shrey/.npm/_npx/8ddf6bea01b2519d/node_modules/@testsprite/testsprite-mcp/dist/assets/testsprite-mcp-test-report-template.md`
   
4. Generate comprehensive test report at `testsprite_tests/testsprite-mcp-test-report.md` including:
   - **Document Metadata**: Project name, date, test execution summary
   - **Requirement Validation Summary**: Group tests by requirement/feature
   - For each test:
     - Test name and code file link
     - Test visualization URL
     - Status (✅ Passed / ❌ Failed)
     - Severity (CRITICAL / HIGH / MEDIUM / LOW)
     - Analysis/Findings with detailed explanation
     - Browser console errors if applicable
     - Root cause analysis and recommendations
   - **Coverage & Matching Metrics**: Pass rate, test counts by requirement
   - **Key Gaps / Risks**: 
     - Critical issues requiring immediate action
     - High priority issues to fix before launch
     - Medium priority issues to address soon
     - Feature coverage gaps
     - PRD alignment analysis
     - Success metrics at risk
     - Recommended next steps with timeframes

### Expected Output
- Terminal output showing test execution progress (~15 minutes)
- File created: `testsprite_tests/tmp/raw_report.md`
- File created: `testsprite_tests/testsprite-mcp-test-report.md` (comprehensive report)
- Individual test files: `testsprite_tests/TC00X_*.py`
- Test visualization URLs for each test case

---

## Step 6: Present Results to User

### Purpose
Summarize findings and provide actionable next steps.

### Actions
1. Read the generated `testsprite_tests/testsprite-mcp-test-report.md`

2. Present to user:
   - Overall pass rate (e.g., "42.86% - 6 passed, 8 failed")
   - Critical issues count and summary
   - High priority issues count and summary
   - Links to test visualization dashboards
   - Top 3-5 recommended immediate actions

3. Offer to:
   - Explain any specific test failure in detail
   - Help fix identified issues
   - Re-run specific failed tests after fixes
   - Create GitHub issues from test failures

### Expected Output
- Concise summary of test results
- Clear action items prioritized by severity
- Offer to assist with remediation

</detailed_sequence_steps>

<additional_notes>

## Prerequisites
- Application must be running on `http://localhost:3000`
- Start dev server: `npm run dev`
- Ensure stable internet connection (tests take ~15 minutes)
- Ensure no active filters or localStorage state that could interfere with tests

## TestSprite Tool Reference

All tools used in this workflow:
1. **mcp_TestSprite_testsprite_bootstrap_tests** - Initialize testing environment
2. **mcp_TestSprite_testsprite_generate_code_summary** - Analyze codebase features
3. **mcp_TestSprite_testsprite_generate_standardized_prd** - Create standardized PRD
4. **mcp_TestSprite_testsprite_generate_frontend_test_plan** - Generate test cases
5. **mcp_TestSprite_testsprite_generate_code_and_execute** - Run tests and generate reports

## Common Issues & Solutions

**Issue**: "Project is not running on port 3000"
- **Solution**: Run `npm run dev` in the project directory

**Issue**: "Test execution timed out"
- **Solution**: Check for infinite loops in useEffect hooks, especially in filter/search logic

**Issue**: "Clerk authentication errors"
- **Solution**: Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env.local

**Issue**: "Tests fail due to localStorage state"
- **Solution**: Clear browser localStorage before running tests or add cleanup in test setup

## Output Files Location

```
testsprite_tests/
├── tmp/
│   ├── code_summary.json          # Tech stack and features
│   └── raw_report.md              # Raw test results
├── testsprite_frontend_test_plan.json  # Test cases
├── testsprite-mcp-test-report.md       # Final comprehensive report
├── TC001_*.py                          # Individual test files
├── TC002_*.py
└── ...
```

## Re-running Tests

To re-run tests after fixes:
1. Ensure dev server is running
2. Clear any test artifacts: `rm -rf testsprite_tests/tmp/*`
3. Run this workflow again
4. Or use **mcp_TestSprite_testsprite_rerun_tests** for specific tests:
   - `projectPath`: /Users/shrey/Documents/Development/Cursor-Resources-Management

</additional_notes>

</task>

