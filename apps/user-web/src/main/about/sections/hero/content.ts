import type { StatIconName } from '@/shared/ui';

// Stat captions live in the messages under `about.hero.stats.<id>`.
export const HERO_STATS = [
  { icon: 'sun', id: 'founded', primary: '2018', tone: 'amber' },
  { icon: 'home', id: 'home', primary: '1', tone: 'navy' },
  { icon: 'people', id: 'team', primary: '13+', tone: 'amber' },
] as const satisfies { icon: StatIconName; id: string; primary: string; tone: 'amber' | 'navy' }[];
