export type ProjectStatus = 'active' | 'planned' | 'completed';

/** The status tabs above the list: one per status, plus everything at once. */
export type ProjectFilter = 'all' | ProjectStatus;

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
