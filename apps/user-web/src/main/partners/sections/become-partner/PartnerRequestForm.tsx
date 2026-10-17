'use client';

import {
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@project/common-ui';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { submitPartnerRequest, type PartnerRequestState } from './actions';
import { COOPERATION_TYPES } from './content';
import { inputClassName, labelClassName, textareaClassName } from './styles';

const INITIAL_STATE: PartnerRequestState = { status: 'idle' };

export function PartnerRequestForm() {
  const t = useTranslations('partners.becomePartner');
  const [state, formAction, isPending] = useActionState(submitPartnerRequest, INITIAL_STATE);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"
    >
      <h3 className="font-heading text-2xl font-black text-brand-navy sm:text-3xl">
        {t('form.title')}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="name">
            {t('form.name')}
          </label>
          <input
            autoComplete="name"
            className={inputClassName}
            id="name"
            name="name"
            placeholder={t('form.namePlaceholder')}
            required
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="email">
            {t('form.email')}
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="email"
            name="email"
            placeholder={t('form.emailPlaceholder')}
            required
            type="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="organization">
            {t('form.organization')}
          </label>
          <input
            className={inputClassName}
            id="organization"
            name="organization"
            placeholder={t('form.organizationPlaceholder')}
            required
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="cooperationType">
            {t('form.cooperationType')}
          </label>
          <Select name="cooperationType" required>
            <SelectTrigger
              className={cn(inputClassName, 'cursor-pointer justify-between')}
              id="cooperationType"
            >
              <SelectValue placeholder={t('form.cooperationTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {COOPERATION_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {t(`cooperationTypes.${type}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="message">
          {t('form.message')}
        </label>
        <textarea
          className={textareaClassName}
          id="message"
          name="message"
          placeholder={t('form.messagePlaceholder')}
          required
          rows={4}
        />
      </div>

      <div aria-live="polite">
        {/* TODO: render a success message once the request is stored (see actions.ts). */}
        {state.status === 'error' && state.error ? (
          <p className="text-sm font-bold text-red-600">{t(`errors.${state.error}`)}</p>
        ) : null}
      </div>

      <button
        className="cursor-pointer rounded-xl bg-amber-400 px-6 py-4 text-base font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-amber-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {t('form.submit')}
      </button>
    </form>
  );
}
