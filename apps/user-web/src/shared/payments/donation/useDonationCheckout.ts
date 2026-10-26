'use client';

import { useEffect, useState, useTransition } from 'react';

import { redirectToWayForPay } from '../wayforpay/redirect';
import { startDonation } from './actions';
import type { DonationError, DonationFieldErrors, DonationFormState } from './types';

type Problem = { error?: DonationError; fieldErrors?: DonationFieldErrors };

/**
 * Drives a donation form: submits it to `startDonation`, then sends the donor to WayForPay's
 * payment page with the signed order. WayForPay brings them back to `/support/thanks`, which
 * asks it for the real status, so nothing the browser reports is trusted.
 */
export function useDonationCheckout() {
  const [isPending, startTransition] = useTransition();
  // From the moment the donor is sent away until they come back.
  const [isLeaving, setIsLeaving] = useState(false);
  const [problem, setProblem] = useState<Problem>({});
  // A Turnstile token is single-use: after any attempt the form renders a fresh widget,
  // keyed by this counter.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // The Back button can restore this page exactly as it was left, with the form still
    // locked: unlock it, so the donor can try again.
    function unlock(event: PageTransitionEvent) {
      if (!event.persisted) return;

      setIsLeaving(false);
      setAttempt((count) => count + 1);
    }

    window.addEventListener('pageshow', unlock);

    return () => window.removeEventListener('pageshow', unlock);
  }, []);

  function submit(formData: FormData) {
    if (isPending || isLeaving) return;

    startTransition(async () => {
      setProblem({});

      const result = await startDonation(formData).catch((): DonationFormState => ({
        error: 'serverError',
        status: 'error',
      }));

      if (result.status === 'error') {
        setProblem({ error: result.error, fieldErrors: result.fieldErrors });
        setAttempt((count) => count + 1);

        return;
      }

      setIsLeaving(true);
      redirectToWayForPay(result.purchase);
    });
  }

  return { ...problem, isPending: isPending || isLeaving, submit, verificationKey: attempt };
}
