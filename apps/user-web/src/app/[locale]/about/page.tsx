import { AboutPage } from '@/main/about';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('about', ROUTES.about);

export default async function Route({ params }: PageProps<'/[locale]/about'>) {
  await setRouteLocale(params);

  return <AboutPage />;
}
