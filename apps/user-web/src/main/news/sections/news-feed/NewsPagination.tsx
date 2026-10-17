import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/navigation';

import { buildNewsHref, NEWS_FEED_ID } from './newsQuery';
import type { NewsFilter } from './types';

type NewsPaginationProps = {
  activeFilter: NewsFilter;
  page: number;
  totalPages: number;
};

const ARROW_CLASSNAME =
  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300';

export function NewsPagination({ activeFilter, page, totalPages }: NewsPaginationProps) {
  const t = useTranslations('news.feed.pagination');

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label={t('label')} className="flex justify-center">
      <div className="flex w-max max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-5">
        {hasPrevious ? (
          <Link
            className={`${ARROW_CLASSNAME} text-brand-navy hover:bg-amber-50`}
            href={`${buildNewsHref(activeFilter, page - 1)}#${NEWS_FEED_ID}`}
            rel="prev"
          >
            <span aria-hidden="true">◀</span>
            {t('previous')}
          </Link>
        ) : (
          <span aria-disabled="true" className={`${ARROW_CLASSNAME} text-slate-300`}>
            <span aria-hidden="true">◀</span>
            {t('previous')}
          </span>
        )}

        <ul className="flex items-center gap-1 sm:gap-2">
          {pages.map((pageNumber) => {
            const isActive = pageNumber === page;

            return (
              <li key={pageNumber}>
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={t('page', { page: pageNumber })}
                  className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                    isActive ? 'bg-amber-100 text-amber-600' : 'text-brand-navy hover:bg-amber-50'
                  }`}
                  href={`${buildNewsHref(activeFilter, pageNumber)}#${NEWS_FEED_ID}`}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        </ul>

        {hasNext ? (
          <Link
            className={`${ARROW_CLASSNAME} text-brand-navy hover:bg-amber-50`}
            href={`${buildNewsHref(activeFilter, page + 1)}#${NEWS_FEED_ID}`}
            rel="next"
          >
            {t('next')}
            <span aria-hidden="true">▶</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${ARROW_CLASSNAME} text-slate-300`}>
            {t('next')}
            <span aria-hidden="true">▶</span>
          </span>
        )}
      </div>
    </nav>
  );
}
