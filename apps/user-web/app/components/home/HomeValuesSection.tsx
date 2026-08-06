import { IconTextItem } from './IconTextItem';

const values = [
  {
    alt: 'Церква',
    icon: '/assets/church.png',
    text: 'Спільнота віри та любові',
  },
  {
    alt: 'Діти та молодь',
    icon: '/assets/family.png',
    text: 'Діти та молодь зі Сходу',
  },
  {
    alt: 'Будинок',
    icon: '/assets/home.png',
    text: 'Дім, де приймають і захищають',
  },
  {
    alt: 'Зірка',
    icon: '/assets/star.png',
    text: 'Гідність · Турбота · Надія',
  },
];

export function HomeValuesSection() {
  return (
    <section aria-label="Цінності Світанків" className="bg-[#FFFDF8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-[12vw]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {values.map((value) => (
          <IconTextItem alt={value.alt} icon={value.icon} key={value.text}>
            {value.text}
          </IconTextItem>
        ))}
      </div>
    </section>
  );
}
