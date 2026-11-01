import { afterEach, describe, expect, it, vi } from 'vitest';

import { loadNewsPosts, type PostRow, toNewsItem, toProject } from './newsPosts';

const SUPABASE_URL = 'https://example.supabase.co';
const IMAGE_SRC = `${SUPABASE_URL}/storage/v1/object/public/post-images/2026/photo.jpg`;

const article: PostRow = {
  id: 'a',
  category: 'camps',
  title: 'Заголовок',
  excerpt: 'Опис публікації',
  published_on: '2026-11-01',
  image_path: '2026/photo.jpg',
  project_status: null,
  goal_amount: null,
  raised_amount: null,
};

const project: PostRow = {
  ...article,
  id: 'b',
  category: 'projects',
  project_status: 'planned',
  goal_amount: 1000,
  raised_amount: 0,
};

const stubConfigured = () => {
  vi.stubEnv('SUPABASE_URL', SUPABASE_URL);
  vi.stubEnv('SUPABASE_ANON_KEY', 'sandbox_key_here');
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('toNewsItem', () => {
  it('maps a row and builds the public image url and the link to the post', () => {
    expect(toNewsItem(article, SUPABASE_URL)).toEqual({
      id: 'a',
      category: 'camps',
      title: 'Заголовок',
      excerpt: 'Опис публікації',
      publishedAt: '2026-11-01',
      image: { src: IMAGE_SRC, alt: 'Заголовок' },
      href: '/news/a',
    });
  });
});

describe('toProject', () => {
  it('maps a project, keeping a raised amount of zero', () => {
    expect(toProject(project, SUPABASE_URL)).toEqual({
      id: 'b',
      title: 'Заголовок',
      description: 'Опис публікації',
      href: '/news/b',
      image: { src: IMAGE_SRC, alt: 'Заголовок' },
      status: 'planned',
      goal: 1000,
      raised: 0,
    });
  });

  it('skips anything that is not a complete project', () => {
    expect(toProject(article, SUPABASE_URL)).toBeNull();
    expect(toProject({ ...project, goal_amount: null }, SUPABASE_URL)).toBeNull();
  });
});

describe('loadNewsPosts', () => {
  it('is an empty feed, not a failure, without Supabase settings', async () => {
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_ANON_KEY', '');

    await expect(loadNewsPosts()).resolves.toEqual({ items: [], projects: [], failed: false });
  });

  it('splits the rows into feed items and projects', async () => {
    stubConfigured();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json([article, project])));

    const posts = await loadNewsPosts();

    expect(posts.items.map((item) => item.id)).toEqual(['a', 'b']);
    expect(posts.projects.map((item) => item.id)).toEqual(['b']);
    expect(posts.failed).toBe(false);
  });

  it('reports a failure instead of throwing when the database answers with an error', async () => {
    stubConfigured();
    // A 500, because a network error is retried with backoff until the 5 s timeout.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(Response.json({ code: 'XX000', message: 'down' }, { status: 500 }))
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(loadNewsPosts()).resolves.toEqual({ items: [], projects: [], failed: true });
  });
});
