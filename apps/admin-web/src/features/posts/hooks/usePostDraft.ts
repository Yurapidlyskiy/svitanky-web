import { useCallback, useEffect, useState } from 'react';

import type { PostCategory } from '../categories';
import type { PostCardData } from '../types';

type Options = {
  initialPublishedOn: string;
};

/** Live form values, shared by the inputs and the card preview. */
export function usePostDraft({ initialPublishedOn }: Options) {
  const [category, setCategory] = useState<PostCategory>('news');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [publishedOn, setPublishedOn] = useState(initialPublishedOn);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Object URLs pin the file in memory until revoked: release the previous
  // preview whenever it is replaced, and the last one on unmount.
  useEffect(() => {
    if (!imageUrl) return;
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const setImage = useCallback((file: File | null) => {
    setImageUrl(file ? URL.createObjectURL(file) : null);
  }, []);

  const preview: PostCardData = { category, title, excerpt, publishedOn, imageUrl };

  return {
    preview,
    setCategory,
    setTitle,
    setExcerpt,
    setPublishedOn,
    setImage,
  };
}
