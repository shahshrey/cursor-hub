<task name="Prepare Release">

<task_objective>
Prepare and validate release packages with comprehensive testing, documentation, and automation. The workflow processes current version from !`git describe --tags --abbrev=0`, package version files, unreleased changes count, uncommitted changes status, and build status to systematically prepare a production-ready release with proper versioning, changelog generation, testing validation, documentation updates, and deployment readiness verification.
</task_objective>

<detailed_sequence_steps>
# Prepare Release - Detailed Sequence of Steps

## 1. Release Planning and Validation

Determine release version number following semantic versioning (MAJOR.MINOR.PATCH) by analyzing commits since last release using !`git log $(git describe --tags --abbrev=0)..HEAD --oneline 2>/dev/null | wc -l`. Review and validate all features included in release from issue tracker. Check that all planned issues and features are complete and merged. Verify release criteria and acceptance requirements are met. Ensure no uncommitted changes exist using !`git status --porcelain | wc -l`.

## 2. Pre-Release Checklist

Ensure all tests are passing (unit, integration, E2E) by running full test suite. Verify code coverage meets project standards using coverage reports. Complete security vulnerability scanning with npm audit, Snyk, or similar tools. Perform performance testing and validation under load. Review and approve all pending pull requests that should be included.

## 3. Version Management

Check current version using git describe --tags --abbrev=0. Determine next version based on semantic versioning rules: MAJOR for breaking changes, MINOR for new features (backward compatible), PATCH for bug fixes (backward compatible). Consider version bump based on conventional commits analysis.

## 4. Code Freeze and Branch Management

Create release branch from main using git checkout main, git pull origin main, and git checkout -b release/v1.2.3. Alternatively, use main branch directly for smaller releases. Ensure no new features are merged during release process through communication and branch protection.

## 5. Version Number Updates

Update version in package.json, setup.py, pyproject.toml, or equivalent version files. Update version in application configuration and constants. Update version in documentation and README files. Update API version if applicable. Use npm version command for Node.js or manual updates with sed for other languages.

## 6. Changelog Generation

Create or update CHANGELOG.md following Keep a Changelog format. Add new version section [1.2.3] - 2024-01-15 with categories: Added for new features, Changed for modifications to existing functionality, Fixed for bug fixes, Security for security-related changes, Deprecated for soon-to-be-removed features, and Removed for removed features. Generate entries from git commits and pull requests.

## 7. Documentation Updates

Update API documentation with new endpoints, parameters, and responses. Revise user documentation and guides with new features and changes. Update installation and deployment instructions if changed. Review and update README.md with version information and new features. Create or update migration guides if breaking changes exist.

## 8. Dependency Management

Update dependencies to latest stable versions using npm update or pip-compile. Run security audit with npm audit fix or pip-audit. Review and address security vulnerabilities. Lock dependency versions in package-lock.json or requirements.txt. Test application with updated dependencies.

## 9. Build and Artifact Generation

Clean build environment by removing dist/, build/, and cache directories. Build production artifacts using npm run build or equivalent build command. Verify build artifacts are generated correctly in expected directories. Test built artifacts by running them in clean environment. Validate artifact sizes and content.

## 10. Testing and Quality Assurance

Run comprehensive test suite including unit tests, integration tests, and E2E tests. Perform manual testing of critical features and user paths. Execute regression testing to ensure no functionality broken. Conduct user acceptance testing if applicable. Validate in staging environment that matches production.

## 11. Security and Compliance Verification

Run security scans using SAST tools and penetration testing. Verify compliance with security standards (OWASP, CWE). Check for exposed secrets or credentials using git-secrets or truffleHog. Validate data protection and privacy measures. Review security audit results.

## 12. Release Notes Preparation

Create comprehensive release notes including "What's New" section highlighting major features, "Improvements" section listing enhancements, "Bug Fixes" section detailing resolved issues, "Documentation" section noting documentation updates, and "Migration Guide" section explaining breaking changes and upgrade steps. Format with clear sections, emojis for visual appeal, and links to detailed documentation.

## 13. Release Tagging and Versioning

Commit version changes with git add . and git commit -m "chore: prepare release v1.2.3". Create annotated tag with git tag -a v1.2.3 -m "Release version 1.2.3" including feature list and bug fix summary in tag message. Push tag to remote with git push origin v1.2.3 and git push origin release/v1.2.3.

## 14. Deployment Preparation

Prepare deployment scripts and configurations for target environments. Update environment variables and secrets in deployment systems. Plan deployment strategy (blue-green, rolling, canary) based on risk assessment. Set up monitoring and alerting for release. Prepare rollback procedures and document rollback steps.

## 15. Staging Environment Validation

Deploy to staging environment using deployment script. Run smoke tests covering critical paths and new features. Perform manual validation checklist including user login/logout, core functionality, new features, performance metrics, and security checks. Verify staging matches production configuration.

## 16. Production Deployment Planning

Schedule deployment window considering user traffic patterns. Notify stakeholders and users through status page and communication channels. Prepare maintenance mode pages if needed. Set up deployment monitoring with enhanced alerting. Plan communication strategy for updates and issue reporting.

## 17. Release Automation Setup

Configure CI/CD workflow for automated release on tag push. Set up GitHub Actions, GitLab CI, or similar with jobs for checkout, dependency installation, test execution, build generation, and release creation. Configure release creation with tag name, release name, generated changelog, and build artifacts attached.

## 18. Communication and Announcements

Prepare release announcement with key features and changes. Update status page and documentation sites. Notify customers and users through email, in-app notifications, or blog posts. Share on relevant communication channels (Slack, Teams, Discord). Update social media and marketing materials if applicable.

## 19. Post-Release Monitoring

Monitor application performance and errors using APM tools. Track user adoption of new features through analytics. Monitor system metrics and alerts for anomalies. Collect user feedback and issues through support channels. Prepare hotfix procedures if critical issues discovered.

## 20. Release Retrospective

Document lessons learned from release process. Review release process effectiveness and identify bottlenecks. Identify improvement opportunities for next release. Update release procedures and checklists based on learnings. Plan for next release cycle with timeline and feature planning.

</detailed_sequence_steps>

</task>
