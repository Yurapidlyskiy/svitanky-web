'use client';

import {
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@project/common-ui';
import { useActionState } from 'react';

import { submitPartnerRequest, type PartnerRequestState } from './actions';
import { inputClassName, labelClassName, textareaClassName } from './styles';

import { COOPERATION_TYPES } from './content';

const INITIAL_STATE: PartnerRequestState = { status: 'idle' };

export function PartnerRequestForm() {
  const [state, formAction, isPending] = useActionState(submitPartnerRequest, INITIAL_STATE);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"
    >
      <h3 className="font-heading text-2xl font-black text-brand-navy sm:text-3xl">
        Форма для зв&apos;язку
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="name">
            Введіть ім&apos;я *
          </label>
          <input
            autoComplete="name"
            className={inputClassName}
            id="name"
            name="name"
            placeholder="Введіть ім'я"
            required
            type="text"
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

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="organization">
            Назва організації/компанії *
          </label>
          <input
            className={inputClassName}
            id="organization"
            name="organization"
            placeholder="Введіть назву"
            required
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="cooperationType">
            Тип співпраці *
          </label>
          <Select name="cooperationType" required>
            <SelectTrigger
              className={cn(inputClassName, 'cursor-pointer justify-between')}
              id="cooperationType"
            >
              <SelectValue placeholder="Оберіть варіант" />
            </SelectTrigger>
            <SelectContent>
              {COOPERATION_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="message">
          Повідомлення *
        </label>
        <textarea
          className={textareaClassName}
          id="message"
          name="message"
          placeholder="Розкажіть трохи про вашу організацію та ідею співпраці"
          required
          rows={4}
        />
      </div>

      <div aria-live="polite">
        {state.status === 'error' && state.message ? (
          <p className="text-sm font-bold text-red-600">{state.message}</p>
        ) : null}
        {state.status === 'success' && state.message ? (
          <p className="text-sm font-bold text-brand-green">{state.message}</p>
        ) : null}
      </div>

      <button
        className="cursor-pointer rounded-xl bg-amber-400 px-6 py-4 text-base font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        Надіслати заявку
      </button>
    </form>
  );
}
