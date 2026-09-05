import type { ReactNode } from 'react';

import type { HighlightIconName } from './HighlightIcon';
import { HighlightIcon } from './HighlightIcon';

type IconTextItemProps = {
  icon: HighlightIconName;
  children: ReactNode;
};

export function IconTextItem({ children, icon }: IconTextItemProps) {
  return (
    <article className="flex max-w-60 flex-col items-center text-center">
      <HighlightIcon name={icon} />
      <p className="mt-4 text-lg font-bold leading-snug text-sky-800 sm:text-xl">{children}</p>
    </article>
  );
}
