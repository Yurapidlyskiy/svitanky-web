import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/navigation';

import { NewsLinkPending } from './NewsLinkPending';
import { buildNewsHref } from './newsQuery';
import { NEWS_FILTERS, type NewsFilter } from './types';

type NewsFilterTabsProps = {
  activeFilter: NewsFilter;
};

export function NewsFilterTabs({ activeFilter }: NewsFilterTabsProps) {
  const t = useTranslations('news.feed');

  return (
    <nav aria-label={t('tabsLabel')}>
      {/* Always one row: on a phone the type and padding shrink with the screen so all tabs fit. */}
      <ul className="mx-auto flex w-full rounded-full bg-white p-1 shadow-sm sm:w-fit sm:gap-2 sm:p-2">
        {NEWS_FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <li key={filter} className="flex-auto sm:flex-none">
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-center rounded-full px-[clamp(0.25rem,1.2vw,0.75rem)] py-2 text-[clamp(0.6875rem,3.4vw,0.875rem)] font-bold whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? 'bg-amber-400 text-white'
                    : 'text-brand-navy hover:bg-amber-50 hover:text-[#003559]'
                }`}
                href={buildNewsHref(filter)}
                scroll={false}
              >
                {t(`filters.${filter}`)}
                <NewsLinkPending />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
