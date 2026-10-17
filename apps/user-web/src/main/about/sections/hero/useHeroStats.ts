import { useTranslations } from 'next-intl';

import type { Stat } from '@/shared/ui';

import { HERO_STATS } from './content';

/** The hero's stats with their captions in the current language. */
export function useHeroStats(): Stat[] {
  const t = useTranslations('about.hero.stats');

  return HERO_STATS.map(({ id, ...stat }) => ({ ...stat, secondary: t(id) }));
}
