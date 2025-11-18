<task name="Containerize Application">

<task_objective>
Containerize application with optimized Docker configuration, security, and multi-stage builds. The workflow processes application type detected from @package.json, @setup.py, @go.mod, or @pom.xml, existing Docker configuration, dependencies, and port configuration to generate production-ready container images with minimal size, security hardening, and optimal runtime performance.
</task_objective>

<detailed_sequence_steps>
# Containerize Application - Detailed Sequence of Steps

## 1. Application Analysis and Containerization Strategy

Analyze application architecture and runtime requirements by examining package files (@package.json, @setup.py, @go.mod, @pom.xml) to determine runtime. Check for existing Docker configuration in @Dockerfile or @docker-compose.yml. Identify application dependencies from requirements files, package.json, or go.mod. Detect port configuration by searching for PORT, listen, or bind in source files. Check for build tools in @Makefile or build scripts. Determine optimal base image and runtime environment. Plan multi-stage build strategy for optimization. Assess security requirements and compliance needs.

## 2. Dockerfile Creation and Optimization

Create comprehensive Dockerfile with multi-stage builds separating build stage from runtime stage. Select minimal base images such as Alpine, distroless, or slim variants to reduce attack surface. Configure proper layer caching by ordering commands from least to most frequently changing. Implement security best practices including running as non-root user with USER directive, minimizing installed packages, removing unnecessary files and tools, and setting proper file permissions. Set up proper file ownership with COPY --chown flags.

## 3. Build Process Configuration

Configure .dockerignore file to exclude node_modules, .git, test files, documentation, and other unnecessary files. Set up build arguments (ARG) for version, environment, and configuration values. Implement build-time dependency installation with package manager caching. Configure application bundling and asset optimization including minification and compression. Set up proper build context to minimize transferred data.

## 4. Runtime Configuration

Configure application startup with proper ENTRYPOINT and CMD directives. Set up health checks using HEALTHCHECK instruction with appropriate intervals. Configure proper signal handling for graceful shutdown. Set up logging with proper output redirection to stdout/stderr. Configure environment-specific settings using ENV variables. Set resource limits and performance tuning parameters.

## 5. Security Hardening

Run application as non-root user by creating dedicated user and group. Configure security scanning and vulnerability assessment with tools like Snyk or Trivy. Implement secrets management using Docker secrets or external secret managers. Set up network security by exposing only necessary ports. Configure security policies including read-only root filesystem where possible and dropping unnecessary capabilities.

## 6. Docker Compose Configuration

Create docker-compose.yml for local development environment. Configure service dependencies and ordering with depends_on. Set up networking with custom networks and service discovery. Configure volume mounting for development hot-reload and data persistence. Set up environment variables and secrets using .env files. Create separate configurations for development vs production environments.

## 7. Container Orchestration Preparation

Prepare configurations for Kubernetes deployment including Deployment manifests with replicas and update strategy, Service definitions for internal and external access, and ConfigMap and Secret resources for configuration. Configure ingress rules for external access and load balancing. Set up persistent volumes and storage classes for stateful applications. Configure horizontal pod autoscaling based on CPU/memory or custom metrics.

## 8. Monitoring and Observability

Configure application metrics endpoints for Prometheus scraping. Set up logging aggregation by ensuring logs go to stdout/stderr. Configure distributed tracing integration with OpenTelemetry or Jaeger. Set up health check endpoints (/health, /ready, /startup). Configure performance monitoring with resource usage tracking.

## 9. CI/CD Integration

Configure automated Docker image building in CI/CD pipeline. Set up image scanning for vulnerabilities using security tools. Configure image registry authentication and push operations to Docker Hub, ECR, GCR, or private registry. Set up image tagging strategy with version tags, latest tag, and git SHA tags. Configure automated deployment pipelines triggered by new images.

## 10. Testing and Validation

Test container builds locally with docker build command. Validate container functionality with docker run and test exposed endpoints. Test deployment in different environments (dev, staging, production). Validate performance and resource utilization under load. Test backup and disaster recovery procedures for stateful containers. Create documentation for container deployment including build instructions, environment variables, volume mounts, and troubleshooting guides.

</detailed_sequence_steps>

</task>
