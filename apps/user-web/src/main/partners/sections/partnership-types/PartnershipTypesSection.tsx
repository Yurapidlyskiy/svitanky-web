import { useTranslations } from 'next-intl';

import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { IconFeatureCard } from './IconFeatureCard';
import { PARTNERSHIP_TYPES } from './content';

export function PartnershipTypesSection() {
  const t = useTranslations('partners.partnershipTypes');

  return (
    <Section aria-labelledby="partnership-types-title" className="py-16 lg:py-20">
      <SectionHeading id="partnership-types-title" lede={t('lede')} size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNERSHIP_TYPES.map((type, index) => (
          <Reveal className="h-full" delayMs={index * 100} key={type.id}>
            <IconFeatureCard
              description={t(`items.${type.id}.description`)}
              icon={type.icon}
              title={t(`items.${type.id}.title`)}
              tone={type.tone}
              tinted
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
