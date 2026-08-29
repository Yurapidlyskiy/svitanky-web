import { PageIntro } from '@/shared/ui';

import { NEWS_ITEMS } from './sections/news-feed/content';
import { parseNewsFilter, selectNewsPage } from './sections/news-feed/newsQuery';
import { NewsFeedSection } from './sections/news-feed';

type NewsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export function NewsPage({ searchParams }: NewsPageProps) {
  const activeFilter = parseNewsFilter(searchParams.category);
  const { items, page, totalPages } = selectNewsPage(NEWS_ITEMS, activeFilter, searchParams.page);

  return (
    <>
      <PageIntro
        description="Тут з’являться новини, історії та найближчі події спільноти."
        title="Новини"
      />

      <NewsFeedSection
        activeFilter={activeFilter}
        items={items}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
