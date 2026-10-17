'use client';

import { useTranslations } from 'next-intl';

import { useLanguageSwitch } from './useLanguageSwitch';

type MobileLanguageSwitcherProps = {
  itemClassName: string;
};

/** Language row at the bottom of the mobile menu. Hidden while the site serves one language. */
export function MobileLanguageSwitcher({ itemClassName }: MobileLanguageSwitcherProps) {
  const t = useTranslations('header.language');
  const { isPending, languages, locale, switchTo } = useLanguageSwitch();

  if (languages.length < 2) return null;

  return (
    <>
      <hr className="my-6 border-t border-slate-200" />

      <ul
        aria-busy={isPending}
        aria-label={t('menuLabel')}
        className="flex flex-wrap items-center gap-8"
      >
        {languages.map((option) => (
          <li key={option.locale}>
            <button
              aria-current={option.locale === locale ? 'true' : undefined}
              aria-label={option.label}
              className={`${itemClassName} cursor-pointer ${
                option.locale === locale ? 'text-amber-500' : 'text-brand-navy hover:text-amber-500'
              }`}
              lang={option.locale}
              onClick={() => switchTo(option.locale)}
              type="button"
            >
              {option.code}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
