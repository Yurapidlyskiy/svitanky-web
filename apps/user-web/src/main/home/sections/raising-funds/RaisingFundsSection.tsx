import { Section, SectionHeading } from '@/shared/ui';

import { RaisingFundsCard } from './RaisingFundsCard';

import { ANSWER, QUESTION, RAISING_FUNDS } from './content';

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
