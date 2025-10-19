<task name="Dependency Audit">

<task_objective>
Audit dependencies for security vulnerabilities, license compliance, and update recommendations. Input includes package files (package.json, requirements.txt, Cargo.toml, pom.xml), lock files, security scan results from npm audit, pip check, or cargo audit, and outdated package listings. Processing involves comprehensive analysis of vulnerability scanning, version analysis, license compliance, supply chain security, and performance impact based on scope arguments (--security, --licenses, --updates, or --all). Output is a prioritized security report with critical vulnerabilities, recommended actions, and compliance status.
</task_objective>

<detailed_sequence_steps>
# Dependency Audit - Detailed Sequence of Steps

## 1. Current Dependencies Assessment

1. Identify package files: @package.json or @requirements.txt or @Cargo.toml or @pom.xml

2. Locate lock files: @package-lock.json or @poetry.lock or @Cargo.lock

3. Run security scan: `npm audit --audit-level=moderate 2>/dev/null || pip check 2>/dev/null || cargo audit 2>/dev/null || echo "No security scanner available"`

4. Check outdated packages: `npm outdated 2>/dev/null || pip list --outdated 2>/dev/null || echo "Check manually"`

## 2. Audit Scope Determination

1. Parse $ARGUMENTS to determine focus area:
   - --security: Focus on vulnerability scanning
   - --licenses: Focus on license compliance
   - --updates: Focus on version analysis
   - --all: Perform complete audit

2. Prioritize audit areas based on scope selection

3. Prepare audit methodology for selected scope

## 3. Vulnerability Scanning

1. Identify known CVEs in dependencies

2. Check security advisories for each package

3. Assess exploit availability for vulnerabilities

4. Determine severity levels (critical, high, medium, low)

5. Create list of vulnerable packages with details

## 4. Version Analysis

1. Identify outdated packages requiring updates

2. Check for breaking changes in newer versions

3. Analyze dependency tree for conflicts

4. Provide update recommendations with migration notes

5. Assess risk of updating vs maintaining current versions

## 5. License Compliance Analysis

1. Extract license information from all dependencies

2. Check license compatibility with project license

3. Identify restrictions and legal obligations

4. Flag incompatible or problematic licenses

5. Document license compliance status

## 6. Supply Chain Security Assessment

1. Verify package authenticity and integrity

2. Check maintainer status and activity

3. Identify suspicious dependencies or patterns

4. Review package download sources

5. Assess risk of supply chain attacks

## 7. Performance Impact Analysis

1. Calculate total bundle size from dependencies

2. Identify unused or redundant dependencies

3. Find optimization opportunities (tree-shaking, lazy loading)

4. Assess impact of dependency size on application performance

5. Recommend dependency alternatives if beneficial

## 8. Report Generation

1. Compile all findings into structured report

2. Prioritize critical vulnerabilities requiring immediate action

3. Provide recommended actions for each finding

4. Include compliance status summary

5. Generate executive summary with key metrics and action items

</detailed_sequence_steps>

</task>
