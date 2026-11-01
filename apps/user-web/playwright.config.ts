import { defineConfig, devices } from '@playwright/test';

import { E2E_POSTS_API_PORT } from './e2e/posts-api-stub.mjs';
import { E2E_WAYFORPAY } from './e2e/wayforpay-test-env';

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
  webServer: [
    {
      // Answers the site's posts query, so the news page has content without a database.
      command: 'node e2e/posts-api-stub.mjs',
      reuseExistingServer: !process.env.CI,
      url: `http://localhost:${E2E_POSTS_API_PORT}/health`,
    },
    {
      command: `npx next start --port ${PORT}`,
      // Fake credentials, so the donation flow can sign orders. The specs answer WayForPay's
      // payment page with a stub, nothing here reaches the real payment system. An empty
      // Turnstile secret wins over a developer's own .env, so the bot check stays off here.
      env: {
        ...E2E_WAYFORPAY,
        TURNSTILE_SECRET_KEY: '',
        SUPABASE_URL: `http://localhost:${E2E_POSTS_API_PORT}`,
        SUPABASE_ANON_KEY: 'e2e-key-not-a-real-one',
      },
      reuseExistingServer: !process.env.CI,
      url: `http://localhost:${PORT}`,
    },
  ],
});
