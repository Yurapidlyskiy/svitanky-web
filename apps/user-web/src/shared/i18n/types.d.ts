import type messages from './messages/uk.json';
import type { routing } from './routing';

// Types every `t('…')` key against the Ukrainian source file — a typo or a removed
// key fails `npm run check-types` instead of rendering the raw key on the page.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
