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

import { signOut } from '../actions';
import { SignOutConfirmButton } from './SignOutConfirmButton';

export function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-brand-sky/60 bg-transparent text-canvas hover:bg-canvas/10 hover:text-canvas"
          />
        }
      >
        Вийти
      </AlertDialogTrigger>

      <AlertDialogContent className="border-t-4 border-t-brand-amber">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-brand-navy">Вийти з акаунта?</AlertDialogTitle>
          <AlertDialogDescription className="text-brand-slate">
            Щоб повернутися до панелі, потрібно буде знову ввести пошту й пароль.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Cancel comes first in the DOM, so it gets initial focus — Enter never signs out by accident. */}
        <AlertDialogFooter>
          <AlertDialogCancel className="h-10 px-4 text-brand-navy">Скасувати</AlertDialogCancel>
          <form action={signOut}>
            <SignOutConfirmButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
