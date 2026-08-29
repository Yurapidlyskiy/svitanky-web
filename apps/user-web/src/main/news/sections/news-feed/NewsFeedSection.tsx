import { Section } from '@/shared/ui';

import type { ReactNode } from 'react';

import type { NewsFilter, NewsItem } from './types';

import { NewsFilterTabs } from './NewsFilterTabs';
import { NewsGrid } from './NewsGrid';
import { NewsPagination } from './NewsPagination';

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
  return (
    <Section
      aria-label="Публікації спільноти"
      className="flex flex-col gap-10 pb-20 pt-4"
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
