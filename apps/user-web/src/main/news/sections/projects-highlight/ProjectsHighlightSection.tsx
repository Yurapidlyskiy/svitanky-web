import { SectionHeading, StatsBar } from '@/shared/ui';

import { ProjectCard } from './ProjectCard';

import { PROJECT_STATS, PROJECTS } from './content';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function ProjectsHighlightSection() {
  return (
    <section aria-label="Наші проєкти" className="flex flex-col gap-10">
      <StatsBar stats={PROJECT_STATS} />

      <div className="flex flex-col gap-8">
        <SectionHeading align="left" size="md" tone="navy">
          Наші проєкти
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
