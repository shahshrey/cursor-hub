<task name="Generate Test Cases">

<task_objective>
Generate comprehensive test cases with automatic analysis and intelligent coverage optimization. This workflow analyzes code structure, recognizes test patterns, analyzes input spaces, designs test cases, and optimizes coverage. The output is a comprehensive test case suite with optimized coverage, intelligent mocking, proper assertions, and maintenance guidelines.
</task_objective>

<detailed_sequence_steps>
# Generate Test Cases - Detailed Sequence of Steps

## 1. Code Structure Analysis

1. Detect test framework: !`find . -name "jest.config.*" -o -name "*.test.*" | head -1 && echo "Jest/Vitest detected" || echo "Detect framework"`
2. Parse function signatures and method declarations
3. Analyze control flow and execution paths
4. Identify branching paths and decision points
5. Assess complexity metrics (cyclomatic, cognitive)
6. Map dependencies and interactions

## 2. Test Pattern Recognition

1. Check existing patterns: !`find . -name "*.test.*" -o -name "*.spec.*" | head -3` test file patterns
2. Analyze existing test patterns and conventions
3. Identify testing naming conventions used
4. Extract reusable test patterns from codebase
5. Optimize consistency across test suite
6. Identify framework-specific patterns

## 3. Input Space Analysis

1. Analyze code complexity: !`find . -name "*.js" -o -name "*.ts" -o -name "*.py" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}' || echo "0"` lines of code
2. Identify parameter domains and types
3. Analyze boundary conditions for inputs
4. Discover edge cases and corner cases
5. Evaluate error conditions and exceptions
6. Identify state spaces for stateful functions

## 4. Test Case Design

1. Generate positive test cases for happy paths
2. Create negative test cases for error scenarios
3. Design boundary value tests for limits
4. Implement equivalence class tests for partitions
5. Create state transition tests for stateful code
6. Design combination tests for interactions

## 5. Mock Strategy Planning

1. Identify external dependencies requiring mocks
2. Design mock implementations for services
3. Create test data factories for complex objects
4. Optimize test isolation with appropriate mocking
5. Plan stub vs mock vs spy usage
6. Configure async operation handling

## 6. Coverage Optimization

1. Ensure comprehensive path coverage
2. Optimize test efficiency and execution speed
3. Eliminate redundant test cases
4. Maximize testing value per test
5. Balance coverage with maintainability
6. Identify coverage gaps and fill them

## 7. Advanced Features Implementation

1. Implement automatic edge case discovery
2. Setup intelligent input generation strategies
3. Configure test data synthesis for complex types
4. Enable coverage gap analysis
5. Implement performance test generation

## 8. Quality Assurance

1. Ensure test maintainability and readability
2. Optimize test execution performance
3. Validate assertion quality and specificity
4. Enhance debugging effectiveness
5. Implement proper test isolation

## 9. Output Delivery

1. Deliver comprehensive test case suite
2. Provide optimized test coverage strategy
3. Include intelligent mocking implementations
4. Document proper assertion patterns
5. Deliver maintenance guidelines and best practices

</detailed_sequence_steps>

</task>
