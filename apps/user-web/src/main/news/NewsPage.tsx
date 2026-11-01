import { loadNewsPosts } from './newsPosts';
import { CampFaqSection } from './sections/camp-faq';
import { CampProgramSection } from './sections/camp-program';
import { CampsHighlightSection } from './sections/camps-highlight';
import { FundingSection } from './sections/funding';
import { filterNewsItems, parseNewsFilter } from './sections/news-feed/newsQuery';
import { NewsFeedSection } from './sections/news-feed';
import { HeroSection } from './sections/hero';
import { ProjectsHighlightSection } from './sections/projects-highlight';

type NewsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function NewsPage({ searchParams }: NewsPageProps) {
  const activeFilter = parseNewsFilter(searchParams.category);
  const posts = await loadNewsPosts();

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
        <ProjectsHighlightSection
          loadFailed={posts.failed}
          projects={posts.projects}
          status={searchParams.status}
        />
        <FundingSection />
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      <NewsFeedSection
        activeFilter={activeFilter}
        highlight={highlight}
        items={filterNewsItems(posts.items, activeFilter)}
        loadFailed={posts.failed}
        showGrid={activeFilter !== 'projects'}
      />

      {activeFilter === 'camps' ? <CampFaqSection /> : null}
    </>
  );
}
