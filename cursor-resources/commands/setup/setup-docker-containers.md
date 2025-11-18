<task name="Setup Docker Containers">

<task_objective>
Implement production-ready Docker containerization with optimized builds and development workflows. The input includes application type detection from @package.json or @requirements.txt, existing Docker configurations, dependency lock files, and service requirements. The output will be a complete Docker setup with optimized containers, development workflows, production deployment, and comprehensive documentation.
</task_objective>

<detailed_sequence_steps>
# Setup Docker Containers - Detailed Sequence of Steps

## 1. Project State Analysis

1. Detect application type from @package.json or @requirements.txt (Node.js, Python, etc.).

2. Check for existing Docker configurations (@Dockerfile or @docker-compose.yml).

3. Identify dependency lock files (package-lock.json, poetry.lock, Pipfile.lock).

4. Detect required services (database, cache, message queue) from configuration files.

5. Determine environment type from **$ARGUMENTS** (--development | --production | --microservices | --compose).

## 2. Dockerfile Creation

1. Select appropriate base image optimized for the application runtime.

2. Implement multi-stage builds to separate build and runtime dependencies.

3. Optimize layer caching by ordering commands from least to most frequently changing.

4. Apply security best practices including non-root user and minimal permissions.

5. Configure image metadata with labels for version, maintainer, and description.

## 3. Development Workflow

1. Configure volume mounts for hot reloading and live code updates.

2. Setup development-specific environment variables and debugging ports.

3. Enable debugging capabilities by exposing debug ports and configurations.

4. Configure source code mounting to avoid rebuilding on every change.

5. Create development Docker Compose configuration for local workflow.

## 4. Production Optimization

1. Minimize image size using alpine base images and multi-stage builds.

2. Implement security scanning using tools like Trivy or Clair.

3. Configure health checks for container orchestration and monitoring.

4. Remove development dependencies from production images.

5. Optimize startup time by minimizing initialization steps.

## 5. Multi-Service Setup

1. Create Docker Compose file defining all required services.

2. Configure service discovery and inter-service networking.

3. Setup networking configuration with custom networks for isolation.

4. Define service dependencies and startup order using depends_on.

5. Configure volume management for persistent data and shared resources.

## 6. CI/CD Integration

1. Configure automated Docker image builds in CI pipeline.

2. Setup container registry management for image storage and versioning.

3. Implement image tagging strategy (semantic versioning, git SHA).

4. Create deployment pipelines for pushing images to production.

5. Configure automated vulnerability scanning in CI workflow.

## 7. Monitoring & Logging

1. Configure container observability with health checks and status endpoints.

2. Setup log aggregation using Docker logging drivers or external services.

3. Implement resource monitoring for CPU, memory, and disk usage.

4. Configure log rotation and retention policies.

5. Integrate with monitoring platforms (Prometheus, Grafana, DataDog).

## 8. Security Features

1. Configure containers to run as non-root users for security.

2. Use minimal base images to reduce attack surface.

3. Implement vulnerability scanning in build and deployment pipelines.

4. Configure secrets management using Docker secrets or external vaults.

5. Apply security scanning with automated remediation for critical vulnerabilities.

## 9. Performance Optimization

1. Optimize layer caching by strategically ordering Dockerfile commands.

2. Configure build contexts to exclude unnecessary files using .dockerignore.

3. Implement multi-platform builds for different architectures (amd64, arm64).

4. Configure resource constraints (CPU, memory limits) for containers.

5. Optimize image build time using BuildKit and advanced caching.

## 10. Documentation and Validation

1. Document Docker setup including build and run commands.

2. Create development workflow guide for using Docker locally.

3. Document production deployment process and container orchestration.

4. Compile comprehensive documentation for all Docker configurations.

5. Test containers in development and production-like environments.

</detailed_sequence_steps>

</task>
