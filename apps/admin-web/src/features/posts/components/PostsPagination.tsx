import { buttonVariants } from '@project/common-ui';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';

import type { PostCategory } from '../categories';

type Props = {
  category: PostCategory;
  page: number;
  totalPages: number;
};

const LINK_CLASS = buttonVariants({ variant: 'outline', className: 'h-10 px-4' });

export function PostsPagination({ category, page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const pageHref = (target: number) => `${ROUTES.postsInCategory(category)}&page=${target}`;

  return (
    <nav aria-label="Сторінки публікацій" className="flex items-center justify-center gap-4">
      {page > 1 && (
        <Link href={pageHref(page - 1)} className={LINK_CLASS}>
          Назад
        </Link>
      )}
      <span className="text-sm text-brand-slate">
        Сторінка {page} з {totalPages}
      </span>
      {page < totalPages && (
        <Link href={pageHref(page + 1)} className={LINK_CLASS}>
          Далі
        </Link>
      )}
    </nav>
  );
}
