import { useTranslations } from 'next-intl';

import { SectionHeading } from '@/shared/ui';

import { FUNDING_ITEMS } from './content';
import { FundingCard } from './FundingCard';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function FundingSection() {
  const t = useTranslations('news.funding');

  return (
    <section aria-label={t('title')} className="flex flex-col gap-10" id="funding">
      <SectionHeading size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {FUNDING_ITEMS.map((item) => (
          <FundingCard
            item={{
              accent: item.accent,
              description: t(`items.${item.id}.description`),
              icon: item.icon,
              image:
                'image' in item
                  ? { alt: t(`items.${item.id}.imageAlt`), src: item.image }
                  : undefined,
              title: t(`items.${item.id}.title`),
            }}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
