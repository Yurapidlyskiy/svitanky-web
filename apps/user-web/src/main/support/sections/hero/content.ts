import { ROUTES } from '@/shared/config/routes';

import heroImage from '../../../../../public/assets/images/home/hero/upscale_image_01.webp';

export const HERO_IMAGE = heroImage;

export const HERO_FOCUS = { mobile: '91% center', desktop: 'right top' };

// Labels live in the messages under `support.hero.actions.<id>`.
export const HERO_ACTIONS = [
  { href: '#become-ray', id: 'becomeRay', tone: 'primary' },
  { href: `${ROUTES.news}?category=projects#funding`, id: 'directRay', tone: 'secondary' },
  { href: ROUTES.partners, id: 'business', tone: 'secondary' },
] as const;
