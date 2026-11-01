import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Section } from '@/shared/ui';

import { NewsFilterTabs } from './NewsFilterTabs';
import { NewsGrid } from './NewsGrid';
import { NEWS_FEED_ID } from './newsQuery';
import type { NewsFilter, NewsItem } from './types';

type NewsFeedSectionProps = {
  activeFilter: NewsFilter;
  /** Extra content rendered between the tabs and the grid — e.g. the camps highlight UI. */
  highlight?: ReactNode;
  items: NewsItem[];
  /** The posts could not be fetched: the grid says so instead of "nothing here yet". */
  loadFailed: boolean;
  /** Hide the article grid — e.g. the projects highlight replaces it entirely. */
  showGrid?: boolean;
};

export function NewsFeedSection({
  activeFilter,
  highlight,
  items,
  loadFailed,
  showGrid = true,
}: NewsFeedSectionProps) {
  const t = useTranslations('news.feed');

  return (
    <Section
      aria-label={t('label')}
      className="flex flex-col gap-10 pt-10 pb-20 sm:pt-14 lg:pt-20 [&:has([data-news-pending])_[data-news-grid]]:opacity-50"
      id={NEWS_FEED_ID}
      width="wide"
    >
      <NewsFilterTabs activeFilter={activeFilter} />

      {highlight}

      {showGrid ? (
        // Dims while the next tab loads; the key replays the fade when it arrives.
        <div className="mx-auto w-full max-w-7xl transition-opacity duration-200" data-news-grid>
          <div
            className="animate-in fade-in duration-200 motion-reduce:animate-none"
            key={activeFilter}
          >
            <NewsGrid items={items} loadFailed={loadFailed} />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
