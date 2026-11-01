import { ROUTES } from '@/shared/config/routes';

import { POST_CATEGORY_PLURAL_LABELS, type PostCategory } from '../categories';
import type { Post } from '../types';
import { BackLink } from './BackLink';
import { PostForm } from './PostForm';

type Props = {
  today: string;
  /** The category this screen was opened from, and where it returns to. */
  category: PostCategory;
  /** The post being edited. Absent when creating. */
  post?: Post;
};

export function PostEditorScreen({ today, category, post }: Props) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6">
      <div className="grid gap-2">
        <BackLink href={ROUTES.postsInCategory(category)}>
          {POST_CATEGORY_PLURAL_LABELS[category]}
        </BackLink>
        <h1 className="text-2xl font-semibold text-brand-navy">
          {post ? 'Редагування публікації' : 'Нова публікація'}
        </h1>
      </div>
      <PostForm today={today} category={category} post={post} />
    </section>
  );
}
