import { NEWS_FILTERS, type NewsFilter, type NewsItem } from './types';

export const NEWS_PAGE_SIZE = 6;

type SearchParamValue = string | string[] | undefined;

/** Search params are untrusted input — anything unknown falls back to the default tab. */
export function parseNewsFilter(value: SearchParamValue): NewsFilter {
  const candidate = Array.isArray(value) ? value[0] : value;

  return NEWS_FILTERS.find((filter) => filter === candidate) ?? 'all';
}

function parsePageNumber(value: SearchParamValue): number {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate || !/^\d+$/.test(candidate)) return 1;

  return Number.parseInt(candidate, 10);
}

export function filterNewsItems(items: NewsItem[], filter: NewsFilter): NewsItem[] {
  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export type NewsPage = {
  items: NewsItem[];
  page: number;
  totalPages: number;
};

export function selectNewsPage(
  items: NewsItem[],
  filter: NewsFilter,
  pageParam: SearchParamValue
): NewsPage {
  const filtered = filterNewsItems(items, filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / NEWS_PAGE_SIZE));
  const page = Math.min(Math.max(parsePageNumber(pageParam), 1), totalPages);
  const start = (page - 1) * NEWS_PAGE_SIZE;

  return {
    items: filtered.slice(start, start + NEWS_PAGE_SIZE),
    page,
    totalPages,
  };
}

export function buildNewsHref(filter: NewsFilter, page = 1): string {
  const params = new URLSearchParams();

  if (filter !== 'all') params.set('category', filter);
  if (page > 1) params.set('page', String(page));

  const query = params.toString();

  return query ? `/news?${query}` : '/news';
}

export function formatNewsDate(publishedAt: string): string {
  const [year, month, day] = publishedAt.split('-');

  return `${day}.${month}.${year}`;
}
