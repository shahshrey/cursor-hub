<task name="Setup Visual Testing">

<task_objective>
Setup comprehensive visual regression testing with responsive design validation and accessibility checking. This workflow selects visual testing tools, creates visual baselines, designs test scenarios, integrates with CI/CD, configures regression detection, and implements accessibility testing. The output is a complete visual testing setup with baseline management, regression detection, CI integration, and comprehensive validation workflows.
</task_objective>

<detailed_sequence_steps>
# Setup Visual Testing - Detailed Sequence of Steps

## 1. Tool Selection & Setup

1. Detect frontend framework: !`grep -l "react\\|vue\\|angular" package.json 2>/dev/null || echo "Detect framework"`
2. Analyze UI structure: !`find . -name "components" -o -name "src" | head -1 && echo "Component structure detected" || echo "Analyze structure"`
3. Choose appropriate visual testing tools:
   - Percy for cloud-based visual testing
   - Chromatic for Storybook integration
   - BackstopJS for self-hosted testing
   - Playwright for screenshot comparison
4. Configure tool integration with project
5. Setup test environments and configurations
6. Configure authentication for visual testing service

## 2. Baseline Creation

1. Check existing testing: !`find . -name "cypress" -o -name "playwright" -o -name "storybook" | head -1 || echo "No visual testing"`
2. Capture initial visual baselines for components
3. Organize screenshot structure by component/page
4. Implement version control for baseline images
5. Optimize image management and storage
6. Setup baseline approval workflow
7. Configure baseline update procedures

## 3. Test Scenario Design

1. Create component-level visual tests
2. Design page-level workflow tests
3. Implement responsive breakpoint testing:
   - Mobile (320px, 375px, 414px)
   - Tablet (768px, 1024px)
   - Desktop (1280px, 1440px, 1920px)
4. Configure multi-browser testing matrix:
   - Chrome
   - Firefox
   - Safari
   - Edge
5. Design interaction state tests (hover, focus, active)
6. Implement dark mode and theme testing

## 4. Integration Setup

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" | head -1 || echo "No CI detected"`
2. Configure CI/CD pipeline integration
3. Setup automated test execution on PRs
4. Implement visual review workflows
5. Optimize performance with parallel execution
6. Configure test result reporting
7. Setup notifications for visual changes

## 5. Regression Detection

1. Configure diff algorithms for comparison
2. Setup threshold management for acceptable changes
3. Implement approval workflows for visual changes
4. Optimize diff accuracy and false positive reduction
5. Configure ignore regions for dynamic content
6. Setup automated baseline updates on approval

## 6. Advanced Testing

1. Setup accessibility testing integration (axe-core, pa11y)
2. Configure cross-browser validation
3. Implement responsive design testing
4. Design performance visual metrics:
   - First Contentful Paint
   - Largest Contentful Paint
   - Cumulative Layout Shift
5. Setup animation and transition testing
6. Implement print stylesheet testing

## 7. Accessibility Validation

1. Integrate automated accessibility testing tools
2. Configure WCAG compliance checking (Level A, AA, AAA)
3. Implement color contrast validation
4. Setup keyboard navigation testing
5. Configure screen reader compatibility testing
6. Validate ARIA attribute usage

## 8. Quality Assurance

1. Ensure test reliability and consistency
2. Reduce false positive detections
3. Optimize test maintainability
4. Enhance test execution performance
5. Validate coverage completeness
6. Implement flaky test detection

## 9. Output Delivery

1. Deliver complete visual testing setup
2. Provide baseline management procedures
3. Include regression detection configuration
4. Document CI integration setup
5. Deliver comprehensive validation workflows
6. Include accessibility compliance reports

</detailed_sequence_steps>

</task>
