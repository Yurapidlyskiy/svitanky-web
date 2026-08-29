import { Section, SectionHeading } from '@/shared/ui';

import { CommunityLifeRow } from './CommunityLifeRow';

const ROWS = [
  {
    image: { alt: 'Виховники та підлітки на території табору', src: '/assets/images/shared/poster-1.jpeg' },
    text: 'Діти зростають у спільноті з виховниками, як у великій родині',
  },
  {
    image: { alt: 'Діти на літньому таборі серед природи', src: '/assets/images/shared/poster-2.jpeg' },
    text: 'Проходять літні табори, формаційні зустрічі та тематичні школи',
  },
  {
    image: { alt: 'Спільна молитва разом зі священником', src: '/assets/images/shared/poster-3.jpeg' },
    text: 'Щоденне життя сповнене сенсу: молитва, спільні трапези, обов’язки, ігри та щирі розмови',
  },
  {
    image: { alt: 'Підлітки біля будинку Світанків', src: '/assets/images/shared/poster-1.jpeg' },
    text: 'Є постійні кімнати для проживання, де панує затишок і безпека',
  },
  {
    image: { alt: 'Діти обіймаються під час активності', src: '/assets/images/shared/poster-2.jpeg' },
    text: 'Формується нова генерація лідерів, які стануть світлом для України',
  },
];

export function CommunityLifeSection() {
  return (
    <Section
      aria-label="Ми створюємо не просто прихисток, а дім"
      className="flex flex-col"
      id="community-life"
    >
      <SectionHeading align="left" size="sm">
        Ми створюємо не просто прихисток, а дім
      </SectionHeading>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
        {ROWS.map((row, index) => (
          <CommunityLifeRow image={row.image} key={row.text} reverse={index % 2 === 1} text={row.text} />
        ))}
      </div>
    </Section>
  );
}
