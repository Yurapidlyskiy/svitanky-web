import { buttonVariants, cn } from '@project/common-ui';
import { Pencil, Plus } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import { POST_CATEGORY_PLURAL_LABELS, type PostCategory, PROJECT_CATEGORY } from '../categories';
import type { PostsPage } from '../types';
import { BackLink } from './BackLink';
import { DeletePostButton } from './DeletePostButton';
import { PostCard } from './PostCard';
import { PostsPagination } from './PostsPagination';

type Props = PostsPage & {
  category: PostCategory;
};

export function PostsOverview({ category, posts, page, totalPages }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2">
          <BackLink href={ROUTES.posts}>Усі категорії</BackLink>
          <h1 className="text-2xl font-semibold text-brand-navy">
            {POST_CATEGORY_PLURAL_LABELS[category]}
          </h1>
        </div>
        <Link
          href={ROUTES.newPost(category)}
          className={buttonVariants({ className: 'h-10 gap-1.5 px-4 font-semibold' })}
        >
          <Plus aria-hidden />
          Додати публікацію
        </Link>
      </header>

      {posts.length > 0 ? (
        <>
          <ul className="grid grid-flow-row-dense gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              // A project card is wide, like on the site, so it takes the whole row.
              <li
                key={post.id}
                className={cn(post.category === PROJECT_CATEGORY && 'sm:col-span-2 lg:col-span-3')}
              >
                <PostCard
                  post={post}
                  priority={index < 3}
                  actions={
                    <>
                      <Link
                        href={ROUTES.editPost(post.id)}
                        aria-label={`Редагувати публікацію «${post.title}»`}
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'icon',
                          className: 'size-10 rounded-xl bg-brand-sky/20 text-brand-navy',
                        })}
                      >
                        <Pencil aria-hidden className="size-5" />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </>
                  }
                />
              </li>
            ))}
          </ul>
          <PostsPagination category={category} page={page} totalPages={totalPages} />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
          <p className="font-medium text-brand-navy">У цій категорії ще немає публікацій</p>
          <p className="mt-1 text-sm text-brand-slate">
            Створіть першу — вона одразу з&apos;явиться в цьому списку.
          </p>
        </div>
      )}
    </section>
  );
}
