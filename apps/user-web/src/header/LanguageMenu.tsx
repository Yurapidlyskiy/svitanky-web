'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useLanguageSwitch } from './useLanguageSwitch';

/** Desktop language dropdown. Hidden while the site serves a single language. */
export function LanguageMenu() {
  const t = useTranslations('header.language');
  const [isOpen, setIsOpen] = useState(false);
  const { current, isPending, languages, locale, switchTo } = useLanguageSwitch();

  if (languages.length < 2) return null;

  function select(nextLocale: string) {
    setIsOpen(false);
    switchTo(nextLocale);
  }

  return (
    <div className="relative">
      <button
        aria-busy={isPending}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex h-11 w-[68px] shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-sky-800 xl:h-12 xl:w-20 text-sm font-bold text-sky-800 transition-all duration-200 ease-out hover:scale-105 hover:bg-sky-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        type="button"
      >
        {current?.code}
        <svg
          aria-hidden="true"
          className={`size-3 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div
          aria-label={t('menuLabel')}
          className="absolute right-0 top-full z-10 mt-2 flex min-w-full origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 flex-col gap-1 rounded-2xl border-2 border-sky-800 bg-white p-1 shadow-lg duration-150"
          role="menu"
        >
          {languages.map((option) => (
            <button
              aria-current={option.locale === locale ? 'true' : undefined}
              className={`w-full rounded-xl px-4 py-2 text-left text-sm font-bold transition-colors focus-visible:outline-none ${
                option.locale === locale
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-sky-800 hover:bg-sky-100 focus-visible:bg-sky-100'
              }`}
              key={option.locale}
              lang={option.locale}
              onClick={() => select(option.locale)}
              role="menuitem"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
