import { ROUTES } from '@/shared/config/routes';

import type { Project, ProjectFilter, ProjectStatus } from './types';

/** Tab order, and the order of the list under "all": what needs money now comes first. */
const STATUS_ORDER: ProjectStatus[] = ['active', 'planned', 'completed'];

export const PROJECT_FILTERS: ProjectFilter[] = ['all', ...STATUS_ORDER];

/** Groups thousands the way the visitor's language does (`1 250 000` in Ukrainian). */
export function formatAmount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** `?status=` is untrusted — anything unknown falls back to showing every project. */
export function parseProjectFilter(value: string | string[] | undefined): ProjectFilter {
  const candidate = Array.isArray(value) ? value[0] : value;

  return PROJECT_FILTERS.find((filter) => filter === candidate) ?? 'all';
}

export function selectProjects(projects: Project[], filter: ProjectFilter): Project[] {
  if (filter !== 'all') return projects.filter((project) => project.status === filter);

  return [...projects].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );
}

/** The news feed's reports tab — where the spending behind each project is shown. */
export const REPORTS_HREF = `${ROUTES.news}?category=reports`;

export function buildProjectsHref(filter: ProjectFilter): string {
  const params = new URLSearchParams({ category: 'projects' });

  if (filter !== 'all') params.set('status', filter);

  return `${ROUTES.news}?${params.toString()}`;
}
