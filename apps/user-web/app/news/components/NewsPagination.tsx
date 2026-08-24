import { buildNewsHref } from '@/app/news/lib/newsQuery';
import type { NewsFilter } from '@/app/news/types/news';
import Link from 'next/link';

type NewsPaginationProps = {
  activeFilter: NewsFilter;
  page: number;
  totalPages: number;
};

const ARROW_CLASSNAME =
  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300';

export function NewsPagination({ activeFilter, page, totalPages }: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label="Навігація сторінками новин" className="flex justify-center">
      <div className="flex w-max max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-5">
        {hasPrevious ? (
          <Link
            className={`${ARROW_CLASSNAME} text-[#004574] hover:bg-amber-50`}
            href={buildNewsHref(activeFilter, page - 1)}
            rel="prev"
          >
            <span aria-hidden="true">◀</span>
            Попередня
          </Link>
        ) : (
          <span aria-disabled="true" className={`${ARROW_CLASSNAME} text-slate-300`}>
            <span aria-hidden="true">◀</span>
            Попередня
          </span>
        )}

        <ul className="flex items-center gap-1 sm:gap-2">
          {pages.map((pageNumber) => {
            const isActive = pageNumber === page;

            return (
              <li key={pageNumber}>
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Сторінка ${pageNumber}`}
                  className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                    isActive ? 'bg-amber-100 text-amber-600' : 'text-[#004574] hover:bg-amber-50'
                  }`}
                  href={buildNewsHref(activeFilter, pageNumber)}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        </ul>

        {hasNext ? (
          <Link
            className={`${ARROW_CLASSNAME} text-[#004574] hover:bg-amber-50`}
            href={buildNewsHref(activeFilter, page + 1)}
            rel="next"
          >
            Наступна
            <span aria-hidden="true">▶</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${ARROW_CLASSNAME} text-slate-300`}>
            Наступна
            <span aria-hidden="true">▶</span>
          </span>
        )}
      </div>
    </nav>
  );
}
