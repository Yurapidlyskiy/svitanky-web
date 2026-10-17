import { useTranslations } from 'next-intl';

import { Section, SectionHeading } from '@/shared/ui';

import { JOURNEY_MILESTONES } from './content';
import { JourneyLine } from './JourneyLine';
import { JourneyNode } from './JourneyNode';

export function JourneySection() {
  const t = useTranslations('about.journey');

  return (
    <Section aria-label={t('title')} className="py-20 lg:py-28" id="journey">
      <SectionHeading lede={t('lede')} tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="relative mx-auto mt-14 flex max-w-5xl flex-col gap-10 lg:mt-24 lg:flex-row lg:gap-6">
        <JourneyLine orientation="vertical" />
        <JourneyLine orientation="horizontal" />

        {JOURNEY_MILESTONES.map((milestone, index) => (
          <JourneyNode
            delayMs={index * 150}
            description={t(`milestones.${milestone.id}.description`)}
            isCurrent={'isCurrent' in milestone}
            key={milestone.id}
            year={t(`milestones.${milestone.id}.year`)}
          />
        ))}
      </div>
    </Section>
  );
}
