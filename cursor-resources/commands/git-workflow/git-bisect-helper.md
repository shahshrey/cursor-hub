<task name="Git Bisect Helper and Automation">

<task_objective>
Guide automated git bisect sessions to find regression commits with smart test execution. Input: Good commit, bad commit, and optional test command or mode flags. Processing: Set up bisect session, execute tests at each bisect point, analyze commit changes, interpret test results, automatically mark commits as good/bad. Output: Identification of exact commit that introduced regression, detailed bisect log with reasoning, recovery commands, and comprehensive report with file changes and implementation suggestions.
</task_objective>

<how_to_ask_followup_question>
<question>How would you like to proceed with the bisect session?</question>
<options>["Automatic mode with test command", "Manual guided mode with assistance", "Continue existing bisect session", "Reset and start fresh"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Git Bisect Helper and Automation - Detailed Sequence of Steps

## 1. Initialize Bisect Session

1. Check current repository state: Execute `git branch --show-current`, `git status --porcelain`, `git bisect log`, and `git log --oneline -10`.

2. Validate working directory is clean with no uncommitted changes.

3. Create backup branch of current HEAD before starting bisect using `git branch backup-bisect-<timestamp>`.

4. Analyze commit history to suggest good/bad commit candidates if not provided.

5. Initialize git bisect session: Execute `git bisect start`, `git bisect bad <bad-commit>`, `git bisect good <good-commit>`.

6. Validate that the commit range actually contains the regression by testing both good and bad commits.

## 2. Detect Test Environment

1. Scan repository root for build system indicators: package.json (Node.js), requirements.txt/setup.py/pyproject.toml (Python), Gemfile (Ruby), pom.xml/build.gradle (Java), go.mod (Go), Cargo.toml (Rust).

2. Determine appropriate package manager and test command based on detected environment.

3. Identify dependency installation requirements for different commits.

4. Detect environment variable needs from config files or .env.example.

5. Set up test environment configuration for consistent test execution.

## 3. Execute Bisect Loop

1. At each bisect point, execute `git show --name-only --pretty="" HEAD` to see files changed.

2. Display commit context: `git log -1 --pretty=format:"%s%n%an (%ar)%n%b"`.

3. Run build process if needed before testing (npm install, pip install, etc.).

4. Execute test command and capture exit code and output.

5. Interpret test results: exit code 0 = good, non-zero = bad, build failure = skip.

### Automatic Mode

1. Execute specified test command at current commit.

2. Parse test output for meaningful error patterns.

3. Automatically mark commit as good/bad based on test exit code.

4. Handle flaky tests with retry logic (up to 3 attempts).

5. Continue bisect automatically: `git bisect good` or `git bisect bad`.

6. Log decision reasoning and test output for each bisect step.

### Manual Mode

1. Show current commit details and file changes.

2. Highlight suspicious patterns (large changes, critical file modifications, dependency updates).

3. Provide testing suggestions based on issue type and changed files.

4. Prompt user for good/bad input with context.

5. Execute `git bisect good` or `git bisect bad` based on user input.

6. Maintain detailed log with user reasoning.

## 4. Analyze Commit Impact

1. For each bisect commit, identify files that match issue-related patterns.

2. Detect commits touching critical areas based on issue description.

3. Flag commits with suspicious change patterns (performance modifications, security-related changes).

4. Highlight dependency or configuration changes that could introduce regressions.

5. Assess change impact and provide confidence level for automated decisions.

## 5. Handle Edge Cases

1. Skip commits that don't compile using `git bisect skip`.

2. Handle dependency version conflicts by attempting dependency installation.

3. Detect environment issues vs actual test failures.

4. Manage disk space during long bisect sessions by cleaning build artifacts.

5. Gracefully recover from corrupted bisect state.

## 6. Generate Final Report

1. Execute `git bisect log` to retrieve complete bisect history.

2. Identify the first bad commit from bisect results.

3. Display bad commit details: hash, author, date, message, files changed.

4. Show bisect statistics: total steps, manual verifications, time taken.

5. Provide recovery commands: `git revert <commit>`, `git cherry-pick` suggestions, or `git bisect reset`.

6. Generate debug report with commit context, changed files, and suggested fix approaches.

7. Document findings for issue tracking or team sharing.

8. Clean up bisect state and return to original branch.

</detailed_sequence_steps>

</task>
