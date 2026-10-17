import type { StatIconName } from '@/shared/ui';

import heroImage from '../../../../../public/assets/images/about/hero/about-us-bg.webp';

export const HERO_IMAGE = heroImage;

export const HERO_FOCUS = { mobile: '74% center', desktop: '62% 60%' };

// Stat captions live in the messages under `about.hero.stats.<id>`.
export const HERO_STATS = [
  { icon: 'sun', id: 'founded', primary: '2018', tone: 'amber' },
  { icon: 'home', id: 'home', primary: '1', tone: 'navy' },
  { icon: 'people', id: 'team', primary: '13+', tone: 'amber' },
] as const satisfies { icon: StatIconName; id: string; primary: string; tone: 'amber' | 'navy' }[];
