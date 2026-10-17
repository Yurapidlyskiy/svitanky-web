import type messages from '@/shared/i18n/messages/uk.json';

type FooterMessages = (typeof messages)['footer'];

export type FooterNavLink = { href: string; labelKey: keyof FooterMessages['nav'] };
export type LegalLink = { href: string; labelKey: keyof FooterMessages['legal'] };

export const footerNavigation: FooterNavLink[] = [
  { href: '/#about', labelKey: 'about' },
  { href: '/#activities', labelKey: 'activities' },
  { href: '/#values', labelKey: 'values' },
  { href: '/#raising-funds', labelKey: 'raisingFunds' },
  { href: '/#community-life', labelKey: 'communityLife' },
  { href: '/#join-community', labelKey: 'joinCommunity' },
  { href: '/#team', labelKey: 'team' },
  // TODO: add `{ href: '/#sponsors', labelKey: 'sponsors' }` (and its message) once a
  // section with `id="sponsors"` exists on the home page.
];

// TODO: the legal pages do not exist yet, so their links are held back to avoid
// 404s. Add each one here as its page under `app/[locale]/` is published — the labels
// are already in `footer.legal`:
//   { href: '/privacy-policy', labelKey: 'privacyPolicy' },
//   { href: '/data-consent', labelKey: 'dataConsent' },
//   { href: '/terms', labelKey: 'terms' },
export const legalNavigation: LegalLink[] = [];
