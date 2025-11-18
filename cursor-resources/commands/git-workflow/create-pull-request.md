<task name="Create Pull Request">

<task_objective>
Create a new branch, commit changes, and submit a pull request with proper formatting and structure. Input: Current changes or modified files. Processing: Create branch based on changes, format files using Biome, analyze changes to split into logical commits, create descriptive commit messages for each unit, push branch to remote, create PR with proper summary and test plan following template. Output: New branch with atomic commits, pushed to remote, pull request created on GitHub with formatted description following PR template structure.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to structure this pull request?</question>
<options>["Create PR with automatic commit splitting", "Create PR with single commit", "Preview changes before creating PR", "Create as draft PR"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Create Pull Request - Detailed Sequence of Steps

## 1. Analyze Current Changes

1. Execute `git status --porcelain` to see all modified, added, and deleted files.

2. Execute `git diff` to analyze detailed changes.

3. Execute `git branch --show-current` to check if on appropriate branch.

4. Determine scope and nature of changes (feature, bug fix, refactoring, documentation).

5. Identify if changes affect single component or multiple areas.

## 2. Create Appropriate Branch

1. If on main/master branch, create new branch based on change type.

2. Determine branch name using format: `feature/<descriptive-name>`, `fix/<issue-description>`, `refactor/<component-name>`, `docs/<update-description>`, `perf/<optimization-description>`.

3. Execute `git checkout -b <branch-name>` to create and switch to new branch.

4. If already on feature branch, verify branch name is descriptive.

5. If branch name needs updating, use update-branch-name workflow.

## 3. Format Modified Files

1. Identify formatter available in project (Biome, Prettier, ESLint, Black, etc.).

2. Execute formatter on modified files (e.g., `biome format --write <files>`).

3. Verify formatting completed successfully.

4. Stage formatted files using `git add <files>`.

5. Ensure formatting aligns with project code style standards.

## 4. Analyze Changes for Commit Strategy

1. Execute `git diff --cached` to get detailed diff of all changes.

2. Identify distinct logical changes or features in the diff.

3. Group related file changes together (feature changes, test changes, documentation changes, refactoring).

4. Determine if changes should be split into multiple commits for clarity.

5. Plan commit sequence ensuring each commit is atomic and independent.

## 5. Create Logical Commits

1. For each logical unit identified, stage relevant files using `git add <files>`.

2. Analyze staged changes to determine appropriate commit type and emoji.

3. Generate commit message following format: `[emoji] [type]([scope]): [description]`.

4. Execute `git commit -m "<message>"` for each logical unit.

5. Verify each commit contains related changes that serve single purpose.

6. Ensure commits are ordered logically (infrastructure changes before feature changes).

## 6. Prepare PR Description

1. Analyze all commits to understand overall PR scope.

2. Read PR template from `.github/pull_request_template.md` if it exists.

3. Construct PR title using format: `[emoji]([scope]): [descriptive title]` (e.g., `✨(auth): Add user authentication system`, `🐛(api): Fix login redirect issue`, `📝(readme): Update installation instructions`).

4. Generate PR description following template structure: Issue reference section, Why the change is needed, Review focus points, Testing verification, PR-Agent sections (keep `pr_agent:summary` and `pr_agent:walkthrough` placeholders intact), Additional notes.

5. Ensure PR description is comprehensive and follows exact template format.

## 7. Push Branch to Remote

1. Execute `git push -u origin <branch-name>` to push branch and set upstream tracking.

2. Verify push completed successfully.

3. Capture remote branch URL for PR creation.

4. Handle any push errors (authentication, permissions, conflicts).

## 8. Create Pull Request on GitHub

1. Prepare PR creation command using GitHub CLI.

2. Execute `gh pr create --title "<title>" --body-file <(echo -e "<PR description>") --base main --draft` if creating draft PR.

3. Use `gh pr create --title "<title>" --body-file <(echo -e "<PR description>") --base main` for ready-for-review PR.

4. Ensure PR title includes appropriate emoji at beginning (use actual emoji character, not code like `:sparkles:`).

5. Verify PR description precisely follows template structure with all required sections.

6. Capture PR number and URL from command output.

## 9. Verify PR Creation

1. Execute `gh pr view <PR-NUMBER>` to verify PR was created successfully.

2. Check that PR title, description, and base branch are correct.

3. Verify PR-Agent sections are present and properly formatted.

4. Check that commits appear correctly in PR.

5. Provide PR URL to user for review.

## 10. Handle Draft to Ready Conversion

1. If PR was created as draft, inform user they can mark it ready when complete.

2. Provide command: `gh pr ready <PR-NUMBER>` for converting draft to ready.

3. If additional reviewers needed, provide command: `gh pr edit <PR-NUMBER> --add-reviewer username1,username2`.

4. Inform user about PR status tracking: `gh pr status`.

</detailed_sequence_steps>

</task>
