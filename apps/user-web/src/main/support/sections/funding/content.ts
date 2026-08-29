import type { FundingItem } from './types';

export const FUNDING_ITEMS: FundingItem[] = [
  {
    accent: 'amber',
    description: 'Регулярні зустрічі для спілкування, дружби та духовного зростання',
    icon: 'people',
    image: {
      alt: 'Учасники «Світанкових вікендів» на спільній зустрічі',
      src: '/assets/images/activities/weekends-activity.JPG',
    },
    title: 'Світанкові вікенди',
  },
  {
    accent: 'navy',
    description: 'Літні та зимові табори, що дарують незабутні враження та розвиток',
    icon: 'tent',
    image: {
      alt: 'Учасники табору вирушають у подорож',
      src: '/assets/images/activities/camps-activity.JPG',
    },
    title: 'Табори',
  },
  {
    accent: 'green',
    description: 'Простір для постійних зустрічей, навчання та підтримки дітей протягом року',
    icon: 'home-heart',
    image: {
      alt: 'Діти та молодь у Домі Світанків',
      src: '/assets/images/shared/poster-3.jpg',
    },
    title: 'Дім Світанків',
  },
];
