export const POSTS_PAGE_SIZE = 12;

export type PageParam = string | string[] | undefined;

/** Search params are untrusted: anything but a plain positive number is page 1. */
export function parsePageParam(value: PageParam): number {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate || !/^\d+$/.test(candidate)) return 1;
  return Math.max(Number(candidate), 1);
}

/** Clamps to the last page that exists and returns its inclusive row range. */
export function resolvePage(requested: number, total: number) {
  const totalPages = Math.max(Math.ceil(total / POSTS_PAGE_SIZE), 1);
  const page = Math.min(requested, totalPages);
  const from = (page - 1) * POSTS_PAGE_SIZE;

  return { page, totalPages, from, to: from + POSTS_PAGE_SIZE - 1 };
}
