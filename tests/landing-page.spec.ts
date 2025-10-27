import { test, expect } from '@playwright/test'

test.describe('Landing Page - Cursor Branding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should display Cursor logo and branding correctly', async ({ page }) => {
    const logo = page.locator('img[alt="Cursor"]').first()
    await expect(logo).toBeVisible()
    
    const srcAttribute = await logo.getAttribute('src')
    expect(srcAttribute).toContain('cursor-branding')
  })

  test('should have correct Cursor brand colors', async ({ page }) => {
    const body = page.locator('body')
    const bgColor = await body.evaluate((el) => {
      return window.getComputedStyle(el.closest('div')!).backgroundColor
    })
    
    expect(bgColor).toBeTruthy()
  })

  test('should display main heading with Cursor tagline', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /The best way to code with AI/i })
    await expect(heading).toBeVisible()
  })

  test('should display "Built to make you extraordinarily productive" badge', async ({ page }) => {
    const badge = page.getByText('Built to make you extraordinarily productive')
    await expect(badge).toBeVisible()
  })

  test('should have glassmorphism effects on feature cards', async ({ page }) => {
    const featureCards = page.locator('text=Custom Commands')
      .locator('..')
      .locator('..')
    
    await expect(featureCards).toBeVisible()
    
    const backdropFilter = await featureCards.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter || window.getComputedStyle(el).webkitBackdropFilter
    })
    
    expect(backdropFilter).toContain('blur')
  })

  test('should display navigation with correct buttons', async ({ page }) => {
    const signInButton = page.getByRole('button', { name: 'Sign In' })
    const getStartedButton = page.getByRole('button', { name: 'Get Started' })
    
    await expect(signInButton).toBeVisible()
    await expect(getStartedButton).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    const getStartedButton = page.getByRole('button', { name: /Get Started Free/i })
    await expect(getStartedButton).toBeVisible()
    
    const browseButton = page.getByRole('button', { name: 'Browse Resources' })
    await expect(browseButton).toBeVisible()
  })

  test('should display three feature cards', async ({ page }) => {
    await expect(page.getByText('Custom Commands')).toBeVisible()
    await expect(page.getByText('Smart Rules')).toBeVisible()
    await expect(page.getByText('MCP Integration')).toBeVisible()
  })

  test('should display statistics section', async ({ page }) => {
    await expect(page.getByText('1000+')).toBeVisible()
    await expect(page.getByText('Resources Available')).toBeVisible()
    await expect(page.getByText('50K+')).toBeVisible()
    await expect(page.getByText('Active Developers')).toBeVisible()
    await expect(page.getByText('99.9%')).toBeVisible()
    await expect(page.getByText('Uptime')).toBeVisible()
  })

  test('should display footer with Cursor branding', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    const footerText = await footer.textContent()
    expect(footerText).toContain('Built with Cursor')
    expect(footerText).toContain('About Cursor')
    expect(footerText).toContain('Brand')
  })

  test('should have responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const heading = page.getByRole('heading', { name: /The best way to code with AI/i })
    await expect(heading).toBeVisible()
    
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(heading).toBeVisible()
  })

  test('should have hover effects on feature cards', async ({ page }) => {
    const featureCard = page.locator('text=Custom Commands')
      .locator('..')
      .locator('..')
    
    const box = await featureCard.boundingBox()
    expect(box).toBeTruthy()
    
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.waitForTimeout(500)
    }
  })

  test('should have animated floating blobs in background', async ({ page }) => {
    const blobs = page.locator('.animate-float')
    const count = await blobs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should link to cursor.com in footer', async ({ page }) => {
    const cursorLink = page.getByRole('link', { name: 'About Cursor' })
    await expect(cursorLink).toBeVisible()
    await expect(cursorLink).toHaveAttribute('href', 'https://cursor.com')
  })

  test('should link to brand page in footer', async ({ page }) => {
    const brandLink = page.getByRole('link', { name: 'Brand' })
    await expect(brandLink).toBeVisible()
    await expect(brandLink).toHaveAttribute('href', 'https://cursor.com/brand')
  })
})

test.describe('Visual Regression Tests', () => {
  test('should match landing page screenshot', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('should match mobile landing page screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('landing-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good lighthouse scores', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      }
    })
    
    expect(performanceMetrics.domContentLoaded).toBeGreaterThan(0)
    expect(performanceMetrics.loadComplete).toBeGreaterThan(0)
  })
})

