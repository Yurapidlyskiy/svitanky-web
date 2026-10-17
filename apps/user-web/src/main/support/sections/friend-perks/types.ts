export type PerkIconName = 'calendar' | 'chart' | 'community' | 'document' | 'heart' | 'star';

/** A perk with its texts resolved from `support.friendPerks.items.<id>`. */
export type Perk = {
  description: string;
  icon: PerkIconName;
  title: string;
};
