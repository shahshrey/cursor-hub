<task name="Smart Git Commit">

<task_objective>
Create well-formatted commits with conventional commit format and emoji following best practices. Input: Optional commit message or flags (--no-verify, --amend). Processing: Run pre-commit checks (lint, build, docs), analyze staged/unstaged changes using git diff, determine if changes should be split into multiple commits, generate emoji conventional commit messages. Output: One or more atomic commits with descriptive messages in format [emoji] [type]: [description], verified code quality, updated documentation.
</task_objective>

<how_to_ask_followup_question>
<question>Should I proceed with committing these changes?</question>
<options>["Yes, create commit(s) as analyzed", "No, let me review the changes first", "Split into separate commits", "Skip pre-commit checks"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Smart Git Commit - Detailed Sequence of Steps

## 1. Execute Pre-Commit Checks

1. Unless `--no-verify` flag is provided, run pre-commit validation checks.

2. Execute `pnpm lint` (or appropriate linter) to ensure code quality.

3. Execute `pnpm build` (or appropriate build command) to verify build succeeds.

4. Execute `pnpm generate:docs` (or appropriate docs command) to update documentation.

5. If any check fails, ask user if they want to fix issues first or proceed with `--no-verify`.

## 2. Analyze Repository State

1. Execute `git status --porcelain` to check which files are staged and unstaged.

2. Execute `git branch --show-current` to get current branch name.

3. Execute `git diff --cached --stat` to see staged changes summary.

4. Execute `git diff --stat` to see unstaged changes summary.

5. Execute `git log --oneline -5` to see recent commit history for context.

## 3. Stage Files if Needed

1. Check if any files are staged using `git diff --cached --name-only`.

2. If 0 files are staged, automatically add all modified and new files using `git add -A`.

3. Exclude files that should not be committed (.env, generated files, etc.).

4. Execute `git status` again to confirm staging.

5. Display list of files that will be committed.

## 4. Analyze Changes for Commit Strategy

1. Execute `git diff --cached` to get detailed diff of staged changes.

2. Parse diff to identify distinct logical changes across different files.

3. Categorize changes by type: features, fixes, refactoring, documentation, tests, chores.

4. Identify changes to unrelated parts of codebase.

5. Determine if changes span different concerns that should be separate commits.

## 5. Determine Commit Split Strategy

1. Check for multiple distinct logical changes that serve different purposes.

2. Identify if changes mix different types (e.g., features + bug fixes + refactoring).

3. Assess if changes would be easier to understand or review separately.

4. Consider size and complexity of changes.

5. If splitting is recommended, group related files for each separate commit.

## 6. Generate Commit Messages

1. For each commit (or single commit if not split), analyze the changes to determine commit type.

2. Select appropriate conventional commit type: `feat` for new features, `fix` for bug fixes, `docs` for documentation, `style` for formatting, `refactor` for code changes without adding features or fixing bugs, `perf` for performance improvements, `test` for tests, `chore` for tooling and configuration, `ci` for CI/CD, `revert` for reverting changes.

3. Select corresponding emoji: ✨ feat, 🐛 fix, 📝 docs, 💄 style, ♻️ refactor, ⚡️ perf, ✅ test, 🔧 chore, 🚀 ci, 🗑️ revert, 🚨 fix (linter warnings), 🔒️ fix (security), 🚚 refactor (move/rename), 🏗️ refactor (architectural), 🔥 fix (remove code), 🚑️ fix (critical hotfix), 🩹 fix (simple non-critical), 🥅 fix (catch errors), 👔 feat (business logic), 🦺 feat (validation), 💚 fix (CI build), 📈 feat (analytics), 🔒️ fix (security), ♿️ feat (accessibility), 💡 docs (source comments), 🏷️ feat (types), 🧵 feat (multithreading), 🌐 feat (i18n), 🚸 feat (UX/usability).

4. Write concise description in present tense, imperative mood (e.g., "add feature" not "added feature").

5. Keep first line under 72 characters.

6. Format as: `[emoji] [type]: [description]` or `[emoji] [type]([scope]): [description]`.

## 7. Create Commits

1. If splitting into multiple commits, stage files for first commit using `git add <files>`.

2. Execute `git commit -m "[emoji] [type]: [description]"` for each commit.

3. For additional commits, stage next group of files and repeat.

4. If `--amend` flag provided, execute `git commit --amend` instead.

5. Verify each commit was created successfully using `git log -1`.

## 8. Verify and Report

1. Execute `git log --oneline -n <number-of-commits-created>` to show created commits.

2. Verify commit messages follow conventional commit format.

3. Display summary of commits created with file changes.

4. Confirm all intended changes were committed by checking `git status`.

5. Provide next steps (push to remote, create PR, continue work).

</detailed_sequence_steps>

</task>
