import { HomePage } from '@/main/home';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('home', ROUTES.home);

export default async function Route({ params }: PageProps<'/[locale]'>) {
  await setRouteLocale(params);

  return <HomePage />;
}
