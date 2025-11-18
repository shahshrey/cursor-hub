<task name="Git Flow Hotfix Branch">

<task_objective>
Create a new Git Flow hotfix branch from main for emergency production fixes. Takes a hotfix name as input, validates the emergency status, creates a hotfix branch from production code, determines the patch version bump, and prepares for immediate deployment after fixing critical issues.
</task_objective>

<detailed_sequence_steps>
# Git Flow Hotfix Branch - Detailed Sequence of Steps

## 1. Pre-Flight Validation

1. Verify hotfix name from `$ARGUMENTS` is provided and descriptive:
   - ✅ Valid: `critical-security-patch`, `payment-gateway-fix`, `auth-bypass-fix`
   - ❌ Invalid: `fix`, `hotfix1`, `bug`

2. Check main branch exists.

3. Verify no uncommitted changes (clean working directory required).

4. Confirm emergency status (hotfixes are for CRITICAL production issues only).

**⚠️ IMPORTANT: Hotfix Usage Guidelines**

Hotfixes are ONLY for:
- 🔒 Critical security vulnerabilities
- 💥 Production-breaking bugs
- 💰 Payment/transaction failures
- 🚨 Data loss or corruption issues
- 🔥 System downtime or crashes

NOT for:
- ❌ Regular bug fixes (use feature branch)
- ❌ New features (use feature branch)
- ❌ Performance improvements (use feature branch)
- ❌ Non-critical issues (wait for next release)

**No Hotfix Name Provided:**
```
❌ Hotfix name is required

Usage: /hotfix <hotfix-name>

Examples:
  /hotfix critical-security-patch
  /hotfix payment-processing-failure
  /hotfix auth-bypass-vulnerability

⚠️ IMPORTANT: Hotfixes are for CRITICAL production issues only!

For non-critical fixes, use:
  /feature <name> - Regular bug fixes
```

**Invalid Hotfix Name:**
```
❌ Invalid hotfix name: "fix"

Hotfix names should be:
- Descriptive of the issue
- Use kebab-case format
- Indicate severity/urgency

Examples:
  ✅ critical-security-patch
  ✅ payment-gateway-timeout
  ✅ user-data-corruption-fix
  ❌ fix
  ❌ bug1
  ❌ hotfix
```

**Uncommitted Changes:**
```
⚠️  Uncommitted changes detected in working directory:
M  src/file.js
A  test.js

Hotfixes require a clean working directory.

Options:
1. Commit your changes first
2. Stash them: git stash
3. Discard them: git checkout .

⚠️ This is an emergency hotfix. Please clean your working directory.
```

**Main Branch Behind Remote:**
```
⚠️  Local main is behind origin/main by 2 commits

✓ Pulling latest production code...
✓ Fetched 2 commits
✓ Main is now synchronized with production
✓ Ready to create hotfix branch
```

**Not a Critical Issue:**
```
⚠️  Hotfix Confirmation Required

Is this a CRITICAL production issue that requires immediate attention?

Critical issues include:
- Security vulnerabilities
- Production system failures
- Data loss or corruption
- Payment/transaction failures

If this is NOT critical, consider:
- Creating a feature branch instead
- Waiting for the next release cycle
- Using regular bug fix workflow

Proceed with hotfix? [y/N]
```

## 2. Create Hotfix Branch Workflow

```bash
git checkout main

git pull origin main

git checkout -b hotfix/$ARGUMENTS

git push -u origin hotfix/$ARGUMENTS
```

## 3. Determine Version Bump

Analyze the latest tag to suggest hotfix version:

```
Current production version: v1.2.0
Hotfix version: v1.2.1

Version bump: PATCH (third number incremented)
```

**Hotfix Version Rules:**
- Always increment PATCH version (X.Y.Z → X.Y.Z+1)
- Never increment MAJOR or MINOR for hotfixes
- Examples:
  - v1.2.0 → v1.2.1
  - v2.0.5 → v2.0.6
  - v1.5.9 → v1.5.10

## 4. Success Response

```
✓ Switched to main branch
✓ Pulled latest production code from origin/main
✓ Created branch: hotfix/$ARGUMENTS
✓ Set up remote tracking: origin/hotfix/$ARGUMENTS
✓ Pushed branch to remote

🔥 Hotfix Branch Ready: hotfix/$ARGUMENTS

Branch: hotfix/$ARGUMENTS
Base: main (production)
Will merge to: main AND develop
Suggested version: v1.2.1

⚠️ CRITICAL HOTFIX WORKFLOW

This is an EMERGENCY production fix. Follow these steps:

1. 🔍 Identify the Issue
   - Reproduce the bug
   - Understand the root cause
   - Document the impact

2. 🛠️ Implement the Fix
   - Make MINIMAL changes
   - Focus ONLY on the critical issue
   - Avoid refactoring or improvements
   - Add tests to prevent regression

3. 🧪 Test Thoroughly
   - Test the specific fix
   - Run full regression tests
   - Test on production-like environment
   - Verify no side effects

4. 📝 Document the Fix
   - Update version in package.json
   - Add entry to CHANGELOG.md
   - Document the bug and fix
   - Include reproduction steps

5. 🚀 Deploy Process
   - Create PR to main
   - Get expedited review
   - Run /finish to merge and tag
   - Deploy to production immediately
   - Monitor for issues

🎯 Next Steps:
1. Fix the critical issue (MINIMAL changes only)
2. Test thoroughly: npm test
3. Update version: v1.2.1
4. Create emergency PR: gh pr create --label "hotfix,critical"
5. Get fast-track approval
6. Run /finish to merge to main AND develop
7. Deploy to production
8. Monitor systems closely

⚠️ Remember:
- Hotfix will be merged to BOTH main and develop
- Tag v1.2.1 will be created on main
- Production deployment should happen immediately
- Team should be notified of the hotfix
```

## 5. Hotfix Checklist

```
🔥 Emergency Hotfix Checklist

Issue Identification:
- [ ] Bug is confirmed and reproducible
- [ ] Root cause is identified
- [ ] Impact is documented
- [ ] Stakeholders are notified

Development:
- [ ] Fix is minimal and focused
- [ ] No unnecessary changes included
- [ ] Tests added to prevent regression
- [ ] Code reviewed (if time permits)

Testing:
- [ ] Fix verified in local environment
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Tested on production-like environment
- [ ] No side effects detected

Documentation:
- [ ] CHANGELOG.md updated
- [ ] Version bumped (PATCH)
- [ ] Bug description documented
- [ ] Fix explanation documented
- [ ] Deployment notes prepared

Deployment:
- [ ] PR created with "hotfix" and "critical" labels
- [ ] Fast-track approval obtained
- [ ] Production deployment plan ready
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Team notified of deployment

Post-Deployment:
- [ ] Fix verified in production
- [ ] Systems monitored for issues
- [ ] Metrics show improvement
- [ ] Hotfix merged back to develop
- [ ] Post-mortem scheduled (if needed)
```

## 6. Version Update Process

After implementing the fix, update the version:

```bash
npm version patch --no-git-tag-version

cat >> CHANGELOG.md << EOF

## [v1.2.1] - $(date +%Y-%m-%d) - HOTFIX

### 🔥 Critical Fixes
- Fix $ARGUMENTS: [brief description]
  - Root cause: [explanation]
  - Impact: [who/what was affected]
  - Resolution: [what was fixed]

EOF

git add package.json CHANGELOG.md
git commit -m "chore(hotfix): bump version to v1.2.1

Critical fix for $ARGUMENTS

🤖 Generated with Cursor
Co-Authored-By: Claude <noreply@anthropic.com>"
```

## 7. Create Emergency PR

```bash
gh pr create \
  --title "🔥 HOTFIX v1.2.1: $ARGUMENTS" \
  --body "$(cat <<'EOF'
## 🔥 Emergency Hotfix

**Severity**: Critical
**Version**: v1.2.1
**Issue**: $ARGUMENTS

## Problem Description

[Detailed description of the production issue]

## Root Cause

[Explanation of what caused the issue]

## Fix Implementation

[Description of the fix applied]

## Testing

- [x] Issue reproduced locally
- [x] Fix verified locally
- [x] Unit tests passing
- [x] Integration tests passing
- [x] Tested on staging environment

## Deployment Plan

1. Merge to main
2. Tag as v1.2.1
3. Deploy to production immediately
4. Monitor for 30 minutes
5. Merge back to develop

## Rollback Plan

[How to rollback if issues occur]

## Monitoring

[What to monitor post-deployment]

---

**⚠️ This is a critical production hotfix requiring immediate deployment**

🤖 Generated with Cursor
EOF
)" \
  --base main \
  --head hotfix/$ARGUMENTS \
  --label "hotfix,critical,priority-high" \
  --assignee @me \
  --reviewer team-leads
```

## 8. Git Flow Integration

**Hotfix Workflow in Git Flow:**

```
main (v1.2.0) ──────┬─────────────► (after hotfix merge) v1.2.1
                    │
                    └─► hotfix/$ARGUMENTS
                         │
                         └─► (merges back to both)
                             │
develop ────────────────────┴─────────────► (receives hotfix)
```

**Important:**
- Hotfixes branch from `main` (production)
- Hotfixes merge to BOTH `main` AND `develop`
- Tags are created on `main` after merge
- Production deployment happens immediately

## 9. Post-Hotfix Actions

After successful hotfix deployment:

1. **Verify Fix in Production**
   - Monitor error rates
   - Check affected functionality
   - Verify metrics return to normal

2. **Update Documentation**
   - Document the incident
   - Update runbooks if needed
   - Share learnings with team

3. **Merge to Develop**
   - Ensure hotfix is in develop branch
   - Resolve any merge conflicts
   - Push to remote

4. **Post-Mortem (if needed)**
   - Schedule review meeting
   - Identify prevention measures
   - Update processes if needed

5. **Cleanup**
   - Delete hotfix branch
   - Archive related documentation
   - Update incident tracking

## 10. Environment Variables

- `GIT_FLOW_MAIN_BRANCH`: Main branch name (default: "main")
- `GIT_FLOW_DEVELOP_BRANCH`: Develop branch name (default: "develop")
- `GIT_FLOW_PREFIX_HOTFIX`: Hotfix prefix (default: "hotfix/")

## 11. Related Commands

- `/finish` - Complete hotfix (merge to main and develop, create tag, deploy)
- `/flow-status` - Check current Git Flow status
- `/feature <name>` - Create feature branch (for non-critical fixes)
- `/release <version>` - Create release branch

## 12. Best Practices

**DO:**
- ✅ Use hotfixes ONLY for critical production issues
- ✅ Keep changes minimal and focused
- ✅ Test thoroughly before deploying
- ✅ Document the issue and fix clearly
- ✅ Notify team immediately
- ✅ Merge back to develop after production deployment
- ✅ Monitor production closely after deployment
- ✅ Conduct post-mortem if appropriate

**DON'T:**
- ❌ Use hotfix for regular bug fixes
- ❌ Add new features to hotfix
- ❌ Refactor code during hotfix
- ❌ Skip testing to save time
- ❌ Forget to merge back to develop
- ❌ Deploy without proper review
- ❌ Skip documentation
- ❌ Ignore monitoring after deployment

</detailed_sequence_steps>

</task>
