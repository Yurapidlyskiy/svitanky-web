import { buttonVariants } from '@project/common-ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import { POST_CATEGORIES, POST_CATEGORY_PLURAL_LABELS, type PostCategory } from '../categories';

type Props = {
  counts: Record<PostCategory, number>;
};

export function PostCategoryChooser({ counts }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-brand-navy">Публікації</h1>
        <p className="mt-1 text-sm text-brand-slate">
          Оберіть категорію, щоб переглянути її публікації або додати нову.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POST_CATEGORIES.map((category) => {
          const label = POST_CATEGORY_PLURAL_LABELS[category];
          return (
            <li key={category} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm">
              <Link href={ROUTES.postsInCategory(category)} className="group grid gap-1">
                <span className="text-lg font-semibold text-brand-navy group-hover:underline">
                  {label}
                </span>
                <span className="text-sm text-brand-slate">Публікацій: {counts[category]}</span>
              </Link>
              <Link
                href={ROUTES.newPost(category)}
                aria-label={`Додати публікацію в категорію «${label}»`}
                className={buttonVariants({ className: 'h-10 gap-1.5 px-4 font-semibold' })}
              >
                <Plus aria-hidden />
                Додати
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
