'use client';

import Link from 'next/link';
import { useState } from 'react';

import { siteLanguages as languages } from './navigation';

export function HeaderActions() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState('UA');

  function selectLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  }

  return (
    <div className="hidden items-center gap-3 lg:flex">
      <div className="group relative shrink-0">
        <Link
          aria-label="Друзі Світанків"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-400/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          href="/support"
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
          Стати другом
        </span>
      </div>
      <Link
        className="flex h-12 items-center rounded-full bg-amber-400 px-8 text-sm font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-400/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        href="/support"
      >
        Підтримати
      </Link>
      <div className="relative">
        <button
          aria-expanded={isLanguageMenuOpen}
          aria-haspopup="menu"
          className="flex h-12 w-20 shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-sky-800 text-sm font-bold text-sky-800 transition-all duration-200 ease-out hover:scale-105 hover:bg-sky-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {language}
          <svg
            aria-hidden="true"
            className={`size-3 transition-transform duration-200 ease-out ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
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
        {isLanguageMenuOpen && (
          <div
            aria-label="Вибір мови"
            className="absolute right-0 top-full z-10 mt-2 flex min-w-full origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 flex-col gap-1 rounded-2xl border-2 border-sky-800 bg-white p-1 shadow-lg duration-150"
            role="menu"
          >
            {languages.map((option) => (
              <button
                aria-current={option.code === language ? 'true' : undefined}
                className={`w-full rounded-xl px-4 py-2 text-left text-sm font-bold transition-colors focus-visible:outline-none ${
                  option.code === language
                    ? 'bg-sky-100 text-sky-800'
                    : 'text-sky-800 hover:bg-sky-100 focus-visible:bg-sky-100'
                }`}
                key={option.code}
                onClick={() => selectLanguage(option.code)}
                role="menuitem"
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
