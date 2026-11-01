import { describe, expect, it } from 'vitest';

import { parseCategoryParam } from './categories';

describe('parseCategoryParam', () => {
  it.each([
    [undefined, null],
    ['', null],
    ['News', null],
    ['<script>', null],
    ['constructor', null],
    ['camps', 'camps'],
    [['reports', 'news'], 'reports'],
  ])('parses %j as %j', (value, expected) => {
    expect(parseCategoryParam(value)).toBe(expected);
  });
});
