import Image from 'next/image';
import type { ReactNode } from 'react';

type IconTextItemProps = {
  alt: string;
  icon: string;
  children: ReactNode;
};

export function IconTextItem({ alt, children, icon }: IconTextItemProps) {
  return (
    <article className="flex max-w-60 flex-col items-center text-center">
      <Image
        alt={alt}
        className="h-24 w-28 object-contain sm:h-28 sm:w-32"
        height={120}
        src={icon}
        width={136}
      />
      <p className="mt-4 text-lg font-bold leading-snug text-sky-800 sm:text-xl">
        {children}
      </p>
    </article>
  );
}
