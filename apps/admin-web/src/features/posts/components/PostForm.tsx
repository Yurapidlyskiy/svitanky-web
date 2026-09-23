'use client';

import { Button, buttonVariants } from '@project/common-ui';
import Link from 'next/link';
import { type FormEvent, startTransition, useActionState } from 'react';

import { ROUTES } from '@/shared/config/routes';
import { FormField } from '@/shared/ui/FormField';

import { createPost } from '../actions';
import { usePostDraft } from '../hooks/usePostDraft';
import { TITLE_MAX } from '../schema';
import type { PostFormState } from '../types';
import { CategoryPicker } from './CategoryPicker';
import { ExcerptField } from './ExcerptField';
import { ImagePicker } from './ImagePicker';
import { PostCard } from './PostCard';

const INITIAL_STATE: PostFormState = {};

type Props = {
  /** `YYYY-MM-DD`, computed on the server so both renders agree. */
  today: string;
};

export function PostForm({ today }: Props) {
  const [state, formAction, isPending] = useActionState(createPost, INITIAL_STATE);
  const draft = usePostDraft({ initialPublishedOn: today });
  const { preview } = draft;
  const errors = state.fieldErrors ?? {};

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

        <CategoryPicker
          value={preview.category}
          onChange={draft.setCategory}
          errors={errors.category}
        />
        <ImagePicker
          previewUrl={preview.imageUrl}
          onChange={draft.setImage}
          errors={errors.image}
        />
        <FormField
          name="title"
          label="Заголовок"
          value={preview.title}
          onChange={(event) => draft.setTitle(event.target.value)}
          maxLength={TITLE_MAX}
          placeholder="Наприклад: Оновлення на сайті"
          errors={errors.title}
        />
        <FormField
          name="publishedOn"
          label="Дата публікації"
          type="date"
          value={preview.publishedOn}
          onChange={(event) => draft.setPublishedOn(event.target.value)}
          className="w-fit"
          errors={errors.publishedOn}
        />
        <ExcerptField value={preview.excerpt} onChange={draft.setExcerpt} errors={errors.excerpt} />

        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Link
            href={ROUTES.posts}
            className={buttonVariants({ variant: 'outline', className: 'h-10 px-4' })}
          >
            Скасувати
          </Link>
          <Button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="h-10 px-5 font-semibold"
          >
            {isPending ? 'Публікуємо…' : 'Опублікувати'}
          </Button>
        </div>
      </form>

      <aside aria-label="Попередній перегляд" className="grid gap-3 lg:sticky lg:top-8">
        <p className="text-sm font-medium text-brand-slate">Так картка виглядатиме на сайті</p>
        <PostCard post={preview} />
      </aside>
    </div>
  );
}
