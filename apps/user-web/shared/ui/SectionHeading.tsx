import { cn } from '@project/common-ui';
import type { ReactNode } from 'react';

type SectionHeadingProps = {
  align?: 'left' | 'center';
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional lede paragraph rendered under the title. */
  lede?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'navy' | 'navy-muted';
};

const SIZE_CLASS = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
} as const;

const TONE_CLASS = {
  default: 'text-sky-800',
  navy: 'text-brand-navy',
  'navy-muted': 'text-brand-navy-muted',
} as const;

/** The uppercase section title, plus an optional lede paragraph. */
export function SectionHeading({
  align = 'center',
  children,
  className,
  id,
  lede,
  size = 'lg',
  tone = 'default',
}: SectionHeadingProps) {
  return (
    <>
      <h2
        className={cn(
          'font-heading font-black uppercase',
          SIZE_CLASS[size],
          TONE_CLASS[tone],
          align === 'center' && 'text-center',
          className
        )}
        id={id}
      >
        {children}
      </h2>

      {lede ? (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-lg text-slate-700',
            align === 'center' && 'text-center'
          )}
        >
          {lede}
        </p>
      ) : null}
    </>
  );
}
