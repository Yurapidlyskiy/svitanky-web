import { defineRouting } from 'next-intl/routing';

import LOCALES from './locales.json';

/**
 * `locales.json` is shared with `scripts/i18n-translate.ts`:
 * - `source`  — the language the team writes in (`messages/uk.json`);
 * - `targets` — languages the translate script generates;
 * - `enabled` — languages the site actually serves. Add a target here only after its
 *   messages file is generated and reviewed.
 */
export const routing = defineRouting({
  defaultLocale: LOCALES.source,
  // The default language keeps today's URLs (`/about`); others get a prefix (`/en/about`).
  localePrefix: 'as-needed',
  locales: LOCALES.enabled,
});

export type Locale = (typeof routing.locales)[number];
