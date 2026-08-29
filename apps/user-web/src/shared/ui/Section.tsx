import { cn } from '@project/common-ui';
import type { ComponentPropsWithoutRef } from 'react';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Ground colour. `canvas` is the default page ground; `sand` is the warm band. */
  tone?: 'canvas' | 'sand';
  /** Horizontal gutter at xl. `wide` is the fixed 100px gutter used by feed-style pages. */
  width?: 'default' | 'wide';
};

const TONE_CLASS = {
  canvas: 'bg-canvas',
  sand: 'bg-sand',
} as const;

const WIDTH_CLASS = {
  default: 'xl:px-[12vw]',
  wide: 'xl:px-[100px]',
} as const;

/** The page-width shell every section sits in: ground colour + responsive gutters. */
export function Section({
  children,
  className,
  tone = 'canvas',
  width = 'default',
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('px-5 sm:px-8 lg:px-12', TONE_CLASS[tone], WIDTH_CLASS[width], className)}
      {...props}
    >
      {children}
    </section>
  );
}
