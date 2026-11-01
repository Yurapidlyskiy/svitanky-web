import { describe, expect, it } from 'vitest';

import { parsePostFields, parsePostId } from './schema';

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
    ['unknown category', { category: 'other' }],
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

  it('drops project fields from an article', () => {
    const result = parsePostFields(form({ ...valid, category: 'camps', goal: '100' }));
    expect(result.success && result.data).not.toHaveProperty('goal');
  });
});

describe('parsePostFields for a project', () => {
  const project = {
    ...valid,
    category: 'projects',
    projectStatus: 'active',
    goal: '1 200 000',
    raised: '0',
  };

  it('accepts a project and reads the amounts as numbers', () => {
    const result = parsePostFields(form(project));
    expect(result.success && result.data).toMatchObject({ goal: 1_200_000, raised: 0 });
  });

  it.each([
    ['unknown status', { projectStatus: 'closed' }],
    ['zero goal', { goal: '0' }],
    ['empty goal', { goal: '' }],
    ['fractional goal', { goal: '10.5' }],
    ['negative raised', { raised: '-1' }],
    ['too large raised', { raised: '1000000001' }],
  ])('rejects %s', (_label, override) => {
    expect(parsePostFields(form({ ...project, ...override })).success).toBe(false);
  });

  it('rejects a project with no project fields', () => {
    expect(parsePostFields(form({ ...valid, category: 'projects' })).success).toBe(false);
  });
});

describe('parsePostId', () => {
  it('accepts a uuid', () => {
    const id = '3f2b8c1e-7a4d-4e6f-9b1a-2c3d4e5f6a7b';
    expect(parsePostId(form({ id })).data).toBe(id);
  });

  it.each([
    ['a non-uuid', form({ id: '1 or 1=1' })],
    ['a missing id', new FormData()],
  ])('rejects %s', (_label, data) => {
    expect(parsePostId(data).success).toBe(false);
  });
});
