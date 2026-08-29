import { labelClassName } from './styles';

import { FREQUENCY_OPTIONS } from './content';

export function FrequencyPicker() {
  return (
    <fieldset className="shrink-0 sm:w-36">
      <legend className={labelClassName}>Я хочу підтримати</legend>

      <div className="mt-4 flex flex-col gap-3">
        {FREQUENCY_OPTIONS.map((option) => (
          <label
            className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-brand-navy"
            key={option.value}
          >
            <span className="relative flex size-5 shrink-0 items-center justify-center">
              <input
                className="peer sr-only"
                defaultChecked={option.value === 'monthly'}
                name="frequency"
                type="radio"
                value={option.value}
                required
              />
              <span className="absolute inset-0 rounded-full border-2 border-brand-sky-pale peer-checked:border-amber-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-navy" />
              <span className="relative hidden size-2.5 rounded-full bg-amber-400 peer-checked:block" />
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
