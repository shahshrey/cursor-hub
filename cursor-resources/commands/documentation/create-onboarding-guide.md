<task name="Developer Onboarding Guide Generator">

<task_objective>
Create comprehensive developer onboarding guide with environment setup, workflows, and interactive tutorials. Input: Project setup files, existing documentation, development tools, team structure, and CI/CD setup. Processing: Analyze onboarding requirements, create environment setup guide, document codebase and workflows, establish team communication procedures, curate learning resources, define first tasks, and implement feedback systems. Output: Comprehensive onboarding experience with environment setup instructions, project overview, development workflows, learning resources, progressive task assignments, security training, and feedback mechanisms tailored to role and project needs.
</task_objective>

<detailed_sequence_steps>

## 1. Assess Current Team Context

1. Review project setup from @package.json or @requirements.txt or @Cargo.toml

2. Check existing docs at @docs/ or @README.md

3. Find development tools: `find . -name ".env*" -o -name "docker-compose.yml" -o -name "Makefile" | head -3`

4. Review team structure at @CODEOWNERS or @.github/

5. Check CI/CD setup: `find .github/workflows -name "*.yml" 2>/dev/null | head -3`

## 2. Onboarding Requirements Analysis

1. Analyze current team structure and skill requirements

2. Identify key knowledge areas and learning objectives

3. Assess current onboarding challenges and pain points

4. Define onboarding timeline and milestone expectations

5. Document role-specific requirements and responsibilities

## 3. Development Environment Setup Guide

1. Create comprehensive development environment setup instructions

2. Document required tools, software, and system requirements

3. Provide step-by-step installation and configuration guides

4. Create environment validation and troubleshooting procedures

5. Set up automated environment setup scripts and tools

## 4. Project and Codebase Overview

1. Create high-level project overview and business context

2. Document system architecture and technology stack

3. Provide codebase structure and organization guide

4. Create code navigation and exploration guidelines

5. Document key modules, libraries, and frameworks used

## 5. Development Workflow Documentation

1. Document version control workflows and branching strategies

2. Create code review process and quality standards guide

3. Document testing practices and requirements

4. Provide deployment and release process overview

5. Create issue tracking and project management workflow guide

## 6. Team Communication and Collaboration

1. Document team communication channels and protocols

2. Create meeting schedules and participation guidelines

3. Provide team contact information and org chart

4. Document collaboration tools and access procedures

5. Create escalation procedures and support contacts

## 7. Learning Resources and Training Materials

1. Curate learning resources for project-specific technologies

2. Create hands-on tutorials and coding exercises

3. Provide links to documentation, wikis, and knowledge bases

4. Create video tutorials and screen recordings

5. Set up mentoring and buddy system procedures

## 8. First Tasks and Milestones

1. Create progressive difficulty task assignments

2. Define learning milestones and checkpoints

3. Provide "good first issues" and starter projects

4. Create hands-on coding challenges and exercises

5. Set up pair programming and shadowing opportunities

## 9. Security and Compliance Training

1. Document security policies and access controls

2. Create data handling and privacy guidelines

3. Provide compliance training and certification requirements

4. Document incident response and security procedures

5. Create security best practices and guidelines

## 10. Tools and Resources Access

1. Document required accounts and access requests

2. Create tool-specific setup and usage guides

3. Provide license and subscription information

4. Document VPN and network access procedures

5. Create troubleshooting guides for common access issues

## 11. Feedback and Continuous Improvement

1. Create onboarding feedback collection process

2. Set up regular check-ins and progress reviews

3. Document common questions and FAQ section

4. Create onboarding metrics and success tracking

5. Establish onboarding guide maintenance and update procedures

6. Set up new hire success monitoring and support systems

</detailed_sequence_steps>

</task>
