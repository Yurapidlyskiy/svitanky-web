# Donations via WayForPay

Donations are taken in `apps/user-web` through WayForPay's hosted payment page. This page explains how the pieces fit together, how to configure and test them, and what is still open. It assumes WayForPay as the payment provider (decision #1 in `decisions-needed.md`) and the provider-hosted-checkout rule from `domain-and-security.md`: **card data never touches our servers**, because the card is typed on WayForPay's own page.

## What the donor sees

- Two forms feed the same flow: the home page (`SupportForm`) and the "Become a Ray" card on `/support` (amount and frequency first, then the donor's details).
- Frequency is monthly or one-time. The amount is a preset or a custom whole-hryvnia sum within `DONATION_LIMITS` (`shared/config/support.ts`).
- After the donor submits, the whole tab goes to WayForPay's payment page: a full page on WayForPay's domain, the same on desktop and phones. When they pay, are declined or cancel, WayForPay sends them back and they land on `/support/thanks?order=<orderReference>`.

## How a donation travels

1. **Checkout.** The form calls the `startDonation` Server Action (`shared/payments/donation/actions.ts`). It validates the input with zod, checks for bots (see "Bot protection"), signs the payment parameters with the merchant secret as WayForPay specifies (`wayforpay/purchase.ts`, HMAC-MD5) and returns them to the browser. Nothing is stored, and the log line holds only amount, frequency and order reference.
2. **Payment page.** `useDonationCheckout` posts the signed parameters as a hidden form to `https://secure.wayforpay.com/pay` (`wayforpay/redirect.ts`, list fields such as `productName[]` repeat) and WayForPay answers with a redirect to its own page. We do not use WayForPay's widget script (`pay-widget.js`): a full page needs no third-party script on our origin, looks the same on every device, and Apple Pay and Google Pay run on WayForPay's page instead of inside an iframe (Safari allows Apple Pay in an iframe only under extra conditions). While the browser is leaving, the form stays locked; if the browser restores the page from its cache on Back, the form unlocks again.
3. **Return.** WayForPay posts the donor's browser to `returnUrl`, `/api/payments/wayforpay/return`, whether they paid, were declined or pressed "cancel". The route answers 303 with a redirect to the result page.
4. **Result page.** `/support/thanks?order=…` does not trust the browser: it asks WayForPay's `CHECK_STATUS` from the server (`wayforpay/status.ts`) and shows approved, processing, failed or "could not verify". A cancelled or declined attempt shows as failed, with a "try again" button. Without a valid order reference the page redirects to `/support`.
5. **Notification.** WayForPay also posts a signed result to `serviceUrl`, `/api/payments/wayforpay/callback`, for every attempt and every automatic monthly charge. The route checks the merchant account and the signature (timing-safe), calls `recordNotification` and answers with a signed `accept`. A bad signature gets 400 and a missing configuration 503; WayForPay keeps retrying until it receives a valid `accept`.

### Monthly donations

A monthly donation is a WayForPay _regular payment_. The first charge happens immediately; `dateNext` is the same day next month (capped at the 28th so that every month has it, Kyiv time) and `dateEnd` is ten years after that. WayForPay needs an end date: its payment page fills it with the first charge when none is sent, which would stop the donation after one repeat. After the first payment WayForPay charges the card by itself and reports each charge to the callback. We keep no card tokens and run no scheduler. The donor can pause, change or cancel the payment in their WayForPay cabinet ("Регулярні платежі"), and the thank-you page says so.

We deliberately do not send `regularBehavior: 'preset'`. With it WayForPay's page shows nothing about the repeat; without it the donor sees a "Регулярне списання" block with the amount, "Щомісячно" and both dates (and can edit them or switch the repeat off), and we can see that WayForPay understood the schedule. Cards, Google Pay and Apple Pay stay available (the wallet buttons sit below the "Оплатити" button on such a page).

## Code map

All paths are under `apps/user-web/src` unless noted.

| Area                                                     | Where                                                                                                                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Forms                                                    | `main/home/sections/join-community/SupportForm.tsx`, `main/support/sections/become-ray/{BecomeRayCard,DetailsStep}.tsx`, shared fields in `shared/payments/donation/DonorFields.tsx` |
| Validation and Server Action                             | `shared/payments/donation/{schema,amount,types,actions}.ts`                                                                                                                          |
| Browser flow                                             | `shared/payments/donation/useDonationCheckout.ts`, `shared/payments/wayforpay/redirect.ts`                                                                                           |
| Signing, parameters, notifications, status (server-only) | `shared/payments/wayforpay/{sign,purchase,callback,status,config,notifications}.ts`                                                                                                  |
| Billing day for monthly donations                        | `shared/payments/schedule.ts`                                                                                                                                                        |
| HTTP endpoints                                           | `app/api/payments/wayforpay/{callback,return}/route.ts`                                                                                                                              |
| Result page                                              | `app/[locale]/support/thanks/page.tsx`, `main/support-thanks/`                                                                                                                       |
| Texts                                                    | `payments.*`, `supportThanks.*`, `support.becomeRay.checkout.*` in `shared/i18n/messages/uk.json`                                                                                    |
| Tests                                                    | `*.test.ts` beside the code, `e2e/payments.spec.ts` (from `apps/user-web`)                                                                                                           |

## Configuration

Copy `apps/user-web/.env.example` to `apps/user-web/.env.local` (git-ignored) and fill in the values.

| Variable                         | Meaning                                                                                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Public site address without a trailing slash. It is the base of the callback and return URLs given to WayForPay, so in production it must be the real domain. Read at build time. |
| `WAYFORPAY_MERCHANT_ACCOUNT`     | Merchant login from the WayForPay cabinet.                                                                                                                                        |
| `WAYFORPAY_MERCHANT_DOMAIN`      | The store domain exactly as registered in WayForPay, host only. It is part of every signature.                                                                                    |
| `WAYFORPAY_SECRET_KEY`           | The merchant secret key. Server-only: never in the repo, in chat or in a `NEXT_PUBLIC_` variable.                                                                                 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public). Read at build time.                                                                                                                       |
| `TURNSTILE_SECRET_KEY`           | Cloudflare Turnstile secret key. Server-only. Required in a production deployment, see "Bot protection".                                                                          |

While any of the three WayForPay variables is missing the site works as usual, the donation forms say that payments are temporarily unavailable and the callback answers 503. On Vercel set them under Project Settings → Environment Variables (Production, and Preview if you test there), then redeploy.

## Bot protection

Donation forms are where stolen cards get tested, and every attempt becomes a transaction in the WayForPay cabinet. `startDonation` therefore runs two checks after validation and before it signs anything:

- **Attempt limit.** At most 10 checkouts per IP address in 10 minutes (`donation/rateLimit.ts`), otherwise `tooManyAttempts`. The counter lives in the server instance's memory, so on Vercel it is best effort: each instance counts on its own and forgets on a cold start. A shared limit (Upstash Redis or a Vercel Firewall rate-limit rule on the Server Action POSTs to `/` and `/support`) belongs to the launch infrastructure.
- **Cloudflare Turnstile.** `turnstile/TurnstileWidget.tsx` renders the widget inside both forms and adds a hidden `cf-turnstile-response` field; `turnstile/verify.ts` confirms it with Cloudflare's `siteverify`, otherwise `verificationFailed`. Any failure, including Cloudflare being unreachable, refuses the checkout. A token is single-use, so the form remounts the widget after every failed attempt and after the donor comes back with the Back button.

Without the keys the widget is not rendered and the check is skipped, so local development and the e2e tests need no Cloudflare. A production deployment (`VERCEL_ENV=production`) instead refuses every checkout with `paymentsUnavailable` until `TURNSTILE_SECRET_KEY` is set, so a forgotten key cannot leave the forms open. To set it up: Cloudflare dashboard → Turnstile → add a widget for the production domain (plus `localhost` for testing), widget mode "Managed", then put both keys into `.env.local` and the hosting environment. Cloudflare's test keys (https://developers.cloudflare.com/turnstile/troubleshooting/testing/) let you try the flow locally without a real widget.

## WayForPay cabinet checklist

- The store is registered with the production domain, and `WAYFORPAY_MERCHANT_DOMAIN` matches it.
- Regular payments work for the store (monthly donations need them). If WayForPay ignores the regular-payment parameters, ask its support to enable them.
- The look of the payment page (logo, colors, the cancel button) is set in the cabinet under the store settings, not in code. Apple Pay, Google Pay and cards are switched on under "Платіжні методи"; the Apple Pay button then shows only to donors whose browser and device can pay with it (Safari with a card in Wallet).
- Every payment carries its own `serviceUrl` and `returnUrl`, so no cabinet setting is required. If the cabinet has default URLs, point the service URL at `https://<domain>/api/payments/wayforpay/callback`.
- WayForPay's store review expects public pages on the site (public offer, refund policy, contacts, privacy policy). They do not exist yet, see "Open items".

## Testing

- `npm test` covers signatures (including the RFC 2202 test vector), order parameters and the form fields posted to WayForPay, notification verification, status mapping, validation and both API routes.
- `npm run test:e2e` runs against the production build with fake credentials (`e2e/wayforpay-test-env.ts`). WayForPay's payment page is replaced by a stub that records the posted order (and its signature is recomputed), so nothing reaches WayForPay.
- Live check: WayForPay publishes a test merchant in its documentation ("Тестові реквізити", https://wiki.wayforpay.com/view/852472). Put its login and key in `.env.local` only, never in the repo, and pay on the real page.
- WayForPay's notifications reach a local machine only through a public tunnel whose address is set as `NEXT_PUBLIC_SITE_URL`. The result page works without it, because it asks WayForPay directly.
- Vercel preview deployments with Deployment Protection reject WayForPay's server-to-server calls. To test notifications use the production domain or a protection bypass for the callback route.

## Security notes

- The secret key lives only in server code (`import 'server-only'`), signs and verifies everything, and is never logged or returned to the browser.
- Checkouts are refused without a Turnstile token Cloudflare confirms, and past 10 attempts per address in 10 minutes.
- The client cannot pick the price or the currency: the server validates the amount against `DONATION_LIMITS` and signs what it validated.
- Notifications are believed only with a valid signature for our merchant account. WayForPay repeats notifications, so whatever `recordNotification` does must be safe to run twice for the same `orderReference`.
- The donor's name, phone and email go to WayForPay only; they are not stored or logged here. The forms use `method="post"`, so a submit before the page has hydrated cannot put them into the address bar.

## Open items

1. **Legal pages and texts.** `/terms` (public offer), `/refund-policy`, `/privacy-policy` and `/data-consent` exist, are linked in the footer, and the donation consent checkbox links to the offer and the consent. They are drafts: the foundation's name, legal address and revision date (`legal.*` in `uk.json`) and its ЄДРПОУ code (`shared/config/fund.ts`) are "Test" placeholders, and a lawyer or the foundation should review the wording (the 30-day request window and 10-working-day review in the refund policy are defaults) before WayForPay's review.
2. **Persistence.** `recordNotification` (`wayforpay/notifications.ts`) only logs. When Supabase lands (ADR-5), upsert the donation by `orderReference` there and send a confirmation email on the first `Approved`.
3. **Bot protection at launch.** Turnstile and the in-memory attempt limit are in place (see "Bot protection"). Before the forms go public: create the Turnstile widget for the production domain and set both keys, and replace the in-memory limit with a shared one.
4. **Limits and wording.** The 20 to 100 000 UAH limits and the product names shown in WayForPay ("Щомісячна благодійна підтримка", "Благодійний внесок") are defaults to confirm with the fund.
5. **Live confirmation of regular payments.** WayForPay's payment page shows the schedule we send (monthly, the amount, `dateNext`, `dateEnd`), but no real payment has been made yet. On the first live test check in the cabinet section "Регулярні платежі" that the schedule exists: first charge now, next charge on `dateNext`, last on `dateEnd`. Then cancel the test payment there.
6. **Other sites.** The camp and needs-list sites should point their donate buttons at `https://<main-domain>/support`.
