import type { ActivityDirection } from './types';

export const DIRECTIONS: ActivityDirection[] = [
  {
    accent: 'amber',
    href: '/activities#weekends',
    icon: 'people',
    id: 'weekends',
    image: '/assets/images/activities/weekends-activity.JPG',
    imageFocalPoint: 'upper',
    order: '01',
  },
  {
    accent: 'navy',
    href: '/activities#camps',
    icon: 'tent',
    id: 'camps',
    image: '/assets/images/activities/camps-activity.JPG',
    order: '02',
  },
  {
    accent: 'green',
    href: '/activities#home',
    icon: 'home-heart',
    id: 'home',
    image: '/assets/images/shared/poster-3.jpg',
    order: '03',
  },
];
