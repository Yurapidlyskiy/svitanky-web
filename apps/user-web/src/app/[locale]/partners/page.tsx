import { PartnersPage } from '@/main/partners';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('partners', ROUTES.partners);

export default async function Route({ params }: PageProps<'/[locale]/partners'>) {
  await setRouteLocale(params);

  return <PartnersPage />;
}
