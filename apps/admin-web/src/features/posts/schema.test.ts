import { describe, expect, it } from 'vitest';

import { parsePostFields } from './schema';

const valid = {
  category: 'news',
  title: '  Оновлення на сайті  ',
  excerpt: 'Останні події та зміни в житті спільноти',
  publishedOn: '2026-07-20',
};

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => data.set(key, value));
  return data;
};

describe('parsePostFields', () => {
  it('accepts and trims a valid post', () => {
    const result = parsePostFields(form(valid));
    expect(result.success && result.data.title).toBe('Оновлення на сайті');
  });

  it.each([
    ['unknown category', { category: 'camps' }],
    ['short title', { title: 'Ок' }],
    ['long title', { title: 'x'.repeat(121) }],
    ['short excerpt', { excerpt: 'Коротко' }],
    ['long excerpt', { excerpt: 'x'.repeat(301) }],
    ['impossible date', { publishedOn: '2026-02-30' }],
    ['malformed date', { publishedOn: '20.07.2026' }],
    ['out-of-range date', { publishedOn: '1999-12-31' }],
  ])('rejects %s', (_label, override) => {
    expect(parsePostFields(form({ ...valid, ...override })).success).toBe(false);
  });

  it('rejects missing fields', () => {
    expect(parsePostFields(new FormData()).success).toBe(false);
  });
});
