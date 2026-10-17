import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/navigation';
import { SectionHeading } from '@/shared/ui';

import { PROJECTS } from './content';
import { parseProjectFilter, REPORTS_HREF, selectProjects } from './lib';
import { ProjectCard } from './ProjectCard';
import { ProjectStatusFilter } from './ProjectStatusFilter';

type ProjectsHighlightSectionProps = {
  /** The raw `?status=` param — parsed and clamped here. */
  status: string | string[] | undefined;
};

/**
 * Rendered inside news-feed's own <Section> shell (as its `highlight` slot) rather than
 * wrapped in its own — a second gutter/padding pass here would double up on the parent's.
 */
export function ProjectsHighlightSection({ status }: ProjectsHighlightSectionProps) {
  const t = useTranslations('news.projectsHighlight');
  const activeFilter = parseProjectFilter(status);
  const projects = selectProjects(PROJECTS, activeFilter);

  return (
    <section aria-label={t('label')} className="flex flex-col gap-8">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-amber-strong sm:text-sm">
          {t('eyebrow')}
        </p>

        <SectionHeading align="left" size="md" tone="navy">
          {t('title')}
        </SectionHeading>

        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{t('lede')}</p>

        <p className="text-sm text-slate-500 sm:text-base">
          {t.rich('reportsNote', {
            link: (chunks) => (
              <Link
                className="font-bold text-brand-navy underline decoration-brand-amber-strong decoration-2 underline-offset-4 hover:text-brand-navy-muted"
                href={REPORTS_HREF}
                scroll={false}
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      <div className="lg:self-end">
        <ProjectStatusFilter activeFilter={activeFilter} />
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm">
          {t('empty')}
        </p>
      )}
    </section>
  );
}
