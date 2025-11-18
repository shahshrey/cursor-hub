---
name: Secure CI/CD Pipeline
description: Implement comprehensive security controls for CI/CD pipelines including least privilege access, automated security gates, secret management, container hardening, and disaster recovery procedures.
category: security
tags: [cicd, devops, security, automation, container-security, secret-management]
---

<task name="Secure CI/CD Pipeline">

<task_objective>
Systematically audit and harden the CI/CD pipeline by implementing principle of least privilege for credentials, integrating automated security gates (SAST, linting, testing), securing secret management, hardening container and infrastructure configurations, and establishing backup and rollback procedures. The output will be a secured CI/CD pipeline with documented security controls and configuration changes.
</task_objective>

<detailed_sequence_steps>

## 1. Identify CI/CD Configuration Files

1. Use `glob_file_search` to locate CI/CD configuration files:
   - `.github/workflows/*.yml` (GitHub Actions)
   - `.gitlab-ci.yml` (GitLab CI)
   - `Jenkinsfile` (Jenkins)
   - `azure-pipelines.yml` (Azure DevOps)
   - `.circleci/config.yml` (CircleCI)
   - `bitbucket-pipelines.yml` (Bitbucket)

2. Use `read_file` on each identified CI/CD configuration to understand current pipeline structure.

3. Use `grep` with pattern `(token|secret|password|key|credential)` across configuration files to identify where secrets are referenced.

4. Document current pipeline structure and identify security risks.

## 2. Implement Principle of Least Privilege

1. Use `grep` to find all authentication tokens, API keys, and credentials in CI/CD configurations.

2. For each token/credential identified:
   - Verify it has minimal required scopes
   - Check if it's stored as a secret (not hardcoded)
   - Document its purpose and required permissions

3. Use `codebase_search` with query "How are CI/CD permissions and access controls configured?" to find permission configurations.

4. Use `search_replace` to update CI/CD configurations:
   - Replace full-access tokens with scoped tokens
   - Add permission restrictions to workflow jobs
   - Implement branch protection rules

5. Create or update permission documentation using `write`:
   - Document which tokens have which scopes
   - List who can trigger deployments
   - Define approval requirements for production deployments

## 3. Integrate Automated Security Gates

1. Use `read_file` on CI/CD configuration to check for existing security checks.

2. Use `grep` with patterns `(test|lint|security|scan|sast|vulnerability)` to identify existing security gates.

3. For missing security gates, use `search_replace` or `write` to add:
   - Unit and integration test jobs that must pass before deployment
   - Linting jobs for code quality checks
   - SAST (Static Application Security Testing) scans
   - Dependency vulnerability scanning
   - Container image scanning (if using Docker)

4. Configure security gates to be blocking:
   - Set required status checks in branch protection
   - Add `if: failure()` conditions to prevent deployment on security failures
   - Configure quality gates with acceptable thresholds

5. Use `run_terminal_cmd` to validate CI/CD configuration syntax (if applicable):
   - `actionlint .github/workflows/*.yml` for GitHub Actions
   - `gitlab-ci-lint` for GitLab
   - Relevant validation commands for other platforms

## 4. Secure Secret Management

1. Use `grep` with pattern `(password|secret|key|token).*=.*['\"]` to find any hardcoded secrets.

2. If hardcoded secrets are found:
   - Use `read_lints` to check for security linting warnings
   - Use `search_replace` to replace hardcoded values with environment variable references
   - Document secrets that need to be added to the CI platform's secret store

3. Use `codebase_search` with query "Where are environment variables and secrets loaded in the application?" to understand secret usage.

4. Update CI/CD configuration to use encrypted secret stores:
   - GitHub Actions: `${{ secrets.SECRET_NAME }}`
   - GitLab CI: `$CI_SECRET_NAME`
   - Other platforms: use their encrypted secret references

5. Add logging protection using `search_replace`:
   - Ensure secrets are marked as sensitive/masked in logs
   - Add guards to prevent accidental secret printing
   - Configure log sanitization rules

6. Create secret rotation documentation using `write`:
   - Document which secrets exist and where they're used
   - Define rotation schedules
   - List procedures for rotating compromised secrets

## 5. Harden Container and Infrastructure Security

1. If Docker is used, use `glob_file_search` to find `Dockerfile` and `docker-compose.yml` files.

2. Use `read_file` on each Dockerfile to audit for security issues.

3. Use `grep` to check for insecure patterns:
   - `USER root` (running as root)
   - `FROM.*:latest` (unpinned base images)
   - `RUN.*wget.*|.*curl.*` without verification
   - Exposed sensitive ports

4. Use `search_replace` to harden Dockerfiles:
   - Use minimal base images (alpine, distroless)
   - Pin specific image versions with digests
   - Create non-root user and switch to it
   - Remove unnecessary packages and tools
   - Use multi-stage builds to minimize attack surface

5. For cloud infrastructure:
   - Use `codebase_search` with query "How are cloud resources and firewall rules configured?"
   - Use `grep` to find infrastructure-as-code files (Terraform, CloudFormation, etc.)
   - Use `read_file` on infrastructure configuration files
   - Update configurations to restrict network access and implement security groups

6. Add infrastructure security scans to CI/CD using `search_replace`:
   - Add Trivy or similar container scanning
   - Add infrastructure security scanning (checkov, tfsec)
   - Configure scans to fail on high-severity issues

## 6. Establish Backup and Rollback Procedures

1. Use `codebase_search` with query "How are database backups and disaster recovery handled?" to find existing backup mechanisms.

2. Use `list_dir` on directories likely to contain deployment scripts (e.g., `scripts/`, `deploy/`, `.github/workflows/`).

3. Use `read_file` on deployment-related files to understand current deployment process.

4. Update CI/CD configuration to include backup steps:
   - Add pre-deployment backup jobs
   - Configure backup verification
   - Set backup retention policies

5. Create rollback procedures using `write`:
   - Document manual rollback steps
   - Create automated rollback scripts if not present
   - Define rollback triggers and decision criteria

6. Add deployment safeguards using `search_replace` in CI/CD configuration:
   - Implement blue-green or canary deployments
   - Add smoke tests after deployment
   - Configure automatic rollback on failed health checks
   - Add manual approval gates for production deployments

7. Create or update deployment documentation using `write`:
   - Document backup locations and access procedures
   - List rollback commands and procedures
   - Define incident response steps for failed deployments
   - Include contact information for escalations

## 7. Validate and Document Security Implementation

1. Use `run_terminal_cmd` to validate all CI/CD configuration changes (platform-specific validation commands).

2. Use `read_lints` to check for any introduced configuration errors.

3. Create comprehensive security documentation using `write`:
   - Security controls implemented
   - Secret management procedures
   - Access control policies
   - Backup and rollback procedures
   - Security gate configurations
   - Incident response procedures

4. Use `todo_write` to track any remaining security tasks:
   - Items requiring manual configuration in CI platform
   - Secrets that need to be rotated
   - Team members who need access updates
   - Follow-up security audits needed

5. Inform the user of completed security implementations and provide summary of changes made.

</detailed_sequence_steps>

</task>

