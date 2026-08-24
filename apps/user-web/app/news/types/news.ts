export type NewsCategory = 'news' | 'announcements' | 'reports' | 'camps' | 'projects' | 'events';

export type NewsFilter = 'all' | NewsCategory;

export type NewsItem = {
  id: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) — the source of truth for sorting and display. */
  publishedAt: string;
  image: { src: string; alt: string };
  href: string;
};

export const NEWS_FILTERS: NewsFilter[] = [
  'all',
  'news',
  'announcements',
  'reports',
  'camps',
  'projects',
  'events',
];

/** Labels for the filter tabs (plural). */
export const NEWS_FILTER_LABELS: Record<NewsFilter, string> = {
  all: 'Усі',
  news: 'Новини',
  announcements: 'Анонси',
  reports: 'Звіти',
  camps: 'Табори',
  projects: 'Проєкти',
  events: 'Події',
};

/** Labels for the badge on a card (singular). */
export const NEWS_CATEGORY_BADGES: Record<NewsCategory, string> = {
  news: 'Новина',
  announcements: 'Анонс',
  reports: 'Звіт',
  camps: 'Табір',
  projects: 'Проєкт',
  events: 'Подія',
};
