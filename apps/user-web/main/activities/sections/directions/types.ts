import type { ActivityImageFocalPoint } from './DirectionCard';
import type { DirectionIconName } from './DirectionIcon';

export type ActivityDirection = {
  accent: 'amber' | 'navy' | 'green';
  description: string;
  href: string;
  icon: DirectionIconName;
  image: { src: string; alt: string };
  imageFocalPoint?: ActivityImageFocalPoint;
  order: string;
  title: string;
};
