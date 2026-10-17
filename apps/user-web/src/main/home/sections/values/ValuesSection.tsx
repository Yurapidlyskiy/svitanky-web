import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { VALUES } from './content';
import { ValueCard } from './ValueCard';

export function ValuesSection() {
  const t = useTranslations('home.values');

  return (
    <Section aria-label={t('title')} className="flex flex-col" id="values">
      <SectionHeading>{t('title')}</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        {VALUES.map((value) => (
          <ValueCard
            description={t(`items.${value.id}.description`)}
            icon={{ alt: t(`items.${value.id}.title`), src: value.icon }}
            key={value.id}
            title={t(`items.${value.id}.title`)}
          />
        ))}
      </div>
    </Section>
  );
}
