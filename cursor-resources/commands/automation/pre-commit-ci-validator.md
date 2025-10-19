<task name="Pre-Commit CI Validator">

<task_objective>
Run comprehensive CI checks and systematically fix issues until the repository is in a clean working state. This workflow validates code quality through linting, type checking, building, and testing, then stages changes appropriately. It ensures all CI checks pass before commits and provides detailed error diagnosis and resolution for any failures encountered.
</task_objective>

<detailed_sequence_steps>
# Pre-Commit CI Validator - Detailed Sequence of Steps

## 1. Repository State Assessment

1. Check current Git status
   - Run `git status --porcelain` to identify modified files
   - List staged and unstaged changes
   - Check for untracked files that need attention
   - Identify current branch with `git branch --show-current`

2. Determine package manager
   - Check for pnpm, npm, or yarn availability
   - Use `which pnpm npm yarn | head -1` to find available manager
   - Set package manager for subsequent commands
   - Verify package manager version compatibility

3. Analyze project configuration
   - Read `package.json` to understand available scripts
   - Check for `.env` file and note its presence
   - Identify monorepo structure if using Nx or similar
   - Determine test framework and build tools in use

4. Parse command arguments
   - Check for `--skip-install` flag to skip dependency updates
   - Check for `--only-lint` flag to run only linting checks
   - Check for `--skip-tests` flag to skip test execution
   - Set execution flags based on arguments

## 2. Environment Setup

1. Update dependencies if not skipped
   - Run `pnpm i` (or equivalent for npm/yarn)
   - Wait for dependency installation to complete
   - If installation fails with complex errors, abort process
   - Only proceed with simple syntax fixes (missing commas, etc.)

2. Source environment variables
   - Check if `.env` file exists
   - Load environment variables from `.env` if present
   - Export variables for subsequent command execution
   - Verify critical environment variables are set

3. Verify workspace is ready
   - Ensure all node_modules are properly installed
   - Check that build tools are available
   - Verify test framework is accessible
   - Confirm all required binaries are in PATH

## 3. Linting and Code Quality

1. Execute linter across codebase
   - Run `pnpm lint` (using Biome or configured linter)
   - Capture linting errors and warnings
   - Identify files with issues

2. Apply automatic fixes where possible
   - Use linter's auto-fix capability
   - Fix formatting issues automatically
   - Resolve simple rule violations

3. Address remaining linting errors
   - Analyze unfixed linting errors
   - Determine root cause of each error
   - Apply manual fixes for complex issues
   - Re-run linter to verify fixes

4. Verify linting passes completely
   - Run `pnpm lint` again to confirm clean state
   - Ensure no new errors introduced by fixes
   - Document any warnings that remain

## 4. TypeScript and Build Validation

1. Run comprehensive build checks
   - Execute build targets: `build:types`, `build:dist`, `build:app`
   - Run additional targets: `generate:docs`, `dev:run`, `typecheck`
   - Use Nx command: `pnpm nx run-many --targets=build:types,build:dist,build:app,generate:docs,dev:run,typecheck`

2. Diagnose build failures individually
   - If any target fails, run it individually for better error visibility
   - Isolate specific packages causing failures in monorepos
   - Examine TypeScript compiler output for errors

3. Resolve TypeScript errors
   - Analyze type errors and their root causes
   - Check for missing type definitions in node_modules
   - Look for types in monorepo structure if applicable
   - Fix type inconsistencies and missing imports

4. Fix build configuration issues
   - Update tsconfig.json if needed
   - Resolve module resolution problems
   - Fix path mapping and alias issues
   - Ensure output directories are properly configured

5. Verify all builds succeed
   - Re-run all build targets after fixes
   - Confirm artifacts are generated correctly
   - Check that no build warnings remain

## 5. Test Execution and Coverage

1. Prepare test environment
   - Source `.env` file again to ensure variables are loaded
   - Verify test database or dependencies are available
   - Clear any previous test artifacts

2. Run test coverage suite
   - Execute: `pnpm nx run-many --target=test:coverage`
   - CRITICAL: Never run regular test command (may timeout)
   - Monitor test execution progress

3. Handle test failures systematically
   - Run individual packages one by one for easier debugging
   - Isolate failing tests within each package
   - Add console.log statements to test assumptions
   - Analyze test output and error messages

4. Fix failing tests
   - Determine root cause of test failures
   - Update tests if implementation changed correctly
   - Fix implementation if tests are correct
   - For snapshot failures: explain changes before updating

5. Update snapshots if appropriate
   - Present thesis on why snapshot should change
   - Explain what changed in implementation
   - Update snapshots only after approval
   - Re-run tests to verify snapshot updates

## 6. Package Validation

1. Sort package.json files
   - Run `pnpm run sort-package-json`
   - Ensure consistent package.json formatting
   - Verify no changes broke package structure

2. Lint package dependencies
   - Execute: `pnpm nx run-many --targets=lint:package,lint:deps`
   - Check for dependency version issues
   - Identify unused or duplicate dependencies
   - Verify all required dependencies are declared

3. Fix package-related issues
   - Update dependency versions if needed
   - Remove unused dependencies
   - Add missing dependencies
   - Resolve version conflicts

## 7. Regression Prevention

1. Re-run all checks after fixes
   - If any fixes were made, re-run preceding steps
   - Start from linting and go through all steps
   - Ensure no regressions introduced by fixes

2. Verify end-to-end workflow
   - Run complete CI check sequence one more time
   - Confirm all steps pass without errors
   - Check for any warnings or potential issues

## 8. File Staging

1. Review changes before staging
   - Run `git status` to see all modified files
   - Review list of changed files with user
   - Explain what was fixed in each file

2. Stage appropriate files
   - Run `git add` for fixed files
   - CRITICAL: Exclude Git submodules in `lib/*` folders
   - Do not stage unrelated changes
   - Verify staging with `git status`

3. Confirm staging with user
   - Present list of staged files
   - Ask for confirmation before proceeding
   - Allow user to review diffs if needed

4. Suggest commit message
   - Provide descriptive commit message based on fixes
   - Include scope of changes (lint, types, tests, etc.)
   - Format: "fix: resolve CI issues - lint, types, tests"
   - CRITICAL: Do NOT actually commit - only suggest message

## 9. Error Handling Protocol

### Diagnosis Phase
1. When command fails, provide complete analysis
   - Explain exactly why the command broke
   - Cite relevant source code and error logs
   - Present supporting evidence for thesis

2. Add diagnostic logging if needed
   - Add console.log statements to gather more context
   - Run commands with verbose flags
   - Capture detailed error output

3. Request help if context insufficient
   - Identify missing information needed for fix
   - Ask user for clarification on project specifics
   - Request access to additional files if needed

### Fix Implementation Phase
1. Propose specific fix with full explanation
   - Detail the exact changes to be made
   - Explain why this fix will resolve the issue
   - Predict potential side effects

2. Apply the fix
   - Make necessary code changes
   - Update configuration if needed
   - Modify tests if implementation changed

3. Verify fix effectiveness
   - Re-run the failing command
   - If fix fails, return to diagnosis phase
   - Continue iterating until resolved

### Impact Analysis Phase
1. Check for similar issues elsewhere
   - Search codebase for similar patterns
   - Identify other files that may have same bug
   - Run grep or codebase search for related code

2. Apply fixes proactively
   - Fix related issues found in search
   - Prevent same error in other locations
   - Update patterns consistently across codebase

### Cleanup Phase
1. Remove diagnostic code
   - Delete all console.log statements added for debugging
   - Remove temporary code or comments
   - Clean up any test artifacts

2. Format cleaned code
   - Run `pnpm run lint` to format all modified files
   - Ensure code follows project style guide
   - Verify no formatting issues remain

3. Final staging review
   - Ask user before staging changes
   - Present final list of modifications
   - Suggest comprehensive commit message
   - Remind user not to commit yet if more work needed

## 10. Success Verification

Present final checklist with status:
- ✅ Dependencies updated (or skipped)
- ✅ Linting passed
- ✅ TypeScript/Build passed
- ✅ Tests passed (or skipped)
- ✅ Package validation passed
- ✅ Files staged (no commits made)

## Development Notes and Tips

### File Organization Patterns
- Functions like `createTevmNode` typically in: `createTevmNode.js`
- Type definitions typically in: `TevmNode.ts`
- Test files typically in: `createTevmNode.spec.ts`

### Tool-Specific Guidelines

**Dependency Installation (pnpm i)**
- Abort if installation fails with complex errors
- Only attempt fixes for simple syntax errors
- Consider lock file conflicts as blocking issues

**Linting (Biome or ESLint)**
- Lints entire codebase in one command
- Auto-fixes most formatting and simple rule violations
- May require manual fixes for complex issues

**TypeScript Builds**
- Look for types in node_modules when not obvious
- Check monorepo structure for tevm packages
- Consult documentation if multiple failures occur
- Pay attention to path mappings and module resolution

**Test Execution (Vite/Jest)**
- Use Vite test runner or configured framework
- Run packages individually in monorepos for clarity
- Add console logs to test assumptions when debugging
- Always explain snapshot changes before updating

### Safety Guidelines
1. Fix errors proactively - TypeScript and tests catch regressions
2. Never commit automatically - only stage changes
3. One step at a time - complete current step before proceeding
4. Always ask permission before staging if fixes were made

</detailed_sequence_steps>

</task>

