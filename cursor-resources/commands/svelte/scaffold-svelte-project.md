<task name="Scaffold Svelte Project">

<task_objective>
Scaffold new SvelteKit projects, features, or modules with best practices and optimal project structure. Input: User specification of project type (new SvelteKit project, feature module, or component library) and required integrations. Process: Initialize project using appropriate tools, configure essential dependencies, set up project structure, and generate starter code. Output: Fully scaffolded project or feature module with configuration files, proper directory structure, and example implementations ready for development.
</task_objective>

<detailed_sequence_steps>
# Scaffold Svelte Project - Detailed Sequence of Steps

## 1. Determine Project Type

1. Ask user to specify the type of scaffolding needed:
   - New SvelteKit Project
   - Feature Module (Authentication, Admin dashboard, Blog/CMS, E-commerce, API integrations)
   - Component Library (Design system, Storybook integration)

2. Based on selection, gather specific requirements and preferences.

## 2. Initialize New SvelteKit Project

1. Use `npx sv create` with appropriate options.

2. Prompt for and configure:
   - TypeScript/JSDoc preference
   - Testing framework selection
   - Essential integrations (Tailwind, ESLint, etc.)

3. Set up Git repository initialization.

4. Verify successful project creation.

## 3. Configure Project Structure

1. Create optimal directory structure:
   ```
   project/
   ├── src/
   │   ├── routes/
   │   │   ├── (app)/
   │   │   ├── (auth)/
   │   │   └── api/
   │   ├── lib/
   │   │   ├── components/
   │   │   ├── stores/
   │   │   ├── utils/
   │   │   └── server/
   │   ├── hooks.server.ts
   │   └── app.html
   ├── tests/
   ├── static/
   └── [config files]
   ```

2. Create directory structure based on project type.

3. Set up route groups and API structure as needed.

## 4. Configure Essential Features

1. Set up environment variable configuration:
   - Create `.env.example` with required variables
   - Document environment setup

2. Configure database if applicable:
   - Set up database client (Prisma/Drizzle)
   - Create initial schema

3. Set up authentication scaffolding if required:
   - Install auth library (Lucia/Auth.js)
   - Create auth routes and utilities

4. Configure API route templates and error handling.

5. Set up logging infrastructure.

6. Configure deployment settings.

## 5. Create Configuration Files

1. Create and optimize `svelte.config.js` with project-specific settings.

2. Configure `vite.config.js` for build optimization.

3. Set up testing configuration:
   - `playwright.config.js` for E2E testing
   - Configure test directories

4. Add styling configuration if selected:
   - `tailwind.config.js` for Tailwind CSS
   - PostCSS configuration

5. Create containerization setup:
   - `docker-compose.yml` for local development

## 6. Generate Starter Code

1. Create layout components with navigation structure.

2. Implement authentication flow templates if applicable:
   - Login/register pages
   - Protected route examples
   - Session management

3. Add form examples with validation.

4. Create API integration pattern templates.

5. Set up state management structure (stores, context).

## 7. Configure Feature Modules

1. For Authentication System:
   - Set up user authentication routes
   - Create session management
   - Implement password reset flow

2. For Admin Dashboard:
   - Create admin layout structure
   - Set up role-based access
   - Add data management interfaces

3. For Blog/CMS:
   - Create content schema
   - Set up editor integration
   - Implement content routes

4. For E-commerce:
   - Set up product catalog structure
   - Create cart management
   - Configure payment integration

5. For API Integrations:
   - Create API client utilities
   - Set up request/response handlers
   - Configure error handling

## 8. Configure Component Library Setup

1. For Design System:
   - Create component structure
   - Set up theming system
   - Configure build for library

2. For Storybook Integration:
   - Install and configure Storybook
   - Create component stories
   - Set up documentation

3. Configure component documentation:
   - Add JSDoc/TypeScript types
   - Create usage examples

4. Set up publishing configuration:
   - Configure package.json for publishing
   - Add build scripts
   - Set up versioning

## 9. Finalize and Verify

1. Run initial build to verify configuration.

2. Test development server startup.

3. Verify all integrations are working.

4. Create README with setup and usage instructions.

5. Initialize git and create initial commit.

6. Provide user with next steps and deployment guidance.

</detailed_sequence_steps>

</task>

