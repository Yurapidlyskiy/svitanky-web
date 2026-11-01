import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { POST_CATEGORY_LABELS } from '../categories';
import { formatPostDate } from '../format';
import type { PostCardData } from '../types';
import { PostImage } from './PostImage';

type Props = {
  post: PostCardData;
  priority?: boolean;
  actions?: ReactNode;
};

/** Mirrors user-web's NewsCard: news, announcements, camps and reports. */
export function ArticlePostCard({ post, priority, actions }: Props) {
  const { category, title, excerpt, publishedOn, imageUrl } = post;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border">
      <div className="relative aspect-[16/10] w-full">
        <PostImage
          alt={title}
          priority={priority}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          url={imageUrl}
        />
        <span className="absolute top-4 left-4 rounded-full bg-brand-amber px-3 py-1 text-xs font-bold text-white shadow-sm">
          {POST_CATEGORY_LABELS[category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <time className="text-sm text-brand-slate" dateTime={publishedOn}>
          {formatPostDate(publishedOn)}
        </time>
        <h3 className="text-lg leading-snug font-black break-words text-brand-navy">
          {title || <span className="opacity-40">Заголовок публікації</span>}
        </h3>
        <p className="text-sm leading-relaxed break-words text-brand-slate">
          {excerpt || <span className="opacity-50">Короткий опис, який побачать відвідувачі</span>}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span
            aria-hidden
            className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-6 py-2.5 text-sm font-bold text-white"
          >
            Читати
            <ArrowRight className="size-4" />
          </span>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </article>
  );
}
