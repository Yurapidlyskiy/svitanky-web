import { PrivacyPolicyPage } from '@/main/privacy-policy';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('privacyPolicy', ROUTES.privacyPolicy);

export default async function Route({ params }: PageProps<'/[locale]/privacy-policy'>) {
  await setRouteLocale(params);

  return <PrivacyPolicyPage />;
}
