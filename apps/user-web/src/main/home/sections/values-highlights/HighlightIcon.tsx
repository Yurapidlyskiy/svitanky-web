export type HighlightIconName = 'community' | 'heart' | 'sprout' | 'sun';

const ICON_PATHS: Record<HighlightIconName, string[]> = {
  community: [
    'M12 10.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z',
    'M6.4 11.4a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
    'M17.6 11.4a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
    'M7.2 18.5a4.8 4.8 0 0 1 9.6 0',
    'M2.4 17.6a4.2 4.2 0 0 1 3.5-3.3',
    'M21.6 17.6a4.2 4.2 0 0 0-3.5-3.3',
  ],
  heart: [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z',
  ],
  sprout: [
    'M12 20.5v-7.8',
    'M12 12.7C7.9 12.7 5.5 10.3 5.5 6.2c4.1 0 6.5 2.4 6.5 6.5Z',
    'M12 12.7c4.1 0 6.5-2.4 6.5-6.5-4.1 0-6.5 2.4-6.5 6.5Z',
  ],
  sun: [
    'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z',
    'M12 2.5v1.8',
    'M12 19.7v1.8',
    'M2.5 12h1.8',
    'M19.7 12h1.8',
    'M5.2 5.2l1.3 1.3',
    'M17.5 17.5l1.3 1.3',
    'M18.8 5.2l-1.3 1.3',
    'M6.5 17.5l-1.3 1.3',
  ],
};

type HighlightIconProps = {
  name: HighlightIconName;
};

export function HighlightIcon({ name }: HighlightIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="size-12 shrink-0 text-brand-navy sm:size-14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      {ICON_PATHS[name].map((d) => (
        <path d={d} key={d} />
      ))}
    </svg>
  );
}
