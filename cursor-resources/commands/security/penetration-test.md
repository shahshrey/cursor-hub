<task name="Penetration Test">

<task_objective>
Perform penetration testing and vulnerability assessment on application following ethical hacking methodologies. Input includes running services detection via netstat or lsof, web framework identification from package.json or requirements.txt, API endpoints count from route definitions, and authentication implementation check. Processing involves systematic testing phases (reconnaissance, vulnerability assessment, exploitation testing, authentication testing, API security testing, infrastructure testing) using OWASP Testing Guide and NIST guidelines, targeting areas based on arguments (--web-app, --api, --auth, or --full-scan). Output is a comprehensive penetration test report with executive summary, detailed findings, risk ratings, and remediation roadmap.
</task_objective>

<detailed_sequence_steps>
# Penetration Test - Detailed Sequence of Steps

## 1. Application Context Assessment

1. Identify running services: `netstat -tlnp 2>/dev/null | grep LISTEN | head -10 || lsof -i -P | grep LISTEN | head -10`

2. Detect web framework from @package.json or @requirements.txt

3. Count API endpoints: `grep -r "route\|endpoint\|@app\\.route\|@RequestMapping" src/ 2>/dev/null | wc -l`

4. Verify authentication implementation: `grep -r "auth\|login\|jwt\|session" src/ 2>/dev/null | wc -l`

## 2. Test Target Determination

1. Parse $ARGUMENTS to determine test focus:
   - --web-app: Focus on web application testing
   - --api: Focus on API security testing
   - --auth: Focus on authentication testing
   - --full-scan: Comprehensive testing

2. Define test scope boundaries and limitations

3. Establish testing methodology based on target

4. Maintain ethical boundaries documentation

## 3. Reconnaissance Phase

1. Perform service discovery on target application

2. Conduct technology fingerprinting (framework, versions, libraries)

3. Map attack surface (endpoints, forms, APIs, services)

4. Identify entry points and potential vulnerabilities

5. Document application architecture and data flow

## 4. Vulnerability Assessment

1. Test for OWASP Top 10 vulnerabilities systematically

2. Check for injection flaws (SQL, NoSQL, command injection)

3. Assess broken authentication mechanisms

4. Test for sensitive data exposure

5. Check XML External Entities (XXE) vulnerabilities

6. Test broken access control

7. Assess security misconfiguration

8. Check for Cross-Site Scripting (XSS) vulnerabilities

9. Test insecure deserialization

10. Check for components with known vulnerabilities

## 5. Exploitation Testing

1. Attempt XSS attacks on input fields and parameters

2. Test CSRF vulnerability in state-changing operations

3. Attempt SQL injection on database queries

4. Test privilege escalation possibilities

5. Document proof-of-concept for each successful exploit

6. Avoid data damage or system disruption

## 6. Authentication Testing

1. Test brute force protection mechanisms

2. Assess session management security

3. Attempt authorization bypass techniques

4. Test password reset and recovery flows

5. Check multi-factor authentication implementation

6. Test session timeout and invalidation

## 7. API Security Testing

1. Test input validation on all API endpoints

2. Verify rate limiting implementation

3. Attempt authentication bypass on protected endpoints

4. Test API versioning security

5. Check for mass assignment vulnerabilities

6. Test API error handling and information disclosure

## 8. Infrastructure Testing

1. Assess network security configuration

2. Test container security (if Docker/Kubernetes used)

3. Check configuration management issues

4. Test cloud security settings and permissions

5. Verify firewall and network segmentation

## 9. Testing Methodology Compliance

1. Verify all tests follow OWASP Testing Guide

2. Ensure NIST guidelines compliance

3. Use combination of automated tools and manual testing

4. Document all findings with detailed evidence

5. Maintain ethical boundaries throughout testing

## 10. Report Generation

1. Create executive summary with key findings

2. Document detailed findings with severity ratings

3. Provide proof-of-concept examples for each vulnerability

4. Include remediation recommendations with priority

5. Create remediation roadmap with timeline

6. Present comprehensive penetration test report

</detailed_sequence_steps>

</task>
