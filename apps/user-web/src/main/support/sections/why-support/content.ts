import type { StatIconName } from '@/shared/ui';

export type WhySupportItem = {
  description: string;
  icon: StatIconName;
  title: string;
};

export const WHY_SUPPORT_ITEMS: WhySupportItem[] = [
  {
    description:
      'Регулярні внески дозволяють нам планувати табори, зустрічі та розвиток проєктів наперед.',
    icon: 'sun',
    title: 'Стабільність',
  },
  {
    description:
      'Разом ми створюємо безпечний простір, де діти можуть відпочивати, розвиватися, навчатися та відчувати себе прийнятими й потрібними.',
    icon: 'home',
    title: 'Дім для дітей',
  },
  {
    description:
      'Кожен Друг Світанків стає частиною великої історії добра. Разом ми підтримуємо дітей, надихаємо молодь і змінюємо життя через довіру, любов і турботу.',
    icon: 'people',
    title: 'Сильна спільнота',
  },
];
