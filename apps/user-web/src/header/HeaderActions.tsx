import { useTranslations } from 'next-intl';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

import { LanguageMenu } from './LanguageMenu';

export function HeaderActions() {
  const t = useTranslations('header.actions');

  return (
    <div className="hidden items-center gap-2 lg:flex xl:gap-3">
      <div className="group relative shrink-0">
        <Link
          aria-label={t('friends')}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 xl:h-12 xl:w-12 text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-400/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          href={ROUTES.support}
        >
          <svg
            aria-hidden="true"
            className="size-7 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </Link>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-full z-10 mt-2 origin-top-right translate-y-1 whitespace-nowrap rounded-full bg-sky-900 px-3.5 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
        >
          {t('friendsTooltip')}
        </span>
      </div>
      <Link
        className="flex h-11 items-center whitespace-nowrap rounded-full bg-amber-400 px-6 text-sm font-bold text-white xl:h-12 xl:px-8 shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-400/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        href={ROUTES.support}
      >
        {t('support')}
      </Link>
      <LanguageMenu />
    </div>
  );
}
