<task name="Game Asset Pipeline & Processing System">

<task_objective>
Build automated game asset processing pipelines with optimization, validation, and multi-platform delivery systems. This workflow creates comprehensive asset management infrastructure that handles import validation, multi-platform optimization, build integration, and quality assurance for textures, 3D models, audio, and animations. Accepts $ARGUMENTS for pipeline type: --art, --audio, --models, --textures, or --comprehensive asset processing.
</task_objective>

<detailed_sequence_steps>
# Game Asset Pipeline & Processing System - Detailed Sequence of Steps

## 1. Assess Current Asset Environment

1. Count project assets:
   - Run: `find . -name "*.png" -o -name "*.fbx" -o -name "*.wav" -o -name "*.mp3" | wc -l`
   - Catalog asset types and quantities
   - Review asset organization structure

2. Analyze asset sizes:
   - Check Assets folder: `du -sh Assets/ 2>/dev/null || du -sh assets/ 2>/dev/null || echo "No assets folder found"`
   - Identify large asset files
   - Calculate total asset footprint

3. Verify build tools availability:
   - Check Blender: `which blender`
   - Check FFmpeg: `which ffmpeg`
   - Check ImageMagick: `which imagemagick`
   - Document available processing tools

4. Identify platform targets:
   - Review @ProjectSettings/ProjectSettings.asset
   - Detect from build configurations
   - Determine platform-specific requirements

5. Assess version control setup:
   - Count LFS-tracked files: `git lfs ls-files | wc -l`
   - Review Git LFS configuration
   - Verify large file handling

## 2. Implement Asset Import & Validation

1. Create automated asset format validation and standardization:
   - Define supported asset formats
   - Implement format validation checks
   - Create format conversion workflows

2. Set up quality assurance checks:
   - Validate texture resolution requirements
   - Check model complexity limits
   - Verify asset naming conventions

3. Implement asset naming convention enforcement:
   - Define naming standards
   - Create validation rules
   - Implement automatic renaming suggestions

4. Create metadata extraction and tagging system:
   - Extract asset metadata
   - Implement tagging taxonomy
   - Create searchable asset database

5. Set up source asset backup and version control integration:
   - Configure asset versioning
   - Implement backup workflows
   - Integrate with version control systems

## 3. Implement Multi-Platform Optimization

1. Configure platform-specific texture compression:
   - Set up ASTC compression for mobile
   - Configure DXT compression for PC/console
   - Implement format selection logic

2. Create model LOD generation and optimization:
   - Implement automatic LOD generation
   - Configure LOD reduction ratios
   - Validate LOD transitions

3. Set up audio format conversion and compression:
   - Configure platform audio formats
   - Implement compression strategies
   - Optimize audio file sizes

4. Configure shader variant compilation for target platforms:
   - Generate platform shader variants
   - Optimize shader compilation
   - Reduce shader build times

5. Implement memory budget validation per platform:
   - Define platform memory budgets
   - Track asset memory usage
   - Alert on budget violations

## 4. Integrate Asset Processing with Build Pipeline

1. Set up automated asset processing during build pipeline:
   - Integrate asset processing into build steps
   - Configure build-time optimizations
   - Implement asset bundling

2. Create incremental processing for modified assets only:
   - Track asset modifications
   - Skip unchanged assets
   - Optimize processing time

3. Implement asset bundle generation and packaging:
   - Create asset bundle configurations
   - Generate platform bundles
   - Implement bundle loading systems

4. Set up dependency tracking and resolution:
   - Map asset dependencies
   - Resolve missing references
   - Validate dependency integrity

5. Configure build-time asset validation and error reporting:
   - Run validation checks during builds
   - Report asset errors
   - Prevent invalid assets in builds

## 5. Implement Quality Assurance

1. Set up visual diff comparison for texture changes:
   - Compare texture versions
   - Highlight visual differences
   - Track quality degradation

2. Create model geometry validation and optimization:
   - Validate mesh topology
   - Check for optimization issues
   - Report geometry problems

3. Implement audio quality and compression ratio analysis:
   - Measure audio quality
   - Calculate compression efficiency
   - Balance quality and file size

4. Set up performance impact assessment for new assets:
   - Test asset performance impact
   - Measure rendering costs
   - Validate memory usage

5. Create automated regression testing for asset changes:
   - Test asset updates
   - Detect breaking changes
   - Validate asset compatibility

## 6. Create Texture Processing Pipeline

1. Implement import validation and format standardization:
   - Validate texture formats
   - Convert to standard formats
   - Normalize color spaces

2. Set up automatic mipmap generation and optimization:
   - Generate mipmap chains
   - Optimize mipmap quality
   - Configure mipmap settings

3. Configure platform-specific compression with quality settings:
   - Apply platform compression
   - Balance quality and size
   - Validate compression results

4. Implement memory usage estimation and optimization:
   - Calculate texture memory costs
   - Suggest optimization opportunities
   - Track memory budgets

5. Set up integration with sprite atlasing and texture streaming:
   - Configure sprite atlas generation
   - Implement texture streaming
   - Optimize texture loading

## 7. Create 3D Model Processing Pipeline

1. Implement import validation and mesh optimization:
   - Validate model imports
   - Optimize mesh topology
   - Remove redundant data

2. Set up automatic LOD generation with configurable reduction ratios:
   - Generate LOD levels
   - Configure reduction settings
   - Validate LOD quality

3. Configure bone and animation optimization:
   - Optimize bone hierarchies
   - Reduce animation data
   - Validate animation quality

4. Implement texture coordinate validation and optimization:
   - Check UV mapping
   - Optimize UV layouts
   - Validate texture assignments

5. Set up collision mesh generation and validation:
   - Generate collision meshes
   - Simplify collision geometry
   - Validate collision accuracy

## 8. Create Audio Processing Pipeline

1. Implement format standardization and quality validation:
   - Standardize audio formats
   - Validate audio quality
   - Check sample rates

2. Configure platform-specific compression with bitrate optimization:
   - Apply platform audio compression
   - Optimize bitrates
   - Balance quality and size

3. Set up audio asset tagging and categorization:
   - Tag audio assets
   - Categorize by type
   - Enable audio search

4. Implement streaming vs. loaded-in-memory recommendations:
   - Analyze audio usage patterns
   - Recommend loading strategies
   - Optimize memory usage

5. Set up audio occlusion and spatialization preparation:
   - Prepare spatial audio data
   - Configure occlusion parameters
   - Validate 3D audio setup

## 9. Create Animation Processing Pipeline

1. Implement animation clip optimization and compression:
   - Compress animation data
   - Remove redundant keyframes
   - Optimize animation memory

2. Set up keyframe reduction and smoothing:
   - Reduce keyframe count
   - Smooth animation curves
   - Maintain animation quality

3. Configure bone hierarchy validation and optimization:
   - Validate bone structures
   - Optimize bone counts
   - Check hierarchy integrity

4. Implement animation event validation and documentation:
   - Validate animation events
   - Document event usage
   - Check event timing

5. Set up runtime performance impact analysis:
   - Measure animation costs
   - Profile animation systems
   - Optimize animation performance

## 10. Generate Asset Pipeline Configuration

1. Create platform-specific processing rules and settings:
   - Define platform rules
   - Configure processing settings
   - Document platform requirements

2. Set up quality thresholds and validation criteria:
   - Define quality standards
   - Create validation rules
   - Implement quality gates

3. Configure automated workflow triggers and conditions:
   - Set up trigger conditions
   - Configure automation workflows
   - Implement event-driven processing

## 11. Implement Asset Pipeline

1. Create asset processing scripts and automation tools:
   - Write processing scripts
   - Build automation tools
   - Integrate with existing workflows

2. Set up build system integration and deployment:
   - Integrate with build systems
   - Configure deployment pipelines
   - Automate asset delivery

3. Configure version control hooks and asset tracking:
   - Set up VCS hooks
   - Implement asset tracking
   - Monitor asset changes

## 12. Set Up Monitoring & Reporting

1. Create asset processing performance metrics:
   - Track processing times
   - Monitor system performance
   - Optimize processing efficiency

2. Generate quality assurance reports and validation results:
   - Create QA reports
   - Document validation results
   - Track quality metrics

3. Produce platform compatibility and optimization reports:
   - Report platform status
   - Document optimizations
   - Track compatibility issues

## 13. Create Documentation & Guidelines

1. Write asset creation guidelines for artists and designers:
   - Document best practices
   - Create style guides
   - Provide examples

2. Create pipeline usage documentation and troubleshooting:
   - Document pipeline usage
   - Create troubleshooting guides
   - Provide support resources

3. Generate performance impact guidelines and best practices:
   - Document performance guidelines
   - Share optimization tips
   - Provide performance targets

</detailed_sequence_steps>

</task>
