<task name="Secure Dependency Supply Chain">

<task_objective>
Implement comprehensive dependency management and supply chain security practices to protect the project from compromised packages, typosquatting attacks, and vulnerable dependencies. Ensure lockfiles are present, audit mechanisms are configured, and dangerous post-install scripts are controlled.
</task_objective>

<detailed_sequence_steps>
# Secure Dependency Supply Chain - Detailed Sequence of Steps

## 1. Inventory Dependency Management Configuration

1. Use `glob_file_search` to locate package management files:
   - Pattern: `**/package.json`
   - Pattern: `**/package-lock.json`
   - Pattern: `**/pnpm-lock.yaml`
   - Pattern: `**/yarn.lock`

2. Use `read_file` to examine each `package.json` found to understand:
   - Direct dependencies and their versions
   - DevDependencies
   - Existing security-related scripts
   - Package manager configuration

3. Use `list_dir` on project root to confirm presence of lockfiles corresponding to the package manager in use.

4. Use `grep` with pattern `"scripts"` in `package.json` files to identify existing audit or security check scripts.

## 2. Verify Lockfile Presence and Integrity

1. Check if lockfile exists for the detected package manager:
   - npm: `package-lock.json`
   - pnpm: `pnpm-lock.yaml`
   - yarn: `yarn.lock`

2. If lockfile is missing:
   - Use `run_terminal_cmd` to generate lockfile:
     - npm: `npm install --package-lock-only`
     - pnpm: `pnpm install --lockfile-only`
     - yarn: `yarn install --frozen-lockfile`

3. Use `read_file` on lockfile to verify it contains version-locked dependencies with integrity hashes.

4. Document lockfile status and any actions taken.

## 3. Configure Dependency Audit Mechanisms

1. Use `read_file` on `package.json` to check for existing audit scripts.

2. If audit scripts are missing or inadequate, use `search_replace` to add security scripts to `package.json`:
   - Add `"audit": "npm audit --audit-level=moderate"`
   - Add `"audit:fix": "npm audit fix"`
   - Add `"audit:production": "npm audit --production --audit-level=high"`

3. For projects using pnpm, ensure audit script uses: `"audit": "pnpm audit --audit-level=moderate"`

4. For projects using yarn, ensure audit script uses: `"audit": "yarn audit --level moderate"`

5. Use `grep` with pattern `"overrides"|"resolutions"` to check if dependency override mechanisms are already in use for security patches.

## 4. Implement Post-Install Script Controls

1. Use `grep` with pattern `"postinstall"|"preinstall"|"install"` across all `package.json` files to identify lifecycle scripts.

2. Use `read_file` on each `package.json` containing install scripts to review their content.

3. Document any suspicious or unnecessary install scripts found.

4. If production environment configuration exists (e.g., Dockerfile, CI/CD config):
   - Use `codebase_search` with query: "Where are npm install or package installation commands run in production?"
   - Use `read_file` on identified files
   - Check if `--ignore-scripts` flag is used in production installs

5. If not present and appropriate for the project, use `search_replace` to add `--ignore-scripts` to production install commands.

## 5. Audit Current Dependencies

1. Use `run_terminal_cmd` with `npm audit --json` or equivalent to get current vulnerability report.

2. Parse audit output to identify:
   - Critical vulnerabilities
   - High-severity vulnerabilities
   - Outdated packages with available security patches

3. If vulnerabilities found with severity >= high:
   - Use `todo_write` to create action items for each critical/high vulnerability
   - Document vulnerability details, affected packages, and recommended fixes

4. Use `run_terminal_cmd` with `npm outdated` or equivalent to identify outdated dependencies.

## 6. Verify Package Source Integrity

1. Use `read_file` on `package.json` to examine all dependency names.

2. For each dependency, check for common typosquatting patterns:
   - Similar names to popular packages
   - Unusual package scopes
   - Packages with very low download counts (use `web_search` if suspicious)

3. Use `grep` with pattern `"registry"` in `.npmrc` or equivalent config files to verify package registry configuration.

4. If custom registries are configured:
   - Use `read_file` on registry config files
   - Document registry sources
   - Verify they are trusted sources

## 7. Configure CI/CD Security Checks

1. Use `codebase_search` with query: "Where are CI/CD pipeline configurations defined?"

2. Use `read_file` on CI/CD configuration files (e.g., `.github/workflows/*.yml`, `.gitlab-ci.yml`).

3. Verify that dependency audit runs automatically:
   - Check for audit steps in CI pipeline
   - Verify pipeline fails on high/critical vulnerabilities

4. If audit checks are missing:
   - Use `search_replace` or `write` to add audit step to CI/CD pipeline
   - Ensure step runs on: pull requests, pushes to main branches

5. Add step to verify lockfile is committed and up-to-date:
   - npm: Check `package-lock.json` matches `package.json`
   - pnpm: Use `pnpm install --frozen-lockfile`
   - yarn: Use `yarn install --frozen-lockfile`

## 8. Document Security Findings and Recommendations

1. Create summary of current supply chain security posture including:
   - Lockfile status and integrity
   - Audit mechanism configuration
   - Current vulnerabilities count by severity
   - Post-install script risks identified
   - Typosquatting risks identified
   - CI/CD security checks status

2. If `todo_write` was used, ensure all security tasks are properly tracked with:
   - Severity indicators
   - Recommended remediation steps
   - Priority ordering (critical → high → moderate)

3. Present findings to user with actionable next steps.

## 9. Establish Ongoing Monitoring

1. Use `read_file` on `.github/dependabot.yml` or equivalent dependency update automation config.

2. If automated dependency updates are not configured:
   - Consider suggesting Dependabot, Renovate, or similar tool setup
   - Document recommendation for user

3. Verify schedule for regular dependency audits:
   - Weekly automated audits recommended
   - Pre-deployment audit gates required

4. Document recommended audit schedule and monitoring practices.

</detailed_sequence_steps>

</task>

