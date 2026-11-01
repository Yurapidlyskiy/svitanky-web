/** Mirrors the `posts.category` check constraint and user-web's NewsCategory. */
export const POST_CATEGORIES = ['news', 'announcements', 'camps', 'projects', 'reports'] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

/** Every category but this one shares the article card; a project has its own card and fields. */
export const PROJECT_CATEGORY = 'projects';

export type ArticleCategory = Exclude<PostCategory, typeof PROJECT_CATEGORY>;

export const ARTICLE_CATEGORIES = POST_CATEGORIES.filter(
  (category): category is ArticleCategory => category !== PROJECT_CATEGORY
) as [ArticleCategory, ...ArticleCategory[]];

/** Singular labels — the badge on a card. */
export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  news: 'Новина',
  announcements: 'Анонс',
  camps: 'Табір',
  projects: 'Проєкт',
  reports: 'Звіт',
};

/** Mirrors the `posts.project_status` check constraint and user-web's ProjectStatus. */
export const PROJECT_STATUSES = ['active', 'planned', 'completed'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Збір триває',
  planned: 'Планується',
  completed: 'Закрито',
};
