import type { Testimonial } from './types';

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TestimonialCard({ name, quote, role }: Testimonial) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm">
      <span
        aria-hidden="true"
        className="font-heading text-4xl font-black leading-none text-brand-amber-strong"
      >
        “
      </span>

      <p className="text-base leading-relaxed text-slate-700">{quote}</p>

      <div className="mt-auto flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-amber to-brand-amber-strong text-sm font-black text-white">
          {getInitials(name)}
        </span>
        <div>
          <p className="text-sm font-black text-brand-navy">{name}</p>
          <p className="text-sm text-slate-600">{role}</p>
        </div>
      </div>
    </article>
  );
}
