import type { ReactNode } from 'react';

import { Section } from './Section';

type LegalPageProps = {
  children: ReactNode;
  /** The page's anchor, the route's name: `terms`, `privacy-policy`, … */
  id: string;
  /** "Редакція від …", under the title. */
  revision: string;
  title: string;
};

/** The shell of a legal document: title, revision date, then its numbered sections. */
export function LegalPage({ children, id, revision, title }: LegalPageProps) {
  return (
    <Section aria-label={title} className="py-12 lg:py-20" id={id}>
      <article className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-3xl font-black text-brand-navy sm:text-4xl">{title}</h1>
          <p className="text-sm text-slate-500">{revision}</p>
        </header>
        {children}
      </article>
    </Section>
  );
}
