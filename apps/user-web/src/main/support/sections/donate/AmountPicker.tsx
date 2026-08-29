'use client';

import { useState } from 'react';

import { PRESET_AMOUNTS } from '@/shared/config/support';

import { amountClassName, inputClassName, labelClassName } from './styles';

const CUSTOM_AMOUNT = 'custom';

export function AmountPicker() {
  const [selectedAmount, setSelectedAmount] = useState<number | typeof CUSTOM_AMOUNT | null>(null);

  return (
    <fieldset className="flex-1">
      <legend className="sr-only">Оберіть суму підтримки</legend>

      <div
        className="grid grid-cols-3 gap-3"
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedAmount(null);
        }}
      >
        {PRESET_AMOUNTS.map((amount, index) => (
          <label
            className={`${amountClassName} ${index === PRESET_AMOUNTS.length - 1 ? 'col-span-2' : ''} ${
              selectedAmount === amount
                ? 'border-amber-400 bg-amber-400 text-white'
                : 'border-amber-400 bg-white text-brand-navy hover:bg-amber-50'
            }`}
            key={amount}
          >
            <input
              checked={selectedAmount === amount}
              className="sr-only"
              name="amount"
              onChange={() => setSelectedAmount(amount)}
              type="radio"
              value={amount}
              required
            />
            {amount} грн
          </label>
        ))}

        <label
          className={`${amountClassName} ${
            selectedAmount === CUSTOM_AMOUNT
              ? 'border-brand-sky bg-brand-sky text-brand-navy'
              : 'border-brand-sky-pale bg-white text-slate-400 hover:bg-sky-50'
          }`}
        >
          <input
            checked={selectedAmount === CUSTOM_AMOUNT}
            className="sr-only"
            name="amount"
            onChange={() => setSelectedAmount(CUSTOM_AMOUNT)}
            type="radio"
            value={CUSTOM_AMOUNT}
            required
          />
          Інша сума
        </label>
      </div>

      {selectedAmount === CUSTOM_AMOUNT ? (
        <div className="mt-3 flex flex-col gap-2">
          <label className={labelClassName} htmlFor="customAmount">
            Введіть суму, грн *
          </label>
          <input
            className={inputClassName}
            id="customAmount"
            min={1}
            name="customAmount"
            placeholder="Наприклад, 2000"
            required
            type="number"
          />
        </div>
      ) : null}
    </fieldset>
  );
}
