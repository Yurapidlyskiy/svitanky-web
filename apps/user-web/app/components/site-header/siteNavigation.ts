export type NavigationItem = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationItem[] = [
  { href: '/about', label: 'Про нас' },
  { href: '/news', label: 'Новини' },
  { href: '/partners', label: 'Партнерам' },
  { href: '/activities', label: 'Напрямки діяльності' },
];

export const headerActions: NavigationItem[] = [
  { href: '/support', label: 'Друзі Світанків' },
  { href: '/support', label: 'Підтримати' },
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
