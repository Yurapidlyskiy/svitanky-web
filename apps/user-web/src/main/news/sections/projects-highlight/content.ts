import type { Project, ProjectStat } from './types';

export const PROJECT_STATS: ProjectStat[] = [
  { icon: 'home', id: 'home', tone: 'amber' },
  { icon: 'tent', id: 'camps', tone: 'amber' },
  { icon: 'people', id: 'children', tone: 'navy' },
  { icon: 'heart', id: 'memories', tone: 'amber' },
];

// Photos are temporary stand-ins until real project photography is available.
const PROJECT_IMAGES = [
  { alt: 'Учасники спільноти «Світанки України»', src: '/assets/images/shared/poster-3.jpg' },
  { alt: 'Ілюстрація до проєкту «Світанкові вікенди»', src: '/assets/images/shared/poster-2.jpeg' },
  { alt: 'Ілюстрація до проєкту «Літні табори»', src: '/assets/images/shared/poster-1.jpeg' },
  { alt: 'Учасники спільноти «Світанки України»', src: '/assets/images/shared/poster-3.jpg' },
];

/**
 * Temporary content until the admin panel can manage projects. Like the news items, the
 * project texts are stand-ins for database rows, so they are deliberately not in the messages. `raised` will come from the
 * bank account balance once that integration exists — the displayed percentage is always
 * derived from raised/goal, so it stays correct once real numbers land.
 */
export const PROJECTS: Project[] = [
  {
    description:
      'Місце, яке стане справжнім домом для дітей, що втратили відчуття безпеки через війну.',
    goal: 1_200_000,
    href: '/news?category=projects',
    id: 'dim-svitankiv',
    image: PROJECT_IMAGES[0]!,
    raised: 840_000,
    status: 'active',
    title: 'Дім світанків',
  },
  {
    description: 'Регулярні зустрічі для молитви, навчання, служіння та спільноти.',
    goal: 150_000,
    href: '/news?category=projects',
    id: 'svitankovi-vikendy',
    image: PROJECT_IMAGES[1]!,
    raised: 95_000,
    status: 'active',
    title: 'Світанкові вікенди',
  },
  {
    description: '10 днів пригод, розвитку та духовного відновлення.',
    goal: 350_000,
    href: '/news?category=projects',
    id: 'litni-tabory',
    image: PROJECT_IMAGES[2]!,
    raised: 230_000,
    status: 'active',
    title: 'Літні табори',
  },
  {
    description: 'Створення простору для навчання, творчості та розвитку дітей і молоді.',
    goal: 250_000,
    href: '/news?category=projects',
    id: 'osvitniy-tsentr',
    image: PROJECT_IMAGES[3]!,
    raised: 0,
    status: 'planned',
    title: 'Освітній центр',
  },
];
