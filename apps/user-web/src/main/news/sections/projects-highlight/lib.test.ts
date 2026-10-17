import { describe, expect, it } from 'vitest';

import { buildProjectsHref, formatAmount, parseProjectFilter, selectProjects } from './lib';
import type { Project, ProjectStatus } from './types';

const project = (id: string, status: ProjectStatus): Project => ({
  description: '',
  goal: 100,
  href: '/news',
  id,
  image: { alt: '', src: '/x.jpg' },
  raised: 0,
  status,
  title: id,
});

const PROJECTS = [
  project('done', 'completed'),
  project('soon', 'planned'),
  project('now', 'active'),
  project('now-2', 'active'),
];

describe('formatAmount', () => {
  it('groups thousands the Ukrainian way', () => {
    // uk-UA uses a non-breaking space as the group separator.
    expect(formatAmount(1250000, 'uk')).toBe('1\u00a0250\u00a0000');
  });

  it('follows the locale', () => {
    expect(formatAmount(1250000, 'en')).toBe('1,250,000');
  });

  it('leaves small numbers as they are', () => {
    expect(formatAmount(950, 'uk')).toBe('950');
  });
});

describe('parseProjectFilter', () => {
  it.each(['all', 'active', 'planned', 'completed'])('accepts %s', (value) => {
    expect(parseProjectFilter(value)).toBe(value);
  });

  it.each([undefined, '', 'ACTIVE', 'closed', '<script>'])('falls back to all for %s', (value) => {
    expect(parseProjectFilter(value)).toBe('all');
  });

  it('takes the first value of a repeated param', () => {
    expect(parseProjectFilter(['planned', 'active'])).toBe('planned');
  });
});

describe('selectProjects', () => {
  it('keeps only the chosen status', () => {
    expect(selectProjects(PROJECTS, 'active').map((p) => p.id)).toEqual(['now', 'now-2']);
    expect(selectProjects(PROJECTS, 'completed').map((p) => p.id)).toEqual(['done']);
  });

  it('lists everything active first and completed last', () => {
    expect(selectProjects(PROJECTS, 'all').map((p) => p.id)).toEqual([
      'now',
      'now-2',
      'soon',
      'done',
    ]);
  });

  it('does not reorder the source list', () => {
    selectProjects(PROJECTS, 'all');

    expect(PROJECTS[0]!.id).toBe('done');
  });
});

describe('buildProjectsHref', () => {
  it.each([
    ['all', '/news?category=projects'],
    ['active', '/news?category=projects&status=active'],
    ['completed', '/news?category=projects&status=completed'],
  ] as const)('%s → %s', (filter, href) => {
    expect(buildProjectsHref(filter)).toBe(href);
  });
});
