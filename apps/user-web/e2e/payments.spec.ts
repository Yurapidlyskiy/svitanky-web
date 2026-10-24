import { createHmac } from 'node:crypto';

import { expect, test, type Locator, type Page } from '@playwright/test';

import { E2E_WAYFORPAY } from './wayforpay-test-env';

/**
 * The donation flow end to end, without touching WayForPay. The server runs with fake
 * credentials (see playwright.config.ts). WayForPay's payment page is answered by a stub that
 * records the signed order the donor's browser posted to it.
 */

const PAY_URL = 'https://secure.wayforpay.com/pay';
const ORDER = 'SVT-M-MH3K9Z2A-9F3A1C2D';

const DONOR = {
  email: 'anna@example.com',
  firstName: 'Анна',
  lastName: 'Коваль',
  phone: '+38 (050) 123-45-67',
};

type SentWindow = Window & { __orderSent?: boolean };

/** What a page posted to WayForPay: single fields, and the `name[]` fields as lists. */
type Order = { fields: Record<string, string>; lists: Record<string, string[]> };

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

function parseOrder(body: string): Order {
  const order: Order = { fields: {}, lists: {} };

  for (const [name, value] of new URLSearchParams(body)) {
    if (name.endsWith('[]')) {
      const key = name.slice(0, -2);

      order.lists[key] = [...(order.lists[key] ?? []), value];
    } else {
      order.fields[name] = value;
    }
  }

  return order;
}

/** Lets nothing reach WayForPay; its payment page is a stub that records what was posted. */
async function stubWayForPay(page: Page) {
  const bodies: string[] = [];
  const orders: Order[] = [];

  // Routes registered later win, so the stub below beats this catch-all.
  await page.route(/wayforpay\.com/, (route) => route.abort());
  await page.route(PAY_URL, async (route) => {
    const body = route.request().postData() ?? '';

    bodies.push(body);
    orders.push(parseOrder(body));

    await route.fulfill({
      body: '<!doctype html><meta charset="utf-8"><title>WayForPay</title><h1>WayForPay payment page</h1>',
      contentType: 'text/html',
    });
  });

  return { bodies, orders };
}

/** The year of a DD.MM.YYYY date. */
function yearOf(date: string | undefined): number {
  return Number(date?.split('.')[2]);
}

function theOrder(orders: Order[]): Order {
  expect(orders).toHaveLength(1);

  const [order] = orders;

  if (!order) throw new Error('No order was posted to WayForPay');

  return order;
}

/** Before React attaches, a click is a plain browser submit: wait until the form is live. */
async function whenHydrated(element: Locator) {
  await expect
    .poll(() =>
      element.evaluate((node) => Object.keys(node).some((key) => key.startsWith('__reactProps$')))
    )
    .toBe(true);
}

/** Whether the page's button with this text is disabled, read straight from the page. */
function isDisabled(page: Page, text: string): Promise<boolean> {
  return page.evaluate(
    (label) =>
      [...document.querySelectorAll('button')].find(
        (button) => button.textContent?.trim() === label
      )?.disabled ?? false,
    text
  );
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
  test('a monthly donation sends the donor to WayForPay with a signed order', async ({ page }) => {
    const errors = trackErrors(page);
    const { bodies, orders } = await stubWayForPay(page);

    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.getByText('350 грн', { exact: true }).click();
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Регулярно' }).click();

    await expect(page).toHaveURL(PAY_URL);
    await expect(page.getByRole('heading', { name: 'WayForPay payment page' })).toBeVisible();

    const { fields, lists } = theOrder(orders);

    expect(fields).toMatchObject({
      amount: '350',
      clientFirstName: DONOR.firstName,
      clientLastName: DONOR.lastName,
      clientPhone: '380501234567',
      currency: 'UAH',
      merchantAccount: E2E_WAYFORPAY.WAYFORPAY_MERCHANT_ACCOUNT,
      regularAmount: '350',
      regularMode: 'monthly',
    });
    expect(fields.returnUrl).toMatch(/\/api\/payments\/wayforpay\/return$/);
    // WayForPay's page ends a schedule at its first charge unless it is told otherwise.
    expect(yearOf(fields.dateEnd)).toBe(yearOf(fields.dateNext) + 10);
    expect(lists).toEqual({
      productCount: ['1'],
      productName: ['Щомісячна благодійна підтримка'],
      productPrice: ['350'],
    });
    // The signature is what WayForPay checks, so recompute it from the posted fields.
    expect(fields.merchantSignature).toBe(
      sign([
        E2E_WAYFORPAY.WAYFORPAY_MERCHANT_ACCOUNT,
        E2E_WAYFORPAY.WAYFORPAY_MERCHANT_DOMAIN,
        fields.orderReference ?? '',
        fields.orderDate ?? '',
        fields.amount ?? '',
        fields.currency ?? '',
        ...(lists.productName ?? []),
        ...(lists.productCount ?? []),
        ...(lists.productPrice ?? []),
      ])
    );
    expect(bodies.join('')).not.toContain(E2E_WAYFORPAY.WAYFORPAY_SECRET_KEY);
    expect(errors).toEqual([]);
  });

  test('a one-time donation with a custom amount is not a regular payment', async ({ page }) => {
    const { orders } = await stubWayForPay(page);

    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.locator('input[name="amount"][value="custom"]').check({ force: true });
    await form.getByLabel('Введіть суму').fill('777');
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Одноразово' }).click();

    await expect(page).toHaveURL(PAY_URL);

    const { fields, lists } = theOrder(orders);

    expect(fields).toMatchObject({ amount: '777' });
    expect(fields.orderReference).toMatch(/^SVT-O-/);
    expect(lists.productPrice).toEqual(['777']);
    expect(Object.keys(fields).filter((name) => name.startsWith('regular'))).toEqual([]);
    expect(fields).not.toHaveProperty('dateNext');
  });

  test('locks the form once the order is sent and unlocks it when the page comes back', async ({
    page,
  }) => {
    // The browser would leave the page when the order is sent. Keep it here, so the form can
    // be looked at, and note that the order went out.
    await page.addInitScript(() => {
      HTMLFormElement.prototype.submit = () => {
        (window as SentWindow).__orderSent = true;
      };
    });
    await stubWayForPay(page);
    await page.goto('/');

    const form = homeForm(page);

    await whenHydrated(form);
    await form.getByText('150 грн', { exact: true }).click();
    await fillDonor(form);
    await form.getByRole('button', { exact: true, name: 'Одноразово' }).click();

    await expect
      .poll(() => page.evaluate(() => (window as SentWindow).__orderSent === true))
      .toBe(true);
    await expect.poll(() => isDisabled(page, 'Одноразово')).toBe(true);
    await expect.poll(() => isDisabled(page, 'Регулярно')).toBe(true);

    // What the Back button does when the browser restores the page from its cache.
    await page.evaluate(() =>
      window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }))
    );
    await expect.poll(() => isDisabled(page, 'Одноразово')).toBe(false);
    await expect.poll(() => isDisabled(page, 'Регулярно')).toBe(false);
  });

  test('the server refuses a donation the browser let through', async ({ page }) => {
    const { orders } = await stubWayForPay(page);

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
    expect(orders).toEqual([]);
    await expect(page).toHaveURL('/');
  });
});

test.describe('"Become a Ray" card on the support page', () => {
  test('collects the details and sends the donor to WayForPay', async ({ page }) => {
    const errors = trackErrors(page);
    const { orders } = await stubWayForPay(page);

    await page.goto('/support');

    const card = page.locator('#become-ray-form');

    await whenHydrated(card);
    await card.getByRole('button', { name: /Стати Променем/ }).click();
    await expect(card.getByText('350 грн щомісяця')).toBeVisible();

    await fillDonor(card);
    await card.getByRole('button', { name: /Перейти до оплати/ }).click();

    await expect(page).toHaveURL(PAY_URL);
    expect(theOrder(orders).fields).toMatchObject({
      amount: '350',
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
    // WayForPay posts the donor's browser here when they leave its payment page.
    const posted = await request.post('/api/payments/wayforpay/return', {
      form: { authCode: '123456', orderReference: ORDER, reasonCode: '1100' },
      maxRedirects: 0,
    });
    const visited = await request.get(`/api/payments/wayforpay/return?orderReference=${ORDER}`, {
      maxRedirects: 0,
    });

    for (const response of [posted, visited]) {
      expect(response.status()).toBe(303);
      expect(response.headers().location).toContain(`/support/thanks?order=${ORDER}`);
    }
  });
});
