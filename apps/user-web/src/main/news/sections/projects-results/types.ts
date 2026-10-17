import type { IconFeatureCardTone, StatIconName } from '@/shared/ui';

/** Untranslated part of a result — its text is in `news.projectsResults.items.<id>`. */
export type SupportResult = {
  icon: StatIconName;
  id: 'camps' | 'generation' | 'meetings' | 'space';
  tone: IconFeatureCardTone;
};
