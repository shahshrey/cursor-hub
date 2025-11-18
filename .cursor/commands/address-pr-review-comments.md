<task name="Address PR Review Comments">

<task_objective>
This workflow systematically addresses all review comments on a GitHub Pull Request. It takes a PR number as input, fetches all inline review comments using GitHub CLI, analyzes each comment to understand the requested changes, makes the necessary code modifications across all affected files, verifies the changes with linters and compilation checks, and produces a comprehensive summary of all changes made - all without committing anything until the user is ready.
</task_objective>

<expected_output>
- Modified code files with all requested changes applied
- Comprehensive markdown summary report documenting:
  - All review comments addressed with their locations
  - Specific changes made for each comment
  - Files modified with change statistics
  - Verification results (linter status, compilation checks)
  - Note that changes are ready for review but not committed
</expected_output>

<required_tools>
- GitHub CLI (`gh` command) - for fetching PR data and comments
- File system operations - for reading and modifying code files
- Terminal commands - for git operations, linting, and compilation checks
- grep/search tools - for finding cross-file references
</required_tools>

<detailed_sequence_steps>
# Address PR Review Comments - Detailed Sequence of Steps

## Step 1: Fetch PR Information

### 1.1 Accept PR Input from User
- Ask the user for the PR number or URL
- If URL provided, extract the PR number from it
- Validate that the PR number is valid

### 1.2 Fetch PR Metadata
- Execute: `gh pr view <PR_NUMBER> --json title,body,reviews,comments,files --repo <owner>/<repo>`
- Parse the JSON response to understand:
  - PR title and description
  - Files changed in the PR
  - Overall review status

### 1.3 Fetch Inline Review Comments
- Execute: `gh api repos/<owner>/<repo>/pulls/<PR_NUMBER>/comments --jq '.[] | {path: .path, line: .line, body: .body, diff_hunk: .diff_hunk}'`
- This retrieves all inline code review comments with:
  - File path where comment was made
  - Line number of the comment
  - Comment text/body
  - Diff hunk for context

### 1.4 Parse and Organize Comments
- Group comments by file path
- Sort comments by line number within each file
- Create a structured list of all comments for processing
- Count total number of comments to address

### 1.5 Display Summary
- Show the user:
  - Total number of review comments found
  - List of files that have comments
  - Brief preview of comment types (if easily identifiable)

**Transition:** Once all comments are fetched and organized, proceed to analysis.

---

## Step 2: Analyze Review Comments

### 2.1 Categorize Each Comment
For each review comment, identify the type of change requested:
- **Code simplification** - removing verbose or unnecessary code
- **Variable/function renaming** - changing names for clarity
- **Using better practices** - adding dedent(), using proper patterns
- **Refactoring logic** - restructuring code flow
- **Adding functionality** - implementing missing features
- **Documentation/comments** - improving code documentation
- **Bug fixes** - correcting errors

### 2.2 Identify Files to Modify
- Create a list of all files that need changes
- For each file, note which comments apply to it
- Read the current state of each file to understand context

### 2.3 Check for Cross-File Dependencies
- For changes involving renames or refactoring:
  - Use `grep` to search for all occurrences of variables/functions being renamed
  - Identify imports and references across the codebase
  - Check if changes in one file affect other files
- Create a dependency map showing which files are related

### 2.4 Create Change Plan
- For each comment, document:
  - What needs to change
  - Why it needs to change (based on reviewer's rationale)
  - Which specific lines/sections to modify
  - Any related changes needed in other files
- Prioritize changes that other changes depend on

### 2.5 Identify Potential Issues
- Flag potential problems like:
  - Undefined variables after renaming
  - Broken imports
  - Circular dependencies
  - Conflicting changes (if two comments contradict each other)
- Note these for extra verification during implementation

**Transition:** With a clear understanding of all changes needed, proceed to implementation.

---

## Step 3: Make Code Changes

### 3.1 Read Relevant File Sections
- For each file that needs modification:
  - Use `read_file` to load the relevant sections (with context around the change area)
  - Understand the current code structure
  - Identify exact text to replace

### 3.2 Apply Changes Systematically
- Address each review comment one at a time
- For each change:
  - Use `search_replace` tool with exact old_string and new_string
  - Ensure the old_string includes enough context to be unique
  - Verify the change was applied correctly
  - Track which comment was addressed

### 3.3 Handle Cross-File References
- If a change affects multiple files (e.g., renaming):
  - Use `grep` to find all occurrences: `grep -r "variable_name" --include="*.py" <directory>`
  - Apply changes to each file where the reference exists
  - Maintain consistency across all files

### 3.4 Handle Special Cases
- **Adding imports:** Add new import statements if needed for new functionality
- **Removing code:** Ensure removing code doesn't break dependent code
- **Refactoring:** If restructuring logic, ensure all paths are covered
- **Type changes:** Update type hints if variable types change

### 3.5 Track All Modifications
- Maintain a list of:
  - Files modified
  - Specific changes made in each file
  - Which review comment each change addresses
  - Any additional changes made to maintain consistency

**Transition:** After all changes are applied, verify correctness.

---

## Step 4: Verify Changes

### 4.1 Run Linter Checks
- Execute: `read_lints` on all modified files
- Check for:
  - Syntax errors
  - Style violations
  - Undefined variables
  - Import errors
  - Type checking issues
- If errors found, document them for fixing

### 4.2 Run Compilation Checks
- For Python files:
  - Execute: `python -m py_compile <file1.py> <file2.py> ...`
  - Verify all files compile without syntax errors
- For TypeScript/JavaScript files:
  - Run appropriate type checking or compilation if applicable

### 4.3 Review Git Diff
- Execute: `git diff --stat` to see summary of changes
- Execute: `git diff <specific_file>` for detailed changes
- Verify:
  - Only intended files were modified
  - Changes match what was requested in comments
  - No unintended modifications were made

### 4.4 Verify Cross-File Consistency
- For any renamed variables/functions:
  - `grep` for the old name to ensure no references remain
  - `grep` for the new name to verify all references were updated
- Check imports are still valid
- Verify function signatures match across files

### 4.5 Fix Any Issues Found
- If verification reveals problems:
  - Make corrective changes
  - Re-run all verification steps
  - Repeat until all checks pass
- Document any issues found and how they were resolved

**Transition:** Once all verifications pass, generate the summary report.

---

## Step 5: Generate Summary Report

### 5.1 Create Header Section
- Title: "PR Review Comments - All Addressed"
- Include:
  - PR number
  - Total comments addressed
  - Date/time of changes
  - Verification status (all checks passed)

### 5.2 List Each Comment Addressed
For each review comment, document:
- **Comment Location:** File path and line number
- **Reviewer's Request:** The exact text of the comment
- **Action Taken:** Description of what was changed
- **Code Example:** Show before/after code snippets if helpful (use git diff format)
- **Rationale:** Explain why this change addresses the comment

### 5.3 Document All Files Modified
- Create a table or list showing:
  - File path
  - Lines added/removed/modified
  - Summary of changes in that file
- Group related files together if applicable

### 5.4 Include Verification Results
- **Linter Status:** "✅ No linter errors found" or list of any warnings
- **Compilation Status:** "✅ All files compile successfully"
- **Cross-Reference Check:** "✅ No broken references found"
- **Git Status:** Show `git status` output to confirm what's staged/unstaged

### 5.5 Add Final Notes
- Remind user: "Changes are ready for review but NOT committed"
- Suggest next steps:
  - Review the changes
  - Test the functionality if needed
  - Commit when satisfied
  - Respond to the PR comments indicating they've been addressed
- Include any caveats or areas that may need manual review

### 5.6 Display Summary to User
- Present the complete summary in markdown format
- Ensure it's well-formatted and easy to read
- Include all relevant details for the user to understand what was done

**Completion:** The workflow is complete. The user now has modified files and a comprehensive summary report.

</detailed_sequence_steps>

<error_handling>
## Common Issues and Solutions

### Issue: GitHub CLI Not Authenticated
- **Error:** `gh: command not found` or authentication errors
- **Solution:** Guide user to run `gh auth login` and authenticate

### Issue: PR Not Found
- **Error:** PR number doesn't exist or access denied
- **Solution:** Verify PR number and repository name, check access permissions

### Issue: Linter Errors After Changes
- **Error:** New linting errors introduced by changes
- **Solution:** Review the specific errors, adjust changes to fix them, re-verify

### Issue: Broken References After Renaming
- **Error:** Undefined variable or import errors after renaming
- **Solution:** Use comprehensive grep to find all occurrences, update all references

### Issue: Conflicting Review Comments
- **Error:** Two comments request contradictory changes
- **Solution:** Ask user for clarification on which approach to take

### Issue: Large Number of Comments
- **Error:** Too many comments to process efficiently
- **Solution:** Batch similar changes together, provide progress updates to user
</error_handling>

<best_practices>
## Best Practices for This Workflow

1. **Always verify before proceeding:** After fetching comments, show them to the user for confirmation
2. **Make minimal changes:** Only change what's specifically requested, don't add "improvements"
3. **Test incrementally:** Verify after each change or small batch of changes
4. **Preserve context:** When using search_replace, include enough context to make old_string unique
5. **Document assumptions:** If a comment is ambiguous, state your interpretation
6. **Track dependencies:** Always check for cross-file impacts of changes
7. **Never auto-commit:** Let the user review before committing
8. **Provide detailed summaries:** Users should understand exactly what changed and why
</best_practices>

</task>

