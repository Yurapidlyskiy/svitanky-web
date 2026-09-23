'use client';

import { Button } from '@project/common-ui';
import { useFormStatus } from 'react-dom';

export function SignOutConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="h-10 w-full px-4 font-semibold sm:w-auto"
    >
      {pending ? 'Вихід…' : 'Вийти'}
    </Button>
  );
}
