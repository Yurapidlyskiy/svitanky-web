/**
 * The options WayForPay's payment widget opens a checkout with (`new Wayforpay().run(...)`).
 * They are the "Purchase" request parameters; `merchantSignature` seals the ones that matter.
 * https://wiki.wayforpay.com/en/view/852091
 */
export type WidgetParams = {
  amount: number;
  authorizationType: 'SimpleSignature';
  clientEmail: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  currency: 'UAH';
  language: 'UA';
  merchantAccount: string;
  merchantDomainName: string;
  merchantSignature: string;
  /** Unix time in seconds. */
  orderDate: number;
  orderReference: string;
  productCount: number[];
  productName: string[];
  productPrice: number[];
  returnUrl: string;
  serviceUrl: string;

  /** First automatic charge, DD.MM.YYYY. Monthly donations only. */
  dateNext?: string;
  /** Payment methods offered, `;`-separated. Monthly donations only (not every method can repeat). */
  paymentSystems?: string;
  regularAmount?: number;
  /** `preset`: the payer cannot edit the schedule on the payment page. */
  regularBehavior?: 'preset';
  regularMode?: 'monthly';
  /** `1`: the "make payment regular" box is ticked and locked. */
  regularOn?: 1;
};
