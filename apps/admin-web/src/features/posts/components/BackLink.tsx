import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
};

export function BackLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1.5 text-sm text-brand-slate hover:text-brand-navy"
    >
      <ArrowLeft aria-hidden className="size-4" />
      {children}
    </Link>
  );
}
