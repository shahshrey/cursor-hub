<task name="Test Changelog Automation">

<task_objective>
Automate changelog testing workflow with comprehensive CI integration and validation. This workflow configures changelog generation, implements testing and validation workflows, and integrates with CI/CD systems for automated execution. The output is a complete changelog automation system with testing workflows, CI integration, validation rules, and maintenance procedures.
</task_objective>

<detailed_sequence_steps>
# Test Changelog Automation - Detailed Sequence of Steps

## 1. Automation Setup

1. Detect changelog files: !`find . -name "CHANGELOG*" -o -name "changelog*" | head -1 || echo "No changelog detected"`
2. Configure changelog generation tools and format standards
3. Setup version control integration for automated updates
4. Implement automated changelog update workflows
5. Design validation rules for changelog consistency

## 2. Workflow Integration

1. Analyze CI system: !`find . -name ".github" -o -name ".gitlab-ci.yml" -o -name "Jenkinsfile" | head -1 || echo "No CI detected"`
2. Design CI/CD integration with automated triggers
3. Configure automated triggers on commits and pull requests
4. Implement validation checks in pipeline stages
5. Optimize execution performance for fast feedback

## 3. Testing Strategy

1. Create changelog validation tests for format compliance
2. Implement format verification checks
3. Design content validation to ensure completeness
4. Setup regression testing for changelog generation
5. Validate semantic versioning compliance

## 4. Quality Assurance

1. Configure automated formatting and standardization
2. Implement consistency checks across changelog entries
3. Setup content validation rules for required information
4. Optimize maintenance workflows for changelog updates
5. Ensure changelog accuracy and completeness

## 5. Validation Framework

1. Design automated validation rules for changelog structure
2. Implement compliance checking against standards
3. Configure error reporting with clear feedback
4. Optimize feedback loops for quick issue resolution
5. Track validation metrics and quality trends

## 6. CI Integration

1. Setup automated execution on relevant triggers
2. Configure deployment triggers based on changelog updates
3. Implement notification systems for stakeholders
4. Optimize pipeline performance for efficiency
5. Integrate with release automation workflows

## 7. Advanced Features Implementation

1. Implement automated release note generation from commits
2. Configure semantic versioning integration
3. Setup automated documentation updates
4. Implement compliance validation for regulatory requirements
5. Enable automated changelog distribution

## 8. Quality Metrics Tracking

1. Monitor changelog accuracy and completeness
2. Track automation reliability and uptime
3. Measure validation effectiveness and coverage
4. Assess maintenance efficiency and effort reduction

## 9. Output Delivery

1. Deliver complete changelog automation configuration
2. Provide testing workflows documentation
3. Include CI integration setup and triggers
4. Document validation rules and quality gates
5. Deliver maintenance procedures and best practices

</detailed_sequence_steps>

</task>
