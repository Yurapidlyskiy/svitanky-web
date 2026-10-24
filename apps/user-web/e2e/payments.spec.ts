import { createHmac } from 'node:crypto';

import { expect, test, type Locator, type Page } from '@playwright/test';

import { E2E_WAYFORPAY } from './wayforpay-test-env';

/**
 * The donation flow end to end, without touching WayForPay. The server runs with fake
 * credentials (see playwright.config.ts) and WayForPay's widget script is replaced by a stub
 * that records what it was asked to open and reports the outcome the test picks.
 */

const WIDGET_SCRIPT_URL = 'https://secure.wayforpay.com/server/pay-widget.js';
const ORDER = 'SVT-M-MH3K9Z2A-9F3A1C2D';

const DONOR = {
  email: 'anna@example.com',
  firstName: 'Анна',
  lastName: 'Коваль',
  phone: '+38 (050) 123-45-67',
};

type WidgetCall = { params: Record<string, unknown> };
type WidgetWindow = Window & { __widgetCalls?: WidgetCall[] };

/**
 * Collects uncaught exceptions and console errors (hydration mismatches land here). Failed
 * downloads are left out: third-party images such as YouTube thumbnails are not this spec's job.
 */
function trackErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource')) {
      errors.push(message.text());
    }
  });

  return errors;
}

/** Lets nothing reach WayForPay; only its widget script is answered, by a recording stub. */
async function stubWidget(page: Page, outcome: 'approved' | 'declined' | 'pending') {
  // Routes registered later win, so the stub below beats this catch-all.
  await page.route(/wayforpay\.com/, (route) => route.abort());
  await page.route(WIDGET_SCRIPT_URL, (route) =>
    route.fulfill({
      body: `
        window.Wayforpay = function () {};
        window.Wayforpay.prototype.run = function (params, onApproved, onDeclined, onPending) {
          (window.__widgetCalls = window.__widgetCalls || []).push({ params: params });
          ({ approved: onApproved, declined: onDeclined, pending: onPending })[${JSON.stringify(outcome)}]();
        };`,
      contentType: 'text/javascript',
    })
  );
}

function widgetCalls(page: Page): Promise<WidgetCall[]> {
  return page.evaluate(() => (window as WidgetWindow).__widgetCalls ?? []);
}

/** Before React attaches, a click is a plain browser submit: wait until the form is live. */
async function whenHydrated(element: Locator) {
  await expect
    .poll(() =>
      element.evaluate((node) => Object.keys(node).some((key) => key.startsWith('__reactProps$')))
    )
    .toBe(true);
}

function homeForm(page: Page): Locator {
  return page
    .locator('form')
    .filter({ has: page.getByRole('button', { exact: true, name: 'Регулярно' }) });
}

async function fillDonor(scope: Locator) {
  await scope.getByLabel("Введіть ім'я").fill(DONOR.firstName);
  await scope.getByLabel('Введіть прізвище').fill(DONOR.lastName);
  await scope.getByLabel('Номер телефону').fill(DONOR.phone);
  await scope.getByLabel('Email').fill(DONOR.email);
  // The real input is visually hidden behind a styled box; clicking the box toggles it.
  await scope.getByRole('checkbox').check({ force: true });
}

function sign(fields: (number | string)[]): string {
  return createHmac('md5', E2E_WAYFORPAY.WAYFORPAY_SECRET_KEY)
    .update(fields.join(';'), 'utf8')
    .digest('hex');
}

test.describe('donation form on the home page', () => {
  test('a monthly donation opens a signed WayForPay window and ends on the result page', async ({
    page,
  }) => {
    const errors = trackErrors(page);

    await stubWidget(page, 'approved');
    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.getByText('350 грн', { exact: true }).click();
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Регулярно' }).click();

    await expect(page).toHaveURL(/\/support\/thanks\?order=SVT-M-/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    const calls = await widgetCalls(page);

    expect(calls).toHaveLength(1);
    expect(calls[0]?.params).toMatchObject({
      amount: 350,
      clientFirstName: DONOR.firstName,
      clientLastName: DONOR.lastName,
      clientPhone: '380501234567',
      currency: 'UAH',
      merchantAccount: E2E_WAYFORPAY.WAYFORPAY_MERCHANT_ACCOUNT,
      regularAmount: 350,
      regularMode: 'monthly',
    });
    expect(calls[0]?.params.merchantSignature).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(calls)).not.toContain(E2E_WAYFORPAY.WAYFORPAY_SECRET_KEY);
    expect(errors).toEqual([]);
  });

  test('a one-time donation with a custom amount is not a regular payment', async ({ page }) => {
    await stubWidget(page, 'pending');
    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.locator('input[name="amount"][value="custom"]').check({ force: true });
    await form.getByLabel('Введіть суму').fill('777');
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Одноразово' }).click();

    await expect(page).toHaveURL(/\/support\/thanks\?order=SVT-O-/);

    const calls = await widgetCalls(page);

    expect(calls[0]?.params).toMatchObject({ amount: 777, productPrice: [777] });
    expect(calls[0]?.params).not.toHaveProperty('regularMode');
  });

  test('a declined payment keeps the donor on the form with a message', async ({ page }) => {
    await stubWidget(page, 'declined');
    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.getByText('150 грн', { exact: true }).click();
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Одноразово' }).click();

    await expect(form.getByText('Платіж не пройшов')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('the server refuses a donation the browser let through', async ({ page }) => {
    await stubWidget(page, 'approved');
    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    // Skip the browser's own checks, as a script or an old browser would.
    await form.evaluate((node) => {
      (node as HTMLFormElement).noValidate = true;
    });
    await form.getByText('350 грн', { exact: true }).click();
    await fillDonor(form);
    await form.getByLabel('Email').fill('not-an-email');
    await form.getByRole('button', { exact: true, name: 'Регулярно' }).click();

    await expect(form.getByText('Вкажіть коректний email.')).toBeVisible();
    expect(await widgetCalls(page)).toEqual([]);
  });
});

test.describe('"Become a Ray" card on the support page', () => {
  test('collects the details and opens the payment window', async ({ page }) => {
    const errors = trackErrors(page);

    await stubWidget(page, 'pending');
    await page.goto('/support');

    const card = page.locator('#become-ray-form');

    await whenHydrated(card);
    await card.getByRole('button', { name: /Стати Променем/ }).click();
    await expect(card.getByText('350 грн щомісяця')).toBeVisible();

    await fillDonor(card);
    await card.getByRole('button', { name: /Перейти до оплати/ }).click();

    await expect(page).toHaveURL(/\/support\/thanks\?order=SVT-M-/);
    expect((await widgetCalls(page))[0]?.params).toMatchObject({
      amount: 350,
      regularMode: 'monthly',
    });
    expect(errors).toEqual([]);
  });

  test('refuses an amount outside the limits before asking for any details', async ({ page }) => {
    await page.goto('/support');

    const card = page.locator('#become-ray-form');

    await whenHydrated(card);
    await card.locator('input[name="amount"][value="custom"]').check({ force: true });
    await card.getByLabel('Введіть суму').fill('5');
    await card.getByRole('button', { name: /Стати Променем/ }).click();

    await expect(card.getByText(/Вкажіть суму від 20 до 100\s000 грн\./)).toBeVisible();
    await expect(card.getByLabel("Введіть ім'я")).toHaveCount(0);
  });
});

test.describe('result page', () => {
  test('without an order it goes back to the support page', async ({ page }) => {
    await page.goto('/support/thanks');
    await expect(page).toHaveURL('/support');
  });

  test('with a made-up order it goes back to the support page', async ({ page }) => {
    await page.goto('/support/thanks?order=hello');
    await expect(page).toHaveURL('/support');
  });

  test('for a real order it renders and stays out of search results', async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(`/support/thanks?order=${ORDER}`);

    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe('WayForPay endpoints', () => {
  test('a notification is accepted only with a valid signature', async ({ request }) => {
    const notification = {
      amount: 350,
      authCode: '123456',
      cardPan: '41****1111',
      currency: 'UAH',
      merchantAccount: E2E_WAYFORPAY.WAYFORPAY_MERCHANT_ACCOUNT,
      orderReference: ORDER,
      reasonCode: 1100,
      transactionStatus: 'Approved',
    };
    const merchantSignature = sign([
      notification.merchantAccount,
      notification.orderReference,
      notification.amount,
      notification.currency,
      notification.authCode,
      notification.cardPan,
      notification.transactionStatus,
      notification.reasonCode,
    ]);

    const forged = await request.post('/api/payments/wayforpay/callback', {
      data: { ...notification, merchantSignature: 'forged' },
    });
    const genuine = await request.post('/api/payments/wayforpay/callback', {
      data: { ...notification, merchantSignature },
    });

    expect(forged.status()).toBe(400);
    expect(genuine.status()).toBe(200);
    expect(await genuine.json()).toMatchObject({ orderReference: ORDER, status: 'accept' });
  });

  test('the return URL sends the donor to the result page of their order', async ({ request }) => {
    const response = await request.get(`/api/payments/wayforpay/return?orderReference=${ORDER}`, {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(303);
    expect(response.headers().location).toContain(`/support/thanks?order=${ORDER}`);
  });
});
