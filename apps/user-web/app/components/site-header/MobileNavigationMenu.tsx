import Link from 'next/link';

import { primaryNavigation } from './siteNavigation';

export function MobileNavigationMenu() {
  return (
    <details className="group relative shrink-0 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-sky-800 outline-none transition-colors duration-200 ease-out hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-700 [&::-webkit-details-marker]:hidden">
        Меню
        <svg
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 ease-out group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <nav
        aria-label="Мобільна навігація"
        className="absolute right-0 top-full z-10 mt-3 w-64 origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 rounded-xl border border-border bg-background p-3 shadow-lg duration-150"
      >
        <ul className="space-y-1">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-sky-800 transition-colors duration-150 ease-out hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="mt-2 block rounded-lg bg-amber-400 px-3 py-2 text-center text-sm font-bold text-white transition-[background-color,transform] duration-150 ease-out hover:scale-[1.02] hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              href="/support"
            >
              Підтримати
            </Link>
          </li>
        </ul>
      </nav>
    </details>
  );
}
