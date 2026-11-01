import type { ReactNode } from 'react';

import { PROJECT_CATEGORY } from '../categories';
import type { PostCardData } from '../types';
import { ArticlePostCard } from './ArticlePostCard';
import { ProjectPostCard } from './ProjectPostCard';

type Props = {
  post: PostCardData;
  priority?: boolean;
  /** Admin controls on the card. Left out in the form's preview. */
  actions?: ReactNode;
};

/** The one place that decides which card a category gets. */
export function PostCard({ post, priority = false, actions }: Props) {
  if (post.category === PROJECT_CATEGORY) {
    return (
      <ProjectPostCard post={post} project={post.project} priority={priority} actions={actions} />
    );
  }

  return <ArticlePostCard post={post} priority={priority} actions={actions} />;
}
