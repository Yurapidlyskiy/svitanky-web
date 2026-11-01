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

// The stub's post images do not exist: answer them, so a broken image is not a console error.
test.beforeEach(async ({ page }) => {
  await page.route(/_next\/image\?url=http.*post-images/, (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg"/>',
    })
  );
});

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
  const response = await page.goto('/news?category=<script>');

  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('news shows every post with no pagination, at most three in a row', async ({
  page,
  isMobile,
}) => {
  await page.goto('/news');

  const cards = page.locator('[data-news-grid] article');
  await expect(cards).toHaveCount(12);
  await expect(page.getByRole('navigation', { name: 'Навігація сторінками новин' })).toHaveCount(0);

  if (isMobile) return;
  const top = async (index: number) => (await cards.nth(index).boundingBox())!.y;

  expect(await top(2)).toBe(await top(0));
  expect(await top(3)).toBeGreaterThan(await top(0));
});

test('changing tab on a phone leaves the tabs in view', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Only a phone would have far to scroll');
  await page.goto('/news');

  const tabs = page.getByRole('navigation', { name: 'Категорії новин' });
  await tabs.getByRole('link', { name: 'Новини' }).click();
  await expect(page).toHaveURL(/category=news/);

  await page.waitForTimeout(300);
  await expect(tabs).toBeInViewport();
});

test('the news tabs stay on one row and fit any screen', async ({ page }) => {
  await page.goto('/news');
  const tabs = page.getByRole('navigation', { name: 'Категорії новин' });

  for (const width of [320, 360, 390, 640, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    const list = (await tabs.getByRole('list').boundingBox())!;
    const boxes = await Promise.all(
      (await tabs.getByRole('link').all()).map(async (link) => (await link.boundingBox())!)
    );

    expect(list.x).toBeGreaterThanOrEqual(0);
    expect(list.x + list.width).toBeLessThanOrEqual(width);
    for (const box of boxes) {
      expect(box.y).toBe(boxes[0]!.y);
      expect(box.x + box.width).toBeLessThanOrEqual(list.x + list.width);
    }
  }
});

test('news shows posts from the database, with a badge and a read link', async ({ page }) => {
  await page.goto('/news?category=announcements');

  const card = page.getByRole('article').filter({ hasText: 'Анонс із бази' });
  await expect(card).toBeVisible();
  await expect(card.getByText('Анонс', { exact: true })).toBeVisible();
  await expect(card.getByRole('link', { name: 'Читати: Анонс із бази' })).toHaveAttribute(
    'href',
    '/news/announcement'
  );
  await expect(page.getByText('Новина із бази 1')).toBeHidden();
});

test('a project gets its own card with progress in the projects tab', async ({ page }) => {
  await page.goto('/news?category=projects');

  const card = page.getByRole('article').filter({ hasText: 'Проєкт із бази' });
  await expect(card).toBeVisible();
  await expect(card.getByText('Збір триває')).toBeVisible();
  await expect(card.getByText('25 %')).toBeVisible();
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
