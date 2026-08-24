import { buildNewsHref } from '@/app/news/lib/newsQuery';
import { NEWS_FILTER_LABELS, NEWS_FILTERS, type NewsFilter } from '@/app/news/types/news';
import Link from 'next/link';

type NewsFilterTabsProps = {
  activeFilter: NewsFilter;
};

export function NewsFilterTabs({ activeFilter }: NewsFilterTabsProps) {
  return (
    <nav
      aria-label="Категорії новин"
      className="-mx-5 -my-2 overflow-x-auto px-5 py-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="mx-auto flex w-max items-center gap-1 rounded-full bg-white p-2 shadow-sm sm:gap-2">
        {NEWS_FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <li key={filter}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:px-5 ${
                  isActive
                    ? 'bg-amber-400 text-white'
                    : 'text-[#004574] hover:bg-amber-50 hover:text-[#003559]'
                }`}
                href={buildNewsHref(filter)}
              >
                {NEWS_FILTER_LABELS[filter]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
