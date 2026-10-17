import { NewsPage } from '@/main/news';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('news', ROUTES.news);

export default async function Route({ params, searchParams }: PageProps<'/[locale]/news'>) {
  await setRouteLocale(params);

  return <NewsPage searchParams={await searchParams} />;
}
