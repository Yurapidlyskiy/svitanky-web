import type { Metadata } from 'next';

import { PostCategoryChooser, PostsOverview } from '@/features/posts';
import { parseCategoryParam } from '@/features/posts/categories';
import { countPostsByCategory, listPosts } from '@/features/posts/queries';

export const metadata: Metadata = { title: 'Публікації — Дім Світанків' };

export default async function Route({ searchParams }: PageProps<'/posts'>) {
  const { category: categoryParam, page } = await searchParams;
  const category = parseCategoryParam(categoryParam);

  if (!category) return <PostCategoryChooser counts={await countPostsByCategory()} />;
  return <PostsOverview category={category} {...await listPosts(category, page)} />;
}
