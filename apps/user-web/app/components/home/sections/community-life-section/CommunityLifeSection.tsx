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
    <section
      aria-label="Ми створюємо не просто прихисток, а дім"
      className="flex flex-col bg-[#FFFDF8] px-5 sm:px-8 lg:px-12 xl:px-[12vw]"
      id="community-life"
    >
      <h2 className="font-heading text-2xl font-black uppercase text-sky-800 sm:text-3xl">
        Ми створюємо не просто прихисток, а дім
      </h2>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
        {ROWS.map((row, index) => (
          <CommunityLifeRow image={row.image} key={row.text} reverse={index % 2 === 1} text={row.text} />
        ))}
      </div>
    </section>
  );
}
