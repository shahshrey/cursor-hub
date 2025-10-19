<task name="Document API">

<task_objective>
Generate comprehensive API documentation from codebase with interactive examples and testing capabilities. Input: API endpoints, routes, handlers, and specifications. Processing: Analyze code, select appropriate documentation tools, generate specifications, and set up interactive documentation. Output: Complete API documentation with OpenAPI/Swagger specs, interactive UI, and testing capabilities.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current API Context

1. Scan for API endpoints: `find . -name "*route*" -o -name "*controller*" -o -name "*api*" | head -5`

2. Locate API specifications: `find . -name "*openapi*" -o -name "*swagger*" -o -name "*.graphql" | head -3`

3. Identify server framework from @package.json or detect from imports

4. Check existing documentation at @docs/api/ or @api-docs/

5. Locate test files: `find . -name "*test*" -path "*/api/*" | head -3`

## 2. Code Analysis and Discovery

1. Scan the codebase for API endpoints, routes, and handlers

2. Identify REST APIs, GraphQL schemas, and RPC services

3. Map out controller classes, route definitions, and middleware

4. Discover request/response models and data structures

## 3. Documentation Tool Selection

1. Choose appropriate documentation tools based on stack:
   - **OpenAPI/Swagger**: REST APIs with interactive documentation
   - **GraphQL**: GraphiQL, GraphQL Playground, or Apollo Studio
   - **Postman**: API collections and documentation
   - **Insomnia**: API design and documentation
   - **Redoc**: Alternative OpenAPI renderer
   - **API Blueprint**: Markdown-based API documentation

## 4. API Specification Generation

1. Generate OpenAPI specification for REST APIs:
   ```yaml
   openapi: 3.0.0
   info:
     title: API
     version: 1.0.0
     description: Comprehensive API documentation
   servers:
     - url: https://api.example.com/v1
   paths:
     /users:
       get:
         summary: List users
         parameters:
           - name: page
             in: query
             schema:
               type: integer
         responses:
           '200':
             description: Successful response
             content:
               application/json:
                 schema:
                   type: array
                   items:
                     $ref: '#/components/schemas/User'
   components:
     schemas:
       User:
         type: object
         properties:
           id:
             type: integer
           name:
             type: string
           email:
             type: string
   ```

## 5. Endpoint Documentation

1. Document all HTTP methods (GET, POST, PUT, DELETE, PATCH)

2. Specify request parameters (path, query, header, body)

3. Define response schemas and status codes

4. Include error responses and error codes

5. Document authentication and authorization requirements

## 6. Request/Response Examples

1. Provide realistic request examples for each endpoint

2. Include sample response data with proper formatting

3. Show different response scenarios (success, error, edge cases)

4. Document content types and encoding

## 7. Authentication Documentation

1. Document authentication methods (API keys, JWT, OAuth)

2. Explain authorization scopes and permissions

3. Provide authentication examples and token formats

4. Document session management and refresh token flows

## 8. Data Model Documentation

1. Define all data schemas and models

2. Document field types, constraints, and validation rules

3. Include relationships between entities

4. Provide example data structures

## 9. Error Handling Documentation

1. Document all possible error responses

2. Explain error codes and their meanings

3. Provide troubleshooting guidance

4. Include rate limiting and throttling information

## 10. Interactive Documentation Setup

1. Integrate Swagger UI:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>API Documentation</title>
     <link rel="stylesheet" type="text/css" href="./swagger-ui-bundle.css" />
   </head>
   <body>
     <div id="swagger-ui"></div>
     <script src="./swagger-ui-bundle.js"></script>
     <script>
       SwaggerUIBundle({
         url: './api-spec.yaml',
         dom_id: '#swagger-ui'
       });
     </script>
   </body>
   </html>
   ```

## 11. Code Annotation and Comments

1. Add inline documentation to API handlers using framework-specific tools:
   - **Java**: @ApiOperation, @ApiParam (Swagger annotations)
   - **Python**: Docstrings with FastAPI or Flask-RESTX
   - **Node.js**: JSDoc comments with swagger-jsdoc
   - **C#**: XML documentation comments

## 12. Automated Documentation Generation

1. Set up automated generation for Node.js/Express:
   ```javascript
   const swaggerJsdoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');
   
   const options = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'API Documentation',
         version: '1.0.0',
       },
     },
     apis: ['./routes/*.js'],
   };
   
   const specs = swaggerJsdoc(options);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
   ```

2. Configure similar tools for other frameworks (FastAPI, Spring Boot)

## 13. Testing Integration

1. Generate API test collections from documentation

2. Include test scripts and validation rules

3. Set up automated API testing

4. Document test scenarios and expected outcomes

## 14. Version Management

1. Document API versioning strategy

2. Maintain documentation for multiple API versions

3. Document deprecation timelines and migration guides

4. Track breaking changes between versions

## 15. Performance Documentation

1. Document rate limits and throttling policies

2. Include performance benchmarks and SLAs

3. Document caching strategies and headers

4. Explain pagination and filtering options

## 16. SDK and Client Library Documentation

1. Generate client libraries from API specifications

2. Document SDK usage and examples

3. Provide quickstart guides for different languages

4. Include integration examples and best practices

## 17. Environment-Specific Documentation

1. Document different environments (dev, staging, prod)

2. Include environment-specific endpoints and configurations

3. Document deployment and configuration requirements

4. Provide environment setup instructions

## 18. Security Documentation

1. Document security best practices

2. Include CORS and CSP policies

3. Document input validation and sanitization

4. Explain security headers and their purposes

## 19. Maintenance and Updates

1. Set up automated documentation updates

2. Create processes for keeping documentation current

3. Review and validate documentation regularly

4. Integrate documentation reviews into development workflow

## 20. Framework-Specific Implementation Examples

1. **FastAPI (Python)**:
   ```python
   from fastapi import FastAPI
   from pydantic import BaseModel
   
   app = FastAPI(title="My API", version="1.0.0")
   
   class User(BaseModel):
       id: int
       name: str
       email: str
   
   @app.get("/users/{user_id}", response_model=User)
   async def get_user(user_id: int):
       return {"id": user_id, "name": "John", "email": "john@example.com"}
   ```

2. **Spring Boot (Java)**:
   ```java
   @RestController
   @Api(tags = "Users")
   public class UserController {
       
       @GetMapping("/users/{id}")
       @ApiOperation(value = "Get user by ID")
       public ResponseEntity<User> getUser(
           @PathVariable @ApiParam("User ID") Long id) {
       }
   }
   ```

</detailed_sequence_steps>

</task>
