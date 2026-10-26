import { RefundPolicyPage } from '@/main/refund-policy';
import { ROUTES } from '@/shared/config/routes';
import { pageMetadata } from '@/shared/i18n/pageMetadata';
import { setRouteLocale } from '@/shared/i18n/routeLocale';

export const generateMetadata = pageMetadata('refundPolicy', ROUTES.refundPolicy);

export default async function Route({ params }: PageProps<'/[locale]/refund-policy'>) {
  await setRouteLocale(params);

  return <RefundPolicyPage />;
}
