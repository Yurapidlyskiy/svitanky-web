import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { contactDetails } from '@/shared/config/contacts';
import { FUND_REGISTRATION } from '@/shared/config/fund';
import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

const linkClassName =
  'font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy';

function pageLink(href: string) {
  return function LegalLink(chunks: ReactNode) {
    return (
      <Link className={linkClassName} href={href}>
        {chunks}
      </Link>
    );
  };
}

/**
 * Tags and values for `t.rich` on the legal pages: paragraphs and lists, links between the
 * documents, and the foundation's details, so each placeholder is filled in one place.
 */
export function useLegalRichText() {
  const t = useTranslations('legal.requisites');

  return {
    b: (chunks: ReactNode) => <strong className="font-bold text-brand-navy">{chunks}</strong>,
    consent: pageLink(ROUTES.dataConsent),
    edrpou: FUND_REGISTRATION.edrpou,
    email: contactDetails.email,
    fundName: t('name'),
    li: (chunks: ReactNode) => <li>{chunks}</li>,
    mail: (chunks: ReactNode) => (
      <a className={linkClassName} href={`mailto:${contactDetails.email}`}>
        {chunks}
      </a>
    ),
    p: (chunks: ReactNode) => <p>{chunks}</p>,
    privacy: pageLink(ROUTES.privacyPolicy),
    refund: pageLink(ROUTES.refundPolicy),
    terms: pageLink(ROUTES.terms),
    ul: (chunks: ReactNode) => <ul className="flex list-disc flex-col gap-2 pl-6">{chunks}</ul>,
  };
}
