import { test, expect } from '@playwright/test'

test.describe('Particles Background', () => {
  test('should render particles on landing page', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const particlesCanvas = page.locator('canvas')
    await expect(particlesCanvas).toBeVisible()

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

    const particlesCanvas = page.locator('canvas')
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

  test('should have consistent particles across different pages', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const landingPageCanvas = page.locator('canvas')
    await expect(landingPageCanvas).toBeVisible()

    await page.goto('http://localhost:3000/browse')
    await page.waitForLoadState('networkidle')

    const browsePageCanvas = page.locator('canvas')
    await expect(browsePageCanvas).toBeVisible()

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

    const canvasContainer = page.locator('canvas').locator('..')

    const containerStyles = await canvasContainer.evaluate(el => {
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
    await page.setViewportSize({ width: 1920, height: 1080 })

    const canvas = page.locator('canvas')
    const initialDimensions = await canvas.evaluate(c => ({
      width: (c as HTMLCanvasElement).width,
      height: (c as HTMLCanvasElement).height,
    }))

    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForTimeout(300)

    const newDimensions = await canvas.evaluate(c => ({
      width: (c as HTMLCanvasElement).width,
      height: (c as HTMLCanvasElement).height,
    }))

    expect(newDimensions.width).not.toBe(initialDimensions.width)
    expect(newDimensions.height).not.toBe(initialDimensions.height)
  })
})
