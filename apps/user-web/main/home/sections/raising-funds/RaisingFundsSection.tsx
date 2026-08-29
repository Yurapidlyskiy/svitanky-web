import { Section, SectionHeading } from '@/shared/ui';

import { RaisingFundsCard } from './RaisingFundsCard';

const ANSWER = 'Відчуття спільноти та нормального життя.';
const QUESTION = 'Що це дає дитині?';

const RAISING_FUNDS = [
  {
    icon: { alt: 'Світанкові вікенди', src: '/assets/images/home/raising-funds/weekends.png' },
    paragraphs: [
      'Регулярні зустрічі на вихідних для дітей з різних куточків України.',
      'Це час для відпочинку, навчання та духовного збагачення.',
      'Програма включає молитву, ігри, творчі майстер-класи, спортивні змагання та добрі справи.',
    ],
    title: 'Світанкові Вікенди',
  },
  {
    icon: { alt: 'Облаштування дому Світанків', src: '/assets/images/home/raising-funds/homeWithCoffee.png' },
    paragraphs: [
      'Ремонт та облаштування приміщень для комфортного проживання дітей.',
      'Створення безпечного простору з усіма необхідними умовами для життя та навчання.',
      'Облаштування спальних кімнат, навчальних просторів, кухні та загальних зон.',
    ],
    title: 'Облаштування дому Світанків',
  },
  {
    icon: { alt: 'Організація зимових/літніх таборів', src: '/assets/images/home/raising-funds/camp.png' },
    paragraphs: [
      'Організація навчально-виховних таборів для дітей різного віку.',
      'Програми розвитку лідерських якостей, духовного зростання та відпочинку на природі.',
      'Творчі майстер-класи, спортивні активності, молитва та спільні трапези.',
    ],
    title: 'Організація зимових/літніх таборів',
  },
];

export function RaisingFundsSection() {
  return (
    <Section aria-label="На що ми збираємо кошти" className="flex flex-col" id="raising-funds">
      <SectionHeading lede="Кожен ваш донат — це конкретна допомога, яка змінює життя">
        На що ми збираємо кошти?
      </SectionHeading>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {RAISING_FUNDS.map((item) => (
          <RaisingFundsCard
            answer={ANSWER}
            icon={item.icon}
            key={item.title}
            paragraphs={item.paragraphs}
            question={QUESTION}
            title={item.title}
          />
        ))}
      </div>
    </Section>
  );
}
