'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

import { errorClassName } from './styles';

/** Opens a legal page in a new tab, so the half-filled form stays where it is. */
function ConsentLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy"
      href={href}
      onClick={(event) => event.stopPropagation()}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
}

type ConsentFieldProps = {
  error?: string;
  id: string;
  /** The form keeps its submit button disabled until the box is ticked. */
  onCheckedChange: (checked: boolean) => void;
};

/** The required checkbox: the donor accepts the public offer and the data processing consent. */
export function ConsentField({ error, id, onCheckedChange }: ConsentFieldProps) {
  const t = useTranslations('payments');
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
        <div className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
          <input
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
            className="peer sr-only"
            id={id}
            name="consent"
            onChange={(event) => onCheckedChange(event.target.checked)}
            required
            type="checkbox"
          />
          <div className="absolute inset-0 rounded border border-brand-sky-pale bg-white peer-checked:border-amber-400 peer-checked:bg-amber-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-navy"></div>
          <svg
            className="relative z-10 hidden size-3.5 text-white peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span>
          {t.rich('form.consent', {
            consent: (chunks) => <ConsentLink href={ROUTES.dataConsent}>{chunks}</ConsentLink>,
            terms: (chunks) => <ConsentLink href={ROUTES.terms}>{chunks}</ConsentLink>,
          })}
        </span>
      </label>
      {error ? (
        <p className={errorClassName} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
