import { fieldErrorId, RequiredMark } from '@/shared/ui/FieldShell';

type Props<T extends string> = {
  name: string;
  legend: string;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
  errors?: string[];
};

/** A required radio group drawn as pills: the post's category, a project's status. */
export function PillPicker<T extends string>({
  name,
  legend,
  options,
  labels,
  value,
  onChange,
  errors,
}: Props<T>) {
  const errorId = fieldErrorId(`field-${name}`);
  const hasError = Boolean(errors?.length);

  return (
    <fieldset aria-describedby={hasError ? errorId : undefined}>
      <legend className="mb-2 text-sm font-bold text-brand-navy">
        {legend} <RequiredMark />
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="inline-flex h-9 cursor-pointer items-center rounded-full border border-input bg-white px-4 text-sm font-semibold text-brand-slate transition-colors select-none peer-checked:border-brand-amber peer-checked:bg-brand-amber peer-checked:text-brand-navy peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-brand-amber">
              {labels[option]}
            </span>
          </label>
        ))}
      </div>
      {hasError && (
        <p id={errorId} className="mt-2 text-sm text-destructive">
          {errors?.[0]}
        </p>
      )}
    </fieldset>
  );
}
