import { cn } from '@project/common-ui';
import type { ReactNode } from 'react';

import { PROJECT_STATUS_LABELS, type ProjectStatus } from '../categories';
import { formatAmount, projectProgress } from '../format';
import type { PostCardData, ProjectDetails } from '../types';
import { PostImage } from './PostImage';

type Props = {
  post: PostCardData;
  project: ProjectDetails;
  priority?: boolean;
  actions?: ReactNode;
};

/** A closed project is greyed out: still readable, clearly not asking for money. */
const CLOSED: Record<ProjectStatus, boolean> = { active: false, planned: false, completed: true };

const OUTLINE_LABEL_CLASS = 'rounded-full border-2 px-6 py-2.5 text-sm font-bold';

/**
 * Mirrors user-web's ProjectCard. Side by side when it has the room (the list),
 * stacked when it does not (the form's narrow preview), hence the container query.
 */
export function ProjectPostCard({ post, project, priority, actions }: Props) {
  const { title, excerpt, imageUrl } = post;
  const { status, goal, raised } = project;
  const closed = CLOSED[status];
  const percent = projectProgress(raised, goal);
  const textClass = closed ? 'text-slate-500' : 'text-brand-navy';

  return (
    <article
      className={cn(
        '@container h-full rounded-3xl shadow-sm ring-1 ring-border',
        closed ? 'bg-slate-50' : 'bg-white'
      )}
    >
      <div className="flex h-full flex-col gap-6 p-6 @2xl:flex-row">
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl @2xl:h-auto @2xl:w-72">
          <PostImage
            alt={title}
            className={closed ? 'opacity-80 grayscale' : undefined}
            priority={priority}
            sizes="(min-width: 640px) 18rem, 100vw"
            url={imageUrl}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className={cn('text-xl font-black break-words', textClass)}>
              {title || <span className="opacity-40">Назва проєкту</span>}
            </h3>
            <span
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-bold',
                closed
                  ? 'border-slate-300 bg-slate-100 text-slate-500'
                  : 'border-brand-amber text-brand-navy'
              )}
            >
              {PROJECT_STATUS_LABELS[status]}
            </span>
          </div>

          <p className="text-sm leading-relaxed break-words text-brand-slate">
            {excerpt || <span className="opacity-50">Короткий опис проєкту</span>}
          </p>

          <div className="mt-auto grid gap-4">
            <div>
              <div className={cn('flex items-baseline justify-between gap-4', textClass)}>
                <p className="text-sm font-bold">
                  {formatAmount(raised)} грн. із {formatAmount(goal)} грн.
                </p>
                <p className="text-lg font-black">{percent} %</p>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn('h-full rounded-full', closed ? 'bg-slate-400' : 'bg-brand-amber')}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span aria-hidden className="flex flex-wrap gap-3">
                {status === 'active' ? (
                  <>
                    <span className="rounded-full bg-brand-amber px-6 py-2.5 text-sm font-bold text-white">
                      Підтримати ›
                    </span>
                    <span className={cn(OUTLINE_LABEL_CLASS, 'border-brand-navy text-brand-navy')}>
                      Деталі
                    </span>
                  </>
                ) : (
                  <span
                    className={cn(
                      OUTLINE_LABEL_CLASS,
                      closed
                        ? 'border-slate-300 text-slate-500'
                        : 'border-brand-amber text-brand-navy'
                    )}
                  >
                    Детальніше ›
                  </span>
                )}
              </span>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
