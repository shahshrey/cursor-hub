<task name="Generate Tests">

<task_objective>
Generate comprehensive test suite with unit, integration, and edge case coverage for the target code or component. This workflow analyzes the target file/component structure, identifies testable elements, examines existing patterns, creates test files, implements test cases with proper setup/teardown, adds mocks and utilities, and verifies coverage completeness. The output is a complete test suite including unit tests, integration tests, edge case tests, mock implementations, test utilities, and verification of test coverage.
</task_objective>

<detailed_sequence_steps>
# Generate Tests - Detailed Sequence of Steps

## 1. Analyze Target File/Component Structure

1. Detect test framework: @package.json or @jest.config.js or @vitest.config.js (detect framework)
2. Read and analyze target file: @$ARGUMENTS (if file path provided)
3. Identify all testable functions and methods
4. Identify component behaviors and interactions
5. Analyze state management and lifecycle methods
6. Map external dependencies and services
7. Assess complexity and testing requirements

## 2. Identify All Testable Functions, Methods, and Behaviors

1. List all exported functions and methods
2. Identify public API surface for testing
3. Analyze internal functions requiring indirect testing
4. Identify component props and event handlers
5. Map state transitions and side effects
6. Identify edge cases and error conditions

## 3. Examine Existing Test Patterns in Project

1. Check existing tests: !`find . -name "*.test.*" -o -name "*.spec.*" | head -5`
2. Analyze naming conventions (*.test.*, *.spec.*)
3. Identify describe/it structure patterns
4. Review mock implementation patterns
5. Examine assertion styles used
6. Identify test utility patterns

## 4. Create Test Files Following Project Naming Conventions

1. Determine appropriate test file location
2. Follow project naming conventions (*.test.*, *.spec.*)
3. Create test file structure with describe blocks
4. Setup test imports and dependencies
5. Configure test environment and globals

## 5. Implement Comprehensive Test Cases with Proper Setup/Teardown

1. Write unit tests for individual functions and methods
2. Create integration tests for component interactions
3. Implement edge case and error handling tests
4. Design performance tests where appropriate
5. Create snapshot tests for UI components
6. Implement proper beforeEach/afterEach setup
7. Configure proper cleanup and teardown

## 6. Add Necessary Mocks and Test Utilities

1. Create mock implementations for external dependencies
2. Implement test doubles (mocks, stubs, spies)
3. Design test data factories and fixtures
4. Create reusable test utilities and helpers
5. Configure async operation handling (promises, timers)
6. Setup proper module mocking

## 7. Verify Test Coverage and Add Missing Test Cases

1. Run test coverage: !`npm run test:coverage 2>/dev/null || echo "No coverage script"`
2. Analyze coverage reports for gaps
3. Identify untested code paths
4. Add test cases for missing coverage
5. Ensure edge cases are covered
6. Validate assertion completeness

## 8. Framework-Specific Test Implementation

1. **React**: Implement component testing with React Testing Library
   - Component rendering tests
   - User interaction tests
   - Hook testing
   - Context and provider tests

2. **Vue**: Implement component testing with Vue Test Utils
   - Component mounting tests
   - Prop validation tests
   - Event emission tests
   - Computed property tests

3. **Angular**: Implement component and service testing with TestBed
   - Component fixture tests
   - Service injection tests
   - Directive tests
   - Pipe tests

4. **Node.js**: Implement API endpoint and middleware testing
   - Request/response tests
   - Middleware chain tests
   - Error handling tests
   - Authentication tests

## 9. Apply Testing Best Practices

1. Use descriptive test names explaining behavior
2. Follow AAA pattern (Arrange, Act, Assert)
3. Group related tests with describe blocks
4. Implement proper test isolation
5. Mock external dependencies and API calls
6. Use factories for test data generation
7. Implement proper async cleanup
8. Mock timers and dates for deterministic tests
9. Aim for 80%+ code coverage
10. Focus on critical business logic paths
11. Test both happy path and error scenarios
12. Include boundary value testing

## 10. Output Delivery

1. Deliver complete test suite with all test types
2. Provide unit tests for individual functions
3. Include integration tests for interactions
4. Deliver edge case and error handling tests
5. Include mock implementations
6. Provide test utilities and helpers
7. Document coverage analysis and recommendations

</detailed_sequence_steps>

</task>
