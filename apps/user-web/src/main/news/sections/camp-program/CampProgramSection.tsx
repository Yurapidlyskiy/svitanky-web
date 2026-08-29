import { SectionHeading } from '@/shared/ui';

import { ProgramCard } from './ProgramCard';

import { CAMP_DAY_SCHEDULE, CAMP_DAY_THEMES } from './content';

/** Rendered inside news-feed's own <Section> shell — see camps-highlight/CampsHighlightSection.tsx. */
export function CampProgramSection() {
  return (
    <section aria-label="Програма табору" className="flex flex-col gap-8">
      <SectionHeading align="left" size="md" tone="navy">
        Приклад програми табору
      </SectionHeading>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <ProgramCard list={CAMP_DAY_THEMES} />
        <ProgramCard list={CAMP_DAY_SCHEDULE} />
      </div>
    </section>
  );
}
