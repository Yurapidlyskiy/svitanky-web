import { Label, cn } from '@project/common-ui';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  label: string;
  errors?: string[];
  /** Bolder label with a red asterisk. The control sets its own `required`. */
  required?: boolean;
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

/** Hidden from screen readers: they announce the control's `required` instead. */
export function RequiredMark() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}

/** Label + control + first error. The control wires `aria-describedby` itself. */
export function FieldShell({ id, label, errors, required, aside, children }: Props) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className={cn('text-brand-navy', required && 'gap-1 font-bold')}>
          {label}
          {required && <RequiredMark />}
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
