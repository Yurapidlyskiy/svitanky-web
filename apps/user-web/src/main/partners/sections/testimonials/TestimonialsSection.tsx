import { useTranslations } from 'next-intl';

import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { TESTIMONIALS } from './content';
import { TestimonialCard } from './TestimonialCard';

export function TestimonialsSection() {
  const t = useTranslations('partners.testimonials');

  return (
    <Section aria-labelledby="partner-testimonials-title" className="pb-16 lg:pb-20">
      <SectionHeading id="partner-testimonials-title" size="md" tone="navy">
        {t('title')}
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        {TESTIMONIALS.map((id, index) => (
          <Reveal className="h-full" delayMs={index * 120} key={id}>
            <TestimonialCard
              name={t(`items.${id}.name`)}
              quote={t(`items.${id}.quote`)}
              role={t(`items.${id}.role`)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
