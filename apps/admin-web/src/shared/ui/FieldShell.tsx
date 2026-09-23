import { Label } from '@project/common-ui';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  label: string;
  errors?: string[];
  /** Right-aligned next to the label, e.g. a character counter. */
  aside?: ReactNode;
  children: ReactNode;
};

export function fieldId(name: string) {
  return `field-${name}`;
}

export function fieldErrorId(id: string) {
  return `${id}-error`;
}

/** Label + control + first error. The control wires `aria-describedby` itself. */
export function FieldShell({ id, label, errors, aside, children }: Props) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-brand-navy">
          {label}
        </Label>
        {aside}
      </div>
      {children}
      {errors?.length ? (
        <p id={fieldErrorId(id)} className="text-sm text-destructive">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
