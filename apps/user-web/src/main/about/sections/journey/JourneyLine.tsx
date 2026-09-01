'use client';

import { useScrollReveal } from '@/shared/hooks';

export function JourneyLine() {
  const { isVisible, ref } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      aria-hidden="true"
      className={`journey-line absolute left-0 right-6 top-[7px] hidden h-1 rounded-full bg-linear-to-r from-brand-sky-pale via-brand-amber to-brand-amber-strong lg:block ${
        isVisible ? 'is-visible' : ''
      }`}
      ref={ref}
    />
  );
}
