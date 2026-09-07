import type { ReactNode } from 'react';

import type { PerkIconName } from './types';

type IconSpec = {
  filled?: boolean;
  shape: ReactNode;
  toneClassName: string;
};

const ICONS: Record<PerkIconName, IconSpec> = {
  calendar: {
    shape: (
      <>
        <rect height="15" rx="2.5" width="17" x="3.5" y="5" />
        <path d="M8 3.2v3.6M16 3.2v3.6M3.5 10h17" />
        <g fill="currentColor" stroke="none">
          <circle cx="8" cy="13.5" r="1" />
          <circle cx="12" cy="13.5" r="1" />
          <circle cx="16" cy="13.5" r="1" />
          <circle cx="8" cy="17" r="1" />
          <circle cx="12" cy="17" r="1" />
        </g>
      </>
    ),
    toneClassName: 'text-brand-navy',
  },
  chart: {
    shape: (
      <>
        <rect height="7" rx="1.6" width="3.6" x="4" y="13" />
        <rect height="11" rx="1.6" width="3.6" x="10.2" y="9" />
        <rect fill="currentColor" height="15.5" rx="1.6" width="3.6" x="16.4" y="4.5" />
      </>
    ),
    toneClassName: 'text-brand-navy',
  },
  community: {
    shape: (
      <>
        <circle cx="9.5" cy="8.5" r="3.1" />
        <path d="M3.8 19.4a5.7 5.7 0 0 1 11.4 0" />
        <path d="M16 5.9a3.1 3.1 0 0 1 0 5.6M17.4 13.4a5.7 5.7 0 0 1 3.4 4.6" />
      </>
    ),
    toneClassName: 'text-brand-navy',
  },
  document: {
    shape: (
      <>
        <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3.5V8h4.5" />
        <path d="M9 12.5h6M9 16h4" />
      </>
    ),
    toneClassName: 'text-brand-navy',
  },
  heart: {
    filled: true,
    shape: (
      <path d="M12 20.8 4.3 13a4.9 4.9 0 0 1 0-6.9 4.8 4.8 0 0 1 6.9 0l.8.8.8-.8a4.8 4.8 0 0 1 6.9 0 4.9 4.9 0 0 1 0 6.9Z" />
    ),
    toneClassName: 'text-red-500',
  },
  star: {
    filled: true,
    shape: <path d="m12 2.6 2.9 6.2 6.8.8-5 4.6 1.3 6.7-6-3.3-6 3.3 1.3-6.7-5-4.6 6.8-.8Z" />,
    toneClassName: 'text-brand-amber-strong',
  },
};

type PerkIconProps = {
  name: PerkIconName;
};

export function PerkIcon({ name }: PerkIconProps) {
  const icon = ICONS[name];

  return (
    <svg
      aria-hidden="true"
      className={`size-9 ${icon.toneClassName}`}
      fill={icon.filled ? 'currentColor' : 'none'}
      stroke={icon.filled ? 'none' : 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {icon.shape}
    </svg>
  );
}
