<task name="Automated API Documentation Generator">

<task_objective>
Auto-generate API reference documentation with multiple output formats and automated deployment. Input: Code annotations, API framework, existing specifications, and CI/CD pipeline. Processing: Analyze API structure, select documentation tools, add code annotations, generate specifications, set up interactive documentation, and automate deployment. Output: Automated API documentation generation system with multiple formats, interactive UI, and CI/CD integration.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current API Infrastructure

1. Check code annotations: `grep -r "@api\|@swagger\|@doc" src/ 2>/dev/null | wc -l`

2. Identify API framework from @package.json or imports

3. Locate existing specs: `find . -name "*spec*.yaml" -o -name "*spec*.json" | head -3`

4. Check documentation tools: `grep -E "swagger|redoc|postman" package.json 2>/dev/null`

5. Review CI/CD pipeline at @.github/workflows/

## 2. API Documentation Strategy Analysis

1. Analyze current API structure and endpoints

2. Identify documentation requirements (REST, GraphQL, gRPC, etc.)

3. Assess existing code annotations and documentation

4. Determine documentation output formats and hosting requirements

5. Plan documentation automation and maintenance strategy

## 3. Documentation Tool Selection

1. Choose appropriate API documentation tools:
   - **OpenAPI/Swagger**: REST API documentation with Swagger UI
   - **Redoc**: Modern OpenAPI documentation renderer
   - **GraphQL**: GraphiQL, Apollo Studio, GraphQL Playground
   - **Postman**: API documentation with collections
   - **Insomnia**: API documentation and testing
   - **API Blueprint**: Markdown-based API documentation
   - **JSDoc/TSDoc**: Code-first documentation generation

2. Consider factors: API type, team workflow, hosting, interactivity

## 4. Code Annotation and Schema Definition

1. Add comprehensive code annotations for API endpoints

2. Define request/response schemas and data models

3. Add parameter descriptions and validation rules

4. Document authentication and authorization requirements

5. Add example requests and responses

## 5. API Specification Generation

1. Set up automated API specification generation from code

2. Configure OpenAPI/Swagger specification generation

3. Set up schema validation and consistency checking

4. Configure API versioning and changelog generation

5. Set up specification file management and version control

## 6. Interactive Documentation Setup

1. Configure interactive API documentation with try-it-out functionality

2. Set up API testing and example execution

3. Configure authentication handling in documentation

4. Set up request/response validation and examples

5. Configure API endpoint categorization and organization

## 7. Documentation Content Enhancement

1. Add comprehensive API guides and tutorials

2. Create authentication and authorization documentation

3. Add error handling and status code documentation

4. Create SDK and client library documentation

5. Add rate limiting and usage guidelines

## 8. Documentation Hosting and Deployment

1. Set up documentation hosting and deployment

2. Configure documentation website generation and styling

3. Set up custom domain and SSL configuration

4. Configure documentation search and navigation

5. Set up documentation analytics and usage tracking

## 9. Automation and CI/CD Integration

1. Configure automated documentation generation in CI/CD pipeline

2. Set up documentation deployment automation

3. Configure documentation validation and quality checks

4. Set up documentation change detection and notifications

5. Configure documentation testing and link validation

## 10. Multi-format Documentation Generation

1. Generate documentation in multiple formats (HTML, PDF, Markdown)

2. Set up downloadable documentation packages

3. Configure offline documentation access

4. Set up documentation API for programmatic access

5. Configure documentation syndication and distribution

## 11. Maintenance and Quality Assurance

1. Set up documentation quality monitoring and validation

2. Configure documentation feedback and improvement workflows

3. Set up documentation analytics and usage metrics

4. Create documentation maintenance procedures and guidelines

5. Train team on documentation best practices and tools

6. Set up documentation review and approval processes

</detailed_sequence_steps>

</task>
