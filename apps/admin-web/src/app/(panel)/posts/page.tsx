import type { Metadata } from 'next';

import { PostsOverview } from '@/features/posts';
import { listPosts } from '@/features/posts/queries';

export const metadata: Metadata = { title: 'Публікації — Дім Світанків' };

export default async function Route({ searchParams }: PageProps<'/posts'>) {
  const { page } = await searchParams;

  return <PostsOverview {...await listPosts(page)} />;
}
