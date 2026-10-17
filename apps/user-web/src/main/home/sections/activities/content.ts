import { ROUTES } from '@/shared/config/routes';

// Texts live in the messages under `home.activities.items.<id>`.
export const ACTIVITIES = [
  {
    accent: 'navy',
    href: ROUTES.activities,
    id: 'camps',
    image: '/assets/images/shared/poster-1.jpeg',
  },
  {
    accent: 'amber',
    href: ROUTES.activities,
    id: 'weekends',
    image: '/assets/images/shared/poster-2.jpeg',
  },
  {
    accent: 'navy',
    href: ROUTES.activities,
    id: 'home',
    image: '/assets/images/shared/poster-3.jpg',
  },
] as const;
