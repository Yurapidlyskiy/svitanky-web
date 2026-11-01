import { NEWS_FILTERS, type NewsFilter, type NewsItem } from './types';

type SearchParamValue = string | string[] | undefined;

/** Search params are untrusted input — anything unknown falls back to the default tab. */
export function parseNewsFilter(value: SearchParamValue): NewsFilter {
  const candidate = Array.isArray(value) ? value[0] : value;

  return NEWS_FILTERS.find((filter) => filter === candidate) ?? 'all';
}

export function filterNewsItems(items: NewsItem[], filter: NewsFilter): NewsItem[] {
  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const NEWS_FEED_ID = 'news-feed';

export function buildNewsHref(filter: NewsFilter): string {
  return filter === 'all' ? '/news' : `/news?category=${filter}`;
}

export function formatNewsDate(publishedAt: string): string {
  const [year, month, day] = publishedAt.split('-');

  return `${day}.${month}.${year}`;
}
