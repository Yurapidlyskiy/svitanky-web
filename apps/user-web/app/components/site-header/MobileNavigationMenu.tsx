import Link from 'next/link';

import { primaryNavigation } from './siteNavigation';

export function MobileNavigationMenu() {
  return (
    <details className="relative shrink-0 lg:hidden">
      <summary className="cursor-pointer list-none rounded-lg px-3 py-2 text-sm font-semibold text-sky-800 outline-none focus-visible:ring-2 focus-visible:ring-sky-700">
        Меню
      </summary>
      <nav
        aria-label="Мобільна навігація"
        className="absolute right-0 top-full z-10 mt-3 w-64 rounded-xl border border-border bg-background p-3 shadow-lg"
      >
        <ul className="space-y-1">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="mt-2 block rounded-lg bg-amber-400 px-3 py-2 text-center text-sm font-bold text-white hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
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
