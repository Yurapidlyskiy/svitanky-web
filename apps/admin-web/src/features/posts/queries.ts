import 'server-only';

import { requireAdmin } from '@/features/auth/session';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import { type PageParam, parsePageParam, resolvePage } from './pagination';
import { fromPostRow, POST_COLUMNS, type PostRow } from './row';
import { postIdSchema } from './schema';
import { postImageUrl } from './storage';
import type { Post, PostsPage } from './types';

export async function listPosts(pageParam: PageParam): Promise<PostsPage> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  // Counted first: asking PostgREST for a range past the end is an error, and
  // the page can be past the end after its last post is deleted.
  const { count, error: countError } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true });

  if (countError) throw new Error(`listPosts count failed: ${countError.code ?? 'unknown'}`);

  const { page, totalPages, from, to } = resolvePage(parsePageParam(pageParam), count ?? 0);

  const { data, error } = await supabase
    .from('posts')
    .select(POST_COLUMNS)
    .order('published_on', { ascending: false })
    .order('created_at', { ascending: false })
    .order('id')
    .range(from, to)
    .overrideTypes<PostRow[], { merge: false }>();

  if (error) throw new Error(`listPosts failed: ${error.code ?? 'unknown'}`);

  return {
    page,
    totalPages,
    posts: data.map((row) => fromPostRow(row, postImageUrl(supabase, row.image_path))),
  };
}

/** The id comes from the URL, so it is untrusted: anything but a uuid is simply not found. */
export async function getPost(id: string): Promise<Post | null> {
  await requireAdmin();
  if (!postIdSchema.safeParse(id).success) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select(POST_COLUMNS)
    .eq('id', id)
    .maybeSingle()
    .overrideTypes<PostRow, { merge: false }>();

  if (error) throw new Error(`getPost failed: ${error.code ?? 'unknown'}`);

  return data && fromPostRow(data, postImageUrl(supabase, data.image_path));
}
