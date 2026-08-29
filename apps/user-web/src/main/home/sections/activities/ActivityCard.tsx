import Image from 'next/image';
import Link from 'next/link';

type ActivityCardAccent = 'amber' | 'navy';

type ActivityCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: { src: string; alt: string };
  href: string;
  accent?: ActivityCardAccent;
};

const ACCENT_STYLES: Record<ActivityCardAccent, { content: string; button: string }> = {
  amber: {
    content: 'bg-[#FCEFD2]',
    button: 'bg-amber-400 text-brand-navy hover:bg-amber-300',
  },
  navy: {
    content: 'bg-brand-sky-mist',
    button: 'bg-brand-navy-muted text-white hover:bg-[#163d61]',
  },
};

export function ActivityCard({ accent = 'navy', description, href, image, subtitle, title }: ActivityCardProps) {
  const { button, content } = ACCENT_STYLES[accent];

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl shadow-sm">
      <div className="relative h-52 w-full sm:h-56">
        <Image
          alt={image.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={image.src}
        />
      </div>
      <div className={`flex flex-1 flex-col gap-2 p-6 ${content}`}>
        <h3 className="text-2xl font-black text-brand-navy">{title}</h3>
        <p className="text-base font-bold text-sky-700">{subtitle}</p>
        <p className="text-sm text-slate-600">{description}</p>
        <Link
          className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-[background-color,transform] duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${button}`}
          href={href}
        >
          Детальніше
          <svg aria-hidden="true" className="size-3" fill="currentColor" viewBox="0 0 12 12">
            <path d="M2 1.5 9.5 6 2 10.5Z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
