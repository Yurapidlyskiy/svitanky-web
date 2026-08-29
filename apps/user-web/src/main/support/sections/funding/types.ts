import type { StatIconName } from '@/shared/ui';

export type FundingAccent = 'amber' | 'navy' | 'green';

export type FundingItem = {
  accent: FundingAccent;
  description: string;
  icon: StatIconName;
  image: { alt: string; src: string };
  title: string;
};
