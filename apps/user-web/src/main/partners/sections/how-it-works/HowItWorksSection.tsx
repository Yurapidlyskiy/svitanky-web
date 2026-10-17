import { useTranslations } from 'next-intl';

import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { PARTNER_STEPS } from './content';
import { StepCard } from './StepCard';

export function HowItWorksSection() {
  const t = useTranslations('partners.howItWorks');

  return (
    <Section aria-labelledby="how-it-works-title" className="pb-16 lg:pb-20">
      <SectionHeading id="how-it-works-title" size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNER_STEPS.map(({ id, number }, index) => (
          <Reveal className="h-full" delayMs={index * 100} key={id}>
            <StepCard
              description={t(`steps.${id}.description`)}
              number={number}
              title={t(`steps.${id}.title`)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
