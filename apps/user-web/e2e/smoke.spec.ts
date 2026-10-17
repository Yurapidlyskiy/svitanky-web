import { expect, test, type Page } from '@playwright/test';

const PAGES = [
  { path: '/', title: 'Світанки України' },
  { path: '/about', title: 'Про нас — Світанки України' },
  { path: '/activities', title: 'Напрямки діяльності — Світанки України' },
  { path: '/news', title: 'Новини — Світанки України' },
  { path: '/partners', title: 'Партнерам — Світанки України' },
  { path: '/support', title: 'Підтримати — Світанки України' },
];

/** Collects uncaught exceptions and console errors (hydration mismatches land here). */
function trackErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  return errors;
}

for (const { path, title } of PAGES) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('an unknown URL shows the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Сторінку не знайдено' })).toBeVisible();

  await page.getByRole('link', { exact: true, name: 'На головну' }).click();
  await expect(page).toHaveURL('/');
});

test('news survives hostile search params', async ({ page }) => {
  const errors = trackErrors(page);
  const response = await page.goto('/news?category=<script>&page=99999');

  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('the footer has no links to missing pages', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page
    .locator('footer a[href^="/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));

  for (const href of new Set(hrefs.map((href) => href.split('#')[0] || '/'))) {
    const response = await request.get(href);

    expect(response.status(), href).toBe(200);
  }
});
