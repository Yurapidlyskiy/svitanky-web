import type { WidgetParams } from './types';

// WayForPay hosts the card form and loads it from its own domain, so card details are
// typed into their window and never reach this site or its servers (no PCI DSS scope).
const WIDGET_SCRIPT_URL = 'https://secure.wayforpay.com/server/pay-widget.js';

type WidgetCallback = () => void;

type WayForPayWidget = {
  run: (
    params: WidgetParams,
    onApproved: WidgetCallback,
    onDeclined: WidgetCallback,
    onPending: WidgetCallback
  ) => void;
};

declare global {
  interface Window {
    Wayforpay?: new () => WayForPayWidget;
  }
}

export type WidgetOutcome = 'approved' | 'declined' | 'pending';

let loading: Promise<void> | null = null;

/** Loads WayForPay's widget script once; a failed load can be retried. */
export function loadWayForPayWidget(): Promise<void> {
  if (window.Wayforpay) return Promise.resolve();

  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.src = WIDGET_SCRIPT_URL;
    script.onload = () => {
      if (window.Wayforpay) {
        resolve();
      } else {
        loading = null;
        reject(new Error('The WayForPay widget script did not define Wayforpay'));
      }
    };
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error('The WayForPay widget script failed to load'));
    };
    document.head.append(script);
  });

  return loading;
}

/**
 * Opens WayForPay's payment window over the page. The callbacks only say which way the
 * donor's attempt went; the amount is never read back from the browser — the real result
 * is the signed notification WayForPay sends to our server.
 * https://wiki.wayforpay.com/en/view/852091
 */
export async function openWayForPayWidget(
  params: WidgetParams,
  onOutcome: (outcome: WidgetOutcome) => void
): Promise<void> {
  await loadWayForPayWidget();

  if (!window.Wayforpay) throw new Error('The WayForPay widget is not available');

  new window.Wayforpay().run(
    params,
    () => onOutcome('approved'),
    () => onOutcome('declined'),
    () => onOutcome('pending')
  );
}
