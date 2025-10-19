<task name="Game Analytics & Player Intelligence System">

<task_objective>
Implement game analytics systems with player behavior tracking, performance monitoring, and business intelligence integration. This workflow creates comprehensive analytics infrastructure including session tracking, crash reporting, revenue analytics, A/B testing frameworks, and real-time monitoring with privacy compliance. Accepts $ARGUMENTS for analytics type: --player-behavior, --performance, --monetization, --retention, or --comprehensive analytics implementation.
</task_objective>

<detailed_sequence_steps>
# Game Analytics & Player Intelligence System - Detailed Sequence of Steps

## 1. Assess Current Analytics Context

1. Identify game platform:
   - Check @package.json for platform details
   - Detect Unity/Unreal/Godot project files
   - Determine deployment platforms

2. Review existing analytics:
   - Search for analytics code: `grep -r "Analytics\|Telemetry\|Tracking" . 2>/dev/null | wc -l`
   - Review current implementations
   - Identify analytics gaps

3. Check data storage configuration:
   - Review @database/ directory
   - Detect database configurations
   - Assess data storage needs

4. Verify privacy compliance:
   - Check for @privacy-policy.md
   - Review @GDPR/ directory
   - Assess compliance requirements

5. Identify platform SDKs:
   - Find SDK integrations: `find . -name "*SDK*" -o -name "*Analytics*" | head -5`
   - Review existing SDK implementations
   - Plan SDK integration strategy

## 2. Implement Player Behavior Analytics

1. Set up session tracking and engagement metrics:
   - Track user sessions
   - Measure session duration
   - Calculate engagement scores

2. Create user journey mapping and funnel analysis:
   - Map user flows
   - Identify conversion funnels
   - Analyze drop-off points

3. Implement feature usage and interaction heatmaps:
   - Track feature interactions
   - Generate usage heatmaps
   - Identify popular features

4. Set up player progression and achievement tracking:
   - Track player progress
   - Monitor achievement unlocks
   - Analyze progression rates

5. Create social interactions and community engagement metrics:
   - Track social features usage
   - Measure community engagement
   - Analyze multiplayer interactions

## 3. Implement Performance & Technical Analytics

1. Set up frame rate and performance monitoring across devices:
   - Track frame rate metrics
   - Monitor performance per device
   - Identify performance issues

2. Create crash reporting and error tracking:
   - Implement crash detection
   - Track error occurrences
   - Categorize crash types

3. Set up loading times and optimization opportunities tracking:
   - Measure loading times
   - Identify bottlenecks
   - Track optimization impact

4. Implement memory usage patterns and optimization insights:
   - Monitor memory usage
   - Detect memory leaks
   - Track memory optimization

5. Create network performance and connectivity analytics:
   - Track network latency
   - Monitor connection stability
   - Analyze bandwidth usage

## 4. Implement Business Intelligence Integration

1. Set up revenue tracking and monetization analytics:
   - Track in-app purchases
   - Monitor revenue streams
   - Analyze pricing effectiveness

2. Create user acquisition and retention metrics:
   - Track user acquisition sources
   - Measure retention rates
   - Calculate churn rates

3. Implement lifetime value (LTV) and cohort analysis:
   - Calculate player LTV
   - Perform cohort analysis
   - Segment user value

4. Set up A/B testing framework for feature experiments:
   - Create experiment framework
   - Implement variant testing
   - Measure experiment results

5. Create market segmentation and player persona analytics:
   - Segment player base
   - Define player personas
   - Analyze segment behavior

## 5. Implement Real-time Monitoring & Alerting

1. Set up live player activity monitoring:
   - Track concurrent users
   - Monitor active sessions
   - Display real-time metrics

2. Create performance anomaly detection and alerting:
   - Detect performance anomalies
   - Configure alert thresholds
   - Implement notification systems

3. Set up revenue and conversion rate monitoring:
   - Track revenue in real-time
   - Monitor conversion funnels
   - Alert on revenue changes

4. Implement server health and capacity monitoring:
   - Monitor server metrics
   - Track resource usage
   - Predict capacity needs

5. Create automated incident response and escalation:
   - Configure incident detection
   - Implement escalation workflows
   - Automate response procedures

## 6. Implement Data Collection Strategy

1. Design event taxonomy and standardization:
   - Define event categories
   - Standardize event naming
   - Create event schema

2. Implement privacy-compliant data collection practices:
   - Obtain user consent
   - Anonymize sensitive data
   - Follow privacy regulations

3. Set up cross-platform data synchronization:
   - Sync data across platforms
   - Resolve data conflicts
   - Ensure data consistency

4. Configure offline data storage and batch upload:
   - Store data offline
   - Implement batch upload
   - Handle connectivity issues

5. Implement data quality validation and cleansing:
   - Validate data quality
   - Cleanse invalid data
   - Ensure data accuracy

## 7. Develop Analytics Dashboard

1. Create real-time analytics visualization:
   - Build dashboard interfaces
   - Implement real-time updates
   - Create visual charts

2. Set up custom KPI tracking and monitoring:
   - Define key performance indicators
   - Track custom metrics
   - Monitor KPI trends

3. Create executive and stakeholder reporting:
   - Generate executive reports
   - Create stakeholder views
   - Automate report delivery

4. Implement team-specific analytics views and permissions:
   - Configure role-based access
   - Create team dashboards
   - Manage permissions

5. Enable mobile and web dashboard accessibility:
   - Build responsive dashboards
   - Support mobile access
   - Ensure cross-browser compatibility

## 8. Implement Player Insights & Segmentation

1. Create player behavior pattern analysis:
   - Analyze play patterns
   - Identify behavior clusters
   - Detect anomalies

2. Implement churn prediction and retention strategies:
   - Build churn prediction models
   - Identify at-risk players
   - Create retention campaigns

3. Set up personalization and recommendation systems:
   - Implement recommendation engines
   - Personalize content
   - Optimize player experience

4. Create dynamic difficulty adjustment based on analytics:
   - Analyze player skill levels
   - Adjust difficulty dynamically
   - Balance game challenge

5. Implement player support and community management insights:
   - Track support issues
   - Analyze community sentiment
   - Improve player satisfaction

## 9. Implement A/B Testing & Experimentation

1. Set up feature flag management and testing infrastructure:
   - Create feature flag system
   - Manage feature rollouts
   - Control feature access

2. Implement statistical significance validation:
   - Calculate statistical significance
   - Validate experiment results
   - Ensure reliable conclusions

3. Create multivariate testing capabilities:
   - Support multiple variants
   - Test feature combinations
   - Analyze interaction effects

4. Set up gradual feature rollout and monitoring:
   - Implement gradual rollouts
   - Monitor rollout impact
   - Control rollout speed

5. Create experiment result analysis and recommendations:
   - Analyze experiment data
   - Generate insights
   - Recommend actions

## 10. Implement Privacy & Compliance

1. Create GDPR and CCPA compliance frameworks:
   - Implement privacy frameworks
   - Ensure regulatory compliance
   - Document compliance procedures

2. Set up user consent management and tracking:
   - Request user consent
   - Track consent status
   - Respect user preferences

3. Implement data anonymization and pseudonymization:
   - Anonymize user data
   - Pseudonymize identifiers
   - Protect privacy

4. Create right to be forgotten implementation:
   - Implement data deletion
   - Handle deletion requests
   - Remove user data

5. Set up data breach detection and response procedures:
   - Monitor for breaches
   - Detect security incidents
   - Respond to breaches

## 11. Implement Security & Data Governance

1. Set up encrypted data transmission and storage:
   - Encrypt data in transit
   - Encrypt data at rest
   - Use secure protocols

2. Implement access control and audit logging:
   - Control data access
   - Log access events
   - Monitor data usage

3. Create data retention policy implementation:
   - Define retention periods
   - Implement data archival
   - Delete expired data

4. Set up third-party integration security validation:
   - Validate third-party security
   - Review integration risks
   - Monitor third-party access

5. Create regular security assessment and compliance audits:
   - Conduct security audits
   - Assess compliance status
   - Remediate findings

## 12. Generate Analytics Architecture

1. Create data collection framework and event taxonomy:
   - Design collection architecture
   - Define event structure
   - Document data flow

2. Document privacy-compliant implementation guidelines:
   - Write privacy guidelines
   - Document compliance steps
   - Create implementation guides

3. Define cross-platform synchronization strategy:
   - Design sync architecture
   - Document sync procedures
   - Handle edge cases

4. Create real-time processing and storage architecture:
   - Design data pipelines
   - Implement real-time processing
   - Configure storage systems

## 13. Build Dashboard & Reporting System

1. Create executive and operational dashboards:
   - Build executive views
   - Create operational dashboards
   - Implement drill-down capabilities

2. Set up automated reporting and alert systems:
   - Automate report generation
   - Configure alerting rules
   - Deliver notifications

3. Create custom analytics views for different stakeholders:
   - Design role-specific views
   - Customize metrics display
   - Support various use cases

4. Implement mobile and web accessibility:
   - Build responsive interfaces
   - Support mobile devices
   - Ensure web compatibility

## 14. Build Player Intelligence Platform

1. Create behavior analysis and segmentation tools:
   - Build analysis tools
   - Implement segmentation
   - Visualize segments

2. Implement predictive analytics and recommendation systems:
   - Build prediction models
   - Create recommendation engines
   - Deploy ML systems

3. Set up A/B testing and experimentation framework:
   - Build testing infrastructure
   - Implement variant control
   - Analyze results

4. Create personalization and dynamic content delivery:
   - Implement personalization
   - Deliver dynamic content
   - Optimize experiences

## 15. Build Compliance & Security Framework

1. Create privacy policy and consent management:
   - Draft privacy policies
   - Implement consent UI
   - Track consent records

2. Set up data governance and security protocols:
   - Define governance policies
   - Implement security controls
   - Monitor compliance

3. Implement regulatory compliance validation:
   - Validate compliance
   - Document compliance status
   - Maintain compliance

4. Create incident response and data breach procedures:
   - Define response procedures
   - Create response teams
   - Document breach handling

</detailed_sequence_steps>

</task>
