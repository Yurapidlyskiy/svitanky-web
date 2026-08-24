import { PageIntro } from '@/app/components/content/PageIntro';
import { NewsFilterTabs, NewsGrid, NewsPagination } from '@/app/news/components';
import { NEWS_ITEMS } from '@/app/news/data/newsItems';
import { parseNewsFilter, selectNewsPage } from '@/app/news/lib/newsQuery';

type NewsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const activeFilter = parseNewsFilter(params.category);
  const { items, page, totalPages } = selectNewsPage(NEWS_ITEMS, activeFilter, params.page);

  return (
    <>
      <PageIntro
        description="Тут з’являться новини, історії та найближчі події спільноти."
        title="Новини"
      />

      <section
        aria-label="Публікації спільноти"
        className="flex flex-col gap-10 bg-[#FFFDF8] px-5 pb-20 pt-4 sm:px-8 lg:px-12 xl:px-[100px]"
      >
        <NewsFilterTabs activeFilter={activeFilter} />

        <div className="mx-auto w-full max-w-7xl">
          <NewsGrid items={items} />
        </div>

        <NewsPagination activeFilter={activeFilter} page={page} totalPages={totalPages} />
      </section>
    </>
  );
}
