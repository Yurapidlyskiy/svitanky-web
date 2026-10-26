import { ROUTES } from '@/shared/config/routes';
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

export const legalNavigation: LegalLink[] = [
  { href: ROUTES.terms, labelKey: 'terms' },
  { href: ROUTES.refundPolicy, labelKey: 'refundPolicy' },
  { href: ROUTES.privacyPolicy, labelKey: 'privacyPolicy' },
  { href: ROUTES.dataConsent, labelKey: 'dataConsent' },
];
