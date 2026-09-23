import type { Metadata } from 'next';

import { requireAdmin } from '@/features/auth/session';
import { NewPostScreen } from '@/features/posts';
import { todayInKyiv } from '@/features/posts/format';

export const metadata: Metadata = { title: 'Нова публікація — Дім Світанків' };

export default async function Route() {
  await requireAdmin();
  return <NewPostScreen today={todayInKyiv()} />;
}
