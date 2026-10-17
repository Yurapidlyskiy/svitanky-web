import type { PerkIconName } from './types';

// Titles and descriptions live in the messages under `support.friendPerks.items.<id>`.
export const FRIEND_PERKS = [
  { icon: 'community', id: 'community' },
  { icon: 'calendar', id: 'meetings' },
  { icon: 'document', id: 'materials' },
  { icon: 'star', id: 'guests' },
  { icon: 'chart', id: 'impact' },
  { icon: 'heart', id: 'events' },
] as const satisfies { icon: PerkIconName; id: string }[];
