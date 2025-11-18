<task name="Create GitHub Pull Request">

<task_objective>
Guide the user through creating a well-structured pull request with comprehensive context, clear descriptions, and all necessary information for reviewers. The process ensures all changes are properly documented, tested, and ready for review, resulting in a complete GitHub pull request with proper title, description, testing notes, and validation checklist.
</task_objective>

<how_to_ask_followup_question>
<question>Would you like me to help you generate the PR description based on your git diff?</question>
<options>["Yes, analyze my changes and draft a description", "No, I'll write it myself"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Create GitHub Pull Request - Detailed Sequence of Steps

## 1. Review and Validate Changes

1. Run `git status` to verify the current branch and ensure you're on the correct feature branch.

2. Execute `git diff` to review all uncommitted modifications:
   - Scan through each file change carefully
   - Verify all changes are intentional and related to the task
   - Check for any leftover debug code, console logs, or temporary changes
   - Look for commented-out code that should be removed

3. Run `git diff main...HEAD` (or `git diff develop...HEAD`) to see all commits in your branch compared to the base branch:
   - Understand the full scope of changes that will be in the PR
   - Identify any merge conflicts that need resolution

4. Verify that all tests pass locally:
   - Run the full test suite
   - Execute any integration tests
   - Check linter and formatting tools

5. Ensure the branch is up to date with the base branch:
   - Run `git fetch origin`
   - Run `git rebase origin/main` (or appropriate base branch)
   - Resolve any conflicts if they arise

## 2. Gather Pull Request Information

1. Identify the ticket or issue number associated with this PR:
   - Check your project management tool (Linear, Jira, GitHub Issues, etc.)
   - Note the ticket number for reference in the PR title and description

2. Determine the type of change:
   - Feature: New functionality
   - Bug Fix: Fixes an existing issue
   - Refactor: Code improvement without functional changes
   - Documentation: Documentation updates
   - Chore: Build or tooling changes

3. List all breaking changes, if any:
   - API changes that require consumer updates
   - Database migrations
   - Configuration changes
   - Environment variable changes

4. Identify dependencies and related PRs:
   - Note any PRs that must be merged before this one
   - Identify any follow-up PRs that depend on this one

## 3. Write Pull Request Title

1. Start with the ticket number if applicable:
   - Format: `[TICKET-123]` or `TICKET-123:`
   - Skip if not using ticket tracking

2. Use present tense for the action:
   - Good: "Add user authentication system"
   - Bad: "Added user authentication system"
   - Bad: "Adding user authentication system"

3. Keep the title concise but informative:
   - Aim for 50-72 characters
   - Summarize the main change in the PR
   - Be specific enough that reviewers understand the scope

4. Examples of good PR titles:
   - `[AUTH-456] Add OAuth2 authentication flow`
   - `Fix race condition in payment processing`
   - `Refactor database connection pooling`
   - `Update API documentation for v2 endpoints`

## 4. Write Pull Request Description

1. Add a "Summary" or "Overview" section:
   - Explain the problem or need being addressed
   - Describe the solution approach at a high level
   - Keep it concise (2-4 sentences)

2. Create a "Changes" or "What Changed" section:
   - List the major changes made in bullet points
   - Group related changes together
   - Include both functional and technical changes
   - Example structure:
     ```
     - Added new `AuthService` class for handling authentication
     - Implemented JWT token generation and validation
     - Updated user model to include authentication fields
     - Added middleware for protected routes
     ```

3. Add a "Why These Changes" or "Motivation" section:
   - Explain the reasoning behind the approach taken
   - Reference the original issue or requirement
   - Justify any significant architectural decisions

4. Include a "Breaking Changes" section if applicable:
   - Clearly mark with ⚠️ or similar indicator
   - List each breaking change
   - Provide migration instructions or workarounds
   - Example:
     ```
     ⚠️ **Breaking Changes**
     - The `getUser()` method now returns a Promise instead of synchronous result
     - Update all calls to use `await getUser()` or `.then()`
     ```

5. Add a "Dependencies" section if needed:
   - List new packages or libraries added
   - Note any version requirements
   - Link to related PRs or issues

## 5. Add Testing Instructions

1. Create a "Testing" or "How to Test" section with step-by-step instructions:
   - Number each testing step
   - Be specific and actionable
   - Include setup prerequisites
   - Example:
     ```
     1. Check out this branch: `git checkout feature/auth-system`
     2. Install dependencies: `npm install`
     3. Set up environment variables in `.env`:
        - Add `JWT_SECRET=your_secret_key`
     4. Start the development server: `npm run dev`
     5. Navigate to `/login` and enter test credentials
     6. Verify JWT token is stored in cookies
     ```

2. Include test data or credentials if needed:
   - Provide sample user accounts
   - Include test API keys (non-production)
   - Link to test data scripts or fixtures

3. List edge cases to test:
   - Invalid inputs
   - Boundary conditions
   - Error scenarios
   - Performance under load

4. Mention any automated test coverage:
   - New unit tests added
   - Integration tests created
   - E2E test scenarios covered

## 6. Add Pull Request Checklist

1. Include a checklist of completion criteria:
   ```markdown
   - [ ] All tests pass locally
   - [ ] Code follows project style guide
   - [ ] Linter and formatter checks pass
   - [ ] Documentation updated (if needed)
   - [ ] No sensitive data in the code
   - [ ] Branch is up to date with base branch
   - [ ] Breaking changes documented
   - [ ] Database migrations included (if needed)
   - [ ] Environment variables documented (if needed)
   - [ ] Performance impact considered
   ```

2. Check off items as you complete them before submitting the PR.

3. Ensure all items are checked before requesting review.

## 7. Add Visual Aids (Optional but Recommended)

1. Include screenshots for UI changes:
   - Before and after comparisons
   - Different responsive breakpoints
   - Dark mode variations

2. Add GIFs or videos for interactive features:
   - User flows
   - Animations or transitions
   - Complex interactions

3. Include architecture diagrams if applicable:
   - System design changes
   - Data flow diagrams
   - Component relationships

## 8. Create and Submit Pull Request

1. Push your branch to the remote repository:
   - Run `git push origin <branch-name>`
   - If force-pushing after rebase: `git push --force-with-lease origin <branch-name>`

2. Navigate to your repository on GitHub.

3. Click "New Pull Request" or "Compare & pull request".

4. Select the correct base branch (usually `main`, `master`, or `develop`).

5. Select your feature branch as the compare branch.

6. Paste your prepared title and description.

7. Select reviewers:
   - Choose team members familiar with the changed code areas
   - Include at least one senior developer or tech lead
   - Consider domain experts for specific features

8. Add labels to categorize the PR:
   - Type labels: `feature`, `bug`, `refactor`, etc.
   - Priority labels: `high-priority`, `low-priority`
   - Status labels: `work-in-progress`, `ready-for-review`

9. Link related issues:
   - Use GitHub keywords: `Closes #123`, `Fixes #456`, `Related to #789`
   - This auto-closes issues when the PR is merged

10. Set milestone or project if applicable.

11. Review the "Files changed" tab one final time:
    - Ensure no unintended changes are included
    - Verify formatting is consistent

12. Click "Create Pull Request" or "Create Draft Pull Request":
    - Use draft if the PR is not yet ready for review
    - Convert to ready when all checks pass and you've completed self-review

## 9. Post-Submission Actions

1. Respond to review comments promptly:
   - Address feedback within 24 hours when possible
   - Ask clarifying questions if feedback is unclear
   - Push additional commits to address issues

2. Request re-review after making changes:
   - Use GitHub's "Re-request review" button
   - Notify reviewers of significant updates

3. Keep the PR up to date:
   - Regularly rebase or merge from the base branch
   - Resolve conflicts as they arise
   - Ensure the PR remains mergeable

4. After approval and merge:
   - Verify the changes are deployed correctly
   - Monitor for any production issues
   - Delete the feature branch if no longer needed

</detailed_sequence_steps>

</task>
