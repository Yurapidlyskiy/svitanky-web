import { useTranslations } from 'next-intl';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';
import { Section } from '@/shared/ui';

export function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <Section aria-label={t('title')} className="flex flex-1 items-center py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <p className="font-display text-7xl font-bold text-brand-amber-strong">404</p>
        <h1 className="font-heading text-3xl font-black text-brand-navy sm:text-4xl">
          {t('title')}
        </h1>
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{t('text')}</p>
        <Link
          className="rounded-xl bg-brand-navy px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber"
          href={ROUTES.home}
        >
          {t('homeLink')}
        </Link>
      </div>
    </Section>
  );
}
