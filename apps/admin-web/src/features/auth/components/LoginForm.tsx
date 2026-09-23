'use client';

import { Button } from '@project/common-ui';
import { useActionState } from 'react';

import { signIn } from '../actions';
import type { LoginFormState } from '../types';
import { FormField } from '@/shared/ui/FormField';
import { PasswordField } from './PasswordField';

const INITIAL_STATE: LoginFormState = {};

type Props = {
  next: string;
};

export function LoginForm({ next }: Props) {
  const [state, formAction, isPending] = useActionState(signIn, INITIAL_STATE);

  return (
    <form action={formAction} noValidate className="mt-6 grid gap-5">
      <input type="hidden" name="next" value={next} />

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <FormField
        name="email"
        label="Електронна пошта"
        type="email"
        autoComplete="username"
        inputMode="email"
        placeholder="admin@example.com"
        required
        defaultValue={state.email}
        errors={state.fieldErrors?.email}
      />

      <PasswordField name="password" label="Пароль" errors={state.fieldErrors?.password} />

      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="h-10 w-full text-sm font-semibold"
      >
        {isPending ? 'Вхід…' : 'Увійти'}
      </Button>
    </form>
  );
}
