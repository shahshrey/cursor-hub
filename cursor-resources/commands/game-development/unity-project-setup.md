<task name="Unity Project Setup & Development Environment">

<task_objective>
Initialize a professional Unity game development project with industry-standard structure, essential packages, and platform-optimized configurations. The workflow will create a production-ready Unity project that scales from prototype to shipped game, following Unity's recommended patterns and industry best practices. Accepts project configuration via $ARGUMENTS (project-name, platform flags: --2d, --3d, --mobile, --vr, --console).
</task_objective>

<detailed_sequence_steps>
# Unity Project Setup - Detailed Sequence of Steps

## 1. Verify Unity Environment

1. Check current Unity installation:
   - Run: `unity-editor --version 2>/dev/null || echo "Unity Editor not found"`
   - Verify Unity Editor is accessible
   
2. Assess current workspace:
   - Get current directory: `pwd`
   - Check for existing Unity projects
   - Count available Unity packages: `find . -name "*.unitypackage" 2>/dev/null | wc -l`
   - Check Git status: `git status --porcelain 2>/dev/null | wc -l`
   - Gather system info: `system_profiler SPSoftwareDataType | grep "System Version" 2>/dev/null || uname -a`

3. Parse $ARGUMENTS to determine:
   - Project name
   - Project type (2D, 3D, hybrid)
   - Target platforms (mobile, VR, console, PC, WebGL)

## 2. Configure Project Type and Platforms

1. Present interactive options if not specified in $ARGUMENTS:
   
   **Project Type Selection:**
   - 2D Game
   - 3D Game
   - Mobile Game
   - VR/AR Game
   - Hybrid (2D/3D)
   
   **Target Platforms:**
   - PC (Windows/Mac/Linux)
   - Mobile (iOS/Android)
   - Console (PlayStation/Xbox/Nintendo)
   - WebGL
   - VR (Oculus/SteamVR)
   
   **Version Control:**
   - Git
   - Plastic SCM
   - Perforce
   - None
   
   **Additional Packages:**
   - TextMeshPro
   - Post Processing
   - Unity Ads
   - Unity Analytics
   - Unity Cloud Build
   - Custom package selection

2. Validate configuration choices for compatibility

3. Determine platform-specific optimizations needed

## 3. Create Professional Directory Structure

1. Create the following Assets structure:

   ```
   Assets/
   ├── _Project/
   │   ├── Scripts/
   │   │   ├── Managers/
   │   │   ├── Player/
   │   │   ├── UI/
   │   │   ├── Gameplay/
   │   │   └── Utilities/
   │   ├── Art/
   │   │   ├── Textures/
   │   │   ├── Materials/
   │   │   ├── Models/
   │   │   └── Animations/
   │   ├── Audio/
   │   │   ├── Music/
   │   │   ├── SFX/
   │   │   └── Voice/
   │   ├── Prefabs/
   │   │   ├── Characters/
   │   │   ├── Environment/
   │   │   ├── UI/
   │   │   └── Effects/
   │   ├── Scenes/
   │   │   ├── Development/
   │   │   ├── Production/
   │   │   └── Testing/
   │   ├── Settings/
   │   │   ├── Input/
   │   │   ├── Rendering/
   │   │   └── Audio/
   │   └── Resources/
   ├── Plugins/
   ├── StreamingAssets/
   └── Editor/
       ├── Scripts/
       └── Resources/
   ```

2. Create all directories using appropriate file system operations

3. Add .gitkeep files to empty directories to preserve structure in version control

## 4. Install Essential Unity Packages

1. Install core packages via Unity Package Manager:

   - Universal Render Pipeline (URP)
   - Input System
   - Cinemachine
   - ProBuilder
   - Timeline
   - Addressables
   - Unity Analytics
   - Version Control (if available)

2. Install user-selected additional packages

3. Verify all package installations completed successfully

4. Configure package settings based on project type and platforms

## 5. Configure Project Settings

1. Set up optimized quality settings for target platforms:
   - Create quality tiers (Low, Medium, High, Ultra)
   - Configure per-platform quality defaults
   - Set texture quality, shadow settings, anti-aliasing

2. Configure Input System:
   - Create InputActions.inputactions file
   - Set up common control schemes (Keyboard/Mouse, Gamepad, Touch)
   - Configure platform-specific input mappings

3. Optimize Physics settings:
   - Set appropriate fixed timestep
   - Configure layer collision matrix
   - Adjust physics iteration counts

4. Configure Time and Rendering:
   - Set target frame rates per platform
   - Configure VSync settings
   - Optimize rendering paths

5. Set up Build Settings:
   - Add target platforms
   - Configure platform-specific build options
   - Set up build compression and optimization

## 6. Create Development Tools and Configuration

1. Create code formatting rules:
   - Generate .editorconfig with Unity C# standards
   - Set up consistent code style rules

2. Configure version control:
   - Initialize Git repository (if selected)
   - Add Unity-optimized .gitignore
   - Configure Git LFS for large assets (.png, .jpg, .fbx, .unitypackage, etc.)
   - Create branching strategy documentation

3. Set up Assembly Definition files:
   - Create asmdef for main scripts
   - Create asmdef for editor scripts
   - Configure dependencies for modular compilation

4. Generate custom editor scripts for workflow improvement:
   - Project setup window
   - Quick scene setup tools
   - Asset validation utilities

## 7. Generate Core Game Scripts

1. Create essential manager scripts:

   - `GameManager.cs` - Main game controller with singleton pattern
   - `SceneLoader.cs` - Scene management and loading system
   - `AudioManager.cs` - Audio system controller with pooling
   - `InputManager.cs` - Input handling system wrapper
   - `UIManager.cs` - UI system manager
   - `SaveSystem.cs` - Save/load functionality with serialization

2. Create editor tool scripts:
   - `ProjectSetupWindow.cs` - Custom editor window
   - `SceneQuickStart.cs` - Scene setup automation
   - `AssetValidator.cs` - Asset validation tools
   - `BuildAutomation.cs` - Build pipeline helpers

3. Add proper namespaces, documentation, and error handling to all scripts

## 8. Generate Configuration Files

1. Create optimized configuration assets:
   - `ProjectSettings.asset` - Project-wide settings
   - `QualitySettings.asset` - Multi-platform quality tiers
   - `InputActions.inputactions` - Input system configuration
   - Assembly Definition files for modular compilation

2. Generate platform-specific configurations:
   - Mobile: Touch input, performance optimization, battery settings
   - PC: Multi-resolution support, graphics options
   - Console: Platform input mapping, achievement integration
   - VR: VR-specific input and rendering settings

## 9. Create Documentation

1. Generate comprehensive project documentation:
   - `README.md` - Project overview, setup instructions, and quick start guide
   - `CONTRIBUTING.md` - Development guidelines and coding standards
   - `CHANGELOG.md` - Version history template
   - `API_REFERENCE.md` - Code documentation template
   - `AGENTS.md` - AI assistant context about project structure and conventions

2. Include platform-specific documentation sections

## 10. Apply Platform-Specific Optimizations

1. **For Mobile Projects:**
   - Configure touch input system
   - Set performance optimization settings (texture compression, shader variants)
   - Optimize for battery usage
   - Set up app store submission configurations

2. **For PC Projects:**
   - Enable multi-resolution support
   - Configure keyboard/mouse input
   - Create graphics options menu template
   - Set up Windows/Mac/Linux build configurations

3. **For Console Projects:**
   - Configure platform-specific input mapping
   - Set up achievement/trophy integration templates
   - Configure online services
   - Add certification requirement documentation

4. **For VR Projects:**
   - Enable VR SDK integration
   - Configure VR-specific rendering settings
   - Set up room-scale configuration
   - Add comfort settings (teleport, smooth locomotion)

## 11. Finalize and Verify Setup

1. Run validation checks:
   - Verify all directories exist
   - Confirm all packages installed successfully
   - Check all scripts compile without errors
   - Validate configuration files are properly formatted

2. Create initial Git commit (if version control selected):
   - Stage all generated files
   - Create initial commit with descriptive message
   - Verify .gitignore is working correctly

3. Generate post-setup checklist for user:
   - [ ] Review and adjust quality settings for target platforms
   - [ ] Configure input actions for specific game controls
   - [ ] Set up build configurations for all target platforms
   - [ ] Review folder structure and rename as needed
   - [ ] Configure version control and verify initial commit
   - [ ] Set up continuous integration if required
   - [ ] Configure analytics and crash reporting
   - [ ] Review and customize coding standards
   - [ ] Test build process for each target platform

4. Present summary to user:
   - Location of generated project
   - List of installed packages
   - Configured platforms
   - Next steps and recommendations
   - Links to relevant documentation

</detailed_sequence_steps>

<expected_output>
A production-ready Unity project with:
- Industry-standard directory structure
- Essential Unity packages installed and configured
- Core game systems (GameManager, SceneLoader, AudioManager, etc.)
- Platform-optimized settings and configurations
- Development tools and editor scripts
- Version control setup with Git LFS
- Comprehensive documentation
- Assembly definitions for modular compilation
- Platform-specific optimizations applied
</expected_output>

<platform_specific_notes>

### Mobile Optimizations
- Touch input configuration with gesture support
- Performance optimization settings (texture compression, LOD groups)
- Battery usage optimization (reduced physics iterations, lower quality defaults)
- App store submission setup with proper icons and metadata

### PC Optimizations
- Multi-resolution support with aspect ratio handling
- Keyboard/mouse input setup with remapping support
- Graphics options menu template (quality, resolution, fullscreen)
- Platform-specific build configurations (Windows, Mac, Linux)

### Console Optimizations
- Platform-specific input mapping for controllers
- Achievement/trophy integration setup templates
- Online services configuration scaffolding
- Certification requirement templates and checklists

### VR Optimizations
- VR SDK integration (Oculus, SteamVR)
- VR-specific rendering optimizations (single-pass instanced, foveated rendering)
- Room-scale and guardian system setup
- Comfort settings implementation (teleport, snap turning, vignette)


</platform_specific_notes>

</task>