'use client';

import { useActionState } from 'react';

import { submitSupportForm, type SupportFormState } from '@/shared/lib/supportForm';

import { AmountPicker } from './AmountPicker';
import { ConsentCheckbox } from './ConsentCheckbox';
import { ContactFields } from './ContactFields';
import { FrequencyPicker } from './FrequencyPicker';

const INITIAL_STATE: SupportFormState = { status: 'idle' };

export function DonationForm() {
  const [state, formAction, isPending] = useActionState(submitSupportForm, INITIAL_STATE);

  return (
    <form action={formAction} className="rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="font-heading text-2xl font-black text-brand-navy sm:text-3xl">
            Твоя підтримка — важлива
          </h2>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row">
            <FrequencyPicker />
            <div aria-hidden="true" className="hidden w-px shrink-0 bg-brand-sky-pale sm:block" />
            <AmountPicker />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ContactFields />
          <ConsentCheckbox />

          <div aria-live="polite">
            {state.status === 'error' && state.message ? (
              <p className="text-sm font-bold text-red-600">{state.message}</p>
            ) : null}
          </div>
        </div>
      </div>

      <button
        className="mx-auto mt-8 block w-fit rounded-xl bg-amber-400 px-12 py-4 text-base font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        Підтримати Світанки
      </button>
    </form>
  );
}
