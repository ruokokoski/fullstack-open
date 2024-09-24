const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3001',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  use: {
    baseURL: 'http://localhost:3001/',
  },
  testDir: './e2e-tests'
})