import type { ActivityDirection } from './types';

export const DIRECTIONS: ActivityDirection[] = [
  {
    accent: 'amber',
    description: 'Регулярні зустрічі для спілкування, дружби та духовного зростання',
    href: '/activities#weekends',
    icon: 'users',
    image: {
      alt: 'Учасники «Світанкових вікендів» на спільній зустрічі',
      src: '/assets/images/activities/weekends-activity.JPG',
    },
    imageFocalPoint: 'upper',
    order: '01',
    title: 'Світанкові вікенди',
  },
  {
    accent: 'navy',
    description: 'Літні та зимові табори, що дарують незабутні враження та розвиток',
    href: '/activities#camps',
    icon: 'tent',
    image: {
      alt: 'Вечірнє багаття в таборі «Світанків України»',
      src: '/assets/images/activities/camps-activity.JPG',
    },
    order: '02',
    title: 'Табори',
  },
  {
    accent: 'green',
    description: 'Простір для постійних зустрічей, навчання та підтримки дітей протягом року',
    href: '/activities#home',
    icon: 'home-heart',
    image: {
      alt: 'Діти та молодь у Домі Світанків',
      src: '/assets/images/shared/poster-3.jpeg',
    },
    order: '03',
    title: 'Дім Світанків',
  },
];
