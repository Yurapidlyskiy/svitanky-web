'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@project/common-ui';
import { Trash2 } from 'lucide-react';
import { useActionState } from 'react';

import { deletePost } from '../actions';
import type { DeletePostState } from '../types';

type Props = {
  id: string;
  title: string;
};

const INITIAL_STATE: DeletePostState = {};

export function DeletePostButton({ id, title }: Props) {
  const [state, formAction, isPending] = useActionState(deletePost, INITIAL_STATE);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon"
            aria-label={`Видалити публікацію «${title}»`}
            className="size-10 rounded-xl"
          />
        }
      >
        <Trash2 aria-hidden className="size-5" />
      </AlertDialogTrigger>

      <AlertDialogContent className="border-t-4 border-t-destructive">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-brand-navy">Видалити публікацію?</AlertDialogTitle>
          <AlertDialogDescription className="break-words text-brand-slate">
            «{title}» зникне із сайту разом із фото. Це не можна скасувати.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {state.error && (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}

        {/* Cancel comes first in the DOM, so it gets initial focus — Enter never deletes by accident. */}
        <AlertDialogFooter>
          <AlertDialogCancel className="h-10 px-4 text-brand-navy">Скасувати</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
              aria-busy={isPending}
              className="h-10 w-full px-4 font-semibold sm:w-auto"
            >
              {isPending ? 'Видаляємо…' : 'Видалити'}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
