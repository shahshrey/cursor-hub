<task name="Onboard New Team Member">

<task_objective>
Guide a new developer through a comprehensive onboarding process to get them fully productive and integrated into the team. The workflow covers environment setup, project familiarization, development environment configuration, making their first contribution, granting necessary access and permissions, and reviewing key documentation. The output will be a fully onboarded developer who can independently contribute to the codebase with all necessary tools and access configured.
</task_objective>

<how_to_ask_followup_question>
<question>Would you like me to create a personalized onboarding checklist document for the new developer with their specific progress tracked?</question>
<options>["Yes, create a personalized checklist", "No, just guide me through the process"]</options>
</how_to_ask_followup_question>

<detailed_sequence_steps>
# Onboard New Team Member - Detailed Sequence of Steps

## 1. Environment Setup

1. Verify the new developer's machine has the required system prerequisites:
   - Check operating system version and compatibility

2. Install required development tools:
   - Install Node.js (verify correct version from `.nvmrc` or project documentation)
   - Install Git and configure global user settings
   - Install preferred IDE (VS Code, Cursor, WebStorm, etc.)
   - Install database client tools if applicable

3. Repository setup:
   - Clone the repository using SSH or HTTPS
   - Verify git configuration (user.name, user.email)
   - Set up git hooks if the project uses them
   - Configure branch protection awareness

4. Install project dependencies:
   - Run package manager install command (`npm install`, `yarn install`, `pnpm install`)
   - Verify all dependencies install without errors
   - Check for any peer dependency warnings

5. Configure environment variables:
   - Copy `.env.example` to `.env` (if applicable)
   - Provide necessary API keys and credentials securely
   - Document where to obtain sensitive credentials
   - Verify environment configuration

6. Configure IDE extensions and settings:
   - Install recommended extensions (ESLint, Prettier, etc.)
   - Import project-specific IDE settings
   - Configure formatter and linter settings
   - Set up debugging configurations

## 2. Project Familiarization

1. Review project README and core documentation:
   - Read through the README.md thoroughly
   - Understand project purpose and goals
   - Review high-level architecture overview
   - Identify key stakeholders and contacts

2. Understand the project architecture:
   - Review architecture diagrams or documentation
   - Understand the tech stack and why it was chosen
   - Learn about key design patterns used
   - Identify external dependencies and integrations

3. Review coding conventions and standards:
   - Read through CONTRIBUTING.md or coding standards document
   - Understand naming conventions
   - Review code formatting rules
   - Learn about commit message conventions
   - Review any project-specific rules

4. Explore the folder structure:
   - Walk through the directory structure
   - Understand the purpose of each major directory
   - Locate configuration files
   - Identify where different types of code live (components, utilities, tests, etc.)

5. Review existing codebase samples:
   - Examine well-written examples of key patterns
   - Understand how features are typically implemented
   - Review test examples
   - Study API endpoint implementations

## 3. Development Environment Configuration

1. Database setup (if applicable):
   - Install required database software (PostgreSQL, MongoDB, etc.)
   - Create local development database
   - Configure database connection strings
   - Verify database connectivity

2. Run database migrations:
   - Execute migration scripts to set up schema
   - Verify all migrations complete successfully
   - Understand the migration workflow
   - Review rollback procedures if needed

3. Seed test data:
   - Run seed scripts to populate development data
   - Understand what test data is available
   - Learn how to reset or refresh test data
   - Create additional test accounts if needed

4. Start development server:
   - Run the development server command
   - Verify the application starts without errors
   - Access the application in browser
   - Test hot-reload functionality

5. Verify everything works:
   - Test key application features
   - Verify API endpoints are accessible
   - Check that authentication works
   - Confirm development tools are functioning (debugger, console, etc.)

6. Run test suite:
   - Execute unit tests and verify they pass
   - Run integration tests if applicable
   - Understand how to run specific test suites
   - Learn about test coverage requirements

## 4. Make First Contribution

1. Pick an appropriate first issue:
   - Identify issues tagged as "good first issue" or "beginner-friendly"
   - Discuss the issue with a mentor or team lead
   - Ensure the issue is well-defined and scoped appropriately
   - Understand acceptance criteria

2. Create a feature branch:
   - Follow the project's branch naming convention
   - Create branch from the correct base branch (main, develop, etc.)
   - Set up tracking with remote repository
   - Understand the branching strategy

3. Make changes following project guidelines:
   - Implement the required changes
   - Follow coding standards and conventions
   - Write clean, readable, and maintainable code
   - Add appropriate error handling
   - Ensure code is well-structured

4. Write or update tests:
   - Write unit tests for new functionality
   - Update existing tests if necessary
   - Ensure test coverage meets project requirements
   - Verify all tests pass locally

5. Prepare and submit first PR:
   - Review your own changes thoroughly
   - Write a clear PR description following template
   - Reference the related issue
   - Request review from appropriate team members
   - Address any automated checks or linter warnings

6. Participate in code review:
   - Respond to reviewer feedback professionally
   - Make requested changes promptly
   - Ask questions if feedback is unclear
   - Learn from the review process

## 5. Access & Permissions

1. Add to GitHub organization:
   - Send GitHub username to team administrator
   - Accept organization invitation
   - Review organization policies
   - Set up two-factor authentication if required

2. Grant repository access:
   - Provide appropriate access level (read, write, admin)
   - Add to relevant teams
   - Explain repository permissions structure
   - Review branch protection rules

3. Add to team communication channels:
   - Invite to Slack/Discord/Teams channels
   - Introduce to the team
   - Explain channel purposes and etiquette
   - Share important pinned messages and resources

4. Provide access to development tools:
   - Grant access to CI/CD pipelines
   - Provide access to deployment tools (if appropriate)
   - Share access to development databases/services
   - Configure access to monitoring tools

5. Set up monitoring and logging access:
   - Provide access to error tracking tools (Sentry, Rollbar, etc.)
   - Grant access to logging platforms
   - Set up access to analytics tools
   - Explain how to use these tools for debugging

6. Configure project management tools:
   - Add to project management software (Jira, Linear, GitHub Projects)
   - Explain workflow and issue tracking process
   - Show how to update issue status
   - Review sprint/iteration planning process

## 6. Documentation Review

1. Review API documentation:
   - Study API endpoint documentation
   - Understand authentication and authorization
   - Review request/response formats
   - Test API endpoints using documentation

2. Review deployment process:
   - Understand the deployment pipeline
   - Review staging and production environments
   - Learn about rollback procedures
   - Understand deployment approval process

3. Review testing guidelines:
   - Understand testing philosophy and requirements
   - Review unit testing best practices
   - Learn about integration and E2E testing
   - Review test coverage expectations

4. Review code review process:
   - Understand PR workflow and requirements
   - Learn about review timelines and expectations
   - Review common feedback patterns
   - Understand merge requirements

5. Review incident response procedures:
   - Understand on-call rotation (if applicable)
   - Learn about incident escalation process
   - Review communication protocols during incidents
   - Understand post-mortem process

## 7. Onboarding Verification

1. Complete onboarding checklist:
   - Development environment fully configured and working
   - All tests passing locally
   - Can run application locally without issues
   - Database set up and seeded properly
   - Understands git workflow and branching strategy
   - First PR submitted and reviewed
   - Has access to all necessary tools and systems

2. Schedule check-in meetings:
   - Set up 1-on-1 with direct manager
   - Schedule pairing sessions with team members
   - Plan knowledge transfer sessions
   - Set up 30/60/90 day check-ins

3. Provide ongoing resources:
   - Share project wiki and documentation links
   - Provide team meeting schedule
   - Share key contacts and escalation paths
   - Offer mentorship or buddy system pairing

4. Gather feedback:
   - Ask about onboarding experience
   - Identify gaps in documentation or process
   - Update onboarding materials based on feedback
   - Document lessons learned

</detailed_sequence_steps>

</task>
