export type DirectionIconName = 'users' | 'tent' | 'home-heart';

const ICON_PATHS: Record<DirectionIconName, string[]> = {
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
    'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  ],
  tent: ['M3.5 21 14 3', 'M20.5 21 10 3', 'M15.5 21 12 15l-3.5 6', 'M2 21h20'],
  'home-heart': [
    'M3 10.5 12 3l9 7.5',
    'M5 9.6V21h14V9.6',
    'M12 18s-2.6-1.8-2.6-3.4a1.6 1.6 0 0 1 2.6-1.2 1.6 1.6 0 0 1 2.6 1.2C14.6 16.2 12 18 12 18Z',
  ],
};

type DirectionIconProps = {
  name: DirectionIconName;
};

export function DirectionIcon({ name }: DirectionIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="size-8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {ICON_PATHS[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
