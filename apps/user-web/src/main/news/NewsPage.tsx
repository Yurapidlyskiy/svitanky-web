import { PageIntro } from '@/shared/ui';

import { CampFaqSection } from './sections/camp-faq';
import { CampProgramSection } from './sections/camp-program';
import { CampsHighlightSection } from './sections/camps-highlight';
import { NEWS_ITEMS } from './sections/news-feed/content';
import { parseNewsFilter, selectNewsPage } from './sections/news-feed/newsQuery';
import { NewsFeedSection } from './sections/news-feed';
import { ProjectsHighlightSection } from './sections/projects-highlight';
import { ProjectsResultsSection } from './sections/projects-results';

type NewsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export function NewsPage({ searchParams }: NewsPageProps) {
  const activeFilter = parseNewsFilter(searchParams.category);
  const { items, page, totalPages } = selectNewsPage(NEWS_ITEMS, activeFilter, searchParams.page);

  let highlight = null;

  if (activeFilter === 'camps') {
    highlight = (
      <div className="flex flex-col gap-14 lg:gap-16">
        <CampsHighlightSection />
        <CampProgramSection />
      </div>
    );
  } else if (activeFilter === 'projects') {
    highlight = (
      <div className="flex flex-col gap-14 lg:gap-16">
        <ProjectsHighlightSection />
        <ProjectsResultsSection />
      </div>
    );
  }

  return (
    <>
      <PageIntro
        description="Тут з’являться новини, історії та найближчі події спільноти."
        title="Новини"
      />

      <NewsFeedSection
        activeFilter={activeFilter}
        highlight={highlight}
        items={items}
        page={page}
        showGrid={activeFilter !== 'projects'}
        totalPages={totalPages}
      />

      {activeFilter === 'camps' ? <CampFaqSection /> : null}
    </>
  );
}
