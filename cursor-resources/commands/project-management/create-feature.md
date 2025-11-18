<task name="Create Feature">

<task_objective>
Scaffold new feature with boilerplate code, tests, and documentation. This workflow takes feature name and optional type as input ($ARGUMENTS), processes it through comprehensive planning, implementation, testing, and documentation phases, and outputs a complete, production-ready feature integrated into the codebase with proper testing and documentation.
</task_objective>

<detailed_sequence_steps>
# Create Feature - Detailed Sequence of Steps

## 1. Feature Planning

1. Parse feature name and type from $ARGUMENTS.

2. Define the feature requirements and acceptance criteria.

3. Break down the feature into smaller, manageable tasks.

4. Identify affected components and potential impact areas.

5. Plan the API/interface design before implementation.

## 2. Research and Analysis

1. Review project structure: !`find . -maxdepth 2 -type d -name src -o -name components -o -name features | head -5`.

2. Check current branch: !`git branch --show-current`.

3. Study existing codebase patterns and conventions.

4. Identify similar features for consistency.

5. Research external dependencies or libraries needed.

6. Review any relevant documentation or specifications (@docs/architecture.md or @README.md).

## 3. Architecture Design

1. Design the feature architecture and data flow.

2. Plan database schema changes if needed.

3. Define API endpoints and contracts.

4. Consider scalability and performance implications.

## 4. Environment Setup

1. Create a new feature branch: `git checkout -b feature/$ARGUMENTS`.

2. Ensure development environment is up to date.

3. Install any new dependencies required.

4. Set up feature flags if applicable.

## 5. Implementation Strategy

1. Start with core functionality and build incrementally.

2. Follow the project's coding standards and patterns.

3. Implement proper error handling and validation.

4. Use dependency injection and maintain loose coupling.

## 6. Database Changes (if applicable)

1. Create migration scripts for schema changes.

2. Ensure backward compatibility.

3. Plan for rollback scenarios.

4. Test migrations on sample data.

## 7. API Development

1. Implement API endpoints with proper HTTP status codes.

2. Add request/response validation.

3. Implement proper authentication and authorization.

4. Document API contracts and examples.

## 8. Frontend Implementation (if applicable)

1. Create reusable components following project patterns.

2. Implement responsive design and accessibility.

3. Add proper state management.

4. Handle loading and error states.

## 9. Testing Implementation

1. Write unit tests for core business logic.

2. Create integration tests for API endpoints.

3. Add end-to-end tests for user workflows.

4. Test error scenarios and edge cases.

## 10. Security Considerations

1. Implement proper input validation and sanitization.

2. Add authorization checks for sensitive operations.

3. Review for common security vulnerabilities.

4. Ensure data protection and privacy compliance.

## 11. Performance Optimization

1. Optimize database queries and indexes.

2. Implement caching where appropriate.

3. Monitor memory usage and optimize algorithms.

4. Consider lazy loading and pagination.

## 12. Documentation

1. Add inline code documentation.

2. Update API documentation.

3. Create user documentation if needed.

4. Update project README if applicable.

## 13. Code Review Preparation

1. Run all tests and ensure they pass.

2. Run linting and formatting tools.

3. Check for code coverage and quality metrics.

4. Perform self-review of the changes.

## 14. Integration Testing

1. Test feature integration with existing functionality.

2. Verify feature flags work correctly.

3. Test deployment and rollback procedures.

4. Validate monitoring and logging.

## 15. Commit and Push

1. Create atomic commits with descriptive messages.

2. Follow conventional commit format if project uses it.

3. Push feature branch: `git push origin feature/$ARGUMENTS`.

## 16. Pull Request Creation

1. Create PR with comprehensive description.

2. Include screenshots or demos if applicable.

3. Add appropriate labels and reviewers.

4. Link to any related issues or specifications.

## 17. Quality Assurance

1. Coordinate with QA team for testing.

2. Address any bugs or issues found.

3. Verify accessibility and usability requirements.

4. Test on different environments and browsers.

## 18. Deployment Planning

1. Plan feature rollout strategy.

2. Set up monitoring and alerting.

3. Prepare rollback procedures.

4. Schedule deployment and communication.

</detailed_sequence_steps>

</task>
