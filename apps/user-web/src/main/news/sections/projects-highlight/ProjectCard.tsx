import Image from 'next/image';
import Link from 'next/link';

import { calculateProgress } from '@/shared/lib/progress';

import { formatAmount } from './lib';

import type { Project } from './types';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const percent = calculateProgress(project.raised, project.goal);
  const isPlanned = project.status === 'planned';

  return (
    <article className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:p-8">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-auto sm:w-72">
        <Image
          alt={project.image.alt}
          className="object-cover"
          fill
          sizes="(min-width: 640px) 288px, 100vw"
          src={project.image.src}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-black text-brand-navy">{project.title}</h3>
          <span className="rounded-full border border-amber-400 px-3 py-1 text-xs font-bold text-amber-600">
            {project.statusLabel}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{project.description}</p>

        <div className="mt-auto flex flex-col gap-4">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-bold text-brand-navy sm:text-base">
                {formatAmount(project.raised)} грн. із {formatAmount(project.goal)} грн.
              </p>
              <p className="text-lg font-black text-brand-navy">{percent} %</p>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {isPlanned ? (
              <Link
                className="inline-flex items-center gap-1 rounded-full border-2 border-amber-400 px-6 py-2.5 text-sm font-bold text-amber-600 transition-colors duration-200 ease-out hover:bg-amber-50"
                href={project.href}
              >
                Детальніше <span aria-hidden="true">›</span>
              </Link>
            ) : (
              <>
                <Link
                  className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 active:scale-95"
                  href="/support"
                >
                  Підтримати <span aria-hidden="true">›</span>
                </Link>
                <Link
                  className="inline-flex items-center rounded-full border-2 border-brand-navy px-6 py-2.5 text-sm font-bold text-brand-navy transition-colors duration-200 ease-out hover:bg-brand-navy hover:text-white"
                  href={project.href}
                >
                  Деталі
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
