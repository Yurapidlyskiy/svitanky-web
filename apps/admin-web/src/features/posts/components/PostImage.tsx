import { cn } from '@project/common-ui';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  url: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Fills its positioned parent. Without a photo yet (a new draft) it shows a placeholder. */
export function PostImage({ url, alt, sizes, priority = false, className }: Props) {
  if (!url) {
    return (
      <div className="flex size-full items-center justify-center bg-brand-sky/30 text-brand-navy/30">
        <ImageIcon aria-hidden className="size-10" />
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={cn('object-cover', className)}
      fill
      priority={priority}
      sizes={sizes}
      src={url}
      // A local blob: preview cannot go through the image optimiser.
      unoptimized={url.startsWith('blob:')}
    />
  );
}
