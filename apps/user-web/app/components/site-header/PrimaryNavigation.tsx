'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { primaryNavigation } from './siteNavigation';

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Основна навігація">
      <ul className="flex items-center gap-2">
        {primaryNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                  isActive
                    ? 'bg-sky-800 text-white shadow-sm shadow-sky-800/30'
                    : 'bg-sky-100 text-sky-800 hover:bg-sky-200'
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
