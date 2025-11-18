<task name="Supabase Security Audit">

<task_objective>
Conduct comprehensive Supabase security audit with RLS policy analysis and vulnerability assessment. The workflow accepts audit scopes (rls, permissions, auth, api-keys, comprehensive) and uses Supabase MCP integration to review Row Level Security policies, analyze permission hierarchies, assess authentication security, audit API key management, and identify security vulnerabilities. Outputs include security audit reports, vulnerability assessments, policy recommendations, security improvements, and compliance validation documentation.
</task_objective>

<detailed_sequence_steps>
# Supabase Security Audit - Detailed Sequence of Steps

## Current Security Context

- Supabase access: MCP integration for security analysis and policy review
- RLS policies: Current Row Level Security implementation and policy effectiveness
- Auth configuration: !`find . -name "*auth*" -o -name "*supabase*" | grep -E "\\.(js|ts|json)$" | head -5` authentication setup
- API security: Current API key management and access control implementation

## 1. RLS Policy Analysis

1. Review Row Level Security policies for all tables
2. Test policy effectiveness with sample queries
3. Identify policy gaps and missing protections
4. Optimize policy performance with indexing

## 2. Permission Assessment

1. Analyze table permissions and access controls
2. Review role-based access control (RBAC) configuration
3. Validate permission hierarchies and inheritance
4. Identify over-privileged access and reduce permissions

## 3. Authentication Security

1. Review authentication configuration and providers
2. Analyze JWT security and token expiration
3. Validate session management and refresh tokens
4. Assess multi-factor authentication implementation

## 4. API Key Management

1. Audit API key usage across application
2. Review key rotation policies and procedures
3. Validate key scoping and permission limits
4. Assess exposure risks and key leakage

## 5. Data Protection

1. Analyze sensitive data handling practices
2. Review encryption implementation (at-rest, in-transit)
3. Validate data masking for PII
4. Assess backup security and access controls

## 6. Vulnerability Scanning

1. Identify security vulnerabilities in schema
2. Assess SQL injection risks in dynamic queries
3. Review CORS configuration and origin restrictions
4. Validate rate limiting and abuse prevention

## Advanced Features

- Automated security testing
- Policy simulation
- Vulnerability scoring
- Compliance checking
- Security monitoring setup

## Compliance Integration

- GDPR compliance checking
- SOC2 requirements validation
- Security best practices enforcement
- Audit trail analysis

</detailed_sequence_steps>

</task>
