'use client';

import { useLinkStatus } from 'next/link';

/** Goes inside a feed link. While that link loads, its marker lets the section dim the grid. */
export function NewsLinkPending() {
  const { pending } = useLinkStatus();

  return pending ? <span data-news-pending hidden /> : null;
}
