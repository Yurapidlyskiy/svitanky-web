export type NewsCategory = 'news' | 'announcements' | 'reports' | 'camps' | 'projects';

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
  'camps',
  'projects',
  'reports',
];

// Tab labels (plural) are in `news.feed.filters`, card badges (singular) in `news.feed.badges`.
