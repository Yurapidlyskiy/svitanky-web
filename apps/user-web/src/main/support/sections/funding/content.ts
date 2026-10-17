// Titles, descriptions and alt texts live in the messages under `support.funding.items.<id>`.
export const FUNDING_ITEMS = [
  {
    accent: 'amber',
    icon: 'people',
    id: 'weekends',
    image: '/assets/images/activities/weekends-activity.JPG',
  },
  {
    accent: 'navy',
    icon: 'tent',
    id: 'camps',
    image: '/assets/images/activities/camps-activity.JPG',
  },
  { accent: 'green', icon: 'home-heart', id: 'home', image: '/assets/images/shared/poster-3.jpg' },
  { accent: 'navy', icon: 'book', id: 'education' },
  { accent: 'green', icon: 'chat', id: 'community' },
] as const;
