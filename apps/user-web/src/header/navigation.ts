import { ROUTES } from '@/shared/config/routes';

export type NavigationItem = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationItem[] = [
  { href: ROUTES.about, label: 'Про нас' },
  { href: ROUTES.news, label: 'Новини' },
  { href: ROUTES.partners, label: 'Партнерам' },
  { href: ROUTES.activities, label: 'Напрямки діяльності' },
];

export const headerActions: NavigationItem[] = [
  { href: ROUTES.support, label: 'Друзі Світанків' },
  { href: ROUTES.support, label: 'Підтримати' },
];

export type SiteLanguage = {
  code: string;
  label: string;
};

// Shared by the desktop switcher and the mobile menu so the two can't drift.
// TODO: selecting a language is UI-only for now — wire it to real i18n
// (locale routing + shared state) once translations exist.
export const siteLanguages: SiteLanguage[] = [
  { code: 'UA', label: 'Українська' },
  { code: 'EN', label: 'English' },
  { code: 'IT', label: 'Italiano' },
];
