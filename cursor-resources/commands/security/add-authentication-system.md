<task name="Add Authentication System">

<task_objective>
Implement secure user authentication system with chosen method and security best practices. Input includes framework detection from package.json, requirements.txt, or Cargo.toml, existing auth configuration checks, security config from .env files, and database setup verification. Processing involves selecting from authentication methods (username/password, OAuth 2.0, JWT, SAML, MFA, or passwordless) based on arguments, implementing comprehensive authentication and authorization flows, and applying OWASP authentication guidelines. Output is a production-ready authentication system with comprehensive security controls and user-friendly interface.
</task_objective>

<detailed_sequence_steps>
# Add Authentication System - Detailed Sequence of Steps

## 1. Current Application State Analysis

1. Detect framework from @package.json or @requirements.txt or @Cargo.toml

2. Check existing auth implementation by running: `grep -r "auth\|login\|jwt\|session" src/ --include="*.js" --include="*.py" --include="*.rs" | wc -l`

3. Review security config in @.env* files for auth-related variables

4. Verify database setup by checking for user models or auth tables

## 2. Authentication Method Selection

1. Determine authentication method based on $ARGUMENTS:
   - Username/password authentication
   - OAuth 2.0 for third-party integration
   - JWT for stateless authentication
   - SAML for enterprise SSO
   - MFA for enhanced security
   - Passwordless authentication

2. Review chosen method's security requirements and best practices

3. Verify framework compatibility with selected authentication method

## 3. User Management Implementation

1. Create user registration endpoints with validation

2. Implement user profile management capabilities

3. Configure password policies following OWASP guidelines

4. Set up account verification mechanisms (email, SMS)

5. Create user database models or schemas

## 4. Authentication Flow Implementation

1. Implement login endpoint with credential validation

2. Create logout functionality with session cleanup

3. Set up token handling and generation (if using JWT)

4. Implement session management with secure storage

5. Create authentication middleware for route protection

## 5. Authorization System Implementation

1. Implement Role-Based Access Control (RBAC) system

2. Define permissions and access levels

3. Create route protection middleware

4. Implement API endpoint security

5. Set up authorization checks in application logic

## 6. Security Hardening

1. Implement password hashing using bcrypt or Argon2

2. Configure rate limiting to prevent brute force attacks

3. Add CSRF protection for web applications

4. Set up secure cookie configuration (httpOnly, secure, sameSite)

5. Implement secure session management

## 7. Integration

1. Create frontend authentication components (login, register, profile)

2. Implement API endpoints for all authentication operations

3. Update database models and migrations

4. Integrate authentication middleware across application

5. Configure error handling for authentication failures

## 8. Security Standards Compliance

1. Verify OWASP authentication guidelines compliance

2. Implement proper error handling without information disclosure

3. Test secure session management implementation

4. Validate all security controls are functioning correctly

5. Document authentication system architecture and usage

</detailed_sequence_steps>

</task>
