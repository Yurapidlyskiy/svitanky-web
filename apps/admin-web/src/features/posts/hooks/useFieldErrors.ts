import { useState } from 'react';

import type { PostFormState } from '../types';

type FieldErrors = NonNullable<PostFormState['fieldErrors']>;

export function withoutDismissed(errors: FieldErrors, dismissed: string[]): FieldErrors {
  return Object.fromEntries(Object.entries(errors).filter(([field]) => !dismissed.includes(field)));
}

type Options = {
  state: PostFormState;
};

/**
 * The server's field errors, each hidden as soon as its field changes: the
 * message describes the value that was submitted, not the one being typed.
 * Tied to the state object, so the next submit starts clean and the server decides again.
 */
export function useFieldErrors({ state }: Options) {
  const [dismissed, setDismissed] = useState({ source: state, fields: [] as string[] });
  const fields = dismissed.source === state ? dismissed.fields : [];

  return {
    errors: withoutDismissed(state.fieldErrors ?? {}, fields),
    dismiss: (field: string) => setDismissed({ source: state, fields: [...fields, field] }),
  };
}
