<task name="CI/CD Pipeline Setup">

<task_objective>
Setup comprehensive CI/CD pipeline with automated testing, building, and deployment. The workflow processes project type and deployment requirements to generate a complete continuous integration and deployment system with automated testing, code quality gates, security scanning, multi-environment deployment, and monitoring integration.
</task_objective>

<detailed_sequence_steps>
# CI/CD Pipeline Setup - Detailed Sequence of Steps

## 1. Project Analysis

Identify the technology stack and deployment requirements by examining @package.json or @setup.py or @go.mod or @pom.xml to detect language/framework. Check existing workflows using !`find .github/workflows -name "*.yml" 2>/dev/null | head -3`. Review git branches with !`git branch -r | head -5`. Assess dependencies from @package-lock.json or @requirements.txt or @go.sum, and check for build commands in package.json or Makefile. Review existing build and test processes, understand deployment environments (dev, staging, prod), and assess current version control and branching strategy.

## 2. CI/CD Platform Selection

Choose appropriate CI/CD platform based on requirements: GitHub Actions for native GitHub integration with extensive marketplace, GitLab CI for built-in GitLab comprehensive DevOps platform, Jenkins for self-hosted highly customizable setup with extensive plugins, CircleCI for cloud-based speed optimization, Azure DevOps for Microsoft ecosystem integration, or AWS CodePipeline for AWS-native solution.

## 3. Repository Setup

Ensure proper .gitignore configuration, set up branch protection rules, configure merge requirements and reviews, and establish semantic versioning strategy.

## 4. Build Pipeline Configuration

Create workflow files for the selected platform with jobs for testing, building, and deployment. Configure triggers for push events to main and develop branches, and pull requests to main. Set up checkout actions, environment setup (Node.js, Python, etc.), dependency installation with caching, test execution, and build steps.

## 5. Environment Configuration

Set up environment variables and secrets, configure different environments (dev, staging, prod), implement environment-specific configurations, and set up secure secret management.

## 6. Automated Testing Integration

Configure unit test execution, set up integration test running, implement E2E test execution, and configure test reporting and coverage. Implement multi-stage testing with matrix strategies for different runtime versions.

## 7. Code Quality Gates

Integrate linting and formatting checks, set up static code analysis (SonarQube, CodeClimate), configure security vulnerability scanning, and implement code coverage thresholds.

## 8. Build Optimization

Configure build caching strategies, implement parallel job execution, optimize Docker image builds, and set up artifact management. Use caching for dependency directories and build outputs.

## 9. Docker Integration

Create optimized Dockerfiles with multi-stage builds, set up container registry integration, and implement security scanning for images.

## 10. Deployment Strategies

Implement blue-green deployment, set up canary releases, configure rolling updates, and implement feature flags integration.

## 11. Infrastructure as Code

Use Terraform, CloudFormation, or similar tools, version control infrastructure definitions, implement infrastructure testing, and set up automated infrastructure provisioning.

## 12. Monitoring and Observability

Set up application performance monitoring, configure log aggregation and analysis, implement health checks and alerting, and set up deployment notifications.

## 13. Security Integration

Implement dependency vulnerability scanning, set up container security scanning, configure SAST (Static Application Security Testing), and implement secrets scanning.

## 14. Database Migration Handling

Automate database schema migrations, implement rollback strategies, set up database seeding for testing, and configure backup and recovery procedures.

## 15. Performance Testing Integration

Set up load testing in pipeline, configure performance benchmarks, implement performance regression detection, and set up performance monitoring.

## 16. Multi-Environment Deployment

Configure staging environment deployment, set up production deployment with approvals, implement environment promotion workflow, and configure environment-specific configurations.

## 17. Rollback and Recovery

Implement automated rollback procedures, set up deployment verification tests, configure failure detection and alerts, and document manual recovery procedures.

## 18. Notification and Reporting

Set up Slack/Teams integration for notifications, configure email alerts for failures, implement deployment status reporting, and set up metrics dashboards.

## 19. Compliance and Auditing

Implement deployment audit trails, set up compliance checks (SOC 2, HIPAA, etc.), configure approval workflows for sensitive deployments, and document change management processes.

## 20. Pipeline Optimization

Monitor pipeline performance and costs, implement pipeline parallelization, optimize resource allocation, and set up pipeline analytics and reporting.

</detailed_sequence_steps>

</task>
