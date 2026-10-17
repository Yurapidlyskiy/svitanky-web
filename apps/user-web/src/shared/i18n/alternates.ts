import type { Metadata } from 'next';

import { getPathname } from './navigation';
import { type Locale, routing } from './routing';

/** Canonical URL + `hreflang` links for one page in every served language. */
export function localeAlternates(href: string, locale: Locale): Metadata['alternates'] {
  return {
    canonical: getPathname({ href, locale }),
    languages: Object.fromEntries(
      routing.locales.map((language) => [language, getPathname({ href, locale: language })])
    ),
  };
}
