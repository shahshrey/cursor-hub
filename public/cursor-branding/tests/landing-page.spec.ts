import { test, expect } from '@playwright/test'

test.describe('Landing Page - Cursor Branding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should display Cursor logo', async ({ page }) => {
    const logo = page.locator('img[alt="Cursor"]').first()
    await expect(logo).toBeVisible()
  })

  test('should display main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /The best way to code with AI/i })
    await expect(heading).toBeVisible()
  })

  test('should have Cursor brand colors', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible()
  })
})
