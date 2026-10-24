'use client';

import { useTranslations } from 'next-intl';

import { DONATION_LIMITS, PERSONAL_DATA_LAW_URL } from '@/shared/config/support';

import { errorClassName, inputClassName, labelClassName } from './styles';
import type { DonationFieldError, DonationFieldErrors } from './types';

type TextFieldProps = {
  autoComplete: string;
  error?: string;
  id: string;
  label: string;
  maxLength: number;
  name: string;
  placeholder: string;
  type: 'email' | 'tel' | 'text';
};

function TextField({
  autoComplete,
  error,
  id,
  label,
  maxLength,
  name,
  placeholder,
  type,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        className={inputClassName}
        id={id}
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        required
        type={type}
      />
      {error ? (
        <p className={errorClassName} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type DonorFieldsProps = {
  errors?: DonationFieldErrors;
  /** Keeps element ids unique when a page holds more than one donation form. */
  idPrefix: string;
};

/** The donor's details and the consent checkbox, shared by every donation form. */
export function DonorFields({ errors = {}, idPrefix }: DonorFieldsProps) {
  const t = useTranslations('payments');
  const describe = (code: DonationFieldError | undefined) =>
    code ? t(`errors.${code}`, DONATION_LIMITS) : undefined;
  const consentError = describe(errors.consent);
  const consentErrorId = `${idPrefix}-consent-error`;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          autoComplete="given-name"
          error={describe(errors.firstName)}
          id={`${idPrefix}-firstName`}
          label={t('form.firstName')}
          maxLength={60}
          name="firstName"
          placeholder={t('form.firstNamePlaceholder')}
          type="text"
        />
        <TextField
          autoComplete="family-name"
          error={describe(errors.lastName)}
          id={`${idPrefix}-lastName`}
          label={t('form.lastName')}
          maxLength={60}
          name="lastName"
          placeholder={t('form.lastNamePlaceholder')}
          type="text"
        />
        <TextField
          autoComplete="tel"
          error={describe(errors.phone)}
          id={`${idPrefix}-phone`}
          label={t('form.phone')}
          maxLength={20}
          name="phone"
          placeholder={t('form.phonePlaceholder')}
          type="tel"
        />
        <TextField
          autoComplete="email"
          error={describe(errors.email)}
          id={`${idPrefix}-email`}
          label={t('form.email')}
          maxLength={254}
          name="email"
          placeholder={t('form.emailPlaceholder')}
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
          <div className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
            <input
              aria-describedby={consentError ? consentErrorId : undefined}
              aria-invalid={consentError ? true : undefined}
              className="peer sr-only"
              name="consent"
              required
              type="checkbox"
            />
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
            {t.rich('form.consent', {
              law: (chunks) => (
                <a
                  className="font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy"
                  href={PERSONAL_DATA_LAW_URL}
                  onClick={(e) => e.stopPropagation()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              ),
            })}
          </span>
        </label>
        {consentError ? (
          <p className={errorClassName} id={consentErrorId}>
            {consentError}
          </p>
        ) : null}
      </div>
    </>
  );
}
