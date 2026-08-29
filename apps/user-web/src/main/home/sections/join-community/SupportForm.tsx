'use client';

import { useActionState, useState } from 'react';

import { PERSONAL_DATA_LAW_URL, PRESET_AMOUNTS } from '@/shared/config/support';
import { submitSupportForm, type SupportFormState } from '@/shared/lib/supportForm';

const CUSTOM_AMOUNT = 'custom';

const INITIAL_STATE: SupportFormState = { status: 'idle' };

const labelClassName = 'text-sm font-bold text-brand-navy';
const inputClassName =
  'w-full rounded-lg border border-brand-sky-pale bg-white px-4 py-3 text-base text-slate-800 transition-colors placeholder:text-slate-400 focus:border-brand-navy focus:outline-none';
const amountClassName =
  'flex w-full cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-2.5 text-center text-base font-bold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-navy';

export function SupportForm() {
  const [state, formAction, isPending] = useActionState(submitSupportForm, INITIAL_STATE);
  const [selectedAmount, setSelectedAmount] = useState<number | typeof CUSTOM_AMOUNT | null>(null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"
    >
      <h3 className="text-2xl font-black text-brand-navy sm:text-3xl">Твоя підтримка Важлива</h3>

      <fieldset>
        <legend className="sr-only">Оберіть суму підтримки</legend>
        <div
          className="grid grid-cols-2 gap-3"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedAmount(null);
            }
          }}
        >
          {PRESET_AMOUNTS.map((amount) => (
            <label
              className={`${amountClassName} ${
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
      </fieldset>

      {selectedAmount === CUSTOM_AMOUNT && (
        <div className="flex flex-col gap-2">
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
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="firstName">
            Введіть ім&apos;я *
          </label>
          <input
            autoComplete="given-name"
            className={inputClassName}
            id="firstName"
            name="firstName"
            placeholder="Введіть ім'я"
            required
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="lastName">
            Введіть прізвище *
          </label>
          <input
            autoComplete="family-name"
            className={inputClassName}
            id="lastName"
            name="lastName"
            placeholder="Введіть прізвище"
            required
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="phone">
            Номер телефону: *
          </label>
          <input
            autoComplete="tel"
            className={inputClassName}
            id="phone"
            name="phone"
            placeholder="+38 (0"
            required
            type="tel"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="email">
            Email: *
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="email"
            name="email"
            placeholder="Введіть свій @email"
            required
            type="email"
          />
        </div>
      </div>

      <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
        <div className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
          <input className="peer sr-only" name="consent" required type="checkbox" />
          <div className="absolute inset-0 rounded border border-brand-sky-pale bg-white peer-checked:border-amber-400 peer-checked:bg-amber-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-navy"></div>
          <svg
            className="relative z-10 hidden size-3.5 text-white peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span>
          Погоджуюсь на обробку персональних даних, відповідно до{' '}
          <a
            className="font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy"
            href={PERSONAL_DATA_LAW_URL}
            onClick={(e) => e.stopPropagation()}
            rel="noopener noreferrer"
            target="_blank"
          >
            Закону України «Про захист персональних даних» (№ 2297-VI)
          </a>
        </span>
      </label>

      <div aria-live="polite">
        {state.status === 'error' && state.message ? (
          <p className="text-sm font-bold text-red-600">{state.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          className="rounded-xl bg-amber-400 px-6 py-4 text-base font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          name="frequency"
          type="submit"
          value="monthly"
        >
          Регулярно
        </button>
        <button
          className="rounded-xl bg-brand-sky px-6 py-4 text-base font-bold text-brand-navy transition-[background-color,transform] duration-200 ease-out hover:bg-[#96BFE8] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          name="frequency"
          type="submit"
          value="one-time"
        >
          Одноразово
        </button>
      </div>
    </form>
  );
}
