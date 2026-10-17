import { SupportPage } from '@/main/support';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('support', ROUTES.support);

export default async function Route({ params }: PageProps<'/[locale]/support'>) {
  await setRouteLocale(params);

  return <SupportPage />;
}
