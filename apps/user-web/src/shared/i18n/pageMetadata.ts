import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { localeAlternates } from './alternates';
import { setRouteLocale } from './routeLocale';

type Page = 'about' | 'activities' | 'home' | 'news' | 'partners' | 'support';

/**
 * Builds a route's `generateMetadata` from `<page>.metadata.{title,description}` in
 * the messages, plus canonical and `hreflang` links. Route files re-export it:
 * `export const generateMetadata = pageMetadata('about', ROUTES.about);`
 */
export function pageMetadata(page: Page, href: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const locale = await setRouteLocale(params);
    const t = await getTranslations({ locale });
    const title = t(`${page}.metadata.title`);

    return {
      alternates: localeAlternates(href, locale),
      description: t(`${page}.metadata.description`),
      // The home page title is the site name itself, so it skips the "%s — site" template.
      title: page === 'home' ? { absolute: title } : title,
    };
  };
}
