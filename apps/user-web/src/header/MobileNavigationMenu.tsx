'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/i18n/navigation';

import { MobileLanguageSwitcher } from './MobileLanguageSwitcher';
import { headerActions, primaryNavigation } from './navigation';

const menuItemClassName =
  'block py-4 text-2xl font-black transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700';

export function MobileNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('header');
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    openButtonRef.current?.focus();
  }

  const overlay = (
    <div
      aria-label={t('mobile.dialogLabel')}
      aria-modal="true"
      className="fixed inset-0 z-[60] flex flex-col bg-canvas animate-in fade-in-0 duration-200 lg:hidden"
      role="dialog"
    >
      <div className="site-header flex shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-8">
        <Link
          aria-label={t('homeLink')}
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          href={ROUTES.home}
          onClick={closeMenu}
        >
          <Image
            alt={t('logoAlt')}
            className="h-auto w-[148px] sm:w-[172px]"
            height={323}
            src="/assets/brand/logos/LogoMainYell&Blue.png"
            width={1121}
          />
        </Link>
        <button
          aria-label={t('mobile.close')}
          className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full text-brand-navy transition-colors duration-200 ease-out hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          onClick={closeMenu}
          ref={closeButtonRef}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M6 6 18 18" />
            <path d="M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav aria-label={t('mobile.navLabel')} className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
        <ul className="flex flex-col">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                className={`${menuItemClassName} text-brand-navy hover:text-amber-500`}
                href={item.href}
                onClick={closeMenu}
              >
                {t(`nav.${item.labelKey}`)}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="mt-1 mb-6 border-t border-slate-200" />

        <ul className="flex flex-col">
          {headerActions.map((item) => (
            <li key={item.labelKey}>
              <Link
                className={`${menuItemClassName} text-brand-navy hover:text-amber-500`}
                href={item.href}
                onClick={closeMenu}
              >
                {t(`actions.${item.labelKey}`)}
              </Link>
            </li>
          ))}
        </ul>

        <MobileLanguageSwitcher itemClassName={menuItemClassName} />
      </nav>
    </div>
  );

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-label={t('mobile.open')}
        className="-mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-navy transition-colors duration-200 ease-out hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 lg:hidden"
        onClick={() => setIsOpen(true)}
        ref={openButtonRef}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="size-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>

      {isMounted && isOpen ? createPortal(overlay, document.body) : null}
    </>
  );
}
