import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostEditorScreen } from '@/features/posts';
import { todayInKyiv } from '@/features/posts/format';
import { getPost } from '@/features/posts/queries';

export const metadata: Metadata = { title: 'Редагування публікації — Дім Світанків' };

export default async function Route({ params }: PageProps<'/posts/[id]/edit'>) {
  const post = await getPost((await params).id);
  if (!post) notFound();
  return <PostEditorScreen today={todayInKyiv()} post={post} />;
}
