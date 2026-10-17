import { ActivitiesPage } from '@/main/activities';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('activities', ROUTES.activities);

export default async function Route({ params }: PageProps<'/[locale]/activities'>) {
  await setRouteLocale(params);

  return <ActivitiesPage />;
}
