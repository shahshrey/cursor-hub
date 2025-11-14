import { test, expect } from '@playwright/test'

test.describe('Particles Background', () => {
  test('should render particles on landing page', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const particlesCanvas = page.locator('canvas').first()
    await expect(particlesCanvas).toBeVisible({ timeout: 10000 })

    const canvasElement = await particlesCanvas.evaluate(canvas => {
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
        tagName: canvas.tagName,
      }
    })

    expect(canvasElement.tagName).toBe('CANVAS')
    expect(canvasElement.width).toBeGreaterThan(0)
    expect(canvasElement.height).toBeGreaterThan(0)
  })

  test('should render particles on browse page', async ({ page }) => {
    await page.goto('http://localhost:3000/browse')

    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const particlesCanvas = page.locator('canvas').first()
    await expect(particlesCanvas).toBeVisible({ timeout: 10000 })

    const canvasElement = await particlesCanvas.evaluate(canvas => {
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
      }
    })

    expect(canvasElement.width).toBeGreaterThan(0)
    expect(canvasElement.height).toBeGreaterThan(0)
  })

  test('should have consistent particles across different pages', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const landingPageCanvas = page.locator('canvas').first()
    await expect(landingPageCanvas).toBeVisible({ timeout: 10000 })

    await page.goto('http://localhost:3000/browse')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    const browsePageCanvas = page.locator('canvas').first()
    await expect(browsePageCanvas).toBeVisible({ timeout: 10000 })

    const landingCanvasData = await landingPageCanvas.evaluate(canvas => {
      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      return ctx !== null
    })

    const browseCanvasData = await browsePageCanvas.evaluate(canvas => {
      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      return ctx !== null
    })

    expect(landingCanvasData).toBe(true)
    expect(browseCanvasData).toBe(true)
  })

  test('particles should be in fixed background layer', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeVisible({ timeout: 10000 })

    const canvasContainer = canvas.locator('..')
    await expect(canvasContainer).toBeVisible({ timeout: 10000 })

    const containerStyles = await canvasContainer.evaluate(el => {
      if (!(el instanceof Element)) {
        return { position: '', pointerEvents: '' }
      }
      const styles = window.getComputedStyle(el)
      return {
        position: styles.position,
        pointerEvents: styles.pointerEvents,
      }
    })

    expect(containerStyles.pointerEvents).toBe('none')
  })

  test('particles canvas should update on window resize', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForTimeout(1000)
    
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeVisible({ timeout: 10000 })
    
    await page.waitForTimeout(500)
    
    const initialDimensions = await canvas.evaluate(c => ({
      width: (c as HTMLCanvasElement).width,
      height: (c as HTMLCanvasElement).height,
    }))

    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForTimeout(500)

    const newDimensions = await canvas.evaluate(c => ({
      width: (c as HTMLCanvasElement).width,
      height: (c as HTMLCanvasElement).height,
    }))

    expect(newDimensions.width).not.toBe(initialDimensions.width)
    expect(newDimensions.height).not.toBe(initialDimensions.height)
  })
})
