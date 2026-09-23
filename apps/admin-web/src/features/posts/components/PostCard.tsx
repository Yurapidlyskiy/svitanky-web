import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { POST_CATEGORY_LABELS } from '../categories';
import { formatPostDate } from '../format';
import type { PostCardData } from '../types';

type Props = {
  post: PostCardData;
  priority?: boolean;
};

/** Mirrors user-web's NewsCard, so the admin sees what visitors will see. */
export function PostCard({ post, priority = false }: Props) {
  const { category, title, excerpt, publishedOn, imageUrl } = post;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border">
      <div className="relative aspect-[16/10] w-full bg-brand-sky/30">
        {imageUrl ? (
          <Image
            alt={title}
            className="object-cover"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
            src={imageUrl}
            // A local blob: preview cannot go through the image optimiser.
            unoptimized={imageUrl.startsWith('blob:')}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-brand-navy/30">
            <ImageIcon aria-hidden className="size-10" />
          </div>
        )}
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
        <span
          aria-hidden
          className="mt-auto inline-flex w-fit rounded-full bg-brand-amber px-6 py-2.5 text-sm font-bold text-white"
        >
          Читати
        </span>
      </div>
    </article>
  );
}
