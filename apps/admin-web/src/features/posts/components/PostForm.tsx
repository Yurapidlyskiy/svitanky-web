'use client';

import { type FormEvent, startTransition, useActionState } from 'react';

import { ROUTES } from '@/shared/config/routes';
import { FormField } from '@/shared/ui/FormField';

import { createPost, updatePost } from '../actions';
import {
  POST_CATEGORIES,
  POST_CATEGORY_LABELS,
  type PostCategory,
  PROJECT_CATEGORY,
} from '../categories';
import { useFieldErrors } from '../hooks/useFieldErrors';
import { usePostDraft } from '../hooks/usePostDraft';
import { TITLE_MAX } from '../schema';
import type { Post, PostFormState } from '../types';
import { ExcerptField } from './ExcerptField';
import { ImagePicker } from './ImagePicker';
import { PillPicker } from './PillPicker';
import { PostCard } from './PostCard';
import { PostFormActions } from './PostFormActions';
import { ProjectFields } from './ProjectFields';

const INITIAL_STATE: PostFormState = {};

type Props = {
  /** `YYYY-MM-DD`, computed on the server so both renders agree. */
  today: string;
  /** The category this form was opened from, and where it returns to. */
  category: PostCategory;
  /** The post being edited. Absent when creating. */
  post?: Post;
};

export function PostForm({ today, category, post }: Props) {
  const [state, formAction, isPending] = useActionState(
    post ? updatePost : createPost,
    INITIAL_STATE
  );
  const draft = usePostDraft({ post, initialCategory: category, initialPublishedOn: today });
  const { preview } = draft;
  const { errors, dismiss } = useFieldErrors({ state });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Dispatching by hand skips React's automatic form reset, so a server-side
    // error does not wipe the chosen photo or the typed text.
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <form
        onSubmit={handleSubmit}
        // Changes bubble up from every input, and each input is named after its field.
        onChange={(event) => dismiss((event.target as HTMLInputElement).name)}
        noValidate
        className="grid gap-6 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
      >
        {state.error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            {state.error}
          </p>
        )}

        {post && <input type="hidden" name="id" value={post.id} />}

        <PillPicker
          name="category"
          legend="Тип публікації"
          options={POST_CATEGORIES}
          labels={POST_CATEGORY_LABELS}
          value={preview.category}
          onChange={draft.setCategory}
          errors={errors.category}
        />
        <ImagePicker
          previewUrl={preview.imageUrl}
          // A dropped file reaches the input by script, so no change event bubbles.
          onChange={(file) => {
            draft.setImage(file);
            dismiss('image');
          }}
          errors={errors.image}
        />
        <FormField
          name="title"
          label="Заголовок"
          required
          value={preview.title}
          onChange={(event) => draft.setTitle(event.target.value)}
          maxLength={TITLE_MAX}
          placeholder="Наприклад: Оновлення на сайті"
          errors={errors.title}
        />
        <FormField
          name="publishedOn"
          label="Дата публікації"
          required
          type="date"
          value={preview.publishedOn}
          onChange={(event) => draft.setPublishedOn(event.target.value)}
          className="w-fit"
          errors={errors.publishedOn}
        />
        <ExcerptField value={preview.excerpt} onChange={draft.setExcerpt} errors={errors.excerpt} />
        {preview.category === PROJECT_CATEGORY && (
          <ProjectFields
            status={draft.projectStatus}
            goal={draft.goal}
            raised={draft.raised}
            onStatusChange={draft.setProjectStatus}
            onGoalChange={draft.setGoal}
            onRaisedChange={draft.setRaised}
            errors={errors}
          />
        )}

        <PostFormActions
          cancelHref={ROUTES.postsInCategory(category)}
          isEditing={Boolean(post)}
          isPending={isPending}
        />
      </form>

      <aside aria-label="Попередній перегляд" className="grid gap-3 lg:sticky lg:top-8">
        <p className="text-sm font-medium text-brand-slate">Так картка виглядатиме на сайті</p>
        <PostCard post={preview} />
      </aside>
    </div>
  );
}
