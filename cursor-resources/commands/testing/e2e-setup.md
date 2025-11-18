<task name="E2E Setup">

<task_objective>
Configure comprehensive end-to-end testing suite with framework selection and optimization. This workflow selects the optimal E2E testing tool, configures test environments, implements page object patterns, sets up test data management, and integrates with CI/CD. The output is a complete E2E testing setup with framework configuration, test suites, CI integration, and maintenance workflows.
</task_objective>

<detailed_sequence_steps>
# E2E Setup - Detailed Sequence of Steps

## 1. Framework Selection & Setup

1. Detect application type: !`find . -name "index.html" -o -name "app.js" -o -name "App.tsx" | head -1 && echo "Web app" || echo "Detect app type"`
2. Detect frontend framework: !`grep -l "react\\|vue\\|angular" package.json 2>/dev/null || echo "Detect framework"`
3. Choose optimal E2E testing tool:
   - Cypress for developer-friendly testing
   - Playwright for cross-browser and mobile
   - WebDriver for Selenium-based testing
   - Puppeteer for Chrome-focused testing
4. Install framework dependencies and tools
5. Configure basic settings and project structure
6. Setup initial test directory organization

## 2. Test Environment Configuration

1. Check existing setup: !`find . -name "cypress" -o -name "playwright" -o -name "e2e" | head -1 || echo "No E2E setup"`
2. Setup test environments (dev, staging, production)
3. Configure base URLs and environment variables
4. Implement environment switching mechanisms
5. Optimize test isolation between runs
6. Configure test database and data management

## 3. Page Object Patterns Implementation

1. Design page object model architecture
2. Create reusable page components and modules
3. Implement robust element selectors (data-testid, accessibility)
4. Optimize code maintainability and reusability
5. Create helper utilities for common actions
6. Implement custom commands and shortcuts

## 4. Test Data Management

1. Setup test data generation strategies
2. Implement test fixtures for consistent data
3. Configure database seeding procedures
4. Design cleanup and teardown procedures
5. Implement data factories for dynamic generation
6. Manage test data versioning and isolation

## 5. Cross-Browser Testing

1. Configure multi-browser execution (Chrome, Firefox, Safari, Edge)
2. Setup mobile device testing (iOS, Android)
3. Implement responsive design testing
4. Optimize browser compatibility testing
5. Configure viewport and device emulation
6. Setup parallel execution across browsers

## 6. CI/CD Integration

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" | head -1 || echo "No CI detected"`
2. Configure automated test execution on commits
3. Setup parallel testing for faster execution
4. Implement test result reporting and dashboards
5. Optimize pipeline performance and caching
6. Configure test failure notifications
7. Setup video recording and screenshot capture

## 7. Advanced Features Implementation

1. Setup visual regression testing integration
2. Implement accessibility testing (axe-core)
3. Configure performance monitoring and metrics
4. Integrate API testing with E2E flows
5. Setup mobile device cloud testing
6. Implement network mocking and stubbing

## 8. Quality Assurance

1. Optimize test reliability and reduce flakiness
2. Implement flaky test prevention strategies
3. Optimize test execution speed
4. Enhance debugging capabilities with detailed logs
5. Implement retry logic for transient failures
6. Configure test timeouts appropriately

## 9. Output Delivery

1. Deliver complete E2E testing setup
2. Provide framework configuration files
3. Include test suites with examples
4. Document CI integration setup
5. Deliver maintenance workflows and best practices

</detailed_sequence_steps>

</task>
