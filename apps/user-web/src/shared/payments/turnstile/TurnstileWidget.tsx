'use client';

import { useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** Public by design: the site key only identifies the widget. Read at build time. */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  remove(widgetId: string): void;
  render(container: HTMLElement, options: Record<string, unknown>): string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

/** Loads Cloudflare's script once per page, however many forms ask for it. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.src = SCRIPT_URL;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile is missing'));
    script.onerror = () => {
      // Let the next form try again, e.g. after a flaky connection.
      loading = null;
      script.remove();
      reject(new Error('Turnstile failed to load'));
    };
    document.head.append(script);
  });

  return loading;
}

/**
 * Cloudflare Turnstile inside a donation form. It adds a hidden `cf-turnstile-response`
 * field, which `startDonation` checks with Cloudflare. A token is single-use, so the form
 * remounts this widget (new `key`) after every failed attempt. Renders nothing while
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset (local dev, e2e).
 */
export function TurnstileWidget() {
  const container = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!SITE_KEY) return;

    let widgetId: string | undefined;
    let isMounted = true;

    loadTurnstile()
      .then((turnstile) => {
        if (!isMounted || !container.current) return;

        widgetId = turnstile.render(container.current, {
          action: 'donation',
          language: locale,
          sitekey: SITE_KEY,
          size: 'flexible',
          theme: 'light',
        });
      })
      .catch((error: unknown) => console.error('[payments] Turnstile is unavailable', error));

    return () => {
      isMounted = false;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [locale]);

  if (!SITE_KEY) return null;

  // Reserves the widget's height, so the form does not jump when it appears.
  return <div className="min-h-[65px]" ref={container} />;
}
