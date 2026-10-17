import type { MetadataRoute } from 'next';

import { ROUTES } from '@/shared/config/routes';
import { SITE_URL } from '@/shared/config/site';
import { getPathname } from '@/shared/i18n/navigation';
import { routing } from '@/shared/i18n/routing';

function absoluteUrl(href: string, locale: string): string {
  return new URL(getPathname({ href, locale }), SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).flatMap((href) =>
    routing.locales.map((locale) => ({
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((language) => [language, absoluteUrl(href, language)])
        ),
      },
      url: absoluteUrl(href, locale),
    }))
  );
}
