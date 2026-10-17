import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { type Locale, routing } from './routing';

/**
 * Validates the `[locale]` route param and enables static rendering for it.
 * Call it first in every layout, page and `generateMetadata` under `app/[locale]/`.
 */
export async function setRouteLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return locale;
}
