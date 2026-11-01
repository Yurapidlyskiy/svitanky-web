import type { ArticleCategory, PostCategory, ProjectStatus } from './categories';

export type ProjectDetails = {
  status: ProjectStatus;
  /** UAH */
  goal: number;
  /** UAH */
  raised: number;
};

type PostContent = {
  title: string;
  excerpt: string;
  /** `YYYY-MM-DD` */
  publishedOn: string;
  imageUrl: string | null;
};

/** The category decides the shape: only a project carries fundraising details. */
type PostKind =
  | { category: ArticleCategory }
  | { category: Extract<PostCategory, 'projects'>; project: ProjectDetails };

/** What a card needs to render — a saved post, or the live draft in the form. */
export type PostCardData = PostContent & PostKind;

export type Post = PostCardData & { id: string; imageUrl: string };

export type PostsPage = {
  posts: Post[];
  page: number;
  totalPages: number;
};

export type PostField =
  'category' | 'title' | 'excerpt' | 'publishedOn' | 'image' | 'projectStatus' | 'goal' | 'raised';

export type DeletePostState = {
  error?: string;
};

export type PostFormState = {
  error?: string;
  fieldErrors?: Partial<Record<PostField, string[]>>;
};
