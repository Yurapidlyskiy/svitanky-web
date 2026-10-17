import { ROUTES } from '@/shared/config/routes';

// Labels live in the messages under `support.hero.actions.<id>`.
export const HERO_ACTIONS = [
  { href: '#become-ray', id: 'becomeRay', tone: 'primary' },
  { href: '#funding', id: 'directRay', tone: 'secondary' },
  { href: ROUTES.partners, id: 'business', tone: 'secondary' },
] as const;
