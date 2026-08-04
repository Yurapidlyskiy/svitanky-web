import Link from 'next/link';

import { primaryNavigation } from './siteNavigation';

export function PrimaryNavigation() {
  return (
    <nav aria-label="Основна навігація" className="hidden lg:block">
      <ul className="flex items-center gap-2">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link
              className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
