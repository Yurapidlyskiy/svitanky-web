import type { PostCategory } from './categories';

export type Post = {
  id: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  /** `YYYY-MM-DD` */
  publishedOn: string;
  imageUrl: string;
};

/** What a card needs to render — a saved post, or the live draft in the form. */
export type PostCardData = Omit<Post, 'id' | 'imageUrl'> & {
  imageUrl: string | null;
};

export type PostField = 'category' | 'title' | 'excerpt' | 'publishedOn' | 'image';

export type PostFormState = {
  error?: string;
  fieldErrors?: Partial<Record<PostField, string[]>>;
};
