import Link from 'next/link';

const baseButtonClassName =
  'inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-8 py-3 text-center font-bold shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto';

type HeroActionsProps = {
  className?: string;
};

export function HeroActions({ className = '' }: HeroActionsProps) {
  return (
    <div className={className}>
      <Link
        className={`${baseButtonClassName} border-brand-amber-strong bg-brand-amber-strong text-brand-navy hover:bg-brand-amber hover:shadow-brand-amber-strong/40 focus-visible:outline-brand-amber-strong`}
        href="/support"
      >
        <span>Підтримати</span>
        <span aria-hidden="true">&gt;</span>
      </Link>
      <Link
        className={`${baseButtonClassName} border-brand-navy bg-canvas text-brand-navy hover:bg-brand-sky-mist hover:shadow-brand-navy/25 focus-visible:outline-brand-navy`}
        href="/about"
      >
        <span>Дізнатися більше</span>
        <span aria-hidden="true">&gt;</span>
      </Link>
    </div>
  );
}
