'use client';

import { cn } from '@project/common-ui';
import type { ComponentPropsWithoutRef } from 'react';

import { useScrollReveal } from '@/shared/hooks';

type RevealProps = ComponentPropsWithoutRef<'div'> & {
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0, style, ...props }: RevealProps) {
  const { isVisible, ref } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      className={cn('scroll-reveal', isVisible && 'is-visible', className)}
      ref={ref}
      style={{ ...style, transitionDelay: isVisible ? `${delayMs}ms` : '0ms' }}
      {...props}
    >
      {children}
    </div>
  );
}
