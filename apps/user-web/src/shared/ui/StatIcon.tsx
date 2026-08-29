export type StatIconName = 'heart' | 'home' | 'home-heart' | 'people' | 'person' | 'sun' | 'tent';

const ICON_PATHS: Record<StatIconName, string[]> = {
  heart: [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z',
  ],
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.6V21h14V9.6'],
  'home-heart': [
    'M3 10.5 12 3l9 7.5',
    'M5 9.6V21h14V9.6',
    'M12 18s-2.6-1.8-2.6-3.4a1.6 1.6 0 0 1 2.6-1.2 1.6 1.6 0 0 1 2.6 1.2C14.6 16.2 12 18 12 18Z',
  ],
  people: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
    'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  ],
  person: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7'],
  sun: [
    'M12 2v2',
    'M12 20v2',
    'M4.93 4.93l1.41 1.41',
    'M17.66 17.66l1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'M4.93 19.07l1.41-1.41',
    'M17.66 6.34l1.41-1.41',
  ],
  tent: ['M3.5 21 14 3', 'M20.5 21 10 3', 'M15.5 21 12 15l-3.5 6', 'M2 21h20'],
};

const CIRCLE_ICONS: StatIconName[] = ['sun'];

type StatIconProps = {
  name: StatIconName;
};

export function StatIcon({ name }: StatIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="size-7 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {CIRCLE_ICONS.includes(name) ? <circle cx="12" cy="12" r="4" /> : null}
      {ICON_PATHS[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
