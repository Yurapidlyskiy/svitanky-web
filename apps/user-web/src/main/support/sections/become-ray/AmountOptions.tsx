import { useTranslations } from 'next-intl';

import { PRESET_AMOUNTS } from '@/shared/config/support';

import type { RayAmount, RayFrequency } from './types';

const optionClassName =
  'flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-2 py-4 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-navy';

const selectedClassName = 'border-brand-amber-strong bg-brand-amber/15';
const idleClassName = 'border-brand-sky-pale/70 bg-white hover:border-brand-amber';

type AmountOptionsProps = {
  frequency: RayFrequency;
  onChange: (amount: RayAmount) => void;
  value: RayAmount;
};

export function AmountOptions({ frequency, onChange, value }: AmountOptionsProps) {
  const t = useTranslations('support.becomeRay');
  const customClassName = `text-sm font-bold leading-tight sm:text-base ${
    value === 'custom' ? 'text-brand-amber-strong' : 'text-brand-navy'
  }`;

  return (
    <fieldset>
      <legend className="sr-only">{t('amountLegend')}</legend>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PRESET_AMOUNTS.map((amount) => {
          const isSelected = amount === value;

          return (
            <label
              className={`${optionClassName} ${isSelected ? selectedClassName : idleClassName}`}
              key={amount}
            >
              <input
                checked={isSelected}
                className="sr-only"
                name="amount"
                onChange={() => onChange(amount)}
                type="radio"
                value={amount}
              />

              <span
                className={`font-heading text-xl font-black sm:text-2xl ${
                  isSelected ? 'text-brand-amber-strong' : 'text-brand-navy'
                }`}
              >
                {amount}
              </span>
              <span className="text-xs text-slate-500">{t(`units.${frequency}`)}</span>
            </label>
          );
        })}

        <label
          className={`${optionClassName} col-span-2 sm:col-span-1 ${
            value === 'custom' ? selectedClassName : idleClassName
          }`}
        >
          <input
            checked={value === 'custom'}
            className="sr-only"
            name="amount"
            onChange={() => onChange('custom')}
            type="radio"
            value="custom"
          />

          {t.rich('customAmount', {
            line: (chunks) => <span className={customClassName}>{chunks}</span>,
          })}
        </label>
      </div>
    </fieldset>
  );
}
