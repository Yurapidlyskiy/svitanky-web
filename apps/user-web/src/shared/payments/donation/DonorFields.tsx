'use client';

import { useTranslations } from 'next-intl';
import { DONATION_LIMITS } from '@/shared/config/support';

import { ConsentField } from './ConsentField';
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

      <ConsentField error={describe(errors.consent)} id={`${idPrefix}-consent`} />
    </>
  );
}
