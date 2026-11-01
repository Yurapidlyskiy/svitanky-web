import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import type { Post } from '../types';
import { PostForm } from './PostForm';

type Props = {
  today: string;
  /** The post being edited. Absent when creating. */
  post?: Post;
};

export function PostEditorScreen({ today, post }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6">
      <div className="grid gap-2">
        <Link
          href={ROUTES.posts}
          className="inline-flex w-fit items-center gap-1.5 text-sm text-brand-slate hover:text-brand-navy"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Усі публікації
        </Link>
        <h1 className="text-2xl font-semibold text-brand-navy">
          {post ? 'Редагування публікації' : 'Нова публікація'}
        </h1>
      </div>
      <PostForm today={today} post={post} />
    </section>
  );
}
