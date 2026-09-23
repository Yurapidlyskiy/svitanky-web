import 'server-only';

import { requireAdmin } from '@/features/auth/session';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import type { PostCategory } from './categories';
import { postImageUrl } from './storage';
import type { Post } from './types';

type PostRow = {
  id: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  published_on: string;
  image_path: string;
};

const LIST_LIMIT = 60;

export async function listPosts(): Promise<Post[]> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('posts')
    .select('id, category, title, excerpt, published_on, image_path')
    .order('published_on', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(LIST_LIMIT)
    .overrideTypes<PostRow[], { merge: false }>();

  if (error) throw new Error(`listPosts failed: ${error.code ?? 'unknown'}`);

  return data.map((row) => ({
    id: row.id,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    publishedOn: row.published_on,
    imageUrl: postImageUrl(supabase, row.image_path),
  }));
}
