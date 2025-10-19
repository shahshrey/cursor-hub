<task name="Migration Guide Generator">

<task_objective>
Create comprehensive migration guides with step-by-step procedures, validation, and rollback strategies. Input: Current system versions, dependencies, database schemas, infrastructure setup, and migration history. Processing: Analyze migration scope, assess impact, document breaking changes, create step-by-step procedures, establish testing strategies, and plan deployment. Output: Systematic migration guide with safety measures, rollback procedures, validation steps, and comprehensive documentation for framework, database, cloud, or architecture migrations.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current System

1. Check current versions from @package.json or @requirements.txt or lock files

2. Review migration history: `find . -name "*migration*" -o -name "*upgrade*" | head -5`

3. Examine database schema: `find . -name "*schema*" -o -name "*.sql" | head -3`

4. Count dependencies: `grep -c "dependency\|require\|import" package.json requirements.txt 2>/dev/null`

5. Review infrastructure at @docker-compose.yml or @k8s/ or @terraform/

## 2. Migration Scope Analysis

1. Identify what is being migrated (framework, library, architecture, etc.)

2. Determine source and target versions or technologies

3. Assess the scale and complexity of the migration

4. Identify affected systems and components

## 3. Impact Assessment

1. Analyze breaking changes between versions

2. Identify deprecated features and APIs

3. Review new features and capabilities

4. Assess compatibility requirements and constraints

5. Evaluate performance and security implications

## 4. Prerequisites and Requirements

1. Document system requirements for the target version

2. List required tools and dependencies

3. Specify minimum versions and compatibility requirements

4. Identify necessary skills and team preparation

5. Outline infrastructure and environment needs

## 5. Pre-Migration Preparation

1. Create comprehensive backup strategies

2. Set up development and testing environments

3. Document current system state and configurations

4. Establish rollback procedures and contingency plans

5. Create migration timeline and milestones

## 6. Step-by-Step Migration Process

1. **Environment Setup**:
   - Update development environment
   - Install new framework version
   - Update build tools and dependencies
   - Configure IDE and tooling

2. **Dependencies Update**:
   - Update package.json/requirements.txt
   - Resolve dependency conflicts
   - Update related libraries
   - Test compatibility

3. **Code Migration**:
   - Update import statements
   - Replace deprecated APIs
   - Update configuration files
   - Modify build scripts

## 7. Breaking Changes Documentation

1. List all breaking changes with examples

2. Provide before/after code comparisons:
   ```markdown
   ### Removed: `oldMethod()`
   **Before:**
   ```javascript
   const result = library.oldMethod(param1, param2);
   ```
   
   **After:**
   ```javascript
   const result = library.newMethod({ 
     param1: param1, 
     param2: param2 
   });
   ```
   
   **Rationale:** Improved type safety and extensibility
   ```

3. Explain the rationale behind changes

4. Offer alternative approaches for removed features

## 8. Configuration Changes

1. Document configuration file updates

2. Explain new configuration options

3. Provide configuration migration scripts

4. Show environment-specific configurations

## 9. Database Migration (If Applicable)

1. Create database schema migration scripts

2. Document data transformation requirements

3. Provide backup and restore procedures

4. Test migration with sample data

5. Plan for zero-downtime migrations

## 10. Testing Strategy

1. Update existing tests for new APIs

2. Create migration-specific test cases

3. Implement integration and E2E tests

4. Set up performance and load testing

5. Document test scenarios and expected outcomes

## 11. Performance Considerations

1. Document performance changes and optimizations

2. Provide benchmarking guidelines

3. Identify potential performance regressions

4. Suggest monitoring and alerting updates

5. Include memory and resource usage changes

## 12. Security Updates

1. Document security improvements and changes

2. Update authentication and authorization code

3. Review and update security configurations

4. Update dependency security scanning

5. Document new security best practices

## 13. Deployment Strategy

1. Plan phased rollout approach

2. Create deployment scripts and automation

3. Set up monitoring and health checks

4. Plan for blue-green or canary deployments

5. Document rollback procedures

## 14. Common Issues and Troubleshooting

1. Document common migration issues:
   - Import/Module Resolution Errors
   - API Method Not Found
   - Configuration incompatibilities
   - Performance regressions

2. Provide symptoms and solutions for each issue

3. Include diagnostic commands and verification steps

## 15. Team Communication and Training

1. Create team training materials

2. Schedule knowledge sharing sessions

3. Document new development workflows

4. Update coding standards and guidelines

5. Create quick reference guides

## 16. Tools and Automation

1. Provide migration scripts and utilities

2. Create code transformation tools (codemods)

3. Set up automated compatibility checks

4. Implement CI/CD pipeline updates

5. Create validation and verification tools

## 17. Timeline and Milestones

1. **Phase 1: Preparation (Week 1-2)**:
   - Environment setup
   - Team training
   - Development environment migration

2. **Phase 2: Development (Week 3-6)**:
   - Core application migration
   - Testing and validation
   - Performance optimization

3. **Phase 3: Deployment (Week 7-8)**:
   - Staging deployment
   - Production deployment
   - Monitoring and support

## 18. Risk Mitigation

1. Identify potential migration risks

2. Create contingency plans for each risk

3. Document escalation procedures

4. Plan for extended timeline scenarios

5. Prepare communication for stakeholders

## 19. Post-Migration Tasks

1. Clean up deprecated code and configurations

2. Update documentation and README files

3. Review and optimize new implementation

4. Conduct post-migration retrospective

5. Plan for future maintenance and updates

## 20. Validation and Testing

1. Create comprehensive test plans

2. Document acceptance criteria

3. Set up automated regression testing

4. Plan user acceptance testing

5. Implement monitoring and alerting

## 21. Documentation Updates

1. Update API documentation

2. Revise development guides

3. Update deployment documentation

4. Create troubleshooting guides

5. Update team onboarding materials

## 22. Migration Type-Specific Considerations

1. **Framework Migration (React 17 → 18)**:
   - Update React and ReactDOM imports
   - Replace deprecated lifecycle methods
   - Update testing library methods
   - Handle concurrent features and Suspense

2. **Database Migration (MySQL → PostgreSQL)**:
   - Convert SQL syntax differences
   - Update data types and constraints
   - Migrate stored procedures to functions
   - Update ORM configurations

3. **Cloud Migration (On-premise → AWS)**:
   - Containerize applications
   - Update CI/CD pipelines
   - Configure cloud services
   - Implement infrastructure as code

4. **Architecture Migration (Monolith → Microservices)**:
   - Identify service boundaries
   - Implement inter-service communication
   - Set up service discovery
   - Plan data consistency strategies

## 23. Final Best Practices

1. Test thoroughly in non-production environments first

2. Communicate progress and issues regularly

3. Document lessons learned for future migrations

4. Keep the migration guide updated based on real experiences

</detailed_sequence_steps>

</task>
