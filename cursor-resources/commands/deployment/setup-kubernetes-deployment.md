<task name="Setup Kubernetes Deployment">

<task_objective>
Configure comprehensive Kubernetes deployment with manifests, security, scaling, and production best practices. The workflow processes application type and deployment requirements to generate a production-ready Kubernetes deployment configuration with proper resource management, security policies, and operational procedures.
</task_objective>

<detailed_sequence_steps>
# Setup Kubernetes Deployment - Detailed Sequence of Steps

## 1. Kubernetes Architecture Planning

Analyze application architecture and deployment requirements by examining:
- @package.json or @Dockerfile to detect containerization readiness
- Existing K8s config using !`find . -name "*.yaml" -o -name "*.yml" | grep -E "(k8s|kubernetes|deployment|service)" | head -3`
- Cluster access via !`kubectl cluster-info 2>/dev/null | head -2 || echo "No cluster access"`
- Container registry configuration in @docker-compose.yml
- Resource requirements based on application type

Define resource requirements (CPU, memory, storage, network), plan namespace organization and multi-tenancy strategy, assess high availability and disaster recovery requirements, and define scaling strategies and performance requirements.

## 2. Cluster Setup and Configuration

Set up Kubernetes cluster (managed or self-hosted), configure cluster networking and CNI plugin, set up cluster storage classes and persistent volumes, configure cluster security policies and RBAC, and set up cluster monitoring and logging infrastructure.

## 3. Application Containerization

Ensure application is properly containerized, optimize container images for Kubernetes deployment, configure multi-stage builds and security scanning, set up container registry and image management, and configure image pull policies and secrets.

## 4. Kubernetes Manifest Creation

Create Deployment manifests with proper resource limits, set up Service manifests for internal and external communication, configure ConfigMaps and Secrets for configuration management, create PersistentVolumeClaims for data storage, and set up NetworkPolicies for security and isolation.

## 5. Load Balancing and Ingress

Configure Ingress controllers and routing rules, set up SSL/TLS termination and certificate management, configure load balancing strategies and session affinity, set up external DNS and domain management, and configure traffic management and canary deployments.

## 6. Auto-scaling Configuration

Set up Horizontal Pod Autoscaler (HPA) based on metrics, configure Vertical Pod Autoscaler (VPA) for resource optimization, set up Cluster Autoscaler for node scaling, configure custom metrics and scaling policies, and set up resource quotas and limits.

## 7. Health Checks and Monitoring

Configure liveness and readiness probes, set up startup probes for slow-starting applications, configure health check endpoints and monitoring, set up application metrics collection, and configure alerting and notification systems.

## 8. Security and Compliance

Configure Pod Security Standards and policies, set up network segmentation and security policies, configure service accounts and RBAC permissions, set up secret management and rotation, and configure security scanning and compliance monitoring.

## 9. CI/CD Integration

Set up automated Kubernetes deployment pipelines, configure GitOps workflows with ArgoCD or Flux, set up automated testing in Kubernetes environments, configure blue-green and canary deployment strategies, and set up rollback and disaster recovery procedures.

## 10. Operations and Maintenance

Set up cluster maintenance and update procedures, configure backup and disaster recovery strategies, set up cost optimization and resource management, create operational runbooks and troubleshooting guides, train team on Kubernetes operations and best practices, and set up cluster lifecycle management and governance.

</detailed_sequence_steps>

</task>
