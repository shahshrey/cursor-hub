<task name="Test Automation Orchestrator">

<task_objective>
Orchestrate comprehensive test automation with intelligent execution optimization and resource management. This workflow analyzes test suites across the project, classifies test types, and implements optimized execution strategies with parallel processing, dependency management, and pipeline integration. The output is a complete test orchestration system with optimized execution, intelligent resource management, comprehensive monitoring, and performance analytics.
</task_objective>

<detailed_sequence_steps>
# Test Automation Orchestrator - Detailed Sequence of Steps

## 1. Test Discovery & Classification

1. Analyze test suites: !`find . -name "*.test.*" -o -name "*.spec.*" | wc -l` test files across project
2. Classify test types (unit, integration, e2e, performance)
3. Assess execution requirements for each test category
4. Optimize test categorization for efficient orchestration

## 2. Execution Strategy Design

1. Design parallel execution strategies based on test dependencies
2. Implement intelligent batching to group related tests
3. Optimize resource allocation across test suites
4. Configure conditional execution based on code changes and context

## 3. Dependency Management

1. Analyze test dependencies and execution order requirements
2. Implement execution ordering to handle test prerequisites
3. Configure prerequisite validation before test execution
4. Optimize dependency resolution for maximum parallelization

## 4. Resource Optimization

1. Configure parallel execution with optimal worker allocation
2. Implement resource pooling for shared test resources
3. Optimize memory usage and prevent resource exhaustion
4. Design scalable execution architecture for growing test suites

## 5. Pipeline Integration

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" | head -1 || echo "No CI detected"`
2. Design CI/CD integration with automated triggers
3. Implement stage orchestration for multi-stage pipelines
4. Configure failure handling and retry mechanisms
5. Optimize feedback loops for faster development cycles

## 6. Monitoring & Analytics

1. Implement execution monitoring with real-time status tracking
2. Configure performance tracking for execution metrics
3. Design failure analysis with root cause identification
4. Optimize reporting with actionable insights and trends
5. Track resource usage patterns for optimization

## 7. Advanced Features Implementation

1. Implement AI-driven test selection based on code changes
2. Configure predictive execution optimization using historical data
3. Setup dynamic resource allocation based on load
4. Implement intelligent failure recovery mechanisms
5. Optimize cost efficiency with smart resource management

## 8. Quality Assurance Validation

1. Ensure execution reliability across all test types
2. Validate performance consistency under different loads
3. Verify resource efficiency and optimization
4. Assess maintainability of orchestration configuration

## 9. Output Delivery

1. Generate complete test orchestration system configuration
2. Document optimized execution strategies
3. Provide intelligent resource management guidelines
4. Deliver comprehensive monitoring dashboards
5. Include performance analytics and optimization recommendations

</detailed_sequence_steps>

</task>
