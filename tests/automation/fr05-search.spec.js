import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dataPath = resolve('test-data/fr05-search.json');
const cases = JSON.parse(readFileSync(dataPath, 'utf8'));
const allowedActions = new Set(['openHome', 'search', 'delayedHomeLoad']);
const allowedExpectations = new Set(['gridDisplay', 'headingCount', 'productVisible', 'textVisible', 'textHidden', 'headingCountLessThan', 'textVisiblePattern', 'h1Count', 'firstImageAltNonEmpty', 'firstPricePattern']);

if (!Array.isArray(cases) || cases.length < 12) throw new Error(`Expected at least 12 test records in ${dataPath}`);
if (new Set(cases.map((item) => item.id)).size !== cases.length) throw new Error(`Duplicate test-case ID found in ${dataPath}`);
for (const item of cases) {
  if (!item.id || !item.category || !allowedActions.has(item.action) || !item.expected || !allowedExpectations.has(item.expected.type)) {
    throw new Error(`Invalid data record: ${JSON.stringify(item)}`);
  }
  if (item.action === 'search' && typeof item.query !== 'string') throw new Error(`${item.id} requires a query string`);
}

const productHeadings = (page) => page.getByRole('heading', { level: 2 });

async function performAction(page, data) {
  const productResponse = () => page.waitForResponse((response) =>
    response.url().includes('/api/products') && response.request().method() === 'GET'
  );
  if (data.action === 'delayedHomeLoad') {
    await page.route('**/api/products?search=', async (route) => {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_500));
      await route.continue();
    });
  }
  const initialResponse = productResponse();
  await page.goto('/');
  await initialResponse;
  await expect(page).toHaveURL(/\/$/);
  if (data.action === 'search') {
    const searchBox = page.getByPlaceholder('Tìm kiếm...');
    await searchBox.fill(data.query);
    await expect(searchBox).toHaveValue(data.query);
    const searchResponse = productResponse();
    await page.getByRole('button', { name: 'Tìm' }).click();
    await searchResponse;
  }
}

async function assertExpected(page, expected) {
  switch (expected.type) {
    case 'gridDisplay':
      await expect(page.locator('main > div > div').last()).toHaveCSS('display', expected.value);
      break;
    case 'headingCount':
      await expect(productHeadings(page)).toHaveCount(expected.value);
      break;
    case 'productVisible':
      await expect(page.getByRole('heading', { level: 2, name: expected.value })).toBeVisible();
      break;
    case 'textVisible':
      await expect(page.getByText(expected.value, { exact: true })).toBeVisible();
      break;
    case 'textHidden':
      await expect(page.getByText(expected.value, { exact: false })).toBeHidden();
      break;
    case 'headingCountLessThan':
      expect(await productHeadings(page).count()).toBeLessThan(expected.value);
      break;
    case 'textVisiblePattern':
      await expect(page.getByText(new RegExp(expected.value, 'i'))).toBeVisible();
      break;
    case 'h1Count':
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(expected.value);
      break;
    case 'firstImageAltNonEmpty':
      await expect(page.locator('main img').first()).toHaveAttribute('alt', /\S/);
      break;
    case 'firstPricePattern':
      await expect(page.locator('main p').first()).toHaveText(new RegExp(expected.value));
      break;
    default:
      throw new Error(`Unsupported expectation: ${expected.type}`);
  }
}

for (const data of cases) {
  test(`${data.id} | ${data.category}`, async ({ page }) => {
    await performAction(page, data);
    await assertExpected(page, data.expected);
  });
}
