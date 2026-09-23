import { fieldErrorId } from '@/shared/ui/FieldShell';

import { POST_CATEGORIES, POST_CATEGORY_LABELS, type PostCategory } from '../categories';

type Props = {
  value: PostCategory;
  onChange: (category: PostCategory) => void;
  errors?: string[];
};

const ERROR_ID = fieldErrorId('field-category');

export function CategoryPicker({ value, onChange, errors }: Props) {
  const hasError = Boolean(errors?.length);

  return (
    <fieldset aria-describedby={hasError ? ERROR_ID : undefined}>
      <legend className="mb-2 text-sm font-medium text-brand-navy">Тип публікації</legend>
      <div className="flex flex-wrap gap-2">
        {POST_CATEGORIES.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={value === category}
              onChange={() => onChange(category)}
              className="peer sr-only"
            />
            <span className="inline-flex h-9 cursor-pointer items-center rounded-full border border-input bg-white px-4 text-sm font-semibold text-brand-slate transition-colors select-none peer-checked:border-brand-amber peer-checked:bg-brand-amber peer-checked:text-brand-navy peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-brand-amber">
              {POST_CATEGORY_LABELS[category]}
            </span>
          </label>
        ))}
      </div>
      {hasError && (
        <p id={ERROR_ID} className="mt-2 text-sm text-destructive">
          {errors?.[0]}
        </p>
      )}
    </fieldset>
  );
}
