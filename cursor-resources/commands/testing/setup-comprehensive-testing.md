<task name="Setup Comprehensive Testing">

<task_objective>
Setup complete testing infrastructure with multi-layer testing strategy across unit, integration, e2e, visual, and performance testing. This workflow designs testing strategy, configures multiple testing frameworks, and integrates with CI/CD for automated execution. The output is a complete testing infrastructure with configured frameworks, CI integration, quality metrics, and maintenance workflows.
</task_objective>

<detailed_sequence_steps>
# Setup Comprehensive Testing - Detailed Sequence of Steps

## 1. Testing Strategy Design

1. Detect project type: !`[ -f package.json ] && echo "Node.js" || [ -f requirements.txt ] && echo "Python" || [ -f pom.xml ] && echo "Java" || echo "Multi-language"`
2. Analyze project requirements and testing needs
3. Define testing pyramid strategy (unit, integration, e2e)
4. Plan coverage goals for each testing layer
5. Optimize testing investment and ROI
6. Define quality metrics and success criteria

## 2. Unit Testing Setup

1. Check existing tests: !`find . -name "*.test.*" -o -name "*.spec.*" | wc -l` test files
2. Check framework: !`grep -l "jest\\|vitest\\|pytest\\|junit" package.json requirements.txt pom.xml 2>/dev/null | head -1 || echo "Detect framework"`
3. Configure primary unit testing framework:
   - Jest or Vitest for JavaScript/TypeScript
   - pytest for Python
   - JUnit for Java
4. Setup test runners and execution configuration
5. Implement test utilities and helpers
6. Optimize test execution speed
7. Configure code coverage collection

## 3. Integration Testing

1. Setup integration test framework and structure
2. Configure test databases and data management
3. Implement API testing with request/response validation
4. Optimize test isolation and cleanup
5. Setup service mocking and stubbing
6. Configure integration test execution

## 4. E2E Testing Configuration

1. Setup browser testing framework:
   - Cypress for developer experience
   - Playwright for cross-browser testing
2. Configure test environments (dev, staging)
3. Implement page object patterns
4. Setup test data management
5. Configure cross-browser execution
6. Implement visual regression testing

## 5. Visual & Performance Testing

1. Setup visual regression testing tools (Percy, Chromatic, BackstopJS)
2. Configure performance benchmarks and metrics
3. Implement accessibility testing (axe-core)
4. Setup responsive design testing
5. Configure performance monitoring
6. Implement lighthouse audits

## 6. CI/CD Integration

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" -o -name "Jenkinsfile" | head -1 || echo "No CI detected"`
2. Configure automated test execution on commits/PRs
3. Setup parallel test execution for speed
4. Implement quality gates and thresholds
5. Optimize pipeline performance with caching
6. Configure test result reporting
7. Setup automated notifications

## 7. Advanced Features Implementation

1. Setup contract testing for service boundaries
2. Implement chaos engineering for resilience
3. Configure load testing for performance validation
4. Setup security testing (SAST, DAST)
5. Implement cross-browser testing matrix
6. Configure mobile device testing

## 8. Infrastructure Quality Assurance

1. Ensure test reliability and stability
2. Optimize test execution performance
3. Validate maintainability of test suite
4. Assess scalability of testing infrastructure
5. Optimize cost efficiency of testing
6. Implement flaky test detection

## 9. Output Delivery

1. Deliver complete testing infrastructure
2. Provide configured frameworks for all layers
3. Include CI integration configuration
4. Document quality metrics and tracking
5. Deliver maintenance workflows and procedures

</detailed_sequence_steps>

</task>
