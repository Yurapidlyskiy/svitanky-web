import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';
import { calculateProgress } from '@/shared/lib/progress';

import { formatAmount } from './lib';
import type { Project, ProjectStatus } from './types';

/** A closed project is greyed out: still readable, clearly not asking for money. */
const STATUS_CLASS: Record<
  ProjectStatus,
  { badge: string; bar: string; card: string; image: string; text: string }
> = {
  active: {
    badge: 'border-amber-400 text-amber-600',
    bar: 'bg-amber-400',
    card: 'bg-white',
    image: '',
    text: 'text-brand-navy',
  },
  planned: {
    badge: 'border-amber-400 text-amber-600',
    bar: 'bg-amber-400',
    card: 'bg-white',
    image: '',
    text: 'text-brand-navy',
  },
  completed: {
    badge: 'border-slate-300 bg-slate-100 text-slate-500',
    bar: 'bg-slate-400',
    card: 'bg-slate-50',
    image: 'opacity-80 grayscale',
    text: 'text-slate-500',
  },
};

const OUTLINE_LINK_CLASS =
  'inline-flex items-center gap-1 rounded-full border-2 px-6 py-2.5 text-sm font-bold transition-colors duration-200 ease-out';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('news.projectsHighlight');
  const locale = useLocale();
  const percent = calculateProgress(project.raised, project.goal);
  const style = STATUS_CLASS[project.status];

  return (
    <article
      className={`flex flex-col gap-6 rounded-3xl p-6 shadow-sm sm:flex-row sm:p-8 ${style.card}`}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-auto sm:w-72">
        <Image
          alt={project.image.alt}
          className={`object-cover ${style.image}`}
          fill
          sizes="(min-width: 640px) 288px, 100vw"
          src={project.image.src}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className={`text-xl font-black ${style.text}`}>{project.title}</h3>
          <span className={`rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}>
            {t(`status.${project.status}`)}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{project.description}</p>

        <div className="mt-auto flex flex-col gap-4">
          <div>
            <div className={`flex items-baseline justify-between gap-4 ${style.text}`}>
              <p className="text-sm font-bold sm:text-base">
                {t('amount', {
                  goal: formatAmount(project.goal, locale),
                  raised: formatAmount(project.raised, locale),
                })}
              </p>
              <p className="text-lg font-black">{t('percent', { percent })}</p>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${style.bar}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.status === 'active' ? (
              <>
                <Link
                  className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 active:scale-95"
                  href={ROUTES.support}
                >
                  {t('support')} <span aria-hidden="true">›</span>
                </Link>
                <Link
                  className={`${OUTLINE_LINK_CLASS} border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white`}
                  href={project.href}
                >
                  {t('details')}
                </Link>
              </>
            ) : (
              <Link
                className={`${OUTLINE_LINK_CLASS} ${
                  project.status === 'planned'
                    ? 'border-amber-400 text-amber-600 hover:bg-amber-50'
                    : 'border-slate-300 text-slate-500 hover:bg-slate-100'
                }`}
                href={project.href}
              >
                {t('more')} <span aria-hidden="true">›</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
