import type { SupportResult } from './types';

export const SUPPORT_RESULTS: SupportResult[] = [
  { icon: 'home', text: 'Створюється постійний простір для проживання дітей', tone: 'amber' },
  { icon: 'people', text: 'Проведено десятки виховних зустрічей', tone: 'blue' },
  { icon: 'tent', text: 'Організовуються літні табори', tone: 'green' },
  {
    icon: 'person',
    text: 'Формується нове покоління відповідальних молодих людей',
    tone: 'purple',
  },
];

// Photo is a temporary stand-in until real reporting photography is available.
export const TRANSPARENCY_PHOTO = {
  alt: 'Ілюстрація до розділу «Прозорість»',
  src: '/assets/images/shared/poster-1.jpeg',
};
