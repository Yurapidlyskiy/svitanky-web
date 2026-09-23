import { Input, cn } from '@project/common-ui';
import type { ComponentProps, ReactNode } from 'react';

import { FieldShell, fieldErrorId, fieldId } from './FieldShell';

type Props = Omit<ComponentProps<typeof Input>, 'id' | 'name'> & {
  name: string;
  label: string;
  errors?: string[];
  /** Rendered inside the input's right edge, e.g. a visibility toggle. */
  trailing?: ReactNode;
};

export function FormField({ name, label, errors, trailing, className, ...inputProps }: Props) {
  const id = fieldId(name);
  const hasError = Boolean(errors?.length);

  return (
    <FieldShell id={id} label={label} errors={errors}>
      <div className="relative">
        <Input
          id={id}
          name={name}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? fieldErrorId(id) : undefined}
          className={cn('h-10 bg-white', trailing && 'pr-11', className)}
          {...inputProps}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">{trailing}</div>
        )}
      </div>
    </FieldShell>
  );
}
