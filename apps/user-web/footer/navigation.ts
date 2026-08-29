export type FooterLink = {
  href: string;
  label: string;
};

export const footerNavigation: FooterLink[] = [
  { href: '/#about', label: 'Про нас' },
  { href: '/#activities', label: 'Напрямки діяльності' },
  { href: '/#values', label: 'Наші цінності' },
  { href: '/#raising-funds', label: 'На що ми збираємо кошти?' },
  { href: '/#community-life', label: 'Ми створюємо не просто прихисток, а дім' },
  { href: '/#join-community', label: 'Твоя підтримка важлива' },
  { href: '/#team', label: 'Наша команда' },
  // TODO: no sponsors section exists yet — add `id="sponsors"` to it once built.
  { href: '/#sponsors', label: 'Спонсори' },
];

// TODO: these routes are not implemented yet — create the pages before launch.
export const legalNavigation: FooterLink[] = [
  { href: '/privacy-policy', label: 'Політика конфіденційності' },
  { href: '/data-consent', label: 'Згода на обробку персональних даних' },
  { href: '/terms', label: 'Умови використання (оферта)' },
];
