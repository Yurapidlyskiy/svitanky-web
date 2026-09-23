import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LoginScreen } from '@/features/auth';
import { safeRedirectPath } from '@/features/auth/redirect';
import { getAdmin } from '@/features/auth/session';

export const metadata: Metadata = { title: 'Вхід — Дім Світанків' };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Route({ searchParams }: Props) {
  const next = safeRedirectPath((await searchParams).next);
  if (await getAdmin()) redirect(next);
  return <LoginScreen next={next} />;
}
