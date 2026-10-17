import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { FUNDING_ITEMS } from './content';
import { FundingCard } from './FundingCard';

export function FundingSection() {
  const t = useTranslations('support.funding');

  return (
    <Section aria-label={t('title')} className="pb-16 lg:pb-20" id="funding">
      <SectionHeading size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
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
    </Section>
  );
}
