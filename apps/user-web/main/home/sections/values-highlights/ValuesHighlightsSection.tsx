import { Section } from '@/shared/ui';

import { IconTextItem } from './IconTextItem';

const values = [
  {
    alt: 'Церква',
    icon: '/assets/images/home/values-highlights/church.png',
    text: 'Спільнота віри та любові',
  },
  {
    alt: 'Діти та молодь',
    icon: '/assets/images/home/values-highlights/family.png',
    text: 'Діти та молодь зі Сходу',
  },
  {
    alt: 'Будинок',
    icon: '/assets/images/home/values-highlights/home.png',
    text: 'Дім, де приймають і захищають',
  },
  {
    alt: 'Зірка',
    icon: '/assets/images/home/values-highlights/star.png',
    text: 'Гідність · Турбота · Надія',
  },
];

export function ValuesHighlightsSection() {
  return (
    <Section
      aria-label="Цінності Світанків"
      className="relative flex flex-col before:pointer-events-none before:absolute before:inset-x-0 before:-top-px before:z-10 before:h-0.5 before:bg-canvas lg:before:hidden"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {values.map((value) => (
          <IconTextItem alt={value.alt} icon={value.icon} key={value.text}>
            {value.text}
          </IconTextItem>
        ))}
      </div>
    </Section>
  );
}
