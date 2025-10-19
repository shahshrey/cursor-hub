<task name="Audit Accessibility">

<task_objective>
Audit and improve accessibility in Svelte/SvelteKit applications, ensuring WCAG compliance and inclusive user experiences. Input: Application codebase, components, routes, and existing accessibility implementation. Process: Run automated accessibility tests, perform manual audits with assistive technologies, check WCAG 2.1 AA/AAA compliance, identify accessibility violations, prioritize issues by severity, and implement fixes with proper ARIA attributes and semantic HTML. Output: Comprehensive accessibility audit report with identified issues and severity ratings, implemented fixes for all critical and high-priority issues, WCAG compliance checklist, accessibility test suite, and documentation of accessibility improvements.
</task_objective>

<detailed_sequence_steps>
# Audit Accessibility - Detailed Sequence of Steps

## 1. Set Up Accessibility Testing Tools

1. Install accessibility testing tools:
   ```bash
   npm install -D @axe-core/playwright axe-core
   ```

2. Install Storybook a11y addon if using Storybook:
   ```bash
   npm install -D @storybook/addon-a11y
   ```

3. Install browser extensions for manual testing:
   - axe DevTools
   - WAVE
   - Lighthouse

4. Verify Svelte's built-in a11y warnings are enabled (default).

## 2. Run Automated Accessibility Scan

1. Create accessibility test file `tests/a11y.spec.ts`:
   ```typescript
   import { test, expect } from '@playwright/test';
   import AxeBuilder from '@axe-core/playwright';
   
   test.describe('Accessibility', () => {
     test('homepage should not have accessibility violations', async ({ page }) => {
       await page.goto('/');
       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
       expect(accessibilityScanResults.violations).toEqual([]);
     });
   });
   ```

2. Run accessibility tests:
   ```bash
   npm run test:e2e -- a11y.spec.ts
   ```

3. Review axe-core output for violations:
   - Critical violations
   - Serious violations
   - Moderate violations
   - Minor violations

4. Generate accessibility report in HTML format.

## 3. Perform Manual Keyboard Navigation Audit

1. Test keyboard navigation through entire application:
   - Tab through all interactive elements
   - Verify focus order is logical
   - Check focus indicators are visible
   - Test Shift+Tab for reverse navigation

2. Check keyboard shortcuts:
   - Escape to close modals/dialogs
   - Enter/Space to activate buttons
   - Arrow keys for navigation where appropriate
   - Home/End keys for lists/menus

3. Document keyboard navigation issues:
   ```
   - Modal cannot be closed with Escape key
   - Skip link not present
   - Focus lost after dropdown closes
   - Tab order illogical on checkout page
   ```

4. Test keyboard traps:
   - Modal dialogs should trap focus
   - Dropdowns should return focus on close
   - No unintentional keyboard traps

## 4. Test with Screen Readers

1. Test with NVDA (Windows) or VoiceOver (Mac):
   - Navigate through pages
   - Verify all content is announced
   - Check landmarks are properly identified
   - Test form labels and error messages

2. Verify heading structure:
   - Use h1 for main page heading (only one per page)
   - Use h2-h6 for subsections (don't skip levels)
   - Check heading hierarchy is logical

3. Check image alternatives:
   - All images have alt text
   - Decorative images have empty alt=""
   - Complex images have detailed descriptions

4. Document screen reader issues:
   ```
   - Button announces as "unlabeled button"
   - Image missing alt text
   - Form error not announced
   - Dynamic content changes not announced
   ```

## 5. Analyze Color Contrast

1. Check color contrast ratios using browser tools:
   - Normal text: minimum 4.5:1 (WCAG AA)
   - Large text: minimum 3:1 (WCAG AA)
   - UI components: minimum 3:1

2. Identify low contrast issues:
   ```
   - CTA button: 2.8:1 (fails WCAG AA)
   - Navigation links: 3.2:1 (passes AA, fails AAA)
   - Placeholder text: 2.1:1 (fails)
   ```

3. Test in different color modes:
   - Light mode
   - Dark mode
   - High contrast mode

4. Check for color-only information:
   - Don't rely on color alone to convey meaning
   - Add icons or text labels alongside color

## 6. Review Semantic HTML Usage

1. Audit use of semantic elements:
   ```svelte
   <!-- Bad: Non-semantic -->
   <div onclick={handleClick}>Click me</div>
   
   <!-- Good: Semantic -->
   <button onclick={handleClick}>Click me</button>
   ```

2. Check proper landmark usage:
   - `<header>` for page header
   - `<nav>` for navigation
   - `<main>` for main content (one per page)
   - `<aside>` for complementary content
   - `<footer>` for page footer

3. Verify form structure:
   ```svelte
   <!-- Good: Proper form structure -->
   <form>
     <label for="email">Email Address</label>
     <input 
       id="email"
       type="email"
       required
       aria-describedby="email-error"
     />
     {#if errors.email}
       <span id="email-error" role="alert">
         {errors.email}
       </span>
     {/if}
   </form>
   ```

4. Check list usage:
   - Use `<ul>`/`<ol>` for lists
   - Use `<dl>` for definition lists
   - Don't use divs when lists are semantic

## 7. Audit ARIA Implementation

1. Check ARIA label usage:
   ```svelte
   <!-- Icon buttons need labels -->
   <button aria-label="Close dialog">
     <CloseIcon />
   </button>
   
   <!-- Provide alternative text -->
   <nav aria-label="Main navigation">
     <!-- nav content -->
   </nav>
   ```

2. Review ARIA roles:
   ```svelte
   <!-- Use roles when semantic HTML not sufficient -->
   <div role="alert">Error: Form submission failed</div>
   <div role="dialog" aria-modal="true">
     <!-- dialog content -->
   </div>
   ```

3. Check ARIA states and properties:
   ```svelte
   <button aria-expanded={isOpen} aria-controls="menu">
     Menu
   </button>
   <div id="menu" aria-hidden={!isOpen}>
     <!-- menu items -->
   </div>
   ```

4. Verify ARIA best practices:
   - Prefer semantic HTML over ARIA
   - Don't override semantic HTML with ARIA
   - Ensure ARIA relationships are valid

## 8. Test Focus Management

1. Check focus indicators are visible:
   ```css
   /* Ensure visible focus styles */
   button:focus-visible {
     outline: 2px solid blue;
     outline-offset: 2px;
   }
   
   /* Don't remove outlines without replacement */
   ```

2. Test focus management in modals:
   ```svelte
   <script>
     import { onMount } from 'svelte';
     
     let dialogElement;
     let previouslyFocused;
     
     onMount(() => {
       previouslyFocused = document.activeElement;
       dialogElement.focus();
       
       return () => {
         previouslyFocused?.focus();
       };
     });
   </script>
   
   <dialog bind:this={dialogElement} tabindex="-1">
     <!-- dialog content -->
   </dialog>
   ```

3. Implement skip links:
   ```svelte
   <a href="#main" class="skip-link">
     Skip to main content
   </a>
   
   <style>
     .skip-link {
       position: absolute;
       top: -40px;
       left: 0;
       z-index: 100;
     }
     
     .skip-link:focus {
       top: 0;
     }
   </style>
   ```

4. Test focus order is logical and intuitive.

## 9. Review Dynamic Content Handling

1. Implement live regions for dynamic updates:
   ```svelte
   <div role="status" aria-live="polite" aria-atomic="true">
     {#if loading}
       Loading...
     {:else if error}
       Error: {error}
     {:else}
       Data loaded successfully
     {/if}
   </div>
   ```

2. Use aria-live appropriately:
   - `aria-live="polite"`: Announce when user is idle
   - `aria-live="assertive"`: Announce immediately
   - `aria-atomic="true"`: Read entire region on change

3. Announce route changes:
   ```svelte
   <script>
     import { page } from '$app/stores';
     
     $: if (browser) {
       announcePageChange($page.url.pathname);
     }
     
     function announcePageChange(path) {
       const announcement = document.getElementById('route-announcer');
       announcement.textContent = `Navigated to ${path}`;
     }
   </script>
   
   <div id="route-announcer" role="status" aria-live="assertive" class="sr-only">
   </div>
   ```

4. Handle loading states accessibly:
   ```svelte
   <button disabled={loading} aria-busy={loading}>
     {#if loading}
       <span aria-hidden="true">⏳</span>
       Loading...
     {:else}
       Submit
     {/if}
   </button>
   ```

## 10. Audit Form Accessibility

1. Ensure all inputs have labels:
   ```svelte
   <!-- Explicit labels -->
   <label for="username">Username</label>
   <input id="username" type="text" />
   
   <!-- Or implicit -->
   <label>
     Username
     <input type="text" />
   </label>
   ```

2. Associate error messages with inputs:
   ```svelte
   <label for="email">Email</label>
   <input 
     id="email"
     type="email"
     aria-invalid={!!errors.email}
     aria-describedby={errors.email ? 'email-error' : undefined}
   />
   {#if errors.email}
     <span id="email-error" role="alert">
       {errors.email}
     </span>
   {/if}
   ```

3. Provide helpful instructions:
   ```svelte
   <label for="password">Password</label>
   <input 
     id="password"
     type="password"
     aria-describedby="password-help"
   />
   <span id="password-help">
     Must be at least 8 characters with one number
   </span>
   ```

4. Group related inputs:
   ```svelte
   <fieldset>
     <legend>Shipping Address</legend>
     <!-- address fields -->
   </fieldset>
   ```

## 11. Test Animation and Motion

1. Respect prefers-reduced-motion:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

2. Provide pause/stop controls for auto-playing content:
   ```svelte
   <button onclick={toggleAutoplay}>
     {isPlaying ? 'Pause' : 'Play'} Carousel
   </button>
   ```

3. Avoid flashing content (seizure risk):
   - No more than 3 flashes per second
   - Provide warnings for flashing content

## 12. Create Accessibility Checklist

1. Create comprehensive checklist based on WCAG 2.1:
   ```markdown
   ## Perceivable
   - [ ] All images have alt text
   - [ ] Color contrast meets WCAG AA (4.5:1)
   - [ ] Content is not conveyed by color alone
   - [ ] Text can be resized to 200% without loss
   
   ## Operable
   - [ ] All functionality available via keyboard
   - [ ] No keyboard traps
   - [ ] Focus indicators visible
   - [ ] Skip links provided
   - [ ] Sufficient time for interactions
   
   ## Understandable
   - [ ] Language of page specified
   - [ ] Navigation is consistent
   - [ ] Error messages are clear
   - [ ] Labels/instructions provided for inputs
   
   ## Robust
   - [ ] Valid HTML
   - [ ] ARIA used correctly
   - [ ] Works with assistive technologies
   - [ ] Compatible with current/future tools
   ```

2. Rate each item: Pass, Fail, or N/A.

3. Calculate compliance score.

## 13. Prioritize and Fix Issues

1. Categorize issues by severity:
   - **Critical**: Blocking access (fix immediately)
   - **High**: Significant barrier (fix soon)
   - **Medium**: Notable issue (fix in sprint)
   - **Low**: Minor improvement (backlog)

2. Fix critical issues first:
   ```svelte
   <!-- Before: Missing alt text -->
   <img src="logo.png" />
   
   <!-- After: Alt text added -->
   <img src="logo.png" alt="Company Logo" />
   ```

3. Implement high-priority fixes:
   ```svelte
   <!-- Before: Poor contrast -->
   <button style="color: #888; background: #ddd;">
     Submit
   </button>
   
   <!-- After: Sufficient contrast -->
   <button style="color: #000; background: #fff;">
     Submit
   </button>
   ```

4. Create tickets for medium and low priority issues.

## 14. Generate Accessibility Report

1. Document audit findings:
   ```markdown
   # Accessibility Audit Report
   
   ## Executive Summary
   - Total issues found: 47
   - Critical: 3
   - High: 12
   - Medium: 18
   - Low: 14
   - WCAG 2.1 AA Compliance: 78%
   
   ## Critical Issues
   1. Form submit button has no accessible name
   2. Modal cannot be closed with keyboard
   3. Error messages not announced to screen readers
   
   ## Recommendations
   - Implement focus management in modal dialogs
   - Add ARIA labels to icon-only buttons
   - Improve color contrast on CTAs
   ```

2. Include before/after examples.

3. Provide implementation timeline.

4. Share report with stakeholders.

## 15. Set Up Continuous Accessibility Monitoring

1. Add accessibility tests to CI/CD:
   ```yaml
   - name: Run accessibility tests
     run: npm run test:a11y
   ```

2. Configure automated accessibility checks on PRs.

3. Set up periodic manual audits (quarterly).

4. Train team on accessibility best practices.

5. Document accessibility guidelines in project docs.

</detailed_sequence_steps>

</task>

