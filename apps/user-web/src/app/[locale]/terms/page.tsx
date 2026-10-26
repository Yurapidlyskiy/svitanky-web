import { TermsPage } from '@/main/terms';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('terms', ROUTES.terms);

export default async function Route({ params }: PageProps<'/[locale]/terms'>) {
  await setRouteLocale(params);

  return <TermsPage />;
}
