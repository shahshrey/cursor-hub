<task name="Add Mutation Testing">

<task_objective>
Setup comprehensive mutation testing framework with quality metrics and CI integration. This workflow selects appropriate mutation testing tools, configures mutation operators, optimizes performance, and integrates with CI/CD pipelines. The output is a complete mutation testing setup with configured framework, CI integration, quality thresholds, and analysis workflows.
</task_objective>

<detailed_sequence_steps>
# Add Mutation Testing - Detailed Sequence of Steps

## 1. Tool Selection & Setup

1. Detect language: !`find . -name "*.js" -o -name "*.ts" | head -1 >/dev/null && echo "JavaScript/TypeScript" || find . -name "*.py" | head -1 >/dev/null && echo "Python" || find . -name "*.java" | head -1 >/dev/null && echo "Java" || echo "Multi-language"`
2. Choose appropriate mutation testing framework:
   - Stryker for JavaScript/TypeScript
   - PIT for Java
   - mutmut for Python
   - cargo-mutants for Rust
3. Install framework dependencies and tools
4. Configure basic settings and initial configuration
5. Validate installation with test run

## 2. Mutation Operator Configuration

1. Detect test framework: !`grep -l "jest\\|mocha\\|pytest\\|junit" package.json pom.xml setup.py 2>/dev/null | head -1 || echo "Detect from tests"`
2. Configure arithmetic operator mutations (+, -, *, /, %)
3. Setup relational operator mutations (<, >, <=, >=, ==, !=)
4. Configure logical operator mutations (&&, ||, !)
5. Setup conditional boundary mutations
6. Enable statement mutations (remove, duplicate)

## 3. Performance Optimization

1. Check test coverage: !`find . -name "coverage" -o -name ".nyc_output" | head -1 || echo "No coverage data"`
2. Setup parallel execution with optimal worker count
3. Configure incremental testing for changed code only
4. Optimize file filtering to exclude non-critical files
5. Implement caching strategies for faster re-runs
6. Configure timeout settings appropriately

## 4. Quality Metrics Configuration

1. Configure mutation score calculation (killed/total)
2. Setup mutation survival analysis and reporting
3. Implement quality threshold enforcement
4. Track mutation effectiveness trends over time
5. Configure differential mutation testing for PRs
6. Setup mutation coverage correlation

## 5. CI/CD Integration

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" -o -name "Jenkinsfile" | head -1 || echo "No CI detected"`
2. Automate mutation testing execution triggers
3. Configure performance monitoring in pipeline
4. Setup result reporting and notifications
5. Implement deployment quality gates
6. Optimize execution time for CI environment

## 6. Result Analysis

1. Setup visualization dashboards for mutation results
2. Configure surviving mutant analysis reports
3. Implement remediation workflows for issues
4. Track mutation regression patterns over time
5. Generate actionable insights from results
6. Correlate with test effectiveness metrics

## 7. Advanced Features Implementation

1. Implement selective mutation testing for changed code
2. Setup performance profiling for slow mutants
3. Configure automated test improvement suggestions
4. Enable mutation trend analysis with alerts
5. Integrate with quality gate systems

## 8. Framework Support

1. Apply language-specific optimizations
2. Integrate with tool ecosystem (IDE, coverage tools)
3. Configure performance tuning for framework
4. Customize reporting for specific needs
5. Optimize for project-specific patterns

## 9. Output Delivery

1. Deliver complete mutation testing setup
2. Provide configured framework with optimal settings
3. Include CI integration configuration
4. Document quality thresholds and gates
5. Deliver analysis workflows and dashboards

</detailed_sequence_steps>

</task>
