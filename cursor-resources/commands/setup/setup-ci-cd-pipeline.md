<task name="Setup CI/CD Pipeline">

<task_objective>
Implement production-ready CI/CD pipeline with comprehensive automation and best practices. The input includes version control platform detection, existing CI configurations, test framework, and deployment configurations from the codebase. The output will be a complete CI/CD pipeline with automated testing, secure deployments, monitoring integration, and comprehensive documentation.
</task_objective>

<detailed_sequence_steps>
# Setup CI/CD Pipeline - Detailed Sequence of Steps

## 1. Repository State Analysis

1. Detect version control platform using git remote command (GitHub, GitLab, Bitbucket, etc.).

2. Check for existing CI configuration files (.github/, .gitlab-ci.yml, azure-pipelines.yml).

3. Identify test framework from @package.json or testing file patterns.

4. Review deployment configuration from @Dockerfile or deployment manifests.

5. Determine platform choice from **$ARGUMENTS** (--github-actions | --gitlab-ci | --azure-pipelines | --jenkins).

## 2. Build Automation

1. Configure code compilation steps for compiled languages (TypeScript, Java, Go, etc.).

2. Setup dependency installation using appropriate package managers (npm, pip, cargo).

3. Configure artifact creation including bundling, minification, and optimization.

4. Implement build caching strategies to speed up subsequent builds.

5. Configure parallel job execution for independent build tasks.

## 3. Testing Strategy

1. Configure unit test execution with code coverage collection and reporting.

2. Setup integration tests for API endpoints and database interactions.

3. Implement end-to-end testing using tools like Cypress, Playwright, or Selenium.

4. Configure code coverage reporting with minimum threshold requirements.

5. Create test result visualization and failure notifications.

## 4. Quality Gates

1. Configure linting checks using ESLint, Pylint, or language-specific linters.

2. Setup security scanning using SAST tools (Snyk, SonarQube, etc.).

3. Implement vulnerability assessment for dependencies and container images.

4. Configure code quality metrics including maintainability and complexity.

5. Create quality gate rules that must pass before deployment.

## 5. Deployment Automation

1. Configure staging deployment with automatic triggers on merge to develop branch.

2. Setup production deployment with manual approval or automated release triggers.

3. Implement rollback mechanisms for failed deployments and quick recovery.

4. Configure deployment strategies (blue-green, canary, rolling updates).

5. Create deployment validation checks including smoke tests and health checks.

## 6. Environment Management

1. Configure infrastructure provisioning using Terraform, CloudFormation, or similar tools.

2. Setup configuration management for environment-specific settings.

3. Implement secrets handling using platform secret managers or external vaults.

4. Configure environment isolation and access controls.

5. Design multi-environment support (development, staging, production).

## 7. Monitoring Integration

1. Integrate performance monitoring tools for application metrics and APM.

2. Configure error tracking services like Sentry or Rollbar.

3. Setup deployment notifications to Slack, email, or communication platforms.

4. Implement status page updates for deployment events.

5. Create alerting for failed deployments or quality gate failures.

## 8. Advanced Features

1. Configure parallel job execution for faster pipeline completion.

2. Implement matrix builds for testing across multiple platforms or versions.

3. Setup deployment strategies including blue-green and canary deployments.

4. Configure multi-environment support with promotion workflows.

5. Implement dependency caching and incremental builds for performance.

## 9. Security & Compliance

1. Implement secure credential management using encrypted secrets and vaults.

2. Configure compliance checks for regulatory requirements (SOC2, HIPAA, etc.).

3. Setup audit trails for all deployment activities and approvals.

4. Implement approval workflows for production deployments.

5. Configure branch protection rules and required status checks.

## 10. Documentation and Validation

1. Document pipeline architecture including stages, jobs, and dependencies.

2. Create runbooks for common deployment scenarios and troubleshooting.

3. Document secrets management and environment variable configuration.

4. Test pipeline with sample changes to verify all stages work correctly.

5. Create team onboarding guide for CI/CD workflows and best practices.

</detailed_sequence_steps>

</task>
