<task name="CI/CD Pipeline Manager">

<task_objective>
Manage and automate comprehensive CI/CD pipeline configuration with GitHub Actions, multi-environment deployment strategies, security scanning, performance testing, and workflow orchestration. This workflow creates production-ready pipelines with quality gates, matrix testing, artifact management, and monitoring capabilities for modern software delivery.
</task_objective>

<detailed_sequence_steps>
# CI/CD Pipeline Manager - Detailed Sequence of Steps

## 1. Pipeline State Assessment

1. Analyze current pipeline configuration
   - Search for existing GitHub Actions workflows in `.github/workflows/`
   - List all current workflow files and their purposes
   - Identify package.json scripts related to CI/CD

2. Check CI/CD infrastructure status
   - Verify GitHub CLI availability with `gh --version`
   - Check recent workflow runs using `gh run list --limit 5`
   - Review environment configuration files (`.env*` files)

3. Determine pipeline operation mode
   - If `setup` specified: Create new comprehensive pipeline
   - If `status` specified: Display current pipeline health
   - If `fix` specified: Troubleshoot and repair failing workflows
   - If pipeline name specified: Manage specific pipeline

4. Assess project requirements
   - Identify project type (Node.js, Python, Docker, etc.)
   - Determine test framework and coverage tools
   - Check deployment targets (Vercel, AWS, Docker, etc.)

## 2. Pipeline Architecture Design

1. Design workflow structure based on project needs
   - Define primary workflows: CI (test/build), CD (deploy), Security, Performance
   - Establish job dependencies and execution order
   - Plan matrix strategy for multi-version/platform testing

2. Configure trigger events appropriately
   - Set up push triggers for main/develop branches
   - Configure pull request triggers for code review
   - Enable manual workflow dispatch for on-demand runs
   - Set up release triggers for production deployments

3. Plan multi-environment deployment strategy
   - Define environments: development, staging, production
   - Configure environment-specific secrets and variables
   - Set up environment protection rules and approval gates
   - Establish rollback and recovery procedures

4. Design quality gates and checkpoints
   - Plan linting and code formatting checks
   - Configure test execution with coverage requirements
   - Set up security scanning and vulnerability checks
   - Plan performance benchmarking thresholds

## 3. Core CI Workflow Implementation

1. Create comprehensive CI workflow file
   - Generate `.github/workflows/ci.yml` with proper structure
   - Configure checkout action with appropriate options
   - Set up language runtime (Node.js, Python, etc.) with caching

2. Implement matrix testing strategy
   - Configure version matrix (e.g., Node 18, 20, 22)
   - Add OS matrix if cross-platform support needed
   - Include conditional coverage collection on specific combinations

3. Add build and test steps
   - Install dependencies with lock file (`npm ci` or equivalent)
   - Run linter to enforce code quality standards
   - Execute test suite with coverage reporting
   - Build application and verify build artifacts

4. Integrate coverage reporting
   - Upload coverage to Codecov or similar service
   - Configure coverage thresholds and failure conditions
   - Display coverage reports in pull requests

## 4. Security and Quality Scanning

1. Implement security audit workflow
   - Create security scanning job in CI workflow
   - Add npm/pip audit for dependency vulnerabilities
   - Set audit level thresholds (moderate, high, critical)

2. Configure secret scanning
   - Integrate TruffleHog or similar tool
   - Scan commits for exposed secrets and credentials
   - Configure base and head for PR scanning

3. Add Static Application Security Testing (SAST)
   - Integrate GitHub Super Linter or similar
   - Configure linting rules for security issues
   - Set up CodeQL analysis if applicable

4. Implement dependency scanning
   - Enable Dependabot for automated updates
   - Configure security advisory checks
   - Set up automatic PR creation for vulnerabilities

## 5. Deployment Workflow Configuration

1. Create staging deployment workflow
   - Generate `.github/workflows/deploy.yml`
   - Configure staging environment with URL and secrets
   - Set up automatic deployment on main branch updates

2. Implement production deployment
   - Configure production environment with protection rules
   - Add approval requirements before production deploy
   - Set up deployment only on release events

3. Add deployment verification steps
   - Include smoke tests after deployment
   - Verify service health endpoints
   - Check deployment metrics and logs

4. Configure rollback mechanisms
   - Add rollback job triggered on deployment failure
   - Store previous deployment state
   - Implement automated rollback procedures

## 6. Performance Testing Integration

1. Add performance testing job for pull requests
   - Configure job to run on PR events
   - Set up test environment with service startup
   - Allow service warm-up time before testing

2. Integrate Lighthouse or performance tools
   - Run Lighthouse against deployed preview
   - Capture performance, accessibility, and SEO scores
   - Generate JSON output for analysis

3. Implement performance reporting
   - Use GitHub Actions script to parse results
   - Post performance scores as PR comments
   - Track performance trends over time

4. Set performance thresholds
   - Define minimum acceptable scores
   - Fail PR if performance degrades significantly
   - Provide actionable recommendations for improvements

## 7. Advanced Workflow Features

1. Implement workflow optimization
   - Configure caching for dependencies and build outputs
   - Use cache keys based on lock file hashes
   - Implement artifact sharing between jobs

2. Add conditional execution logic
   - Skip CI on specific commit messages (`[skip ci]`)
   - Run deployment only on version tags
   - Execute expensive jobs conditionally

3. Configure workflow dependencies
   - Establish job execution order with `needs`
   - Set up parallel execution where possible
   - Implement failure handling and recovery

4. Implement artifact management
   - Upload build artifacts for later use
   - Configure artifact retention periods
   - Enable artifact download in dependent jobs

## 8. Monitoring and Maintenance

1. Set up pipeline monitoring
   - Use GitHub CLI to check workflow status
   - Track workflow run history and trends
   - Monitor success/failure rates

2. Calculate pipeline metrics
   - Measure average build duration
   - Calculate success rate over time
   - Identify bottlenecks in pipeline

3. Implement alerting
   - Configure notifications for workflow failures
   - Set up Slack/email integration for critical events
   - Alert on unusual pipeline behavior

4. Regular pipeline maintenance
   - Review and update action versions
   - Optimize slow steps and caching strategies
   - Remove deprecated workflows and cleanup old runs

## 9. Troubleshooting and Resolution

1. Diagnose workflow failures
   - View detailed logs with `gh run view [run-id] --log`
   - Identify common failure patterns
   - Check for permissions, secrets, or timeout issues

2. Fix permission issues
   - Configure appropriate workflow permissions
   - Grant contents, actions, security-events, pull-requests access
   - Ensure service account has necessary rights

3. Manage secrets properly
   - Add repository secrets via GitHub CLI or UI
   - Validate secret availability in workflows
   - Rotate secrets according to security policy

4. Optimize timeout configurations
   - Set appropriate job-level timeouts
   - Configure step-level timeouts for long-running tasks
   - Balance timeout duration with resource costs

## Pipeline Configuration Examples

### Complete CI Workflow
```yaml
name: CI Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run tests
        run: npm run test:coverage
      - name: Build application
        run: npm run build
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Multi-Environment Deployment
```yaml
name: Deploy
on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Staging
        run: |
          npm run build:staging
          npm run deploy:staging
        env:
          STAGING_API_URL: ${{ secrets.STAGING_API_URL }}

  deploy-production:
    if: github.event_name == 'release'
    runs-on: ubuntu-latest
    environment: production
    needs: [test]
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Production
        run: |
          npm run build:production
          npm run deploy:production
        env:
          PROD_API_URL: ${{ secrets.PROD_API_URL }}
```

### Security Scanning
```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run security audit
      run: npm audit --audit-level=moderate
    - name: Scan for secrets
      uses: trufflesecurity/trufflehog@main
      with:
        path: ./
        base: main
        head: HEAD
```

### Performance Testing
```yaml
performance:
  runs-on: ubuntu-latest
  if: github.event_name == 'pull_request'
  steps:
    - uses: actions/checkout@v4
    - name: Performance Test
      run: |
        npm run build
        npm run start:test &
        sleep 10
        npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse.json
    - name: Comment PR
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const lighthouse = JSON.parse(fs.readFileSync('./lighthouse.json'));
          const score = lighthouse.lhr.categories.performance.score * 100;
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: `⚡ Performance Score: ${score}/100`
          });
```

</detailed_sequence_steps>

</task>

