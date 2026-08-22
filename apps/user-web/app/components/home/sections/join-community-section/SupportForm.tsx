'use client';

import { useActionState, useState } from 'react';

import { submitSupportForm, type SupportFormState } from './actions';

const PRESET_AMOUNTS = [150, 350, 550, 1500];
const CUSTOM_AMOUNT = 'custom';

const PERSONAL_DATA_LAW_URL = 'https://zakon.rada.gov.ua/laws/show/2297-17';

const INITIAL_STATE: SupportFormState = { status: 'idle' };

const labelClassName = 'text-sm font-bold text-[#004574]';
const inputClassName =
  'w-full rounded-lg border border-[#C5DBF0] bg-white px-4 py-3 text-base text-slate-800 transition-colors placeholder:text-slate-400 focus:border-[#004574] focus:outline-none';
const amountClassName =
  'flex w-full cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-2.5 text-center text-base font-bold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#004574]';

export function SupportForm() {
  const [state, formAction, isPending] = useActionState(submitSupportForm, INITIAL_STATE);
  const [selectedAmount, setSelectedAmount] = useState<number | typeof CUSTOM_AMOUNT | null>(null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"
    >
      <h3 className="text-2xl font-black text-[#004574] sm:text-3xl">Твоя підтримка Важлива</h3>

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
                  : 'border-amber-400 bg-white text-[#004574] hover:bg-amber-50'
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
                ? 'border-[#A9CDEF] bg-[#A9CDEF] text-[#004574]'
                : 'border-[#C5DBF0] bg-white text-slate-400 hover:bg-sky-50'
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
          <div className="absolute inset-0 rounded border border-[#C5DBF0] bg-white peer-checked:border-amber-400 peer-checked:bg-amber-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#004574]"></div>
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
            className="font-bold text-[#004574] underline decoration-[#A9CDEF] underline-offset-2 hover:decoration-[#004574]"
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
          className="rounded-xl bg-[#A9CDEF] px-6 py-4 text-base font-bold text-[#004574] transition-[background-color,transform] duration-200 ease-out hover:bg-[#96BFE8] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004574] disabled:cursor-not-allowed disabled:opacity-60"
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
