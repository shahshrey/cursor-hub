<task name="Implement Secure Authentication and Authorization">

<task_objective>
Guide the implementation of industry-standard authentication and authorization mechanisms in the application, ensuring proper session management, role-based access control, and secure credential handling. The output will be a fully configured authentication system with proper security measures including secure token storage, RBAC enforcement, and OAuth integration where applicable.
</task_objective>

<detailed_sequence_steps>
# Implement Secure Authentication and Authorization - Detailed Sequence Steps

## 1. Choose and Configure Authentication Library

1. Assess the current project framework and identify the appropriate authentication library:
   - For Next.js projects: Evaluate next-auth or similar established libraries
   - For other frameworks: Identify framework-specific authentication solutions
   - Consider delegation to identity platforms like Auth0, Clerk, or Supabase Auth

2. Install the selected authentication library or configure the identity platform integration:
   - Add required dependencies to package.json
   - Set up necessary environment variables
   - Configure authentication provider settings

3. Create authentication configuration file with proper settings:
   - Define authentication providers (email/password, OAuth, etc.)
   - Configure session strategy and duration
   - Set up callback URLs and redirect paths

4. Document the authentication choice and rationale for future reference

## 2. Implement Secure Session Token Management

1. Configure HTTP-only, Secure cookies for session token storage:
   - Set `httpOnly: true` to prevent JavaScript access
   - Set `secure: true` for HTTPS-only transmission
   - Configure `sameSite: 'lax'` or `'strict'` to prevent CSRF attacks
   - Set appropriate `maxAge` for session expiration

2. If localStorage usage is required, implement token rotation mechanism:
   - Set up refresh token flow
   - Implement automatic token refresh before expiration
   - Store only short-lived access tokens in localStorage
   - Ensure refresh tokens are stored in HTTP-only cookies

3. Implement session validation middleware:
   - Verify token signature and expiration on each request
   - Handle token refresh automatically
   - Implement proper error handling for invalid/expired sessions

4. Add session cleanup on logout:
   - Clear all authentication cookies
   - Invalidate tokens on the server side
   - Clear any client-side storage

## 3. Implement Role-Based Access Control (RBAC)

1. Define user roles and permissions structure:
   - Create role definitions (e.g., admin, user, moderator)
   - Map permissions to each role
   - Store role information in user database schema

2. Create authorization middleware for backend routes:
   - Verify user authentication status
   - Check user roles and permissions for each protected route
   - Return appropriate error responses (401 Unauthorized, 403 Forbidden)

3. Implement server-side authorization checks:
   - Add role verification to all protected API endpoints
   - Never rely solely on client-side authorization
   - Validate user permissions before database operations

4. Create frontend route protection (optional, as defense-in-depth):
   - Implement route guards for protected pages
   - Hide/show UI elements based on user roles
   - Remember this is supplementary to server-side checks

## 4. Secure OAuth Implementation

1. Configure OAuth providers with proper settings:
   - Register application with OAuth providers (Google, GitHub, etc.)
   - Set up authorized redirect URIs
   - Store client IDs and secrets in environment variables

2. Implement state parameter validation:
   - Generate cryptographically random state parameter
   - Store state in session before OAuth redirect
   - Verify state parameter matches on callback

3. Validate callback URLs:
   - Whitelist allowed callback URLs
   - Verify callback URL matches registered redirects
   - Implement proper error handling for invalid callbacks

4. Handle OAuth token exchange securely:
   - Exchange authorization code for tokens on server side
   - Store tokens securely using established session management
   - Implement token refresh logic for long-lived sessions

## 5. Implement Secure Password Handling

1. Configure password hashing with strong algorithms:
   - Use bcrypt with appropriate cost factor (10-12 rounds)
   - Or use Argon2 for enhanced security
   - Never implement custom hashing algorithms

2. Implement password validation requirements:
   - Minimum length (12+ characters recommended)
   - Complexity requirements (mix of character types)
   - Check against common password lists
   - Provide clear validation feedback to users

3. Create secure password reset flow:
   - Generate cryptographically random reset tokens
   - Set token expiration (15-30 minutes)
   - Invalidate token after single use
   - Send reset links via email with HTTPS URLs

4. Never store passwords in plaintext:
   - Audit database schema to ensure no plaintext password fields
   - Verify password fields are properly hashed before storage
   - Implement logging that excludes sensitive data

## 6. Testing and Validation

1. Test authentication flows:
   - Verify successful login/logout
   - Test session persistence across page reloads
   - Verify token refresh mechanisms
   - Test OAuth flows end-to-end

2. Test authorization checks:
   - Verify role-based access restrictions
   - Test unauthorized access attempts return proper errors
   - Ensure protected routes require authentication

3. Security testing:
   - Test for CSRF vulnerabilities
   - Verify XSS protection through HTTP-only cookies
   - Test session fixation prevention
   - Verify secure password storage

4. Document security measures:
   - Create authentication flow diagrams
   - Document role and permission mappings
   - Provide troubleshooting guide for common issues

</detailed_sequence_steps>

<examples>
## Example: Next.js with next-auth Configuration

```typescript
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)
        if (!user) return null
        
        const isValid = await compare(credentials.password, user.hashedPassword)
        if (!isValid) return null
        
        return { id: user.id, email: user.email, role: user.role }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
})
```

## Example: RBAC Middleware

```typescript
export function requireRole(allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await getSession(req)
    
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    if (!allowedRoles.includes(session.user.role)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    next()
  }
}

app.delete('/api/users/:id', requireRole(['admin']), async (req, res) => {
})
```

## Example: Secure Password Hashing

```typescript
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  
  await db.users.create({
    email,
    hashedPassword,
  })
}
```
</examples>

</task>

--- End Command ---

