import type { StatIconName } from '@/shared/ui';

// Captions live in the messages under `partners.impact.stats.<id>`.
export const IMPACT_STATS = [
  { icon: 'people', id: 'partners', primary: '20+', tone: 'navy' },
  { icon: 'home-heart', id: 'years', primary: '6', tone: 'amber' },
  { icon: 'heart', id: 'children', primary: '500+', tone: 'navy' },
] as const satisfies { icon: StatIconName; id: string; primary: string; tone: 'amber' | 'navy' }[];
