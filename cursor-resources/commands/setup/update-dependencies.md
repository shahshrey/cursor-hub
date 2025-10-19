<task name="Update Dependencies">

<task_objective>
Systematically update project dependencies with comprehensive testing and compatibility validation. The input includes package manager detection, outdated packages list, security issues scan, and lock files from the codebase. The output will be an updated dependency manifest with comprehensive testing results, security audit report, and upgrade documentation.
</task_objective>

<detailed_sequence_steps>
# Update Dependencies - Detailed Sequence of Steps

## 1. Dependencies State Analysis

1. Identify package manager from @package.json or @requirements.txt or @Cargo.toml.

2. List outdated packages using package manager specific commands (npm outdated, pip list --outdated).

3. Run security audit to identify vulnerabilities (npm audit, pip check, cargo audit).

4. Review lock files (@package-lock.json, @poetry.lock, @Cargo.lock) for consistency.

5. Determine update strategy from **$ARGUMENTS** (--patch | --minor | --major | --security-only).

## 2. Dependency Analysis

1. Audit current versions for all direct and transitive dependencies.

2. Identify outdated packages with available updates.

3. Assess security vulnerabilities and prioritize critical issues.

4. Generate dependency tree to understand package relationships.

5. Create update plan based on version changes and risk assessment.

## 3. Impact Assessment

1. Check changelogs for breaking changes in new versions.

2. Identify breaking changes that require code modifications.

3. Review deprecation warnings for removed or changed APIs.

4. Create compatibility matrix for dependencies and runtime versions.

5. Assess risk level for each update (low, medium, high risk).

## 4. Staged Updates

1. Apply patch updates first for bug fixes with minimal risk.

2. Test application after patch updates before proceeding.

3. Apply minor updates for new features with backward compatibility.

4. Test application after minor updates before major changes.

5. Apply major version updates with breaking changes carefully.

6. Test thoroughly after each stage to isolate issues.

## 5. Testing and Validation

1. Run full test suite after each update stage.

2. Perform build verification to ensure successful compilation.

3. Execute integration testing to verify external dependencies.

4. Conduct performance checks to detect performance regressions.

5. Run end-to-end tests for critical user flows.

## 6. Rollback Strategy

1. Document all changes made during update process.

2. Create restore points using git commits or branches.

3. Maintain rollback procedures for quick recovery.

4. Test rollback process to ensure it works correctly.

5. Keep backup of previous lock files for emergency rollback.

## 7. Documentation Updates

1. Update README with new dependency versions and requirements.

2. Update dependencies list in project documentation.

3. Create migration guides for breaking changes affecting team.

4. Notify team about significant dependency changes.

5. Document any required configuration changes.

## 8. Safety Features

1. Implement automated testing between updates to catch regressions.

2. Resolve dependency conflicts using resolution strategies.

3. Prioritize security vulnerabilities for immediate patching.

4. Configure automated security scanning in CI pipeline.

5. Setup dependency update notifications for future monitoring.

## 9. Security-Only Updates

1. Identify packages with known security vulnerabilities.

2. Update vulnerable packages to patched versions.

3. Verify security fixes resolve reported vulnerabilities.

4. Document security updates for compliance and audit.

5. Test application to ensure security patches don't break functionality.

## 10. Output Generation

1. Generate updated dependency manifest with all new versions.

2. Create comprehensive testing results report showing test coverage.

3. Compile security audit report with resolved vulnerabilities.

4. Document upgrade process with steps taken and issues encountered.

5. Create summary of changes for team communication and review.

</detailed_sequence_steps>

</task>
