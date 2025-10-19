<task name="Scaffold New Feature">

<task_objective>
Create a well-structured foundation for a new feature following project conventions by planning the scope, setting up file structure, defining types, creating base components with tests, and documenting the feature. The output will be a fully scaffolded feature ready for implementation.
</task_objective>

<detailed_sequence_steps>
# Scaffold New Feature - Detailed Sequence of Steps

## 1. Plan the Feature

1. Ask the user for the feature name and description.

2. Define the scope clearly:
   - What problem does this feature solve?
   - What are the user stories or use cases?
   - What are the boundaries (what's in scope vs out of scope)?

3. List all components needed:
   - UI components
   - Services or API clients
   - State management needs
   - Utilities or helpers

4. Identify dependencies:
   - External libraries required
   - Internal modules or features this depends on
   - APIs or services needed

5. Review existing project structure to understand conventions:
   - File organization patterns
   - Naming conventions
   - Testing patterns
   - Documentation standards

## 2. Create File Structure

1. Determine the appropriate location for the feature based on project structure.

2. Create the base directory structure (adapt to project conventions):
   ```
   features/
     feature-name/
       components/
       hooks/
       utils/
       types.ts
       index.ts
   ```

3. If the project uses a different structure (e.g., src/components, src/services), adapt accordingly.

4. Create subdirectories as needed for the feature's complexity.

## 3. Set Up Types and Interfaces

1. Create a `types.ts` file in the feature directory.

2. Define TypeScript types/interfaces for:
   - Feature-specific data models
   - Component props
   - API request/response shapes
   - State structures

3. Export all types from the types file for reuse.

4. Keep types focused and single-purpose.

## 4. Create Base Components

1. Identify the main UI components needed for the feature.

2. For each component:
   - Create a new file in the components directory
   - Define the component with proper TypeScript types
   - Add prop interfaces with clear documentation
   - Implement basic structure and placeholders
   - Keep components focused on single responsibility

3. Create a barrel export (index.ts) in the components directory to export all components.

4. Ensure components follow project naming conventions and patterns.

## 5. Add Routing (If Needed)

1. Determine if the feature requires new routes.

2. If routing is needed:
   - Locate the project's routing configuration
   - Create route definitions following project conventions
   - Add navigation links where appropriate
   - Set up route guards or middleware if authentication/authorization is required
   - Test that routes are accessible

3. If using React Router, Next.js, or similar, follow their specific patterns.

## 6. Set Up State Management

1. Determine if the feature needs state management (Redux, Zustand, Context, etc.).

2. If needed:
   - Create state management files following project patterns
   - Define initial state
   - Create actions, reducers, or hooks as appropriate
   - Export state management utilities

## 7. Create Utilities and Helpers

1. Identify any utility functions needed for the feature.

2. Create utility files in the utils directory:
   - Pure functions for data transformation
   - Helper functions for common operations
   - Validators or formatters

3. Write unit tests for utilities (these are easiest to test).

## 8. Write Initial Tests

1. **Unit Tests for Utilities:**
   - Test each utility function with various inputs
   - Cover edge cases and error conditions
   - Ensure pure functions have deterministic outputs

2. **Component Tests:**
   - Test component rendering
   - Test prop handling
   - Test user interactions (if applicable)
   - Use project's testing library (Jest, Vitest, Testing Library, etc.)

3. **Integration Tests (if applicable):**
   - Test feature flows end-to-end
   - Test interactions between components
   - Test API integrations with mocks

4. Ensure all tests pass before proceeding.

## 9. Document the Feature

1. Create a README.md in the feature directory with:
   - Feature overview and purpose
   - Architecture and file organization
   - Component documentation (props, usage examples)
   - API documentation (if applicable)
   - Development notes and gotchas

2. Add inline documentation for complex logic.

3. Include usage examples showing how to integrate the feature.

4. Document any configuration or environment variables needed.

## 10. Final Verification

1. Review the complete feature structure:
   - [ ] File structure created and follows project conventions
   - [ ] Types defined and exported
   - [ ] Base components created with proper props
   - [ ] Tests added and passing
   - [ ] Documentation written
   - [ ] Feature exports from index.ts
   - [ ] No linter errors
   - [ ] Follows project coding standards

2. Run linter and fix any issues.

3. Ensure feature is ready for implementation or PR review.

4. Provide summary to user with next steps.

</detailed_sequence_steps>

</task>
