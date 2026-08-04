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
