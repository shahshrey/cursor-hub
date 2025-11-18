<task name="Documentation Maintenance & Quality Assurance">

<task_objective>
Implement comprehensive documentation maintenance system with quality assurance, validation, and automated updates. Input: Existing documentation files, external links, images, and content structure. Processing: Systematic content audits, link validation, style checking, optimization, and automated synchronization. Output: Maintained documentation with comprehensive audit reports, validated links, consistent formatting, and automated update procedures.
</task_objective>

<detailed_sequence_steps>

## 1. Analyze Current Documentation Health

1. Count documentation files: `find . -name "*.md" -o -name "*.mdx" | wc -l`

2. Check last updates: `find . -name "*.md" -exec stat -f "%m %N" {} \; | sort -n | tail -5`

3. Count external links: `grep -r "http" --include="*.md" . | wc -l`

4. Count image references: `grep -r "!\[.*\]" --include="*.md" . | wc -l`

5. Identify documentation structure from @docs/ or other directories

## 2. Content Quality Audit System

1. Perform comprehensive file discovery and categorization

2. Analyze content freshness and detect aging documentation

3. Assess word count, readability, and structure

4. Identify missing sections and incomplete documentation

5. Track TODO/FIXME markers and create resolution plan

## 3. Link and Reference Validation

1. Monitor external link health with retry logic

2. Validate internal links and detect broken references

3. Verify image references and identify missing assets

4. Check cross-reference consistency

5. Generate automated link correction suggestions

## 4. Style and Consistency Checking

1. Validate Markdown syntax and formatting standards

2. Check heading hierarchy and structure consistency

3. Verify list formatting and emphasis style uniformity

4. Validate code block formatting and language specification

5. Ensure accessibility compliance (alt text, descriptive links)

## 5. Content Optimization and Enhancement

1. Generate table of contents for long documents

2. Update metadata and manage frontmatter

3. Correct common formatting issues

4. Validate spelling and grammar

5. Analyze readability and provide improvement suggestions

## 6. Automated Synchronization System

1. Track changes using Git-based monitoring

2. Integrate with version control and branch management

3. Generate automated commits with detailed change logs

4. Implement merge conflict resolution strategies

5. Establish rollback procedures for failed updates

## 7. Quality Assurance Reporting

1. Generate comprehensive audit reports with severity classifications

2. Categorize and prioritize issues

3. Track progress and maintenance metrics

4. Create automated notification systems for critical issues

5. Build dashboards for ongoing monitoring

## 8. Audit Configuration

1. Configure quality thresholds and validation rules

2. Integrate and enforce custom style guides

3. Apply platform-specific optimization settings

4. Integrate team collaboration workflow

5. Set up automated scheduling and recurring maintenance

## 9. Validation Processes

1. Implement multi-level validation with error categorization

2. Set up batch processing for large documentation sets

3. Optimize performance for comprehensive scans

4. Integrate with existing CI/CD pipelines

5. Configure real-time monitoring and alerting systems

## 10. Reporting and Analytics

1. Generate detailed maintenance reports with actionable insights

2. Analyze historical trends and track improvements

3. Calculate team productivity metrics and documentation health scores

4. Integrate with project management tools

5. Automate stakeholder communication

## 11. Maintenance System Architecture Deliverable

1. Create automated audit and validation framework

2. Build content optimization and enhancement tools

3. Establish quality assurance reporting infrastructure

4. Implement version control integration and synchronization

## 12. Validation and Quality Tools Deliverable

1. Develop link checking and reference validation systems

2. Build style consistency and accessibility compliance tools

3. Create content freshness and completeness analyzers

4. Implement automated correction and enhancement utilities

## 13. Reporting and Monitoring Deliverable

1. Generate comprehensive audit reports with prioritized recommendations

2. Build real-time monitoring dashboards and alert systems

3. Create progress tracking and maintenance history documentation

4. Integrate with team communication and project tools

## 14. Documentation and Procedures Deliverable

1. Write implementation guidelines and configuration instructions

2. Document team workflow integration and collaboration procedures

3. Create troubleshooting guides and maintenance best practices

4. Set up automated scheduling and recurring maintenance procedures

## 15. Integration with Existing Platforms

1. Implement with existing documentation platforms

2. Integrate with development workflows

3. Ensure scalability for large documentation sets

4. Maintain team collaboration capabilities

5. Uphold quality standards and accessibility compliance

</detailed_sequence_steps>

</task>
