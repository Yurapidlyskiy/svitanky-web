import type { StatIconName } from '@/shared/ui';

export type ProjectStatus = 'active' | 'planned';

export type Project = {
  description: string;
  goal: number;
  href: string;
  id: string;
  image: { alt: string; src: string };
  /** Amount raised so far, in UAH — will come from the bank account balance once that's wired up. */
  raised: number;
  /** Its label is in `news.projectsHighlight.status.<status>`. */
  status: ProjectStatus;
  title: string;
};

/** Untranslated part of a stat — its texts are in `news.projectsHighlight.stats.<id>`. */
export type ProjectStat = {
  icon: StatIconName;
  id: 'camps' | 'children' | 'home' | 'memories';
  tone: 'amber' | 'navy';
};
