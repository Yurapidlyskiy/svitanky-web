import { DataConsentPage } from '@/main/data-consent';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('dataConsent', ROUTES.dataConsent);

export default async function Route({ params }: PageProps<'/[locale]/data-consent'>) {
  await setRouteLocale(params);

  return <DataConsentPage />;
}
