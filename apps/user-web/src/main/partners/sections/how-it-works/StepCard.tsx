import type { PartnerStep } from './types';

export function StepCard({ description, number, title }: PartnerStep) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm">
      <span className="font-heading text-3xl font-black text-brand-amber-strong">{number}</span>
      <p className="text-lg font-black text-brand-navy">{title}</p>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
