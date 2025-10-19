<task name="Add Property-Based Testing">

<task_objective>
Implement comprehensive property-based testing framework with invariant analysis and automated test generation. This workflow selects appropriate property testing tools, identifies testable properties, designs custom generators, and implements property tests. The output is a complete property-based testing setup with identified properties, custom generators, integrated test suite, and performance optimization.
</task_objective>

<detailed_sequence_steps>
# Add Property-Based Testing - Detailed Sequence of Steps

## 1. Framework Selection

1. Detect language: !`find . -name "*.js" -o -name "*.ts" | head -1 >/dev/null && echo "JavaScript/TypeScript" || find . -name "*.py" | head -1 >/dev/null && echo "Python" || echo "Multi-language"`
2. Choose appropriate property testing tool:
   - fast-check for JavaScript/TypeScript
   - Hypothesis for Python
   - QuickCheck for Haskell
   - proptest for Rust
   - junit-quickcheck for Java
3. Install framework dependencies
4. Configure integration with existing test suite

## 2. Property Identification

1. Detect test framework: !`find . -name "jest.config.*" -o -name "pytest.ini" | head -1 || echo "Detect framework"`
2. Analyze mathematical properties in codebase
3. Identify business logic invariants
4. Discover symmetry properties
5. Evaluate round-trip properties (serialize/deserialize)
6. Identify idempotence properties
7. Analyze metamorphic properties

## 3. Generator Design

1. Create custom data generators for domain types
2. Implement constraint-based generation with preconditions
3. Design composite generators for complex data structures
4. Optimize generation strategies for edge cases
5. Configure generator distribution for realistic data
6. Implement recursive generators for nested structures

## 4. Property Implementation

1. Write property-based tests for identified properties
2. Implement preconditions for input validation
3. Design postconditions for output verification
4. Create invariant checks for state consistency
5. Implement oracle functions for correctness
6. Add custom property combinators

## 5. Shrinking Configuration

1. Configure automatic test case shrinking
2. Optimize failure minimization for debugging
3. Implement custom shrinkers for domain types
4. Enhance debugging with shrinking strategies
5. Configure shrinking depth and iteration limits
6. Validate shrinking effectiveness

## 6. Integration & Reporting

1. Integrate property tests with existing test suite
2. Configure property test reporting and output
3. Setup CI integration for automated execution
4. Optimize execution performance and parallelization
5. Configure test case replay for reproducibility
6. Implement property coverage tracking

## 7. Advanced Features Implementation

1. Implement stateful property testing with models
2. Setup model-based testing for complex systems
3. Create custom generators for specific domains
4. Configure parallel property execution
5. Implement performance property testing

## 8. Quality Assurance

1. Analyze property completeness and coverage
2. Ensure edge case coverage through generation
3. Optimize test execution performance
4. Assess property test maintainability
5. Validate property test effectiveness

## 9. Output Delivery

1. Deliver complete property-based testing setup
2. Include documented identified properties
3. Provide custom generators for domain types
4. Include integrated test suite with examples
5. Document performance optimization strategies

</detailed_sequence_steps>

</task>
