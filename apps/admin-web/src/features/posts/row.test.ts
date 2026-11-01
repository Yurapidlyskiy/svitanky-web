import { describe, expect, it } from 'vitest';

import { fromPostRow, type PostRow, toPostColumns } from './row';

const common = { title: 'Заголовок', excerpt: 'Опис публікації', publishedOn: '2026-11-01' };

const row: PostRow = {
  id: 'a',
  category: 'projects',
  title: 'Заголовок',
  excerpt: 'Опис публікації',
  published_on: '2026-11-01',
  image_path: '2026/a.jpg',
  project_status: 'planned',
  goal_amount: 500,
  raised_amount: 20,
};

describe('toPostColumns', () => {
  it('clears the project columns for an article', () => {
    expect(toPostColumns({ ...common, category: 'camps' })).toMatchObject({
      category: 'camps',
      project_status: null,
      goal_amount: null,
      raised_amount: null,
    });
  });

  it('writes the project columns for a project', () => {
    const fields = {
      ...common,
      category: 'projects' as const,
      projectStatus: 'active' as const,
      goal: 100,
      raised: 0,
    };

    expect(toPostColumns(fields)).toMatchObject({
      project_status: 'active',
      goal_amount: 100,
      raised_amount: 0,
    });
  });
});

describe('fromPostRow', () => {
  it('reads a project with its details', () => {
    expect(fromPostRow(row, 'https://x/a.jpg')).toMatchObject({
      category: 'projects',
      imageUrl: 'https://x/a.jpg',
      project: { status: 'planned', goal: 500, raised: 20 },
    });
  });

  it('gives an article no project details', () => {
    const article = { ...row, category: 'news' as const };

    expect(fromPostRow(article, 'https://x/a.jpg')).not.toHaveProperty('project');
  });
});
