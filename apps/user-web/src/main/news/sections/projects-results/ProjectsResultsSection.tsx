import { IconFeatureCard, SectionHeading } from '@/shared/ui';

import { TransparencyBanner } from './TransparencyBanner';

import { SUPPORT_RESULTS } from './content';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function ProjectsResultsSection() {
  return (
    <section aria-label="Результати підтримки" className="flex flex-col gap-10">
      <SectionHeading size="md" tone="navy">
        Результати підтримки
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORT_RESULTS.map((result) => (
          <IconFeatureCard
            description={result.text}
            icon={result.icon}
            key={result.text}
            tinted
            tone={result.tone}
          />
        ))}
      </div>

      <TransparencyBanner />
    </section>
  );
}
