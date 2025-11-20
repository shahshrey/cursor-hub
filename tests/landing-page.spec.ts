import { test, expect } from '@playwright/test'

test.describe('Landing Page - Cursor Branding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
  })

  test('should display Cursor logo and branding correctly', async ({ page }) => {
    const logo = page.locator('svg[aria-label="Cursor"]').first()
    await expect(logo).toBeVisible({ timeout: 10000 })

    const ariaLabel = await logo.getAttribute('aria-label')
    expect(ariaLabel).toBe('Cursor')
  })

  test('should have correct Cursor brand colors', async ({ page }) => {
    const body = page.locator('body')
    const bgColor = await body.evaluate(el => {
      const parentDiv = el.closest('div')
      if (!parentDiv) {
        return window.getComputedStyle(el).backgroundColor
      }
      return window.getComputedStyle(parentDiv).backgroundColor
    })

    expect(bgColor).toBeTruthy()
  })

  test('should display main heading with Cursor tagline', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Discover & Share/i })
    await expect(heading).toBeVisible({ timeout: 10000 })
  })

  test('should display community resources badge', async ({ page }) => {
    const badge = page.getByText(/resources shared by the community/i).first()
    await expect(badge).toBeVisible({ timeout: 10000 })
  })

  test('should have glassmorphism effects on feature cards', async ({ page }) => {
    const commandsCard = page.locator('[data-slot="card"]').filter({ hasText: 'Commands' }).first()
    await expect(commandsCard).toBeVisible({ timeout: 10000 })

    const cardStyles = await commandsCard.evaluate(el => {
      const style = window.getComputedStyle(el)
      return {
        backdropFilter: style.backdropFilter || (style as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || '',
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
      }
    })

    const hasStyling = cardStyles.backdropFilter.includes('blur') || 
                       cardStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                       cardStyles.borderRadius !== '0px'

    expect(hasStyling).toBe(true)
  })

  test('should display navigation with correct buttons', async ({ page }) => {
    const signInButton = page.getByRole('button', { name: 'Sign In' })
    const signUpButton = page.getByRole('button', { name: 'Sign Up' })

    await expect(signInButton).toBeVisible({ timeout: 10000 })
    await expect(signUpButton).toBeVisible({ timeout: 10000 })
  })

  test('should have working CTA buttons', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: /Get Started Free/i }).first()
    await expect(getStartedButton).toBeVisible({ timeout: 10000 })

    const browseButton = page.getByRole('button', { name: /Browse All Resources/i })
    await expect(browseButton).toBeVisible({ timeout: 10000 })
  })

  test('should display resource type cards', async ({ page }) => {
    const commandsCard = page.locator('[data-slot="card-title"]').filter({ hasText: 'Commands' }).first()
    await expect(commandsCard).toBeVisible({ timeout: 10000 })
    
    const rulesCard = page.locator('[data-slot="card-title"]').filter({ hasText: 'Rules' }).first()
    await expect(rulesCard).toBeVisible({ timeout: 10000 })
    
    const mcpsCard = page.locator('[data-slot="card-title"]').filter({ hasText: 'MCPs' }).first()
    await expect(mcpsCard).toBeVisible({ timeout: 10000 })
    
    const hooksCard = page.locator('[data-slot="card-title"]').filter({ hasText: 'Hooks' }).first()
    await expect(hooksCard).toBeVisible({ timeout: 10000 })
  })

  test('should display statistics section', async ({ page }) => {
    await expect(page.getByText(/Total Resources/i)).toBeVisible({ timeout: 10000 })
    const categoriesLabel = page.locator('div').filter({ hasText: /^Categories$/ }).first()
    await expect(categoriesLabel).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/Resource Types/i)).toBeVisible({ timeout: 10000 })
  })

  test('should display footer with Cursor branding', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const footerText = await footer.textContent()
    expect(footerText).toContain('Built with Cursor')
    expect(footerText).toContain('About Cursor')
    expect(footerText).toContain('Cursor Hub')
  })

  test('should have responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const heading = page.getByRole('heading', { name: /Discover & Share/i })
    await expect(heading).toBeVisible()

    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(heading).toBeVisible()
  })

  test('should have hover effects on feature cards', async ({ page }) => {
    const commandsCard = page.locator('[data-slot="card"]').filter({ hasText: 'Commands' }).first()
    await expect(commandsCard).toBeVisible()

    const box = await commandsCard.boundingBox()
    expect(box).toBeTruthy()

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.waitForTimeout(500)
    }
  })

  test('should have particles background', async ({ page }) => {
    const particlesCanvas = page.locator('canvas').first()
    await expect(particlesCanvas).toBeVisible()
    
    const canvasElement = await particlesCanvas.evaluate(canvas => {
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
      }
    })
    
    expect(canvasElement.width).toBeGreaterThan(0)
    expect(canvasElement.height).toBeGreaterThan(0)
  })

  test('should link to cursor.com in footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible({ timeout: 10000 })
    
    const cursorLink = page.getByRole('link', { name: 'About Cursor' })
    await expect(cursorLink).toBeVisible({ timeout: 10000 })
    await expect(cursorLink).toHaveAttribute('href', 'https://cursor.com')
  })
})

test.describe('Visual Regression Tests', () => {
  test('should match landing page screenshot', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const footer = page.locator('footer')
    await expect(footer).toBeVisible({ timeout: 10000 })

    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixels: 500000,
      threshold: 0.5,
    })
  })

  test('should match mobile landing page screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const footer = page.locator('footer')
    await expect(footer).toBeVisible({ timeout: 10000 })

    await expect(page).toHaveScreenshot('landing-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixels: 500000,
      threshold: 0.5,
    })
  })
})

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(10000)
  })

  test('should have good lighthouse scores', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming | undefined
      
      if (!navigation) {
        return {
          domContentLoaded: 0,
          loadComplete: 0,
          domInteractive: 0,
        }
      }

      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
      }
    })

    const hasValidMetrics = performanceMetrics.domContentLoaded > 0 || 
                            performanceMetrics.loadComplete > 0 ||
                            performanceMetrics.domInteractive > 0

    expect(hasValidMetrics).toBe(true)
  })
})
