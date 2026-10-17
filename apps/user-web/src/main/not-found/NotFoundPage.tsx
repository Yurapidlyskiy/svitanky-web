import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Section } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <Section aria-label="Сторінку не знайдено" className="flex flex-1 items-center py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <p className="font-display text-7xl font-bold text-brand-amber-strong">404</p>
        <h1 className="font-heading text-3xl font-black text-brand-navy sm:text-4xl">
          Сторінку не знайдено
        </h1>
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
          Можливо, її перенесли або посилання застаріло. Почніть з головної — там є все про
          Світанки.
        </p>
        <Link
          className="rounded-xl bg-brand-navy px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber"
          href={ROUTES.home}
        >
          На головну
        </Link>
      </div>
    </Section>
  );
}
