import type { StatIconName } from '@/shared/ui';

import type { ActivityImageFocalPoint } from './DirectionCard';

/** The untranslated part of a direction — its texts are in `activities.directions.items.<id>`. */
export type ActivityDirection = {
  accent: 'amber' | 'navy' | 'green';
  href: string;
  icon: StatIconName;
  id: 'camps' | 'home' | 'weekends';
  image: string;
  imageFocalPoint?: ActivityImageFocalPoint;
  order: string;
};
