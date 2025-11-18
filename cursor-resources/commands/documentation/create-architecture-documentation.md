<task name="Architecture Documentation Generator">

<task_objective>
Generate comprehensive architecture documentation with diagrams, ADRs, and interactive visualization. Input: Project structure, existing architecture files, services/containers configuration, and API definitions. Processing: Analyze system architecture, select documentation framework, document system context, create container/service architecture, document components and data flow, create ADRs, and automate documentation maintenance. Output: Comprehensive architecture documentation with C4 diagrams, architecture decision records, data models, security architecture, quality attributes documentation, and automated generation systems.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current Architecture Context

1. Review project structure: `find . -type f -name "*.json" -o -name "*.yaml" -o -name "*.toml" | head -5`

2. Check documentation at @docs/ or @README.md

3. Find architecture files: `find . -name "*architecture*" -o -name "*design*" -o -name "*.puml" | head -3`

4. Review services/containers at @docker-compose.yml or @k8s/

5. Locate API definitions: `find . -name "*api*" -o -name "*openapi*" -o -name "*swagger*" | head -3`

## 2. Architecture Analysis and Discovery

1. Analyze current system architecture and component relationships

2. Identify key architectural patterns and design decisions

3. Document system boundaries, interfaces, and dependencies

4. Assess data flow and communication patterns

5. Identify architectural debt and improvement opportunities

## 3. Architecture Documentation Framework

1. Choose appropriate documentation framework and tools:
   - **C4 Model**: Context, Containers, Components, Code diagrams
   - **Arc42**: Comprehensive architecture documentation template
   - **Architecture Decision Records (ADRs)**: Decision documentation
   - **PlantUML/Mermaid**: Diagram-as-code documentation
   - **Structurizr**: C4 model tooling and visualization
   - **Draw.io/Lucidchart**: Visual diagramming tools

## 4. System Context Documentation

1. Create high-level system context diagrams

2. Document external systems and integrations

3. Define system boundaries and responsibilities

4. Document user personas and stakeholders

5. Create system landscape and ecosystem overview

## 5. Container and Service Architecture

1. Document container/service architecture and deployment view

2. Create service dependency maps and communication patterns

3. Document deployment architecture and infrastructure

4. Define service boundaries and API contracts

5. Document data persistence and storage architecture

## 6. Component and Module Documentation

1. Create detailed component architecture diagrams

2. Document internal module structure and relationships

3. Define component responsibilities and interfaces

4. Document design patterns and architectural styles

5. Create code organization and package structure documentation

## 7. Data Architecture Documentation

1. Document data models and database schemas

2. Create data flow diagrams and processing pipelines

3. Document data storage strategies and technologies

4. Define data governance and lifecycle management

5. Create data integration and synchronization documentation

## 8. Security and Compliance Architecture

1. Document security architecture and threat model

2. Create authentication and authorization flow diagrams

3. Document compliance requirements and controls

4. Define security boundaries and trust zones

5. Create incident response and security monitoring documentation

## 9. Quality Attributes and Cross-Cutting Concerns

1. Document performance characteristics and scalability patterns

2. Create reliability and availability architecture documentation

3. Document monitoring and observability architecture

4. Define maintainability and evolution strategies

5. Create disaster recovery and business continuity documentation

## 10. Architecture Decision Records (ADRs)

1. Create comprehensive ADR template and process

2. Document historical architectural decisions and rationale

3. Create decision tracking and review process

4. Document trade-offs and alternatives considered

5. Set up ADR maintenance and evolution procedures

## 11. Documentation Automation and Maintenance

1. Set up automated diagram generation from code annotations

2. Configure documentation pipeline and publishing automation

3. Set up documentation validation and consistency checking

4. Create documentation review and approval process

5. Train team on architecture documentation practices and tools

6. Set up documentation versioning and change management

</detailed_sequence_steps>

</task>
