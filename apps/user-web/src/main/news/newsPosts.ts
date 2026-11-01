import 'server-only';

import { createClient } from '@supabase/supabase-js';

import { ROUTES } from '@/shared/config/routes';

import type { NewsCategory, NewsItem } from './sections/news-feed/types';
import type { Project, ProjectStatus } from './sections/projects-highlight/types';

export type PostRow = {
  id: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  published_on: string;
  image_path: string;
  project_status: ProjectStatus | null;
  goal_amount: number | null;
  raised_amount: number | null;
};

export type NewsPosts = {
  /** Every post, projects included: the "all" tab lists them as ordinary cards. */
  items: NewsItem[];
  /** Project posts in the shape of the projects tab's own card. */
  projects: Project[];
  failed: boolean;
};

const COLUMNS =
  'id, category, title, excerpt, published_on, image_path, project_status, goal_amount, raised_amount';
const TIMEOUT_MS = 5000;

/** Where a post will open. The page itself does not exist yet, so this is a 404 until it does. */
const hrefOf = (row: PostRow) => `${ROUTES.news}/${row.id}`;

const imageOf = (row: PostRow, supabaseUrl: string) => ({
  src: `${supabaseUrl}/storage/v1/object/public/post-images/${row.image_path}`,
  alt: row.title,
});

export function toNewsItem(row: PostRow, supabaseUrl: string): NewsItem {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: row.published_on,
    image: imageOf(row, supabaseUrl),
    href: hrefOf(row),
  };
}

/** Null for anything but a complete project row; `posts_project_fields_check` guarantees those. */
export function toProject(row: PostRow, supabaseUrl: string): Project | null {
  const { category, project_status: status, goal_amount: goal, raised_amount: raised } = row;
  if (category !== 'projects' || !status || goal === null || raised === null) return null;

  return {
    id: row.id,
    title: row.title,
    description: row.excerpt,
    href: hrefOf(row),
    image: imageOf(row, supabaseUrl),
    status,
    goal,
    raised,
  };
}

const EMPTY: NewsPosts = { items: [], projects: [], failed: false };

/** Public read through RLS with the publishable key. No session: visitors have none. */
export async function loadNewsPosts(): Promise<NewsPosts> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return EMPTY;

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from('posts')
    .select(COLUMNS)
    .order('published_on', { ascending: false })
    .order('created_at', { ascending: false })
    .abortSignal(AbortSignal.timeout(TIMEOUT_MS))
    .overrideTypes<PostRow[], { merge: false }>();

  if (error) {
    console.error('[news] posts load failed', { code: error.code });
    return { ...EMPTY, failed: true };
  }

  return {
    items: data.map((row) => toNewsItem(row, url)),
    projects: data.flatMap((row) => toProject(row, url) ?? []),
    failed: false,
  };
}
