<task name="Test Coverage">

<task_objective>
Analyze and improve test coverage with comprehensive reporting and gap identification. This workflow configures coverage tools, measures line/branch/function/statement coverage, identifies critical gaps, and provides actionable improvement recommendations. The output is a comprehensive coverage analysis with detailed reports, gap identification, improvement recommendations, and quality metrics tracking.
</task_objective>

<detailed_sequence_steps>
# Test Coverage - Detailed Sequence of Steps

## 1. Coverage Tool Setup

1. Detect test framework: !`find . -name "jest.config.*" -o -name ".nycrc*" -o -name "coverage.xml" | head -1 || echo "Detect framework"`
2. Configure appropriate coverage tools (Jest, NYC, Istanbul, Coverage.py, JaCoCo)
3. Setup collection settings for comprehensive coverage data
4. Optimize performance to minimize overhead
5. Enable reporting in multiple formats (HTML, JSON, XML, LCOV)

## 2. Coverage Measurement

1. Check existing coverage: !`find . -name "coverage" -type d | head -1 && echo "Coverage data exists" || echo "No coverage data"`
2. Generate line coverage reports showing executed lines
3. Generate branch coverage reports for all code paths
4. Generate function coverage reports for callable units
5. Generate statement coverage reports for all statements
6. Identify uncovered code paths and branches

## 3. Gap Analysis

1. Analyze test files: !`find . -name "*.test.*" -o -name "*.spec.*" | wc -l` test files
2. Identify critical uncovered paths in business logic
3. Analyze coverage quality beyond simple metrics
4. Assess business logic coverage completeness
5. Evaluate edge case handling and error path coverage
6. Prioritize gaps by criticality and risk

## 4. Threshold Management

1. Configure coverage thresholds for different code areas
2. Implement quality gates in CI/CD pipelines
3. Setup trend monitoring for coverage evolution
4. Enforce minimum standards for new code
5. Configure branch-specific threshold requirements

## 5. Reporting & Visualization

1. Generate detailed coverage reports with drill-down capability
2. Create coverage dashboards for visibility
3. Implement trend analysis for historical tracking
4. Setup automated notifications for threshold violations
5. Integrate with code review tools for PR feedback

## 6. Improvement Planning

1. Prioritize coverage gaps based on risk and impact
2. Recommend specific test additions for uncovered areas
3. Identify refactoring opportunities to improve testability
4. Plan coverage enhancement initiatives
5. Track improvement progress over time

## 7. Advanced Features Implementation

1. Implement differential coverage analysis for pull requests
2. Setup coverage trend monitoring with alerts
3. Integrate with code review for inline feedback
4. Configure automated coverage alerts for regressions
5. Assess performance impact of coverage collection

## 8. Quality Insights Generation

1. Assess coverage quality beyond simple percentages
2. Analyze test effectiveness and value
3. Correlate coverage with maintainability metrics
4. Identify high-risk areas needing attention
5. Track quality trends and improvements

## 9. Output Delivery

1. Deliver comprehensive coverage analysis reports
2. Provide detailed gap identification with priorities
3. Include actionable improvement recommendations
4. Document quality metrics tracking framework
5. Deliver coverage optimization strategies

</detailed_sequence_steps>

</task>
