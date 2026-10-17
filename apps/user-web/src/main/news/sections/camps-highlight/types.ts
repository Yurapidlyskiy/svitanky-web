import type { StatIconName } from '@/shared/ui';

/**
 * Untranslated part of a stat — `primary` / `secondary` are in `news.campsHighlight.stats.<id>`.
 * `since` is the only stat without a secondary line.
 */
export type CampStat = {
  icon: StatIconName;
  id: 'camps' | 'memories' | 'participants' | 'since';
  tone: 'amber' | 'navy';
};

export type CampsCollagePhoto = {
  id: 'celebrate' | 'rest' | 'team';
  src: string;
};
