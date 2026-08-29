import Link from 'next/link';

const baseButtonClassName =
  'block w-full rounded-full px-7 py-3 text-center font-bold shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:shadow-md active:scale-95 lg:w-auto';

type HeroActionsProps = {
  className?: string;
};

export function HeroActions({ className = '' }: HeroActionsProps) {
  return (
    <div className={className}>
      <Link
        className={`${baseButtonClassName} bg-amber-400 text-white hover:bg-amber-500 hover:shadow-amber-400/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200`}
        href="/support"
      >
        Підтримати &gt;
      </Link>
      <Link
        className={`${baseButtonClassName} bg-brand-sky-mist text-sky-950 hover:bg-[#D9E4F8] hover:shadow-sky-300/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200`}
        href="/about"
      >
        Дізнатися більше &gt;
      </Link>
    </div>
  );
}
