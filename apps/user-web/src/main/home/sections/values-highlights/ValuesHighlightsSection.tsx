import { Section } from '@/shared/ui';

import { IconTextItem } from './IconTextItem';

import { VALUE_HIGHLIGHTS } from './content';

export function ValuesHighlightsSection() {
  return (
    <Section
      aria-label="Цінності Світанків"
      className="relative flex flex-col before:pointer-events-none before:absolute before:inset-x-0 before:-top-px before:z-10 before:h-0.5 before:bg-canvas lg:-mt-12 lg:before:hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {VALUE_HIGHLIGHTS.map((value) => (
          <IconTextItem icon={value.icon} key={value.text}>
            {value.text}
          </IconTextItem>
        ))}
      </div>
    </Section>
  );
}
