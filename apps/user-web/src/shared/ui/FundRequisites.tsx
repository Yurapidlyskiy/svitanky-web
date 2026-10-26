import { useTranslations } from 'next-intl';

import { contactDetails } from '@/shared/config/contacts';
import { FUND_REGISTRATION } from '@/shared/config/fund';

/** The foundation's registration details and contacts, closing the legal documents. */
export function FundRequisites() {
  const t = useTranslations('legal.requisites');
  const rows = [
    { label: t('nameLabel'), value: t('name') },
    { label: t('codeLabel'), value: FUND_REGISTRATION.edrpou },
    { label: t('addressLabel'), value: t('address') },
    { label: t('emailLabel'), value: contactDetails.email },
    { label: t('phoneLabel'), value: contactDetails.phone },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-brand-sky-pale bg-white p-6 sm:p-8">
      <h2 className="font-heading text-xl font-black text-brand-navy sm:text-2xl">{t('title')}</h2>
      <dl className="grid gap-x-6 gap-y-2 text-base sm:grid-cols-[auto_1fr]">
        {rows.map(({ label, value }) => (
          <div className="contents" key={label}>
            <dt className="font-bold text-brand-navy">{label}</dt>
            <dd className="text-slate-700">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
