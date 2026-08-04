'use client';

import Link from 'next/link';
import { useState } from 'react';

export function HeaderActions() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState('UA');

  function selectLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  }

  return (
    <div className="hidden items-center gap-4 lg:flex">
      <div className="relative h-12 w-12">
        <Link
          aria-label="Друзі Світанків"
          className="group absolute inset-y-0 right-0 flex w-12 items-center justify-center overflow-hidden rounded-full bg-amber-400 text-white transition-[width,background-color] duration-300 ease-out hover:w-[210px] hover:bg-amber-500 focus-visible:w-[210px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 motion-reduce:transition-none"
          href="/support"
        >
          <svg
            aria-hidden="true"
            className="size-7 shrink-0 transition-transform duration-300 ease-out group-hover:scale-90 group-focus-visible:scale-90 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          <span className="max-w-0 translate-x-2 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-[max-width,opacity,transform] duration-300 ease-out group-hover:ml-2 group-hover:max-w-40 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-40 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
            Друзі Світанків
          </span>
        </Link>
      </div>
      <Link
        className="rounded-full bg-amber-400 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        href="/support"
      >
        Підтримати
      </Link>
      <div className="relative">
        <button
          aria-expanded={isLanguageMenuOpen}
          aria-haspopup="menu"
          className="flex h-12 items-center rounded-full border-2 border-sky-800 px-4 text-sm font-bold text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {language}
        </button>
        {isLanguageMenuOpen && (
          <div
            aria-label="Вибір мови"
            className="absolute right-0 top-full z-10 mt-2 min-w-full overflow-hidden rounded-2xl border-2 border-sky-800 bg-white p-1 shadow-lg"
            role="menu"
          >
            <button
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-bold text-sky-800 transition-colors hover:bg-sky-100 focus-visible:bg-sky-100 focus-visible:outline-none"
              onClick={() => selectLanguage('EN')}
              role="menuitem"
              type="button"
            >
              English
            </button>
            <button
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-bold text-sky-800 transition-colors hover:bg-sky-100 focus-visible:bg-sky-100 focus-visible:outline-none"
              onClick={() => selectLanguage('IT')}
              role="menuitem"
              type="button"
            >
              Italiano
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
