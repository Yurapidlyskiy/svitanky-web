import { RAY_FREQUENCIES } from './content';
import type { RayFrequency } from './types';

const tabClassName =
  'flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-colors sm:text-base has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-navy';

type FrequencyTabsProps = {
  onChange: (frequency: RayFrequency) => void;
  value: RayFrequency;
};

export function FrequencyTabs({ onChange, value }: FrequencyTabsProps) {
  return (
    <fieldset className="w-full rounded-full border border-brand-sky-pale/70 bg-white p-1.5 sm:w-fit">
      <legend className="sr-only">Періодичність підтримки</legend>

      <div className="flex gap-1.5">
        {RAY_FREQUENCIES.map((option) => {
          const isSelected = option.id === value;

          return (
            <label
              className={`${tabClassName} ${
                isSelected
                  ? 'bg-brand-navy text-white'
                  : 'text-slate-500 hover:bg-brand-sky-mist hover:text-brand-navy'
              }`}
              key={option.id}
            >
              <input
                checked={isSelected}
                className="sr-only"
                name="frequency"
                onChange={() => onChange(option.id)}
                type="radio"
                value={option.id}
              />

              <svg
                aria-hidden="true"
                className="size-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 20.3 4.6 13a4.7 4.7 0 0 1 0-6.6 4.6 4.6 0 0 1 6.6 0l.8.8.8-.8a4.6 4.6 0 0 1 6.6 0 4.7 4.7 0 0 1 0 6.6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
