'use client';

import { cn } from '@project/common-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ADMIN_NAVIGATION, ROUTES } from '@/shared/config/routes';

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Розділи панелі">
      <ul className="flex items-center gap-1">
        {ADMIN_NAVIGATION.map(({ href, label }) => {
          const isActive =
            href === ROUTES.dashboard ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm text-brand-sky transition-colors hover:bg-canvas/10 hover:text-canvas',
                  isActive && 'bg-canvas/10 font-semibold text-canvas'
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
