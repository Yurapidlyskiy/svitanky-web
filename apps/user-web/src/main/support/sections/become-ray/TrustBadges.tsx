import type { ReactNode } from 'react';

import { TRUST_POINTS } from './content';
import type { TrustPointIcon } from './types';

const ICON_SHAPE: Record<TrustPointIcon, ReactNode> = {
  lock: (
    <>
      <rect height="10" rx="2" width="14" x="5" y="11" />
      <path d="M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11" />
    </>
  ),
  heart: (
    <path d="M12 20.3 4.6 13a4.7 4.7 0 0 1 0-6.6 4.6 4.6 0 0 1 6.6 0l.8.8.8-.8a4.6 4.6 0 0 1 6.6 0 4.7 4.7 0 0 1 0 6.6Z" />
  ),
  community: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.4a3.2 3.2 0 0 1 0 6.2M17.5 15.2a5.5 5.5 0 0 1 3 4.3" />
    </>
  ),
};

export function TrustBadges() {
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-4">
      {TRUST_POINTS.map((point) => (
        <li className="flex items-center gap-3" key={point.icon}>
          <svg
            aria-hidden="true"
            className="size-7 shrink-0 text-brand-navy"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            {ICON_SHAPE[point.icon]}
          </svg>

          <p className="text-sm leading-tight text-slate-600">
            {point.lines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
