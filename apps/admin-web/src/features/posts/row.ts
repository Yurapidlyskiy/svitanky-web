import type { PostCategory, ProjectStatus } from './categories';
import { PROJECT_CATEGORY } from './categories';
import type { PostFields } from './schema';
import type { Post } from './types';

export const POST_COLUMNS =
  'id, category, title, excerpt, published_on, image_path, project_status, goal_amount, raised_amount';

export type PostRow = {
  id: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  published_on: string;
  image_path: string;
  project_status: ProjectStatus | null;
  goal_amount: number | null;
  raised_amount: number | null;
};

/** The project columns are written as null otherwise, so turning a project into news clears them. */
export function toPostColumns(fields: PostFields) {
  const isProject = fields.category === PROJECT_CATEGORY;

  return {
    category: fields.category,
    title: fields.title,
    excerpt: fields.excerpt,
    published_on: fields.publishedOn,
    project_status: isProject ? fields.projectStatus : null,
    goal_amount: isProject ? fields.goal : null,
    raised_amount: isProject ? fields.raised : null,
  };
}

export function fromPostRow(row: PostRow, imageUrl: string): Post {
  const content = {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    publishedOn: row.published_on,
    imageUrl,
  };

  if (row.category !== PROJECT_CATEGORY) return { ...content, category: row.category };

  // `posts_project_fields_check` guarantees these are set for a project.
  return {
    ...content,
    category: row.category,
    project: {
      status: row.project_status as ProjectStatus,
      goal: row.goal_amount as number,
      raised: row.raised_amount as number,
    },
  };
}
