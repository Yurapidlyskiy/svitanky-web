import type { JourneyMilestone } from './types';

export const JOURNEY_LEDE =
  'Кожен рік додавав нове світло — від першого табору до Дому Світанків, який приймає дітей і сьогодні.';

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  { description: 'Перший християнський табір «Світанки України».', year: '2018' },
  { description: 'Розвиток спільноти та регулярні зустрічі дітей і молоді.', year: '2019–2021' },
  { description: 'Через війну діяльність переноситься в інші міста.', year: '2022' },
  {
    description: 'Розвиток Дому Світанків у Верхньодніпровську.',
    isCurrent: true,
    year: 'Сьогодні',
  },
];
