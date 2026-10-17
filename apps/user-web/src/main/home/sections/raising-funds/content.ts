// Texts live in the messages under `home.raisingFunds.items.<id>`.
export const RAISING_FUNDS = [
  { icon: '/assets/images/home/raising-funds/weekends.png', id: 'weekends' },
  { icon: '/assets/images/home/raising-funds/homeWithCoffee.png', id: 'home' },
  { icon: '/assets/images/home/raising-funds/camp.png', id: 'camps' },
] as const;

/** Each card has three paragraphs: `p1`, `p2`, `p3`. */
export const PARAGRAPH_KEYS = ['p1', 'p2', 'p3'] as const;
