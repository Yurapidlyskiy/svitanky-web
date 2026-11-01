import { useCallback, useEffect, useState } from 'react';

import { PROJECT_CATEGORY, type PostCategory, type ProjectStatus } from '../categories';
import { parseAmountInput } from '../format';
import type { Post, PostCardData } from '../types';

type Options = {
  /** The post being edited. Absent when creating. */
  post?: Post;
  initialPublishedOn: string;
};

/** Live form values, shared by the inputs and the card preview. */
export function usePostDraft({ post, initialPublishedOn }: Options) {
  const project = post?.category === PROJECT_CATEGORY ? post.project : null;

  const [category, setCategory] = useState<PostCategory>(post?.category ?? 'news');
  const [title, setTitle] = useState(post?.title ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [publishedOn, setPublishedOn] = useState(post?.publishedOn ?? initialPublishedOn);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(project?.status ?? 'active');
  const [goal, setGoal] = useState(project ? String(project.goal) : '');
  const [raised, setRaised] = useState(project ? String(project.raised) : '0');

  // Object URLs pin the file in memory until revoked: release the previous
  // preview whenever it is replaced, and the last one on unmount.
  useEffect(() => {
    if (!newImageUrl) return;
    return () => URL.revokeObjectURL(newImageUrl);
  }, [newImageUrl]);

  const setImage = useCallback((file: File | null) => {
    setNewImageUrl(file ? URL.createObjectURL(file) : null);
  }, []);

  const content = {
    title,
    excerpt,
    publishedOn,
    imageUrl: newImageUrl ?? post?.imageUrl ?? null,
  };

  const preview: PostCardData =
    category === PROJECT_CATEGORY
      ? {
          ...content,
          category,
          project: {
            status: projectStatus,
            goal: parseAmountInput(goal),
            raised: parseAmountInput(raised),
          },
        }
      : { ...content, category };

  return {
    preview,
    goal,
    raised,
    projectStatus,
    setCategory,
    setTitle,
    setExcerpt,
    setPublishedOn,
    setImage,
    setProjectStatus,
    setGoal,
    setRaised,
  };
}
