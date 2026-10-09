const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:8765',
    screenshot: 'only-on-failure',
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || undefined,
      ...(process.env.HTTPS_PROXY ? { proxy: {
        server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost',
      } } : {}),
    },
  },
  webServer: {
    command: 'node scripts/serve.cjs',
    url: 'http://127.0.0.1:8765',
    reuseExistingServer: !process.env.CI,
  },
});
