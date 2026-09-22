import { Section, SectionHeading } from '@/shared/ui';

import Link from 'next/link';

import { LocationMapCard } from './LocationMapCard';

import { LOCATION_CTA, LOCATION_EYEBROW, LOCATION_PARAGRAPHS, LOCATION_PLACE } from './content';

export function LocationSection() {
  return (
    <Section aria-label={LOCATION_EYEBROW} id="location">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <LocationMapCard />

        <div className="max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm">
            {LOCATION_EYEBROW}
          </p>

          <SectionHeading align="left" className="xl:text-5xl" size="md" tone="navy">
            {LOCATION_PLACE.city}
          </SectionHeading>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-navy sm:text-lg">
            {LOCATION_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-amber px-7 py-3.5 font-semibold text-brand-navy shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-brand-amber-strong hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber-strong"
            href={LOCATION_CTA.href}
          >
            {LOCATION_CTA.label}
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
