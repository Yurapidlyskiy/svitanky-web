import type { HighlightIconName } from './HighlightIcon';

// Texts live in the messages under `home.valuesHighlights.items.<id>`.
export const VALUE_HIGHLIGHTS = [
  { icon: 'heart', id: 'faith' },
  { icon: 'community', id: 'youth' },
  { icon: 'sun', id: 'home' },
  { icon: 'sprout', id: 'dignity' },
] as const satisfies { icon: HighlightIconName; id: string }[];
