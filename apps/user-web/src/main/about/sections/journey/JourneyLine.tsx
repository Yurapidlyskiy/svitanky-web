'use client';

import { useScrollReveal } from '@/shared/hooks';

type JourneyLineProps = {
  orientation: 'horizontal' | 'vertical';
};

const ORIENTATION_CLASS = {
  horizontal: 'journey-line left-0 right-6 top-[10px] hidden h-1 bg-linear-to-r lg:block',
  vertical: 'journey-line-vertical left-[10px] top-3 bottom-3 w-1 bg-linear-to-b lg:hidden',
} as const;

export function JourneyLine({ orientation }: JourneyLineProps) {
  const { isVisible, ref } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full from-brand-sky-pale via-brand-amber to-brand-amber-strong ${
        ORIENTATION_CLASS[orientation]
      } ${isVisible ? 'is-visible' : ''}`}
      ref={ref}
    />
  );
}
