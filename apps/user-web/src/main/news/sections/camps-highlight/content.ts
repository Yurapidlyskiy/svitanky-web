import type { CampStat, CampsCollagePhoto } from './types';

// All texts live in the messages under `news.campsHighlight`.
export const CAMP_STATS: CampStat[] = [
  { icon: 'sun', id: 'since', tone: 'amber' },
  { icon: 'tent', id: 'camps', tone: 'amber' },
  { icon: 'people', id: 'participants', tone: 'navy' },
  { icon: 'heart', id: 'memories', tone: 'amber' },
];

export const CAMP_FEATURES = [
  'spiritual',
  'community',
  'adventures',
  'creativity',
  'campfires',
  'rest',
] as const;

export const CAMPS_COLLAGE_PHOTOS: CampsCollagePhoto[] = [
  { id: 'rest', src: '/assets/images/shared/poster-1.jpeg' },
  { id: 'celebrate', src: '/assets/images/shared/poster-2.jpeg' },
  { id: 'team', src: '/assets/images/shared/poster-3.jpg' },
];
