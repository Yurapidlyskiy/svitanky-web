import { SectionHeading, StatsBar } from '@/shared/ui';

import { CampFeatureCard } from './CampFeatureCard';
import { CampsPhotoCollage } from './CampsPhotoCollage';

import { CAMP_FEATURES, CAMP_STATS } from './content';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function CampsHighlightSection() {
  return (
    <section aria-label="Що чекає на тебе в таборі" className="flex flex-col gap-10">
      <StatsBar stats={CAMP_STATS} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading align="left" size="md" tone="navy">
            Що чекає на тебе?
          </SectionHeading>

          <CampsPhotoCollage />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAMP_FEATURES.map((feature) => (
            <CampFeatureCard
              description={feature.description}
              key={feature.title}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
