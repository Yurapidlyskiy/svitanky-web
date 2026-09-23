import { buttonVariants } from '@project/common-ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import type { Post } from '../types';
import { PostCard } from './PostCard';

type Props = {
  posts: Post[];
};

export function PostsOverview({ posts }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Публікації</h1>
          <p className="mt-1 text-sm text-brand-slate">
            Новини, анонси та звіти для сторінки новин на сайті.
          </p>
        </div>
        <Link
          href={ROUTES.newPost}
          className={buttonVariants({ className: 'h-10 gap-1.5 px-4 font-semibold' })}
        >
          <Plus aria-hidden />
          Додати публікацію
        </Link>
      </header>

      {posts.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostCard post={post} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
          <p className="font-medium text-brand-navy">Ще немає жодної публікації</p>
          <p className="mt-1 text-sm text-brand-slate">
            Створіть першу — вона одразу з&apos;явиться в цьому списку.
          </p>
        </div>
      )}
    </section>
  );
}
