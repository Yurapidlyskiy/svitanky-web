import type { StatIconName } from '@/shared/ui';

import type { ActivityImageFocalPoint } from './DirectionCard';

export type ActivityDirection = {
  accent: 'amber' | 'navy' | 'green';
  description: string;
  href: string;
  icon: StatIconName;
  image: { src: string; alt: string };
  imageFocalPoint?: ActivityImageFocalPoint;
  order: string;
  title: string;
};
