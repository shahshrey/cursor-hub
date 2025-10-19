<task name="Emergency Hotfix Deployment">

<task_objective>
Deploy critical hotfixes with emergency procedures, validation, and rollback capabilities. The workflow processes current production version from git tags, production branch status, recent commits, and deployment health status to execute emergency hotfix deployment with minimal changes, accelerated testing, fast-track review, staging validation, and production deployment with comprehensive monitoring and rollback readiness.
</task_objective>

<detailed_sequence_steps>
# Emergency Hotfix Deployment - Detailed Sequence of Steps

## 1. Emergency Assessment and Triage

Assess the severity and impact of the issue by examining current production version using !`git describe --tags --abbrev=0 2>/dev/null || echo "No tags found"` and deployment status from health checks. Determine if a hotfix is necessary or if it can wait for normal release cycle. Identify affected systems and user impact through monitoring and user reports. Estimate time sensitivity and business impact based on severity. Document the incident and decision rationale in incident tracking system.

## 2. Incident Response Setup

Create incident tracking in incident management system with unique incident ID. Set up war room or dedicated communication channel for coordination. Notify stakeholders and on-call team members immediately. Establish clear communication protocols for updates. Document initial incident details including start time, affected systems, and expected timeline.

## 3. Branch and Environment Setup

Create hotfix branch from production tag using git fetch --tags, git checkout tags/v1.2.3 (latest production version), and git checkout -b hotfix/critical-fix-name. Alternatively, branch from main if using trunk-based development. Verify branch creation and push to remote repository.

## 4. Rapid Development Process

Keep changes minimal and focused on the critical issue only. Avoid refactoring, optimization, or unrelated improvements. Use well-tested patterns and established approaches to minimize risk. Add minimal logging for troubleshooting purposes. Follow existing code conventions and patterns strictly.

## 5. Accelerated Testing

Run focused tests related to the fix using test pattern matching. Execute security tests if applicable. Create manual testing checklist covering core functionality, hotfix resolution verification, no new issues introduced check, and critical user flows validation. Execute tests quickly but thoroughly.

## 6. Fast-Track Code Review

Get expedited review from senior team member or tech lead. Focus review on security and correctness rather than style. Use pair programming if available and time permits. Document review decisions and rationale quickly. Ensure proper approval process even under time pressure through formal sign-off.

## 7. Version and Tagging

Update version for hotfix by incrementing patch version (1.2.3 -> 1.2.4) or adding hotfix identifier (1.2.3-hotfix.1). Commit with detailed message including "hotfix:" prefix, description of fix, security or impact notes, and issue reference. Tag the hotfix version with git tag -a v1.2.4 -m "Hotfix v1.2.4: Critical fix description". Push branch and tag to remote repository.

## 8. Staging Deployment and Validation

Deploy to staging environment for final validation using deployment script. Execute critical path testing by testing authentication, core features, and the specific fix. Run automated smoke tests. Verify no regressions in critical functionality.

## 9. Production Deployment Strategy

For blue-green deployment, deploy to inactive environment (blue or green), validate environment health, switch traffic to new environment, and monitor deployment metrics. For rolling deployment, deploy to subset of servers first with batch size 1, monitor each batch deployment, and continue with next batch if healthy. For immediate deployment, take backup, deploy all at once, and monitor closely.

## 10. Pre-Deployment Checklist

Verify database backup completed successfully. Confirm rollback plan documented and ready. Ensure monitoring alerts configured and active. Verify team members standing by for support. Confirm communication channels established. Execute production deployment script. Run immediate post-deployment validation.

## 11. Real-Time Monitoring

Monitor key application metrics using watch commands and curl for health endpoints. Track error rates and logs with tail and grep for relevant errors. Monitor response times and latency, error rates and exception counts, user authentication success rates, and system resource usage (CPU, memory). Set up real-time dashboards if available.

## 12. Post-Deployment Validation

Run comprehensive validation tests covering critical paths. Test specific functionality that was fixed. Validate security fix effectiveness if applicable. Check overall system performance and stability. Verify no new issues introduced by the hotfix.

## 13. Communication and Status Updates

Provide regular status updates to stakeholders every 15-30 minutes. Use consistent communication channels (Slack, email, status page). Document deployment progress and results in incident tracker. Update incident tracking systems with current status. Notify relevant teams of deployment completion and validation results.

## 14. Rollback Procedures

Maintain automated rollback script ready to execute. For rollback, identify previous version to restore, execute deployment script with previous version, validate rollback success, and communicate rollback status. Have manual rollback steps documented if automation fails including load balancer switching, previous version validation, system stability monitoring, and team communication.

## 15. Post-Deployment Monitoring Period

Monitor system for 2-4 hours after deployment continuously. Watch error rates and performance metrics closely using dashboards and logs. Check user feedback and support ticket volume for issues. Validate that the hotfix resolves the original issue completely. Document any issues or unexpected behaviors for post-incident review.

## 16. Documentation and Incident Reporting

Document the complete hotfix process and timeline including issue detection, decision making, development time, testing duration, and deployment completion. Record lessons learned and process improvements. Update incident management systems with resolution details. Create post-incident review materials. Share knowledge with team for future reference.

## 17. Merge Back to Main Branch

After successful hotfix deployment and validation period, merge hotfix to main branch using git checkout main, git pull origin main, git merge hotfix/critical-fix-name, and git push origin main. Clean up hotfix branch with git branch -d hotfix/critical-fix-name and git push origin --delete hotfix/critical-fix-name.

## 18. Post-Incident Activities

Schedule and conduct post-incident review meeting within 24-48 hours. Update runbooks and emergency procedures based on learnings. Identify and implement process improvements to prevent similar issues. Update monitoring and alerting configurations to catch issues earlier. Plan preventive measures including additional tests, monitoring enhancements, and code improvements.

</detailed_sequence_steps>

</task>
