import { Section } from '@/shared/ui';

import type { NewsFilter, NewsItem } from './types';

import { NewsFilterTabs } from './NewsFilterTabs';
import { NewsGrid } from './NewsGrid';
import { NewsPagination } from './NewsPagination';

type NewsFeedSectionProps = {
  activeFilter: NewsFilter;
  items: NewsItem[];
  page: number;
  totalPages: number;
};

export function NewsFeedSection({ activeFilter, items, page, totalPages }: NewsFeedSectionProps) {
  return (
    <Section
      aria-label="Публікації спільноти"
      className="flex flex-col gap-10 pb-20 pt-4"
      width="wide"
    >
      <NewsFilterTabs activeFilter={activeFilter} />

      <div className="mx-auto w-full max-w-7xl">
        <NewsGrid items={items} />
      </div>

      <NewsPagination activeFilter={activeFilter} page={page} totalPages={totalPages} />
    </Section>
  );
}
