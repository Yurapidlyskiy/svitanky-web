import type { NewsItem } from '@/app/news/types/news';

import { NewsCard } from './NewsCard';

type NewsGridProps = {
  items: NewsItem[];
};

export function NewsGrid({ items }: NewsGridProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-3xl bg-white p-10 text-center text-base text-slate-600 shadow-sm">
        У цій категорії поки немає публікацій. Незабаром тут з’являться новини спільноти.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item, index) => (
        <NewsCard item={item} key={item.id} priority={index < 3} />
      ))}
    </div>
  );
}
