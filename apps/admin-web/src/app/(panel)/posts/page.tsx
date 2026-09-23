import type { Metadata } from 'next';

import { PostsOverview } from '@/features/posts';
import { listPosts } from '@/features/posts/queries';

export const metadata: Metadata = { title: 'Публікації — Дім Світанків' };

export default async function Route() {
  return <PostsOverview posts={await listPosts()} />;
}
