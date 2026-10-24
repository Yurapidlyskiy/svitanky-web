/**
 * The signed order WayForPay's payment page opens with: the "Purchase" request parameters,
 * which the browser posts to WayForPay as a form (see `redirect.ts`). `merchantSignature`
 * seals the ones that matter.
 * https://wiki.wayforpay.com/en/view/852091
 */
export type PurchaseParams = {
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

  /** Last automatic charge, DD.MM.YYYY. Monthly donations only. */
  dateEnd?: string;
  /** First automatic charge, DD.MM.YYYY. Monthly donations only. */
  dateNext?: string;
  /** Payment methods offered, `;`-separated. Monthly donations only (not every method can repeat). */
  paymentSystems?: string;
  regularAmount?: number;
  regularMode?: 'monthly';
  /** `1`: the "make payment regular" box is ticked and locked. */
  regularOn?: 1;
};
