import Link from 'next/link';

import { HERO_ACTIONS } from './content';

const baseClassName =
  'inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-3.5 text-center font-bold shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto';

const TONE_CLASS = {
  primary:
    'bg-brand-amber-strong text-brand-navy hover:bg-brand-amber hover:shadow-brand-amber-strong/40 focus-visible:outline-brand-amber-strong',
  secondary:
    'bg-canvas text-brand-navy hover:bg-brand-sky-mist hover:shadow-brand-navy/25 focus-visible:outline-brand-navy',
} as const;

type HeroActionsProps = {
  className?: string;
};

export function HeroActions({ className = '' }: HeroActionsProps) {
  return (
    <div className={className}>
      {HERO_ACTIONS.map((action) => {
        const ActionLink = action.href.startsWith('#') ? 'a' : Link;

        return (
          <ActionLink
            className={`${baseClassName} ${TONE_CLASS[action.tone]}`}
            href={action.href}
            key={action.href}
          >
            <span>{action.label}</span>
            <span aria-hidden="true">&rarr;</span>
          </ActionLink>
        );
      })}
    </div>
  );
}
