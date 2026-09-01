import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { StepCard } from './StepCard';

import { PARTNER_STEPS } from './content';

export function HowItWorksSection() {
  return (
    <Section aria-labelledby="how-it-works-title" className="pb-16 lg:pb-20">
      <SectionHeading id="how-it-works-title" size="md" tone="navy">
        Як стати партнером
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNER_STEPS.map((step, index) => (
          <Reveal className="h-full" delayMs={index * 100} key={step.number}>
            <StepCard {...step} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
