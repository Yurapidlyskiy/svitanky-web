import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SupportThanksPage } from '@/main/support-thanks';
import { ROUTES } from '@/shared/config/routes';
import { redirect } from '@/shared/i18n/navigation';
import { setRouteLocale } from '@/shared/i18n/routeLocale';
import { getWayForPayConfig } from '@/shared/payments/wayforpay/config';
import { parseOrderReference } from '@/shared/payments/wayforpay/purchase';
import { fetchPaymentOutcome } from '@/shared/payments/wayforpay/status';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/support/thanks'>): Promise<Metadata> {
  const locale = await setRouteLocale(params);
  const t = await getTranslations({ locale, namespace: 'supportThanks.metadata' });

  // A personal receipt page: it belongs to the donor, not to search engines or the sitemap.
  return { robots: { follow: false, index: false }, title: t('title') };
}

export default async function Route({
  params,
  searchParams,
}: PageProps<'/[locale]/support/thanks'>) {
  const locale = await setRouteLocale(params);
  const { order } = await searchParams;
  const reference = typeof order === 'string' ? parseOrderReference(order) : null;

  // Opened without a payment to report on (a bookmark, a typed address): back to the form.
  if (!reference) return redirect({ href: ROUTES.support, locale });

  // The widget and the redirect only say "the window closed"; WayForPay says what happened.
  const config = getWayForPayConfig();
  const outcome = config ? await fetchPaymentOutcome(config, reference.orderReference) : 'unknown';

  return <SupportThanksPage frequency={reference.frequency} outcome={outcome} />;
}
