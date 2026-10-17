import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Section } from '@/shared/ui';

import { NewsFilterTabs } from './NewsFilterTabs';
import { NewsGrid } from './NewsGrid';
import { NewsPagination } from './NewsPagination';
import { NEWS_FEED_ID } from './newsQuery';
import type { NewsFilter, NewsItem } from './types';

type NewsFeedSectionProps = {
  activeFilter: NewsFilter;
  /** Extra content rendered between the tabs and the grid — e.g. the camps highlight UI. */
  highlight?: ReactNode;
  items: NewsItem[];
  page: number;
  /** Hide the article grid and pagination — e.g. the projects highlight replaces it entirely. */
  showGrid?: boolean;
  totalPages: number;
};

export function NewsFeedSection({
  activeFilter,
  highlight,
  items,
  page,
  showGrid = true,
  totalPages,
}: NewsFeedSectionProps) {
  const t = useTranslations('news.feed');

  return (
    <Section
      aria-label={t('label')}
      className="flex flex-col gap-10 pt-10 pb-20 sm:pt-14 lg:pt-20"
      id={NEWS_FEED_ID}
      width="wide"
    >
      <NewsFilterTabs activeFilter={activeFilter} />

      {highlight}

      {showGrid ? (
        <>
          <div className="mx-auto w-full max-w-7xl">
            <NewsGrid items={items} />
          </div>

          <NewsPagination activeFilter={activeFilter} page={page} totalPages={totalPages} />
        </>
      ) : null}
    </Section>
  );
}
