import { describe, expect, it } from 'vitest';

import { POSTS_PAGE_SIZE, parsePageParam, resolvePage } from './pagination';

describe('parsePageParam', () => {
  it.each([
    [undefined, 1],
    ['', 1],
    ['0', 1],
    ['-2', 1],
    ['2.5', 1],
    ['<script>', 1],
    ['3', 3],
    [['4', '9'], 4],
  ])('parses %j as %i', (value, expected) => {
    expect(parsePageParam(value)).toBe(expected);
  });
});

describe('resolvePage', () => {
  it('returns the first range when there are no posts', () => {
    expect(resolvePage(1, 0)).toEqual({
      page: 1,
      totalPages: 1,
      from: 0,
      to: POSTS_PAGE_SIZE - 1,
    });
  });

  it('counts a partly filled last page', () => {
    expect(resolvePage(2, POSTS_PAGE_SIZE + 1)).toMatchObject({
      page: 2,
      totalPages: 2,
      from: POSTS_PAGE_SIZE,
    });
  });

  it('clamps a page past the end, including an absurdly large one', () => {
    expect(resolvePage(1e30, POSTS_PAGE_SIZE).page).toBe(1);
  });
});
