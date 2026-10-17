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
  // TODO: add `{ href: '/#sponsors', label: 'Спонсори' }` once a section with
  // `id="sponsors"` exists on the home page.
];

// TODO: the legal pages do not exist yet, so their links are held back to avoid
// 404s. Add each one here as its page under `app/` is published:
//   { href: '/privacy-policy', label: 'Політика конфіденційності' },
//   { href: '/data-consent', label: 'Згода на обробку персональних даних' },
//   { href: '/terms', label: 'Умови використання (оферта)' },
export const legalNavigation: FooterLink[] = [];
