import { Textarea } from '@project/common-ui';

import { FieldShell, fieldErrorId, fieldId } from '@/shared/ui/FieldShell';

import { EXCERPT_MAX } from '../schema';

type Props = {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
};

const ID = fieldId('excerpt');

export function ExcerptField({ value, onChange, errors }: Props) {
  const hasError = Boolean(errors?.length);

  return (
    <FieldShell
      id={ID}
      label="Опис"
      errors={errors}
      aside={
        <span className="text-xs text-brand-slate tabular-nums" aria-live="polite">
          {value.length}/{EXCERPT_MAX}
        </span>
      }
    >
      <Textarea
        id={ID}
        name="excerpt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={EXCERPT_MAX}
        rows={4}
        placeholder="Коротко про що публікація — 1–2 речення"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? fieldErrorId(ID) : undefined}
        className="min-h-28 bg-white"
      />
    </FieldShell>
  );
}
