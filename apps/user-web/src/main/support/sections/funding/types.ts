import type { StatIconName } from '@/shared/ui';

export type FundingAccent = 'amber' | 'navy' | 'green';

/** A funding item with its texts resolved from `support.funding.items.<id>`. */
export type FundingItem = {
  accent: FundingAccent;
  description: string;
  icon: StatIconName;
  image?: { alt: string; src: string };
  title: string;
};
