const { test, describe, expect } = require('@playwright/test')

describe('Login', () => {
  test('login page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
  })
})