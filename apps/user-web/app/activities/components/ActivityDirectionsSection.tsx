import { ActivityDirectionCard, type ActivityImageFocalPoint } from './ActivityDirectionCard';
import type { DirectionIconName } from './DirectionIcon';

type ActivityDirection = {
  accent: 'amber' | 'navy' | 'green';
  description: string;
  href: string;
  icon: DirectionIconName;
  image: { src: string; alt: string };
  imageFocalPoint?: ActivityImageFocalPoint;
  order: string;
  title: string;
};

const DIRECTIONS: ActivityDirection[] = [
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

export function ActivityDirectionsSection() {
  return (
    <section
      aria-labelledby="activity-directions-title"
      className="bg-[#FFFDF8] px-5 pb-20 pt-4 sm:px-8 lg:px-12 xl:px-[100px]"
    >
      <h2
        className="text-center font-heading text-3xl font-black uppercase text-[#1B4D7A] sm:text-4xl lg:text-5xl"
        id="activity-directions-title"
      >
        Три напрями - одна місія
      </h2>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8 sm:mt-14 lg:gap-10">
        {DIRECTIONS.map((direction, index) => (
          <ActivityDirectionCard
            key={direction.title}
            {...direction}
            imageSide={index % 2 === 0 ? 'left' : 'right'}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
