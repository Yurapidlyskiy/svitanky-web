import { describe, expect, it } from 'vitest';

import {
  buildNewsHref,
  filterNewsItems,
  formatNewsDate,
  NEWS_PAGE_SIZE,
  parseNewsFilter,
  selectNewsPage,
} from './newsQuery';
import type { NewsCategory, NewsItem } from './types';

function newsItem(id: number, category: NewsCategory, publishedAt: string): NewsItem {
  return {
    category,
    excerpt: 'Опис',
    href: `/news/${id}`,
    id: String(id),
    image: { alt: '', src: '/image.png' },
    publishedAt,
    title: `Новина ${id}`,
  };
}

// 14 items: ids 1..14, one day apart, so newest-first order is 14, 13, …, 1.
const ITEMS = Array.from({ length: 14 }, (_, index) =>
  newsItem(
    index + 1,
    index % 2 === 0 ? 'news' : 'camps',
    `2026-01-${String(index + 1).padStart(2, '0')}`
  )
);

describe('parseNewsFilter', () => {
  it.each(['news', 'announcements', 'reports', 'camps', 'projects'])('accepts %s', (value) => {
    expect(parseNewsFilter(value)).toBe(value);
  });

  it('takes the first value of a repeated param', () => {
    expect(parseNewsFilter(['camps', 'news'])).toBe('camps');
  });

  it.each([undefined, '', 'CAMPS', 'unknown', '<script>', ['bogus']])(
    'falls back to "all" for %j',
    (value) => {
      expect(parseNewsFilter(value)).toBe('all');
    }
  );
});

describe('filterNewsItems', () => {
  it('sorts newest first without mutating the input', () => {
    const input = [...ITEMS];
    const result = filterNewsItems(input, 'all');

    expect(result.map((item) => item.id).slice(0, 3)).toEqual(['14', '13', '12']);
    expect(input).toEqual(ITEMS);
  });

  it('keeps only the selected category', () => {
    const result = filterNewsItems(ITEMS, 'camps');

    expect(result).toHaveLength(7);
    expect(result.every((item) => item.category === 'camps')).toBe(true);
  });
});

describe('selectNewsPage', () => {
  it('returns the first page by default', () => {
    const result = selectNewsPage(ITEMS, 'all', undefined);

    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(Math.ceil(ITEMS.length / NEWS_PAGE_SIZE));
    expect(result.items).toHaveLength(NEWS_PAGE_SIZE);
  });

  it('returns the remainder on the last page', () => {
    const result = selectNewsPage(ITEMS, 'all', '3');

    expect(result.page).toBe(3);
    expect(result.items.map((item) => item.id)).toEqual(['2', '1']);
  });

  it.each([
    ['999', 3],
    ['0', 1],
    ['-2', 1],
    ['1.5', 1],
    ['abc', 1],
    ['', 1],
  ])('clamps page=%j to %i', (pageParam, expected) => {
    expect(selectNewsPage(ITEMS, 'all', pageParam).page).toBe(expected);
  });

  it('keeps one empty page when nothing matches', () => {
    expect(selectNewsPage(ITEMS, 'reports', '5')).toEqual({ items: [], page: 1, totalPages: 1 });
  });
});

describe('buildNewsHref', () => {
  it.each([
    ['all', 1, '/news'],
    ['all', 2, '/news?page=2'],
    ['camps', 1, '/news?category=camps'],
    ['camps', 3, '/news?category=camps&page=3'],
  ] as const)('builds %s page %i as %s', (filter, page, expected) => {
    expect(buildNewsHref(filter, page)).toBe(expected);
  });
});

describe('formatNewsDate', () => {
  it('formats an ISO date as DD.MM.YYYY', () => {
    expect(formatNewsDate('2026-03-09')).toBe('09.03.2026');
  });
});
