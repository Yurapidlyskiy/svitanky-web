import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/navigation';

import { buildNewsHref } from './newsQuery';
import { NEWS_FILTERS, type NewsFilter } from './types';

type NewsFilterTabsProps = {
  activeFilter: NewsFilter;
};

export function NewsFilterTabs({ activeFilter }: NewsFilterTabsProps) {
  const t = useTranslations('news.feed');

  return (
    <nav
      aria-label={t('tabsLabel')}
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
                    : 'text-brand-navy hover:bg-amber-50 hover:text-[#003559]'
                }`}
                href={buildNewsHref(filter)}
                scroll={false}
              >
                {t(`filters.${filter}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
