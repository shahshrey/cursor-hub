<task name="Merge Resolver">

<task_objective>
This workflow resolves merge conflicts for a specific pull request by analyzing git history, commit messages, and code changes to make intelligent resolution decisions. It takes a PR number as input, checks out the PR branch, attempts to rebase onto the target branch (typically main), identifies conflicts, analyzes the intent behind conflicting changes, applies intelligent resolutions that preserve valuable changes from both sides, and completes the rebase - all using non-interactive git operations.
</task_objective>

<expected_output>
- All merge conflicts resolved intelligently based on commit history and intent
- Resolved files staged and ready for commit
- Rebase successfully completed
- Comprehensive summary documenting:
  - Each conflict found with file path and line numbers
  - Analysis of both sides of each conflict (commit info, intent)
  - Resolution strategy applied and rationale
  - Files modified with change statistics
  - Validation that no syntax errors were introduced
</expected_output>

<required_tools>
- GitHub CLI (`gh` command) - for fetching PR data and checking out branches
- Git commands - for rebase operations, blame analysis, commit history
- File system operations - for reading and modifying conflicted files
- Terminal commands - for syntax checking and validation
- Environment variables (GIT_EDITOR=true) - for non-interactive git operations
</required_tools>

<detailed_sequence_steps>
# Merge Resolver - Detailed Sequence of Steps

## Step 1: Initialize PR Resolution

### 1.1 Parse PR Number from User Input
- Accept PR number from user in formats: "#123", "123", or "PR #123"
- Extract the numeric PR number
- Validate that a valid PR number was provided
- If no PR number provided, prompt user for it

### 1.2 Fetch PR Information
- Execute: `gh pr view [PR_NUMBER] --json title,body,headRefName,baseRefName --repo <owner>/<repo>`
- Parse the JSON response to extract:
  - **PR title** - understand what the PR is trying to accomplish
  - **PR body/description** - get context about the changes
  - **headRefName** - the source branch (PR branch)
  - **baseRefName** - the target branch (typically main)
- Display PR information to understand context

### 1.3 Checkout PR Branch
- Execute: `gh pr checkout [PR_NUMBER] --force`
- The `--force` flag ensures a clean checkout even if local changes exist
- Verify the branch was checked out successfully

### 1.4 Fetch Latest Target Branch
- Execute: `git fetch origin main` (or whatever the baseRefName is)
- This ensures we have the latest version of the target branch
- Fetching prevents conflicts due to outdated branch information

### 1.5 Attempt Rebase to Reveal Conflicts
- Execute: `GIT_EDITOR=true git rebase origin/main`
- Use `GIT_EDITOR=true` to prevent interactive editor prompts
- This non-interactive approach is critical for automation
- The rebase will either:
  - **Succeed** - no conflicts, inform user and exit
  - **Fail with conflicts** - proceed to conflict resolution

### 1.6 Check for Merge Conflicts
- Execute: `git status --porcelain | grep "^UU"`
- The "UU" status indicates unmerged files (conflicts on both sides)
- Execute: `git diff --name-only --diff-filter=U`
- Create a list of all files with conflicts
- Display summary: "Found [X] files with merge conflicts"

**Transition:** With conflicts identified, proceed to analyze each conflicted file.

---

## Step 2: Analyze Conflicts

For each conflicted file, perform the following analysis:

### 2.1 Read Conflicted File
- Use `read_file` to examine the file and locate conflict markers
- Identify all conflict blocks marked by:
  - `<<<<<<< HEAD` - start of current branch changes
  - `=======` - separator between versions
  - `>>>>>>> [branch/commit]` - end of incoming changes
- Note the line numbers of each conflict for precise editing
- Count how many conflicts exist in the file

### 2.2 Extract Conflict Sections
- For each conflict block, extract:
  - **HEAD version** - the code from the current branch (after rebase, this is the target branch)
  - **Incoming version** - the code from the PR branch being rebased
  - **Context** - surrounding code to understand the function/class/module

### 2.3 Run Git Blame on Conflict Regions
- For the HEAD version:
  - Execute: `git blame -L [start_line],[end_line] HEAD -- [file_path]`
  - Extract the commit SHA for each line
  - Identify unique commits involved
- For the incoming version:
  - The commit SHA is typically shown in the conflict marker: `>>>>>>> abc123`
  - Or use: `git log --oneline [PR_branch] -- [file_path]` to find recent commits

### 2.4 Fetch Commit Details
For each relevant commit SHA identified:
- Execute: `git log -1 --format="%h %s%n%n%b" [commit_sha]`
- Extract:
  - **Commit message** - the "what" of the change
  - **Commit body** - the "why" and additional context
  - **Author and date** - to assess recency
- Execute: `git show [commit_sha] -- [file_path]`
- Review the actual diff to understand what changed

### 2.5 Categorize Changes by Intent
Analyze each side of the conflict and categorize:
- **Bugfix** - fixes a specific issue or bug
- **Feature** - adds new functionality
- **Refactor** - restructures code without changing behavior
- **Performance optimization** - improves efficiency
- **Formatting/style** - cosmetic changes
- **Documentation** - comments or docs updates
- **Test updates** - changes to test files

### 2.6 Evaluate Resolution Strategy
Based on the analysis, determine the best approach:
- **Keep HEAD** - if incoming changes are outdated or superseded
- **Keep incoming** - if incoming changes are more complete or fix issues
- **Combine both** - if changes address different concerns and can coexist
- **Adapt incoming to HEAD** - preserve intent of both by integrating incoming logic into HEAD structure

**Transition:** With analysis complete, apply the chosen resolution strategy.

---

## Step 3: Resolve Conflicts

### 3.1 Apply Resolution Strategy
For each conflict in each file:

#### If keeping one side entirely:
- Remove conflict markers and keep chosen version
- Use `search_replace` with exact matching

#### If combining both sides:
- Merge the logic from both sides
- Ensure proper syntax and structure
- Add comments if the merge is complex to explain the integration

#### If adapting changes:
- Take the structure from one side
- Integrate the logic from the other side
- Ensure all important changes are preserved

### 3.2 Handle Special Conflict Cases

#### Binary files:
- Execute: `git checkout --ours [file]` (to keep HEAD version)
- Or: `git checkout --theirs [file]` (to keep incoming version)
- Base decision on PR intent

#### Deleted vs modified:
- If file was deleted in one branch but modified in another:
  - Check PR description to understand intent
  - If deletion was intentional (removed feature), keep deletion
  - If modification adds value, keep the file with modifications

#### Whitespace/formatting only:
- Apply the formatting standard consistently
- Usually prefer the more recent formatting

### 3.3 Escape Conflict Markers When Using Tools
**CRITICAL:** When using `search_replace` or other tools, escape conflict markers:
- Use `\<<<<<<<` instead of `<<<<<<<`
- Use `\=======` instead of `=======`
- Use `\>>>>>>>` instead of `>>>>>>>`
- This prevents the tools from interpreting them as actual diff syntax

### 3.4 Apply the Resolution
- Use `search_replace` to replace the entire conflict block (including markers) with the resolved code
- Example structure:
```
Old string: (entire conflict block with escaped markers)
\<<<<<<< HEAD
[HEAD version]
\=======
[incoming version]
\>>>>>>> abc123

New string: (resolved code without markers)
[merged/chosen version]
```

### 3.5 Stage Resolved Files
- After resolving all conflicts in a file, stage it:
- Execute: `git add [file_path]`
- Verify it's staged: `git status --porcelain [file_path]`
- The status should change from "UU" to "M " (staged for commit)

**Transition:** After all files are resolved and staged, validate the changes.

---

## Step 4: Validate Resolution

### 4.1 Verify All Conflicts Are Resolved
- Execute: `git status --porcelain`
- Check that no files show "UU" status
- Execute: `git diff --check`
- This checks for lingering conflict markers
- If any remain, return to resolution step

### 4.2 Check for Syntax Errors
- For Python files:
  - Execute: `python -m py_compile [file1.py] [file2.py] ...`
- For TypeScript/JavaScript files:
  - Execute: `npx tsc --noEmit [file.ts]` (if TypeScript)
  - Or run linter: `npx eslint [file.js]`
- For other languages, use appropriate syntax checker

### 4.3 Review the Final Diff
- Execute: `git diff --cached --stat`
- Shows summary of what will be committed
- Execute: `git diff --cached [file]`
- Review detailed changes for each file
- Verify the resolution makes sense
- Ensure no unintended changes were introduced

### 4.4 Validate Related Files
- If the conflict involved function signatures or imports:
  - Check other files that use those functions
  - Execute: `grep -r "function_name" --include="*.ext"`
  - Verify no broken references were created

### 4.5 Document Resolution Decisions
- Create a summary of each significant resolution:
  - File path
  - Conflict description (what was conflicting)
  - Resolution chosen (keep HEAD/incoming/combined)
  - Rationale (why this resolution was best)
  - Relevant commit SHAs

**Transition:** Once validation passes, complete the rebase.

---

## Step 5: Complete Rebase

### 5.1 Continue the Rebase
- Execute: `GIT_EDITOR=true git rebase --continue`
- Use `GIT_EDITOR=true` to prevent interactive editor prompt for commit message
- The rebase will either:
  - **Complete successfully** - no more conflicts
  - **Stop at another conflict** - return to Step 2 for the next conflict
  - **Fail with error** - investigate and fix

### 5.2 Handle Multiple Conflict Commits
- If the rebase stops again with more conflicts:
  - Repeat Steps 2-4 for the new conflicts
  - Stage resolved files
  - Execute: `GIT_EDITOR=true git rebase --continue` again
  - Continue until rebase is complete

### 5.3 Verify Rebase Completion
- Execute: `git status`
- Should show: "nothing to commit, working tree clean"
- Should indicate: "Your branch is ahead of 'origin/[branch]' by X commits"
- No "rebase in progress" message should appear

### 5.4 Review Final State
- Execute: `git log --oneline -5`
- Verify commit history looks correct
- PR commits should now be on top of the latest main
- Execute: `git diff origin/main --stat`
- Shows the total changes the PR will introduce

### 5.5 Generate Resolution Summary
Create a comprehensive report including:
- **PR Information:**
  - PR number and title
  - Source and target branches
- **Conflicts Resolved:**
  - List of files with conflicts
  - Number of conflicts per file
- **Resolution Details:**
  - For each significant conflict:
    - File path and line numbers
    - Description of conflicting changes
    - Commits involved (SHAs and messages)
    - Resolution strategy applied
    - Rationale for the decision
- **Validation Results:**
  - Syntax check status
  - Number of files changed
  - Lines added/removed
- **Next Steps:**
  - Remind user to push the rebased branch
  - Note: Use `git push --force-with-lease` to update remote
  - Suggest testing before pushing

**Completion:** The merge conflicts are fully resolved and the rebase is complete.

</detailed_sequence_steps>

<resolution_heuristics>
## Intelligent Resolution Guidelines

### Bugfix vs Feature
- **Heuristic:** Bugfixes generally take precedence over features
- **Reasoning:** Bugfixes address existing problems and should be preserved, while features can be reintegrated around the fix
- **Application:** If one side is a bugfix and the other is a feature, adapt the feature to include the bugfix

### Recent vs Old Changes
- **Heuristic:** More recent changes are often more relevant
- **Reasoning:** Recent changes likely reflect the current understanding of requirements and may supersede older implementations
- **Exception:** When older changes are bugfixes or security patches that haven't been addressed in newer code

### Test Updates Indicate Completeness
- **Heuristic:** Changes that include test updates are likely more complete
- **Reasoning:** Developers who update tests alongside code changes demonstrate thoroughness and understanding of the impact
- **Application:** Prefer the version that includes corresponding test changes

### Logic vs Formatting
- **Heuristic:** Logic changes take precedence over formatting changes
- **Reasoning:** Formatting can be reapplied, but logic changes represent functional improvements or fixes
- **Application:** Keep logic changes and reapply formatting if needed

### Structural vs Content Changes
- **Heuristic:** If one side refactors structure and another adds content, combine both
- **Reasoning:** Structural improvements shouldn't lose functional additions
- **Application:** Place the new content within the new structure

### Intent-Based Resolution
- **Principle:** Always prioritize understanding the intent behind changes
- **Method:** Use commit messages, PR descriptions, and issue references for context
- **Benefit:** Ensures both purposes are served rather than blindly choosing one side
</resolution_heuristics>

<error_handling>
## Common Issues and Solutions

### Issue: No PR Number Provided
- **Error:** User doesn't provide PR number or provides invalid format
- **Solution:** Prompt: "Expected a PR number (e.g., '#123' or '123'). Please provide the PR number to resolve conflicts for."

### Issue: PR Not Found
- **Error:** `gh pr view` fails with "pull request not found"
- **Solution:** Verify PR number is correct, check repository access permissions, ensure gh CLI is authenticated

### Issue: No Conflicts Found
- **Error:** Rebase completes successfully without conflicts
- **Solution:** Inform user: "PR #[number] does not have any merge conflicts. The branch can be merged without conflict resolution."

### Issue: Interactive Prompt Blocking
- **Error:** Git commands waiting for interactive input (editor, confirmation)
- **Solution:** 
  - Always use `GIT_EDITOR=true` prefix for rebase operations
  - Use `GIT_SEQUENCE_EDITOR=true` for interactive rebases
  - Use `--no-edit` flags where applicable

### Issue: Rebase Already In Progress
- **Error:** "rebase in progress" message when starting
- **Solution:** Check status with `git status`, then either:
  - Continue existing rebase: `GIT_EDITOR=true git rebase --continue`
  - Abort existing rebase: `git rebase --abort`, then start fresh

### Issue: Malformed or Nested Conflicts
- **Error:** Conflict markers are incomplete, nested, or malformed
- **Solution:** 
  - Carefully examine the file structure
  - May need to resolve manually with extra caution
  - Use `search_replace` with precise patterns
  - Consider: "This conflict requires manual review due to complexity"

### Issue: Binary File Conflicts
- **Error:** Binary files cannot be merged automatically
- **Solution:** 
  - Identify which version to keep based on PR intent
  - Execute: `git checkout --ours [file]` (keep HEAD)
  - Or: `git checkout --theirs [file]` (keep incoming)
  - Stage the file: `git add [file]`

### Issue: Deleted vs Modified File
- **Error:** File was deleted in one branch but modified in another
- **Solution:** 
  - Review PR description to understand intent
  - If deletion was intentional, keep deletion: `git rm [file]`
  - If modifications are valuable, keep file: `git add [file]`

### Issue: Syntax Errors After Resolution
- **Error:** Resolved code has syntax errors
- **Solution:** 
  - Review the resolution carefully
  - Ensure proper syntax from both sides
  - May need to adjust the integration
  - Re-run syntax checker after fixes

### Issue: Escaped Markers Not Working
- **Error:** Conflict markers in search/replace causing tool failures
- **Solution:** 
  - Always escape with backslash: `\<<<<<<<`, `\=======`, `\>>>>>>>`
  - If still failing, try alternative approach:
  - Read file, manually construct resolved version, write entire file

### Issue: Multiple Conflicts in Rebase
- **Error:** Rebase stops multiple times at different commits
- **Solution:** 
  - This is normal for PRs with many commits
  - Resolve each conflict set as it appears
  - Continue rebase each time: `GIT_EDITOR=true git rebase --continue`
  - Maintain patience and track resolution decisions
</error_handling>

<best_practices>
## Best Practices for Intelligent Merge Resolution

### 1. Always Fetch PR Context First
- Never start resolving without understanding the PR's purpose
- Read the PR title, description, and linked issues
- This context is crucial for making intelligent decisions

### 2. Use Git History Extensively
- Run git blame on conflicting sections
- Read commit messages for both sides
- Understand the "why" behind each change
- Newer isn't always better - consider intent

### 3. Preserve All Valuable Changes When Possible
- Don't blindly choose one side
- Look for opportunities to combine non-conflicting aspects
- A bugfix can coexist with a refactor if properly integrated

### 4. Always Escape Conflict Markers in Tools
- Use `\<<<<<<<` instead of `<<<<<<<` in search/replace operations
- This prevents tools from misinterpreting them as diff syntax
- Critical for successful resolution

### 5. Validate Thoroughly After Resolution
- Check for syntax errors with appropriate tools
- Review the final diff to ensure it makes sense
- Verify no unintended changes were introduced
- Check related files for broken references

### 6. Use Non-Interactive Git Operations
- Always use `GIT_EDITOR=true` for rebase operations
- This ensures automation can proceed without prompts
- Critical for workflow efficiency

### 7. Document Resolution Decisions
- Explain why certain resolutions were chosen
- Reference commit SHAs when relevant
- Describe trade-offs when both sides had valid changes
- This helps reviewers understand the merge

### 8. Consider Related Changes
- Look beyond the immediate conflict
- Check for related changes in tests, docs, or dependent code
- A change might be part of a larger feature spanning multiple files

### 9. Handle Edge Cases Explicitly
- Binary files need special handling
- Deleted vs modified requires understanding intent
- Whitespace-only conflicts should use consistent formatting

### 10. Test Incrementally
- Validate after each file resolution when possible
- Don't wait until all conflicts are resolved to check syntax
- Easier to debug issues when you know which resolution caused them

### 11. Prioritize Based on Change Type
- Bugfixes > Features > Refactors > Formatting
- Security patches should always be preserved
- Test updates indicate more complete changes

### 12. Communicate Clearly
- Explain each significant resolution decision
- Provide rationale based on analysis
- Be transparent about trade-offs
- Give users confidence in the automated resolution
</best_practices>

<git_commands_reference>
## Essential Git Commands for Merge Resolution

### PR and Branch Operations
```bash
# Fetch PR information
gh pr view [PR_NUMBER] --json title,body,headRefName,baseRefName

# Checkout PR branch (force checkout for clean state)
gh pr checkout [PR_NUMBER] --force

# Fetch latest target branch
git fetch origin main
```

### Rebase Operations (Non-Interactive)
```bash
# Start rebase (non-interactive)
GIT_EDITOR=true git rebase origin/main

# Continue rebase after resolving conflicts (non-interactive)
GIT_EDITOR=true git rebase --continue

# Abort rebase if needed to start over
git rebase --abort
```

### Conflict Detection
```bash
# Check for unmerged files (conflicts)
git status --porcelain | grep "^UU"

# List conflicted files
git diff --name-only --diff-filter=U

# List all unmerged files with stage info
git ls-files -u

# Check for lingering conflict markers
git diff --check
```

### History and Blame Analysis
```bash
# Blame specific lines to find commits
git blame -L [start_line],[end_line] [commit] -- [file_path]

# Get commit message and body
git log -1 --format="%h %s%n%n%b" [commit_sha]

# Get commit diff for specific file
git show [commit_sha] -- [file_path]

# View recent commits on a file
git log --oneline -5 -- [file_path]
```

### Resolution and Staging
```bash
# Stage resolved file
git add [file_path]

# Stage all resolved files
git add .

# Check staged files
git diff --cached --stat

# Review staged changes for a file
git diff --cached [file_path]
```

### Binary and Special File Handling
```bash
# Keep HEAD version of file (--ours)
git checkout --ours [file_path]

# Keep incoming version of file (--theirs)
git checkout --theirs [file_path]

# Remove deleted file
git rm [file_path]
```

### Validation
```bash
# Check working tree status
git status

# View commit history
git log --oneline -5

# Compare against target branch
git diff origin/main --stat

# Detailed comparison
git diff origin/main
```

### Environment Variables
```bash
# Prevent interactive editor prompts during rebase
GIT_EDITOR=true git rebase [operation]

# Prevent interactive sequence editing
GIT_SEQUENCE_EDITOR=true git rebase -i [operation]

# Combined for complete non-interactive operation
GIT_EDITOR=true GIT_SEQUENCE_EDITOR=true git rebase --continue
```
</git_commands_reference>

<workflow_example>
## Example: Resolving Conflicts in PR #123

### Scenario
PR #123 is a bugfix for a memory leak. Meanwhile, main has a refactor that restructures the same code. Both branches modified the same functions, creating conflicts.

### Step-by-Step Resolution

#### 1. Initialize
```bash
# Fetch PR info
gh pr view 123 --json title,body,headRefName,baseRefName
# Result: title="Fix memory leak in data processor", headRefName="fix/memory-leak"

# Checkout and rebase
gh pr checkout 123 --force
git fetch origin main
GIT_EDITOR=true git rebase origin/main
# Result: CONFLICT in src/data/processor.ts
```

#### 2. Identify Conflicts
```bash
git status --porcelain | grep "^UU"
# Output: UU src/data/processor.ts
```

#### 3. Analyze Conflict
Read `src/data/processor.ts`:
```typescript
<<<<<<< HEAD
async processData(data: DataInput): Promise<ProcessedData> {
  // Refactored to use async/await
  const result = await this.transform(data);
  return result;
}
=======
processData(data: any[]): ProcessedData {
  const listener = this.createListener();
  this.listeners.set(data.id, listener);
  return this.transform(data);
}
>>>>>>> abc123 (Fix memory leak in data processor)
```

Run git blame and analyze commits:
```bash
# HEAD has async/await refactor (commit def456)
# Incoming has listener tracking for memory leak fix (commit abc123)
```

#### 4. Resolution Strategy
**Decision:** Combine both changes
- Keep async/await refactor structure from HEAD
- Add listener tracking logic from incoming bugfix
- This preserves both the structural improvement and the bug fix

#### 5. Apply Resolution
Use `search_replace` to replace conflict with merged version:
```typescript
async processData(data: DataInput): Promise<ProcessedData> {
  // Create and track listener for cleanup (memory leak fix)
  const listener = this.createListener();
  this.listeners.set(data.id, listener);
  
  // Refactored to use async/await
  const result = await this.transform(data);
  return result;
}
```

#### 6. Stage and Continue
```bash
git add src/data/processor.ts
GIT_EDITOR=true git rebase --continue
# Result: Successfully rebased and updated refs/heads/fix/memory-leak
```

#### 7. Validate
```bash
python -m py_compile src/data/processor.ts  # Check syntax
git diff origin/main --stat  # Review changes
```

### Resolution Summary
- **File:** src/data/processor.ts
- **Conflict:** Async/await refactor vs memory leak fix
- **Resolution:** Combined both changes - preserved async pattern while adding listener tracking
- **Rationale:** Both changes address different concerns (code structure vs bug) and can coexist
- **Commits involved:** def456 (refactor), abc123 (bugfix)
</workflow_example>

</task>
