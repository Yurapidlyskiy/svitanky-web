import type { PartnershipType } from './types';

export const PARTNERSHIP_TYPES: PartnershipType[] = [
  {
    description:
      "Об'єднуємо ресурси й експертизу, щоб масштабувати спільні проєкти для дітей і молоді.",
    icon: 'people',
    title: 'Благодійні фонди та організації',
    tone: 'blue',
  },
  {
    description:
      'Створюємо безпечний простір і духовну підтримку для дітей із прифронтових територій.',
    icon: 'home-heart',
    title: 'Церкви та громади',
    tone: 'purple',
  },
  {
    description:
      'Даруєте ресурси, послуги чи регулярну фінансову підтримку — і допомагаєте системно.',
    icon: 'briefcase',
    title: 'Бізнес та компанії',
    tone: 'green',
  },
  {
    description: 'Ділитеся часом, навичками й теплом — кожна пара рук наближає новий світанок.',
    icon: 'person',
    title: 'Волонтери та небайдужі люди',
    tone: 'amber',
  },
];
