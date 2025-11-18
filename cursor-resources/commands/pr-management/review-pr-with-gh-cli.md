<task name="Review PR with GH CLI">

<task_objective>
Perform a comprehensive review of a GitHub Pull Request using the `gh` CLI tool by gathering PR information, analyzing changes, assessing code quality and testing, asking for user confirmation on the review decision, optionally drafting a comment, and submitting the review (approve or request changes). The review follows a friendly, humble tone and focuses on constructive feedback with specific file and line references when needed.
</task_objective>

<how_to_ask_followup_question>
<question>Based on my review, I recommend [approving/requesting changes on] this PR. Here's my assessment: [detailed justification]. Would you like me to proceed with this recommendation?</question>
<options>["Yes, approve the PR", "Yes, request changes", "No, I'd like to discuss further"]</options>
</how_to_ask_followup_question>

<how_to_ask_followup_question>
<question>Would you like me to draft a comment for this PR that you can copy and paste?</question>
<options>["Yes, please draft a comment", "No, I'll handle the comment myself"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Review PR with GH CLI - Detailed Sequence of Steps

## Overview

You have access to the `gh` CLI (already authenticated) and are working in the repository. You will review the PR using available tools including `run_terminal_cmd`, `read_file`, `grep`, `codebase_search`, and `glob_file_search`.

**Review Style:**
- Talk normally like a friendly reviewer
- Keep it short and conversational
- Start by thanking the author and @ mentioning them
- Stay humble about your understanding of changes
- Request changes if you have suggestions or required fixes
- Leave inline comments only for specific code feedback

## 1. Gather PR Information

1. Ask the user for the PR number to review.

2. Get PR title, description, and comments:
   ```bash
   gh pr view <PR-number> --json title,body,comments
   ```

3. Get the full diff of the PR:
   ```bash
   gh pr diff <PR-number>
   ```

4. Get list of modified files:
   ```bash
   gh pr view <PR-number> --json files
   ```

## 2. Understand the Context

1. Identify which files were modified from the PR information.

2. For each modified file, use `read_file` tool to examine the original file in the main branch to understand context.

3. For specific sections or pattern searches, use `grep` tool with regex patterns and optional file type filters.

4. Use `codebase_search` for semantic understanding of how code components relate.

## 3. Analyze the Changes

For each modified file, understand:

### What Changed
- Specific additions, deletions, modifications
- Scope and impact of changes

### Why It Changed
- Based on PR description
- Business requirements
- Technical improvements

### How It Affects the Codebase
- Impact on dependent code
- Changes to public APIs
- Architectural implications

### Potential Side Effects
- Downstream dependencies
- Integration points
- Performance implications

### Quality Assessment

Look for:

**Code Quality Issues:**
- Inconsistent naming or style
- Complex logic that needs simplification
- Duplicated code
- Poor separation of concerns

**Potential Bugs:**
- Logic errors
- Edge cases not handled
- Race conditions
- Resource leaks

**Performance Implications:**
- Inefficient algorithms
- N+1 queries
- Memory leaks
- Unnecessary computations

**Security Concerns:**
- Input validation
- Authentication/authorization
- Data exposure
- Injection vulnerabilities

**Test Coverage:**
- Are new features tested?
- Are edge cases covered?
- Are integration points tested?
- Is test coverage adequate?

## 4. Ask for User Confirmation

1. Formulate your assessment of the PR.

2. Determine your recommendation:
   - **Approve**: If code quality is good, tests are adequate, no significant issues
   - **Request Changes**: If there are issues that need addressing

3. Present assessment to user with detailed justification:
   ```
   Based on my review of PR #<number>, I recommend [approving/requesting changes on] this PR.
   
   Here's my justification:
   - [Key point 1 about PR quality]
   - [Key point 2 about implementation]
   - [Key point 3 about testing]
   - [Any concerns or positive observations]
   
   Would you like me to proceed with this recommendation?
   ```

4. Present options to user:
   ```
   <options>["Yes, approve the PR", "Yes, request changes", "No, I'd like to discuss further"]</options>
   ```

## 5. Ask if User Wants a Comment Drafted

1. After user decides on approval/rejection, ask if they want a comment drafted.

2. Present options:
   ```
   <options>["Yes, please draft a comment", "No, I'll handle the comment myself"]</options>
   ```

3. If user wants a comment drafted, create well-structured comment following style guide:

**Comment Structure:**
```markdown
Thanks @username for this PR! [Brief opening statement]

[Your understanding of what the PR does - stay humble]

[Specific feedback organized by topic]

[Closing statement]
```

**Comment Style Guidelines:**
- Start with thanks and @ mention
- Keep it short and conversational
- Stay humble ("My understanding is...", "It looks like...")
- Be specific about concerns or suggestions
- Balance criticism with positive observations
- Use code blocks for code suggestions
- Keep tone friendly and constructive

## 6. Submit the Review

### For Approval (Single-line Comment)

```bash
gh pr review <PR-number> --approve --body "Your approval message"
```

### For Approval (Multi-line Comment with Formatting)

```bash
cat << EOF | gh pr review <PR-number> --approve --body-file -
Thanks @username for this PR! The implementation looks good.

I particularly like how you've handled X and Y.

Great work!
EOF
```

### For Requesting Changes (Single-line Comment)

```bash
gh pr review <PR-number> --request-changes --body "Your feedback message"
```

### For Requesting Changes (Multi-line Comment with Formatting)

```bash
cat << EOF | gh pr review <PR-number> --request-changes --body-file -
Thanks @username for this PR!

The implementation looks promising, but there are a few things to address:

1. Issue one
2. Issue two

Please make these changes and we can merge this.
EOF
```

**Note:** The `cat << EOF | ... --body-file -` approach preserves all whitespace and formatting. The `-` parameter tells the command to read from standard input.

## Example Review Process

### Step 1: Gather Information

```bash
gh pr view 3627 --json title,body,comments
gh pr diff 3627
```

### Step 2: Examine Context

Use `read_file` to examine:
- `src/shared/api.ts`
- `webview-ui/src/components/settings/ThinkingBudgetSlider.tsx`

Use `grep` to check patterns:
- Search for "reasoningOn" in `src/api/providers/*.ts`

### Step 3: Analyze

From examination:
- PR fixes thinking mode budget calculation for Claude
- Currently incorrectly calculated as 80% of maxTokens (8192) = 6553 tokens
- Claude actually supports up to 64000 tokens
- Adds `thinkingConfig` property with `maxBudget: 64000`
- Updates API handlers to use this value
- Enhances slider component for model-specific percentages
- Includes comprehensive tests

### Step 4: Seek Confirmation

"Based on my review of PR #3627, I recommend approving this PR. Here's my justification:

1. Correctly fixes thinking mode budget calculation for Claude models
2. Properly implements thinkingConfig.maxBudget property (64000)
3. Applies appropriate percentage (50%) for slider calculation
4. Well-tested with comprehensive unit tests
5. Clean implementation following project standards
6. Includes helpful screenshots demonstrating the fix

Would you like me to proceed with approving this PR?"

### Step 5: Draft Comment (If Requested)

```markdown
Thanks @username for this PR! This looks great.

My understanding is you've fixed the thinking mode budget calculation for Claude  models - the slider was previously capping at around 6.5k tokens when these models actually support up to 64k.

I particularly like:
- The clean implementation of thinkingConfig.maxBudget
- The model-specific percentage handling in the slider
- The comprehensive test coverage
- The helpful screenshots showing the fix in action

Great work!
```

### Step 6: Submit

```bash
cat << EOF | gh pr review 3627 --approve --body-file -
Thanks @username for this PR! This looks great.

My understanding is you've fixed the thinking mode budget calculation for Claude  models - the slider was previously capping at around 6.5k tokens when these models actually support up to 64k.

I particularly like:
- The clean implementation of thinkingConfig.maxBudget
- The model-specific percentage handling in the slider
- The comprehensive test coverage
- The helpful screenshots showing the fix in action

Great work!
EOF
```

## Common GitHub CLI Commands

### Basic PR Commands

```bash
# Get current PR number
gh pr view --json number -q .number

# List open PRs
gh pr list

# View specific PR
gh pr view <PR-number>

# View with specific fields
gh pr view <PR-number> --json title,body,comments,files,commits

# Check PR status
gh pr status
```

### Review Commands

```bash
# Approve (single-line)
gh pr review <PR-number> --approve --body "Message"

# Approve (multi-line)
cat << EOF | gh pr review <PR-number> --approve --body-file -
Multi-line message
EOF

# Request changes (single-line)
gh pr review <PR-number> --request-changes --body "Message"

# Request changes (multi-line)
cat << EOF | gh pr review <PR-number> --request-changes --body-file -
Multi-line message
EOF

# Comment only (no approval/rejection)
gh pr review <PR-number> --comment --body "Message"
```

## Example Comment Styles

### Brief Approve

```
Looks good, though we should make this generic for all providers & models at some point
```

### Approve with Detail

```
This looks great! I like how you've handled the global endpoint support - adding it to the ModelInfo interface makes total sense since it's just another capability flag, similar to how we handle other model features.

The filtered model list approach is clean and will be easier to maintain than hardcoding which models work with global endpoints. And bumping the genai library was obviously needed for this to work.

Thanks for adding the docs about the limitations too - good for users to know they can't use context caches with global endpoints but might get fewer 429 errors.
```

### Request Changes

```
This is awesome. Thanks @scottsus.

My main concern though - does this work for all the possible VS Code themes? We struggled with this initially which is why it's not super styled currently. Please test and share screenshots with the different themes to make sure before we can merge
```

### Request Changes with Specific Suggestions

```
Hey, the PR looks good overall but I'm concerned about removing those timeouts. Those were probably there for a reason - VSCode's UI can be finicky with timing.

Could you add back the timeouts after focusing the sidebar? Something like:

```typescript
await vscode.commands.executeCommand("claude-dev.SidebarProvider.focus")
await setTimeoutPromise(100)  // Give UI time to update
visibleWebview = WebviewProvider.getSidebarInstance()
```
```

## Success Criteria

The PR review is complete when:
- All PR information has been gathered and analyzed
- Code quality, testing, and potential issues assessed
- User has been asked for confirmation on review decision
- User has been offered option to have comment drafted
- Review has been submitted via `gh pr review` command
- User has confirmation that review was successfully posted

</detailed_sequence_steps>

</task>
