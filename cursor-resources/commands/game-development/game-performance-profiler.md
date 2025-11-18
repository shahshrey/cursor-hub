<task name="Game Performance Analysis & Optimization">

<task_objective>
Analyze game performance bottlenecks and generate optimization recommendations across multiple platforms. This workflow processes performance data from game engines (Unity/Unreal/Godot) to identify rendering, memory, CPU, and platform-specific issues, outputting comprehensive audit reports with prioritized optimization strategies and monitoring implementations. Accepts $ARGUMENTS for profile type: --fps, --memory, --rendering, or --comprehensive analysis.
</task_objective>

<detailed_sequence_steps>
# Game Performance Analysis & Optimization - Detailed Sequence of Steps

## 1. Gather Current Performance Context

1. Detect game engine:
   - Check @package.json for engine configuration
   - Detect Unity/Unreal/Godot project files

2. Assess platform targets:
   - Run: `find . -name "*.pbxproj" -o -name "*.gradle" -o -name "*.vcxproj" | head -3`
   - Identify target platforms from build configurations

3. Analyze asset pipeline:
   - Count game assets: `find . -name "*.meta" -o -name "*.asset" | wc -l`
   - Review asset organization and structure

4. Review build configurations:
   - Count platform configurations: `grep -r "BuildTarget\|Platform" . 2>/dev/null | wc -l`
   - Identify multi-platform setup requirements

5. Locate existing performance logs:
   - Find performance data: `find . -name "*profile*" -o -name "*perf*" | head -5`
   - Review existing profiling information

## 2. Analyze Frame Rate & Rendering Performance

1. Analyze draw calls and batching efficiency:
   - Review rendering statistics
   - Identify batching opportunities
   - Calculate draw call reduction potential

2. Identify overdraw and fillrate bottlenecks:
   - Analyze pixel overdraw patterns
   - Identify fillrate limitations
   - Review transparency and alpha blending usage

3. Review shader complexity and optimization opportunities:
   - Audit shader instruction counts
   - Identify expensive shader operations
   - Review platform-specific shader variants

4. Evaluate mesh and texture optimization potential:
   - Analyze mesh complexity and vertex counts
   - Review texture resolution and compression
   - Identify LOD implementation opportunities

5. Check lighting and shadow rendering performance:
   - Review lighting setup complexity
   - Analyze shadow rendering costs
   - Evaluate real-time vs. baked lighting balance

## 3. Analyze Memory Usage

1. Review memory allocation patterns and potential leaks:
   - Track memory allocations over time
   - Identify memory leak candidates
   - Review garbage collection frequency and impact

2. Analyze texture memory usage and compression opportunities:
   - Calculate texture memory footprint
   - Identify compression optimization opportunities
   - Review texture streaming implementation

3. Evaluate audio memory optimization suggestions:
   - Analyze audio asset memory usage
   - Review audio compression settings
   - Identify streaming vs. preload opportunities

4. Perform object pooling and garbage collection analysis:
   - Identify frequent allocation/deallocation patterns
   - Review object pooling implementation
   - Analyze GC pressure and optimization opportunities

5. Evaluate platform-specific memory constraints:
   - Review target platform memory budgets
   - Identify platform-specific memory issues
   - Validate memory usage against platform limits

## 4. Profile CPU Performance

1. Identify script execution bottlenecks:
   - Profile hot code paths
   - Identify expensive operations in game logic
   - Review update loop efficiency

2. Analyze physics simulation optimization opportunities:
   - Review physics calculation costs
   - Identify collision detection bottlenecks
   - Evaluate physics timestep settings

3. Perform AI and pathfinding performance analysis:
   - Profile AI decision-making systems
   - Analyze pathfinding performance
   - Review AI update frequency optimization

4. Review animation system efficiency:
   - Analyze animation evaluation costs
   - Review animation layer complexity
   - Identify animation optimization opportunities

5. Provide threading and parallelization recommendations:
   - Identify parallelization opportunities
   - Review multi-threading implementation
   - Analyze thread synchronization overhead

## 5. Apply Platform-Specific Optimization

1. Optimize for mobile platforms:
   - Address battery and thermal throttling considerations
   - Optimize for mobile GPU architectures
   - Reduce power consumption through rendering optimizations

2. Apply console-specific optimization guidelines:
   - Optimize for console hardware specifications
   - Review platform-specific rendering features
   - Ensure compliance with platform performance requirements

3. Implement PC hardware scaling recommendations:
   - Create scalable quality settings
   - Optimize for various hardware configurations
   - Implement dynamic quality adjustment

4. Apply VR performance requirements and optimizations:
   - Ensure consistent frame rates for VR comfort
   - Optimize for VR rendering techniques
   - Reduce latency for head tracking responsiveness

5. Address web/WebGL specific performance considerations:
   - Optimize for browser limitations
   - Reduce download size and load times
   - Optimize for JavaScript/WebGL constraints

## 6. Generate Performance Audit Report

1. Document current performance metrics and benchmarks:
   - Compile baseline performance measurements
   - Document frame rates across target platforms
   - Record memory usage statistics

2. List identified bottlenecks with severity ratings:
   - Categorize issues by severity (critical, high, medium, low)
   - Prioritize bottlenecks by performance impact
   - Document reproduction steps for each issue

3. Provide platform-specific performance analysis:
   - Create per-platform performance summaries
   - Identify platform-specific optimization needs
   - Document platform performance gaps

## 7. Create Optimization Recommendations

1. Generate prioritized optimization suggestions:
   - Order recommendations by impact and effort
   - Provide clear optimization strategies
   - Include expected performance improvements

2. Assess implementation difficulty and impact:
   - Estimate implementation time for each optimization
   - Calculate potential performance gains
   - Identify quick wins vs. long-term improvements

3. Provide code and asset optimization guidelines:
   - Document specific code optimization techniques
   - Create asset optimization recommendations
   - Include best practices and examples

## 8. Configure Monitoring Setup

1. Implement performance monitoring:
   - Set up automated performance tracking
   - Configure performance data collection
   - Integrate monitoring into development workflow

2. Configure key metrics tracking:
   - Define critical performance metrics
   - Set up metric collection systems
   - Create performance dashboards

3. Set up automated performance regression detection:
   - Configure performance baselines
   - Implement automated regression testing
   - Create alerting for performance degradations

## 9. Define Testing Strategy

1. Establish performance testing procedures:
   - Create standard performance test scenarios
   - Define performance acceptance criteria
   - Document performance testing workflows

2. Create target device testing recommendations:
   - Identify representative device configurations
   - Create device testing matrix
   - Establish device lab setup

3. Configure continuous performance monitoring setup:
   - Integrate performance testing into CI/CD
   - Set up automated performance benchmarking
   - Create performance trend tracking

</detailed_sequence_steps>

</task>
