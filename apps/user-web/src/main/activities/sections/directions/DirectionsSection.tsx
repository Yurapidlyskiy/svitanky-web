import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { DIRECTIONS } from './content';
import { DirectionCard } from './DirectionCard';

export function DirectionsSection() {
  const t = useTranslations('activities.directions');

  return (
    <Section aria-labelledby="activity-directions-title" className="pb-20 pt-4" width="wide">
      <SectionHeading
        className="lg:text-5xl"
        id="activity-directions-title"
        size="md"
        tone="navy-muted"
      >
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 sm:mt-14 lg:gap-10">
        {DIRECTIONS.map(({ id, image, ...direction }, index) => (
          <DirectionCard
            key={id}
            {...direction}
            description={t(`items.${id}.description`)}
            image={{ alt: t(`items.${id}.imageAlt`), src: image }}
            imageSide={index % 2 === 0 ? 'left' : 'right'}
            priority={index === 0}
            title={t(`items.${id}.title`)}
          />
        ))}
      </div>
    </Section>
  );
}
