import type { Metadata } from 'next';

import { requireAdmin } from '@/features/auth/session';
import { PostEditorScreen } from '@/features/posts';
import { parseCategoryParam } from '@/features/posts/categories';
import { todayInKyiv } from '@/features/posts/format';

export const metadata: Metadata = { title: 'Нова публікація — Дім Світанків' };

export default async function Route({ searchParams }: PageProps<'/posts/new'>) {
  await requireAdmin();
  const category = parseCategoryParam((await searchParams).category) ?? 'news';
  return <PostEditorScreen today={todayInKyiv()} category={category} />;
}
