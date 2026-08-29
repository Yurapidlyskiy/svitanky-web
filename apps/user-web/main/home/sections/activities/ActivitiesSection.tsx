import { ActivityCard } from './ActivityCard';

const ACTIVITIES = [
  {
    accent: 'navy' as const,
    description: 'Lorem ipsum dolor sit amet, consec…',
    href: '/activities',
    image: { alt: 'Учасники літнього табору «Світанків України»', src: '/assets/images/shared/poster-1.jpeg' },
    subtitle: 'Літні табори «Світанків України»',
    title: 'Табори',
  },
  {
    accent: 'amber' as const,
    description: 'Lorem ipsum dolor sit amet, consec…',
    href: '/activities',
    image: { alt: 'Учасники «Світанкових вікендів»', src: '/assets/images/shared/poster-2.jpeg' },
    subtitle: 'Що таке «Світанкові вікенди»?',
    title: 'Світанкові вікенди',
  },
  {
    accent: 'navy' as const,
    description: 'Lorem ipsum dolor sit amet, consec…',
    href: '/activities',
    image: { alt: 'Подвір’я Дому Світанків', src: '/assets/images/shared/poster-3.jpeg' },
    subtitle: 'Облаштування дому Світанків',
    title: 'Дім Світанків',
  },
];

export function ActivitiesSection() {
  return (
    <section
      aria-label="Напрямки діяльності"
      className="flex flex-col bg-[#FFFDF8] px-5 sm:px-8 lg:px-12 xl:px-[12vw]"
      id="activities"
    >
      <h2 className="text-center font-heading text-4xl font-black uppercase text-sky-800 sm:text-5xl">
        Напрямки діяльності
      </h2>
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {ACTIVITIES.map((activity) => (
          <ActivityCard key={activity.title} {...activity} />
        ))}
      </div>
    </section>
  );
}
