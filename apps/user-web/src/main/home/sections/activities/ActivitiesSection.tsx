import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { ActivityCard } from './ActivityCard';
import { ACTIVITIES } from './content';

export function ActivitiesSection() {
  const t = useTranslations('home.activities');

  return (
    <Section aria-label={t('title')} className="flex flex-col" id="activities">
      <SectionHeading>{t('title')}</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {ACTIVITIES.map(({ accent, href, id, image }) => (
          <ActivityCard
            accent={accent}
            description={t(`items.${id}.description`)}
            href={href}
            image={{ alt: t(`items.${id}.imageAlt`), src: image }}
            key={id}
            subtitle={t(`items.${id}.subtitle`)}
            title={t(`items.${id}.title`)}
          />
        ))}
      </div>
    </Section>
  );
}
