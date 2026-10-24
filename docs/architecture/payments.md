# Donations via WayForPay

Donations are taken in `apps/user-web` through WayForPay's payment widget. This page explains how the pieces fit together, how to configure and test them, and what is still open. It assumes WayForPay as the payment provider (decision #1 in `decisions-needed.md`) and the provider-hosted-checkout rule from `domain-and-security.md`: **card data never touches our servers**, because the card is typed into WayForPay's own window.

## What the donor sees

- Two forms feed the same flow: the home page (`SupportForm`) and the "Become a Ray" card on `/support` (amount and frequency first, then the donor's details).
- Frequency is monthly or one-time. The amount is a preset or a custom whole-hryvnia sum within `DONATION_LIMITS` (`shared/config/support.ts`).
- After the donor submits, WayForPay's window opens over the page. When it closes, the donor lands on `/support/thanks?order=<orderReference>`.

## How a donation travels

1. **Checkout.** The form calls the `startDonation` Server Action (`shared/payments/donation/actions.ts`). It validates the input with zod, signs the payment parameters with the merchant secret as WayForPay specifies (`wayforpay/purchase.ts`, HMAC-MD5) and returns them to the browser. Nothing is stored, and the log line holds only amount, frequency and order reference.
2. **Payment window.** `useDonationCheckout` loads `https://secure.wayforpay.com/server/pay-widget.js` and runs the widget with the signed parameters.
3. **Result page.** After an approved or pending report the browser goes to `/support/thanks?order=…`; a declined report keeps the donor on the form with a message. The browser's word is not trusted: the page asks WayForPay's `CHECK_STATUS` from the server (`wayforpay/status.ts`) and shows approved, processing, failed or "could not verify". Without a valid order reference it redirects to `/support`.
4. **Notification.** WayForPay also posts a signed result to `serviceUrl`, `/api/payments/wayforpay/callback`, for every attempt and every automatic monthly charge. The route checks the merchant account and the signature (timing-safe), calls `recordNotification` and answers with a signed `accept`. A bad signature gets 400 and a missing configuration 503; WayForPay keeps retrying until it receives a valid `accept`.
5. **Return URL.** `/api/payments/wayforpay/return` is the safety net for payment methods that leave the page: it redirects (303) to the result page.

### Monthly donations

A monthly donation is a WayForPay _regular payment_. The first charge happens immediately; `dateNext` is the same day next month (capped at the 28th so that every month has it, Kyiv time). After that WayForPay charges the card by itself and reports each charge to the callback. We keep no card tokens and run no scheduler. The donor can pause, change or cancel the payment in their WayForPay cabinet ("Регулярні платежі"), and the thank-you page says so. `dateEnd` and `regularCount` are optional in WayForPay's documentation and are left out.

## Code map

All paths are under `apps/user-web/src` unless noted.

| Area                                                     | Where                                                                                                                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Forms                                                    | `main/home/sections/join-community/SupportForm.tsx`, `main/support/sections/become-ray/{BecomeRayCard,DetailsStep}.tsx`, shared fields in `shared/payments/donation/DonorFields.tsx` |
| Validation and Server Action                             | `shared/payments/donation/{schema,amount,types,actions}.ts`                                                                                                                          |
| Browser flow                                             | `shared/payments/donation/useDonationCheckout.ts`, `shared/payments/wayforpay/widget.ts`                                                                                             |
| Signing, parameters, notifications, status (server-only) | `shared/payments/wayforpay/{sign,purchase,callback,status,config,notifications}.ts`                                                                                                  |
| Billing day for monthly donations                        | `shared/payments/schedule.ts`                                                                                                                                                        |
| HTTP endpoints                                           | `app/api/payments/wayforpay/{callback,return}/route.ts`                                                                                                                              |
| Result page                                              | `app/[locale]/support/thanks/page.tsx`, `main/support-thanks/`                                                                                                                       |
| Texts                                                    | `payments.*`, `supportThanks.*`, `support.becomeRay.checkout.*` in `shared/i18n/messages/uk.json`                                                                                    |
| Tests                                                    | `*.test.ts` beside the code, `e2e/payments.spec.ts` (from `apps/user-web`)                                                                                                           |

## Configuration

Copy `apps/user-web/.env.example` to `apps/user-web/.env.local` (git-ignored) and fill in the values.

| Variable                     | Meaning                                                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Public site address without a trailing slash. It is the base of the callback and return URLs given to WayForPay, so in production it must be the real domain. Read at build time. |
| `WAYFORPAY_MERCHANT_ACCOUNT` | Merchant login from the WayForPay cabinet.                                                                                                                                        |
| `WAYFORPAY_MERCHANT_DOMAIN`  | The store domain exactly as registered in WayForPay, host only. It is part of every signature.                                                                                    |
| `WAYFORPAY_SECRET_KEY`       | The merchant secret key. Server-only: never in the repo, in chat or in a `NEXT_PUBLIC_` variable.                                                                                 |

While any of the three WayForPay variables is missing the site works as usual, the donation forms say that payments are temporarily unavailable and the callback answers 503. On Vercel set them under Project Settings → Environment Variables (Production, and Preview if you test there), then redeploy.

## WayForPay cabinet checklist

- The store is registered with the production domain, and `WAYFORPAY_MERCHANT_DOMAIN` matches it.
- Regular payments work for the store (monthly donations need them). If the widget ignores the regular-payment parameters, ask WayForPay support to enable them.
- Every payment carries its own `serviceUrl` and `returnUrl`, so no cabinet setting is required. If the cabinet has default URLs, point the service URL at `https://<domain>/api/payments/wayforpay/callback`.
- WayForPay's store review expects public pages on the site (public offer, refund policy, contacts, privacy policy). They do not exist yet, see "Open items".

## Testing

- `npm test` covers signatures (including the RFC 2202 test vector), widget parameters, notification verification, status mapping, validation and both API routes.
- `npm run test:e2e` runs against the production build with fake credentials (`e2e/wayforpay-test-env.ts`). WayForPay's widget script is replaced by a stub, so nothing reaches WayForPay.
- Live check: WayForPay publishes a test merchant in its documentation ("Тестові реквізити", https://wiki.wayforpay.com/view/852472). Put its login and key in `.env.local` only, never in the repo, and run the real window.
- WayForPay's notifications reach a local machine only through a public tunnel whose address is set as `NEXT_PUBLIC_SITE_URL`. The result page works without it, because it asks WayForPay directly.
- Vercel preview deployments with Deployment Protection reject WayForPay's server-to-server calls. To test notifications use the production domain or a protection bypass for the callback route.

## Security notes

- The secret key lives only in server code (`import 'server-only'`), signs and verifies everything, and is never logged or returned to the browser.
- The client cannot pick the price or the currency: the server validates the amount against `DONATION_LIMITS` and signs what it validated.
- Notifications are believed only with a valid signature for our merchant account. WayForPay repeats notifications, so whatever `recordNotification` does must be safe to run twice for the same `orderReference`.
- The donor's name, phone and email go to WayForPay only; they are not stored or logged here. The forms use `method="post"`, so a submit before the page has hydrated cannot put them into the address bar.

## Open items

1. **Legal pages and texts.** The public offer, refund policy, contacts and privacy policy are needed for WayForPay's review and need the fund's own texts.
2. **Persistence.** `recordNotification` (`wayforpay/notifications.ts`) only logs. When Supabase lands (ADR-5), upsert the donation by `orderReference` there and send a confirmation email on the first `Approved`.
3. **Spam and card testing.** Add CAPTCHA (for example Cloudflare Turnstile) and rate limiting to `startDonation` before the forms go public.
4. **Limits and wording.** The 20 to 100 000 UAH limits and the product names shown in WayForPay ("Щомісячна благодійна підтримка", "Благодійний внесок") are defaults to confirm with the fund.
5. **Live confirmation of regular payments.** The regular-payment parameters follow WayForPay's documentation but have not been run against a live WayForPay session yet. On the first live test check that the schedule is right: first charge now, next charge on `dateNext`, no end date.
6. **Other sites.** The camp and needs-list sites should point their donate buttons at `https://<main-domain>/support`.
