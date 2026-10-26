import type { ReactNode } from 'react';

type LegalSectionProps = {
  /** Rich text: paragraphs and lists from `useLegalRichText`. */
  body: ReactNode;
  title: string;
};

export function LegalSection({ body, title }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-black text-brand-navy sm:text-2xl">{title}</h2>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-slate-700">{body}</div>
    </section>
  );
}
