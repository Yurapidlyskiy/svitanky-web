'use client';

import { useState, useTransition } from 'react';

import { useRouter } from '@/shared/i18n/navigation';

import { SUPPORT_THANKS_PATH } from '../paths';
import { loadWayForPayWidget, openWayForPayWidget } from '../wayforpay/widget';
import { startDonation } from './actions';
import type { DonationError, DonationFieldErrors, DonationFormState } from './types';

type Problem = { error?: DonationError; fieldErrors?: DonationFieldErrors };

/**
 * Drives a donation form: submits it to `startDonation`, opens WayForPay's payment window
 * with the signed result, and sends the donor to the result page once the window reports
 * back. The result page asks WayForPay for the real status, so nothing here is trusted.
 */
export function useDonationCheckout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [problem, setProblem] = useState<Problem>({});

  function submit(formData: FormData) {
    startTransition(async () => {
      setProblem({});

      const result = await startDonation(formData).catch((): DonationFormState => ({
        error: 'serverError',
        status: 'error',
      }));

      if (result.status === 'error') {
        setProblem({ error: result.error, fieldErrors: result.fieldErrors });

        return;
      }

      try {
        await openWayForPayWidget(result.widget, (outcome) => {
          if (outcome === 'declined') {
            setProblem({ error: 'paymentDeclined' });

            return;
          }

          router.push(
            `${SUPPORT_THANKS_PATH}?order=${encodeURIComponent(result.widget.orderReference)}`
          );
        });
      } catch (error) {
        console.error('[payments] could not open the WayForPay window', error);
        setProblem({ error: 'widgetLoadFailed' });
      }
    });
  }

  /** Warm up the widget script when the donor starts typing, so the window opens at once. */
  function preload() {
    loadWayForPayWidget().catch(() => undefined);
  }

  return { ...problem, isPending, preload, submit };
}
