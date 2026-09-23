/** Mirrors the `posts.category` check constraint and user-web's NewsCategory. */
export const POST_CATEGORIES = ['news', 'announcements', 'reports'] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

/** Singular labels — the badge on a card. */
export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  news: 'Новина',
  announcements: 'Анонс',
  reports: 'Звіт',
};
