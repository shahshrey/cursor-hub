<task name="Write Tests">

<task_objective>
Write comprehensive unit and integration tests with framework-specific best practices. This workflow analyzes target code, designs test strategies, implements framework-specific patterns, creates mocks, and generates comprehensive test cases. The output is a comprehensive test suite with unit tests, integration tests, proper mocking, test utilities, and coverage optimization.
</task_objective>

<detailed_sequence_steps>
# Write Tests - Detailed Sequence of Steps

## 1. Code Analysis

1. Detect test framework: !`find . -name "jest.config.*" -o -name "*.test.*" | head -1 && echo "Jest/Vitest detected" || echo "Detect framework"`
2. Analyze target code structure and complexity
3. Identify testable functions and methods
4. Assess dependency complexity and mocking needs
5. Evaluate edge cases and error scenarios
6. Review existing test patterns: !`find . -name "*.test.*" -o -name "*.spec.*" | head -3`

## 2. Test Strategy Design

1. Check coverage setup: !`grep -l "coverage" package.json jest.config.* 2>/dev/null | head -1 || echo "Setup needed"`
2. Plan test organization and file structure
3. Design test hierarchies with describe blocks
4. Identify mock requirements for dependencies
5. Optimize test isolation strategy
6. Define test coverage goals

## 3. Framework Integration

1. Setup framework-specific patterns and conventions
2. Configure test utilities and helpers
3. Implement proper assertions with clear messages
4. Optimize test performance and execution speed
5. Configure test environment and setup
6. Integrate with existing test infrastructure

## 4. Mock Implementation

1. Design dependency mocks for external services
2. Implement test doubles (mocks, stubs, spies, fakes)
3. Create factory functions for test data
4. Setup async operation handling and promises
5. Configure timer and date mocking
6. Implement proper cleanup and teardown

## 5. Test Case Generation

1. Write comprehensive unit tests for functions
2. Create integration tests for component interactions
3. Implement edge case tests for boundary conditions
4. Design error scenario tests for exception handling
5. Create performance tests for critical paths
6. Implement snapshot tests for UI components

## 6. Quality Assurance

1. Ensure test maintainability and readability
2. Optimize execution speed and performance
3. Validate test coverage completeness
4. Implement proper setup and teardown
5. Verify test isolation and independence
6. Follow AAA pattern (Arrange, Act, Assert)

## 7. Advanced Features Implementation

1. Implement property-based testing where appropriate
2. Setup contract testing for API boundaries
3. Configure visual regression testing for UI
4. Implement accessibility testing
5. Setup performance benchmarking

## 8. Framework Support

1. Configure Jest/Vitest specific features
2. Integrate React Testing Library for React components
3. Setup Vue Test Utils for Vue components
4. Configure Angular TestBed for Angular components
5. Integrate Cypress or Playwright for E2E tests

## 9. Output Delivery

1. Deliver comprehensive test suite
2. Include unit tests with full coverage
3. Provide integration tests for interactions
4. Include proper mocking implementations
5. Deliver test utilities and helpers
6. Document coverage optimization strategies

</detailed_sequence_steps>

</task>
