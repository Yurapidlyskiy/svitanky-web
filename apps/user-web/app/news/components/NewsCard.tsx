import { formatNewsDate } from '@/app/news/lib/newsQuery';
import { NEWS_CATEGORY_BADGES, type NewsItem } from '@/app/news/types/news';
import Image from 'next/image';
import Link from 'next/link';

type NewsCardProps = {
  item: NewsItem;
  priority?: boolean;
};

export function NewsCard({ item, priority = false }: NewsCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-200 ease-out hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full">
        <Image
          alt={item.image.alt}
          className="object-cover"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={item.image.src}
        />
        <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {NEWS_CATEGORY_BADGES[item.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <time className="text-sm text-slate-500" dateTime={item.publishedAt}>
          {formatNewsDate(item.publishedAt)}
        </time>
        <h3 className="text-lg font-black leading-snug text-[#004574]">{item.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
        <Link
          aria-label={`Читати: ${item.title}`}
          className="mt-auto inline-flex w-fit items-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 active:scale-95"
          href={item.href}
        >
          Читати
        </Link>
      </div>
    </article>
  );
}
