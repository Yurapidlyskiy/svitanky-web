import { Reveal, Section, SectionHeading } from '@/shared/ui';

import { TestimonialCard } from './TestimonialCard';

import { TESTIMONIALS } from './content';

export function TestimonialsSection() {
  return (
    <Section aria-labelledby="partner-testimonials-title" className="pb-16 lg:pb-20">
      <SectionHeading id="partner-testimonials-title" size="md" tone="navy">
        Що кажуть наші партнери
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal className="h-full" delayMs={index * 120} key={testimonial.name}>
            <TestimonialCard {...testimonial} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
