import type { Stat } from '@/shared/ui';

import type { CampFeature, CampsCollagePhoto } from './types';

export const CAMP_STATS: Stat[] = [
  { icon: 'sun', primary: 'З 2018 року', tone: 'amber' },
  { icon: 'tent', primary: '15+', secondary: 'Проведених таборів', tone: 'amber' },
  { icon: 'people', primary: '300+', secondary: 'Учасників', tone: 'navy' },
  { icon: 'heart', primary: 'Тисячі', secondary: 'Спогадів на все життя', tone: 'amber' },
];

export const CAMP_FEATURES: CampFeature[] = [
  {
    description:
      'Кожен день табору наповнений молитвою, роздумами та щирими розмовами, які допомагають краще пізнати себе, інших і Бога.',
    title: 'Духовне зростання',
  },
  {
    description:
      'Тут народжуються дружби, які тривають роками. Ми створюємо простір, де кожен відчуває підтримку, прийняття та довіру.',
    title: 'Справжня спільнота',
  },
  {
    description:
      'Командні ігри, квести, походи та нові випробування допомагають виходити за межі звичного й відкривати власні можливості.',
    title: 'Пригоди та виклики',
  },
  {
    description:
      'Майстер-класи, творчі активності та спільні проєкти допомагають розкрити таланти, знайти нові захоплення та спробувати себе в чомусь новому.',
    title: 'Творчість та нові відкриття',
  },
  {
    description: 'Улюблена частина дня: пісні, історії, жарти та теплі розмови.',
    title: 'Вечірні ватри',
  },
  {
    description: 'Час для нових відкриттів, натхнення та справжнього перезавантаження.',
    title: 'Відпочинок із сенсом',
  },
];

export const CAMPS_COLLAGE_PHOTOS: CampsCollagePhoto[] = [
  { alt: 'Учасник табору відпочиває на природі', src: '/assets/images/shared/poster-1.jpeg' },
  { alt: 'Учасники табору святкують разом уночі', src: '/assets/images/shared/poster-2.jpeg' },
  { alt: 'Команда табору на груповому фото', src: '/assets/images/shared/poster-3.jpg' },
];
