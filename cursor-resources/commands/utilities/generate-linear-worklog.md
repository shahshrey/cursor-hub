<task name="Generate Linear Work Log">

<task_objective>
Generate a technical work log comment for a Linear issue based on recent git commits by checking Linear MCP availability, extracting git information, generating work log content with dry technical language, handling existing work logs, and posting formatted updates to the specified Linear issue.
</task_objective>

<detailed_sequence_steps>
# Generate Linear Work Log - Detailed Sequence of Steps

## 1. Check Linear MCP Availability

1. Verify that Linear MCP tools are available (mcp__linear__* functions)

2. If Linear MCP is not installed, inform the user to install it and provide installation instructions

3. Do not proceed with work log generation if Linear MCP is unavailable

## 2. Check for Existing Work Log

1. Use Linear MCP to get existing comments on the issue

2. Look for comments with today's date in the format "## Work Completed [TODAY'S DATE]"

3. If found, note the existing content to append/update rather than duplicate

## 3. Extract Git Information

1. Get the current branch name

2. Get recent commits on the current branch (last 10 commits)

3. Get commits that are on the current branch but not on main branch

4. For each relevant commit, get detailed information including file changes and line counts

5. Focus on commits since the last work log update (if any exists)

## 4. Generate Work Log Content

1. Use dry, technical language without adjectives or emojis

2. Focus on factual implementation details

3. Structure the log with date, branch, and commit information

4. Include quantitative metrics (file counts, line counts) where relevant

5. Avoid subjective commentary or promotional language

## 5. Handle Existing Work Log

1. If no work log exists for today: Create new comment

2. If work log exists for today: Replace the existing comment with updated content including all today's work

3. Ensure chronological order of commits

4. Include both previous and new work completed today

## 6. Format Structure

Use the following format:

```
## Work Completed [TODAY'S DATE]

### Branch: [current-branch-name]

**Commit [short-hash]: [Commit Title]**
- [Technical detail 1]
- [Technical detail 2]
- [Line count] lines of code across [file count] files

[Additional commits in chronological order]

### [Status Section]
- [Current infrastructure/testing status]
- [What is now available/ready]
```

## 7. Post to Linear

1. Use the Linear MCP integration to create or update the comment

2. Post the formatted work log to the specified Linear issue

3. If updating, replace the entire existing work log comment

4. Confirm successful posting

## 8. Git Commands to Use

- `git branch --show-current` - Get current branch
- `git log --oneline -10` - Get recent commits
- `git log main..HEAD --oneline` - Get branch-specific commits
- `git show --stat [commit-hash]` - Get detailed commit info
- `git log --since="[today's date]" --pretty=format:"%h %ad %s" --date=short` - Get today's commits

## 9. Content Guidelines

- Include commit hashes and descriptive titles
- Provide specific technical implementations
- Include file counts and line counts for significant changes
- Maintain consistent formatting
- Focus on technical accomplishments
- Include current status summary
- No emojis or special characters

## 10. Error Handling

1. Check if Linear MCP client is available before proceeding

2. If Linear MCP is not available, display installation instructions:
```
Linear MCP client is not installed. To install it:

1. Install the Linear MCP server:
   npm install -g @modelcontextprotocol/server-linear

2. Add Linear MCP to your Claude configuration:
   Add the following to your Claude MCP settings:
   {
     "mcpServers": {
       "linear": {
         "command": "npx",
         "args": ["@modelcontextprotocol/server-linear"],
         "env": {
           "LINEAR_API_KEY": "your_linear_api_key_here"
         }
       }
     }
   }

3. Restart Cursor
4. Get your Linear API key from: https://linear.app/settings/api
```

3. Validate that the Linear ticket ID exists

4. Handle cases where no recent commits are found

5. Provide clear error messages for git operation failures

6. Confirm successful comment posting

## 11. Example Usage

When invoked with `/generate-linear-worklog BLA2-2`, the command should:

1. Analyze git commits on the current branch
2. Generate a structured work log
3. Post the comment to Linear issue BLA2-2
4. Confirm successful posting

</detailed_sequence_steps>

</task>
