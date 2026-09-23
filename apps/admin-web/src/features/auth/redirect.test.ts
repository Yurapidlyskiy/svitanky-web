import { describe, expect, it } from 'vitest';

import { safeRedirectPath } from './redirect';

describe('safeRedirectPath', () => {
  it.each([
    ['/news', '/news'],
    ['/news?page=2#top', '/news?page=2#top'],
    ['/a/../b', '/b'],
  ])('keeps same-origin path %s', (input, expected) => {
    expect(safeRedirectPath(input)).toBe(expected);
  });

  it.each([
    'https://evil.com',
    '//evil.com',
    '/\\evil.com',
    '/\\/evil.com',
    'javascript:alert(1)',
    'news',
    '',
    '/login',
    '/login?next=/x',
    undefined,
    ['/news'],
  ])('falls back to the dashboard for %j', (input) => {
    expect(safeRedirectPath(input)).toBe('/');
  });
});
