<task name="Setup Load Testing">

<task_objective>
Configure comprehensive load testing with performance analysis and bottleneck identification. This workflow analyzes application architecture, defines testing objectives, selects appropriate tools, designs test scenarios, implements performance monitoring, and provides optimization recommendations. The output is a complete load testing setup with configured scenarios, performance monitoring, bottleneck analysis, and optimization recommendations.
</task_objective>

<detailed_sequence_steps>
# Setup Load Testing - Detailed Sequence of Steps

## 1. Strategy & Requirements

1. Detect application type: !`find . -name "server.js" -o -name "app.py" -o -name "main.go" | head -1 && echo "Server application" || echo "Detect app type"`
2. Analyze application architecture and components
3. Define testing objectives (capacity, stress, spike, endurance, volume)
4. Determine realistic user scenarios and workflows
5. Identify critical performance metrics (response time, throughput, error rate)
6. Define performance requirements and SLAs

## 2. Tool Selection & Setup

1. Analyze current monitoring: !`find . -name "prometheus.yml" -o -name "newrelic.js" | head -1 || echo "No monitoring detected"`
2. Choose appropriate load testing tools:
   - k6 for developer-friendly scripting
   - Artillery for modern API testing
   - JMeter for comprehensive testing
   - Gatling for high-performance testing
3. Install tool dependencies and frameworks
4. Configure test environments (staging, production-like)
5. Setup monitoring and observability

## 3. Test Scenario Design

1. Analyze API endpoints: !`grep -r "app\\.get\\|app\\.post\\|@RequestMapping" . 2>/dev/null | wc -l` detected endpoints
2. Create realistic user behavior scenarios
3. Implement API test scripts with proper requests
4. Configure test data generation and management
5. Design load patterns:
   - Constant load
   - Ramp-up scenarios
   - Spike testing patterns
   - Stress testing profiles
6. Setup authentication and session management

## 4. Performance Metrics

1. Configure response time monitoring (min, max, avg, percentiles)
2. Setup throughput measurement (requests per second)
3. Implement error rate tracking and categorization
4. Configure resource utilization monitoring:
   - CPU usage
   - Memory consumption
   - Network bandwidth
   - Database connections
5. Setup custom business metrics

## 5. Infrastructure Setup

1. Check database: !`find . -name "*.sql" -o -name "database.js" | head -1 && echo "Database detected" || echo "No database files"`
2. Configure isolated test environments
3. Setup monitoring dashboards (Grafana, DataDog, New Relic)
4. Implement real-time result collection
5. Optimize test execution infrastructure
6. Configure distributed load generation if needed
7. Setup result storage and historical tracking

## 6. Analysis & Optimization

1. Identify performance bottlenecks from test results
2. Analyze resource constraints (CPU, memory, I/O, network)
3. Recommend optimization strategies:
   - Code optimizations
   - Database query improvements
   - Caching strategies
   - Infrastructure scaling
4. Track performance improvements over time
5. Correlate performance with code changes

## 7. Advanced Features Implementation

1. Setup distributed load generation across regions
2. Implement real-time monitoring and alerting
3. Configure automated performance regression detection
4. Integrate with CI/CD pipelines for automated testing
5. Implement chaos engineering for resilience testing
6. Setup cloud provider integration for realistic load

## 8. Quality Assurance

1. Ensure test reliability and consistency
2. Validate result accuracy and completeness
3. Ensure environment consistency between runs
4. Verify monitoring completeness
5. Implement test data isolation

## 9. Output Delivery

1. Deliver complete load testing setup
2. Provide configured test scenarios
3. Include performance monitoring dashboards
4. Document bottleneck analysis findings
5. Deliver optimization recommendations with priorities

</detailed_sequence_steps>

</task>
