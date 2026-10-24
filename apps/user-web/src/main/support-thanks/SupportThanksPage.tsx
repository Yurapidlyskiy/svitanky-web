import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { contactDetails } from '@/shared/config/contacts';
import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';
import type { DonationFrequency } from '@/shared/payments/donation/frequency';
import type { PaymentOutcome } from '@/shared/payments/wayforpay/status';
import { Section } from '@/shared/ui';

const ICON_SHAPE: Record<PaymentOutcome, ReactNode> = {
  approved: <path d="M5 13l4 4L19 7" />,
  failed: <path d="M6 6l12 12M18 6L6 18" />,
  processing: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  unknown: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
};

const actionClassName =
  'inline-flex w-full items-center justify-center rounded-full px-7 py-3.5 text-center font-bold shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto';
const primaryClassName = `${actionClassName} bg-brand-amber-strong text-brand-navy hover:bg-brand-amber focus-visible:outline-brand-amber-strong`;
const secondaryClassName = `${actionClassName} border border-brand-sky-pale bg-canvas text-brand-navy hover:bg-brand-sky-mist focus-visible:outline-brand-navy`;

type SupportThanksPageProps = {
  frequency: DonationFrequency;
  outcome: PaymentOutcome;
};

/** What the donor sees after the payment window closes, according to WayForPay's own status. */
export function SupportThanksPage({ frequency, outcome }: SupportThanksPageProps) {
  const t = useTranslations('supportThanks');
  const key =
    outcome === 'approved'
      ? frequency === 'monthly'
        ? 'approved.monthly'
        : 'approved.oneTime'
      : outcome;
  const values = {
    email: contactDetails.email,
    mail: (chunks: ReactNode) => (
      <a
        className="font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy"
        href={`mailto:${contactDetails.email}`}
      >
        {chunks}
      </a>
    ),
  };

  return (
    <Section
      aria-label={t('label')}
      className="flex flex-1 items-center py-16 lg:py-24"
      id="support-thanks"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 rounded-[32px] border border-brand-sky-pale/60 bg-white px-6 py-10 text-center shadow-sm sm:px-12">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-amber/30 text-brand-navy">
          <svg
            aria-hidden="true"
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {ICON_SHAPE[outcome]}
          </svg>
        </span>

        <h1 className="font-heading text-3xl font-black text-brand-navy sm:text-4xl">
          {t(`${key}.title`)}
        </h1>

        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
          {t.rich(`${key}.text`, values)}
        </p>

        {key === 'approved.monthly' ? (
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            {t.rich('approved.monthly.manage', values)}
          </p>
        ) : null}

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          {outcome === 'failed' ? (
            <Link className={primaryClassName} href={`${ROUTES.support}#become-ray`}>
              {t('actions.retry')}
            </Link>
          ) : null}
          <Link
            className={outcome === 'failed' ? secondaryClassName : primaryClassName}
            href={ROUTES.home}
          >
            {t('actions.home')}
          </Link>
        </div>
      </div>
    </Section>
  );
}
