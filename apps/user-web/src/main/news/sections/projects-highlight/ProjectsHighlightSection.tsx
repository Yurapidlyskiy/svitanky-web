import { useTranslations } from 'next-intl';

import { SectionHeading, StatsBar } from '@/shared/ui';

import { PROJECT_STATS, PROJECTS } from './content';
import { ProjectCard } from './ProjectCard';

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function ProjectsHighlightSection() {
  const t = useTranslations('news.projectsHighlight');

  const stats = PROJECT_STATS.map(({ icon, id, tone }) => ({
    icon,
    primary: t(`stats.${id}.primary`),
    secondary: t(`stats.${id}.secondary`),
    tone,
  }));

  return (
    <section aria-label={t('label')} className="flex flex-col gap-10">
      <StatsBar stats={stats} />

      <div className="flex flex-col gap-8">
        <SectionHeading align="left" size="md" tone="navy">
          {t('title')}
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
