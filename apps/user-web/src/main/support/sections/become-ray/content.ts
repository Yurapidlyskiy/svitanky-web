import type { RayFrequency, TrustPoint } from './types';

export const BECOME_RAY_EYEBROW = 'Регулярна підтримка';

export const BECOME_RAY_DESCRIPTION = [
  'Промінь — це людина, яка підтримує Світанки щомісяця.',
  'Незалежно від суми — кожен Промінь однаково важливий.',
];

export const RAY_FREQUENCIES: { id: RayFrequency; label: string }[] = [
  { id: 'monthly', label: 'Щомісячно' },
  { id: 'one-time', label: 'Один раз' },
];

export const AMOUNT_UNIT: Record<RayFrequency, string> = {
  monthly: 'грн/міс',
  'one-time': 'грн',
};

export const DEFAULT_FREQUENCY: RayFrequency = 'monthly';

export const DEFAULT_AMOUNT = 350;

export const CUSTOM_AMOUNT_LINES = ['Інша', 'сума'];

export const BECOME_RAY_CTA = 'Стати Променем';

export const TRUST_POINTS: TrustPoint[] = [
  { icon: 'lock', lines: ['Безпечно', 'та надійно'] },
  { icon: 'heart', lines: ['Легко скасувати', 'у будь-який момент'] },
  { icon: 'community', lines: ['Ти стаєш Другом', 'Світанків'] },
];

export const RAYS_BADGE = 'Наша спільна мета';

export const RAYS_COUNT = 347;
export const RAYS_GOAL = 1000;

export const RAYS_UNIT = 'Променів';
export const RAYS_CAPTION = 'вже світять щомісяця';

export const PEOPLE_WORD_FORMS: [string, string, string] = ['людина', 'людини', 'людей'];

export const RAYS_INVITATION = 'Долучися сьогодні!';
export const RAYS_CTA = 'Запалити наступний промінь';
