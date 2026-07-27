import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dataPath = resolve('test-data/fr05-search.json');
const cases = JSON.parse(readFileSync(dataPath, 'utf8'));

if (!Array.isArray(cases) || cases.length === 0) {
  throw new Error(`Test data must contain at least one case: ${dataPath}`);
}
if (new Set(cases.map((item) => item.id)).size !== cases.length) {
  throw new Error(`Duplicate test-case ID found in ${dataPath}`);
}
for (const item of cases) {
  for (const key of ['id', 'category', 'query', 'expectedProductName', 'expectedMinimumResults']) {
    if (item[key] === undefined || item[key] === '') throw new Error(`${item.id ?? 'unknown'} is missing ${key}`);
  }
}

for (const data of cases) {
  test(`${data.id} | search returns the expected product`, async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);

    const searchBox = page.getByPlaceholder('Tìm kiếm...');
    await searchBox.fill(data.query);
    await expect(searchBox).toHaveValue(data.query);
    await page.getByRole('button', { name: 'Tìm' }).click();

    const matchingProduct = page.getByRole('heading', { level: 2, name: data.expectedProductName });
    await expect(matchingProduct).toHaveCount(data.expectedMinimumResults);
    await expect(matchingProduct).toBeVisible();
  });
}
