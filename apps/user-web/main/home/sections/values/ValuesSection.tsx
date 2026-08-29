import { Section, SectionHeading } from '@/shared/ui';

import { ValueCard } from './ValueCard';

const VALUES = [
  {
    description:
      'Кожна дитина — це унікальний дар і особистість із власною гідністю та потенціалом. Ми віримо, що дитина має право на любов, захист і розвиток у безпечному середовищі, де її голос почутий, а майбутнє підтримане.',
    icon: { alt: 'Дитина', src: '/assets/images/home/values/values-child.png' },
    title: 'Дитина',
  },
  {
    description:
      'Ми переконані, що кожна людина створена для життя у свободі, заслуговує бути почутою, мати право на власний вибір і жити з відчуттям власної цінності.',
    icon: { alt: 'Гідність', src: '/assets/images/home/values/values-dignity.png' },
    title: 'Гідність',
  },
  {
    description:
      'Милосердя відкриває серце до потреб ближнього, допомагає бачити біль і реагувати добрими вчинками. Це здатність любити не на словах, а діями, творячи простір співчуття, підтримки й взаємної допомоги.',
    icon: { alt: 'Милосердя', src: '/assets/images/home/values/values-compassion.png' },
    title: 'Милосердя',
  },
  {
    description:
      'Відповідальність — це готовність приймати наслідки своїх рішень і вчинків. Вона проявляється у щоденній вірності обов’язкам, турботі про інших і спільне добро, у здатності бути надійною опорою для спільноти.',
    icon: { alt: 'Відповідальність', src: '/assets/images/home/values/values-responsibility.png' },
    title: 'Відповідальність',
  },
];

export function ValuesSection() {
  return (
    <Section aria-label="Наші цінності" className="flex flex-col" id="values">
      <SectionHeading>Наші цінності</SectionHeading>
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        {VALUES.map((value) => (
          <ValueCard description={value.description} icon={value.icon} key={value.title} title={value.title} />
        ))}
      </div>
    </Section>
  );
}
