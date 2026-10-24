import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Next turns `server-only` into a no-op on the server; Vitest has no such condition.
      'server-only': fileURLToPath(new URL('./test/server-only.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    // Playwright specs live in e2e/ and run through `npm run test:e2e`.
    include: ['src/**/*.test.ts'],
  },
});
