import { describe, expect, it } from 'vitest';

import { buildNewsHref, filterNewsItems, formatNewsDate, parseNewsFilter } from './newsQuery';
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

describe('buildNewsHref', () => {
  it.each([
    ['all', '/news'],
    ['camps', '/news?category=camps'],
  ] as const)('builds %s as %s', (filter, expected) => {
    expect(buildNewsHref(filter)).toBe(expected);
  });
});

describe('formatNewsDate', () => {
  it('formats an ISO date as DD.MM.YYYY', () => {
    expect(formatNewsDate('2026-03-09')).toBe('09.03.2026');
  });
});
