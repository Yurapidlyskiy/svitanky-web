export type ProjectStatus = 'active' | 'planned';

export type Project = {
  description: string;
  goal: number;
  href: string;
  id: string;
  image: { alt: string; src: string };
  /** Amount raised so far, in UAH — will come from the bank account balance once that's wired up. */
  raised: number;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
};
