<task name="Setup Rate Limiting">

<task_objective>
Implement production-ready rate limiting system with sophisticated algorithms and user policies. The input includes framework detection, existing rate limiting code, Redis availability, and API endpoint counts from the codebase. The output will be a complete rate limiting system with intelligent policies, comprehensive monitoring, and advanced abuse prevention capabilities.
</task_objective>

<detailed_sequence_steps>
# Setup Rate Limiting - Detailed Sequence of Steps

## 1. API State Analysis

1. Detect framework from @package.json or @requirements.txt (Express, FastAPI, Spring Boot, etc.).

2. Search for existing rate limiting code (rate.limit, throttle, rateLimit patterns).

3. Check Redis availability by attempting Redis connection.

4. Count API endpoints by searching for route definitions in codebase.

5. Determine rate limit type from **$ARGUMENTS** (--api | --authentication | --file-upload | --database).

## 2. Algorithm Implementation

1. Implement token bucket algorithm for smooth rate limiting with bursts.

2. Create sliding window algorithm for precise time-based limits.

3. Implement fixed window algorithm for simple time-based counting.

4. Design leaky bucket algorithm for constant rate enforcement.

5. Compare algorithms and select appropriate one based on use case.

## 3. User Policies

1. Design tier-based limits for different user subscription levels.

2. Implement authenticated vs anonymous user rate limits.

3. Create user-specific quotas for customized rate limiting.

4. Configure IP-based controls for network-level rate limiting.

5. Implement dynamic quota adjustment based on user behavior.

## 4. Storage Backend

1. Configure Redis integration for distributed rate limiting.

2. Implement distributed rate limiting across multiple servers.

3. Design persistence strategies for rate limit counters.

4. Configure failover mechanisms for Redis unavailability.

5. Setup backup storage for rate limit data integrity.

## 5. Endpoint Configuration

1. Configure per-route limits for different API endpoints.

2. Setup method-specific rules (GET, POST, PUT, DELETE) with different limits.

3. Implement dynamic configuration for adjustable limits without deployment.

4. Create A/B testing capabilities for rate limit experimentation.

5. Document rate limit specifications in API documentation.

## 6. Monitoring and Analytics

1. Implement usage tracking for API consumption patterns.

2. Configure abuse detection for identifying malicious behavior.

3. Setup performance metrics for rate limiting overhead.

4. Create alerting systems for rate limit violations and anomalies.

5. Generate usage reports for capacity planning and analysis.

## 7. Bypass Mechanisms

1. Create whitelist management for trusted clients and internal services.

2. Implement internal request handling bypassing rate limits.

3. Configure emergency overrides for critical situations.

4. Setup temporary limit adjustments for special events.

5. Document bypass procedures and approval workflows.

## 8. Advanced Features

1. Implement adaptive rate limiting based on system load.

2. Configure geo-based controls for regional rate limiting.

3. Setup API key management with per-key rate limits.

4. Implement quota systems for monthly or daily usage limits.

5. Design abuse prevention mechanisms including automatic blocking.

## 9. Production Readiness

1. Design high availability architecture for rate limiting infrastructure.

2. Optimize performance to minimize latency overhead.

3. Implement security controls to prevent rate limit bypass attempts.

4. Configure comprehensive monitoring for rate limit health.

5. Setup graceful degradation for rate limiter failures.

## 10. Documentation and Testing

1. Document complete rate limiting system architecture and configuration.

2. Create intelligent policies documentation explaining tier-based limits.

3. Document comprehensive monitoring setup and alerting rules.

4. Create advanced abuse prevention guide with response procedures.

5. Test rate limiting under various load conditions and attack scenarios.

</detailed_sequence_steps>

</task>
