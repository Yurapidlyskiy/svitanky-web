import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

/**
 * Smoke tests against the production build. Run from the repo root with
 * `npm run test:e2e` — Turborepo builds user-web first, then this config
 * starts `next start` on its own port so a running `npm run dev` is untouched.
 */
export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  retries: process.env.CI ? 1 : 0,
  testDir: './e2e',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npx next start --port ${PORT}`,
    reuseExistingServer: !process.env.CI,
    url: `http://localhost:${PORT}`,
  },
});
