import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { routing } from '@/shared/i18n/routing';

import { SITE_LANGUAGES } from './navigation';

/** The served languages and a way to switch the current page to another one. */
export function useLanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const languages = routing.locales.map((code) => ({ ...SITE_LANGUAGES[code], locale: code }));

  function switchTo(nextLocale: string) {
    if (nextLocale === locale) return;

    startTransition(() => router.replace(pathname, { locale: nextLocale }));
  }

  return { current: SITE_LANGUAGES[locale], isPending, languages, locale, switchTo };
}
