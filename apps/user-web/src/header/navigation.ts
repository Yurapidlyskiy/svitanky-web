import { ROUTES } from '@/shared/config/routes';

export type NavigationItem = {
  href: string;
  /** Key under `header.nav` in the messages. */
  labelKey: 'about' | 'activities' | 'news' | 'partners';
};

export const primaryNavigation: NavigationItem[] = [
  { href: ROUTES.about, labelKey: 'about' },
  { href: ROUTES.news, labelKey: 'news' },
  { href: ROUTES.partners, labelKey: 'partners' },
  { href: ROUTES.activities, labelKey: 'activities' },
];

export type HeaderAction = {
  href: string;
  /** Key under `header.actions` in the messages. */
  labelKey: 'friends' | 'support';
};

export const headerActions: HeaderAction[] = [
  { href: ROUTES.support, labelKey: 'friends' },
  { href: ROUTES.support, labelKey: 'support' },
];

export type SiteLanguage = {
  code: string;
  label: string;
};

// Each language is named in itself (an endonym), so these labels are never translated.
// Only the locales enabled in `shared/i18n/locales.json` are shown in the switcher.
export const SITE_LANGUAGES: Record<string, SiteLanguage> = {
  en: { code: 'EN', label: 'English' },
  it: { code: 'IT', label: 'Italiano' },
  uk: { code: 'UA', label: 'Українська' },
};
