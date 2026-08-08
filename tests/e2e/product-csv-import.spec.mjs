import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ProductCsvImportPage } from '../pages/ProductCsvImportPage.mjs';

const data = JSON.parse(
  readFileSync(new URL('../data/product-csv-import.json', import.meta.url), 'utf8'),
);

if (!Array.isArray(data.cases) || data.cases.length < 12) {
  throw new Error('FR-16 requires at least 12 external test-data rows.');
}

const apiBaseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:3000';
const runId = `${Date.now()}-${process.pid}`;
const resolveCase = (source) => JSON.parse(
  JSON.stringify(source).replaceAll('{runId}', runId),
);

async function loginAsAdmin(request) {
  const response = await request.post(`${apiBaseURL}/api/login`, {
    data: {
      email: process.env.ADMIN_EMAIL ?? 'admin@eshop.com',
      password: process.env.ADMIN_PASSWORD ?? 'Admin123!',
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.user.role).toBe('admin');
  return body.token;
}

async function productsByNames(request, names) {
  const response = await request.get(`${apiBaseURL}/api/products`);
  expect(response.ok()).toBe(true);
  const products = await response.json();
  return products.filter((product) => names.includes(product.name));
}

async function productIds(request) {
  const response = await request.get(`${apiBaseURL}/api/products`);
  expect(response.ok()).toBe(true);
  const products = await response.json();
  return products.map((product) => product.id).sort((a, b) => a - b);
}

test.describe('FR-16 - Import sản phẩm từ CSV', () => {
  for (const sourceCase of data.cases) {
    test(`${sourceCase.id}: ${sourceCase.title}`, async ({ page, request }) => {
      const testCase = resolveCase(sourceCase);
      const names = testCase.expectedNames ?? [];
      const token = await loginAsAdmin(request);
      const csvImport = new ProductCsvImportPage(page);
      const checksWholeDatabase = ['invalidExtension', 'invalidHeader'].includes(testCase.scenario);
      const productIdsBefore = checksWholeDatabase ? await productIds(request) : null;

      await test.step('Bảo đảm dữ liệu thử chưa tồn tại', async () => {
        expect(await productsByNames(request, names)).toHaveLength(0);
      });

      await csvImport.gotoWithAdminToken(token);
      await csvImport.upload(testCase);

      if (testCase.scenario === 'invalidExtension') {
        const extensionError = page.getByText(
          /chỉ.*(?:\.csv|csv)|file.*(?:không hợp lệ|sai định dạng)|(?:đuôi|định dạng).*csv/i,
        );
        const rejectionState = async () => {
          if (await csvImport.fileInput.inputValue() === '') return 'rejected';
          if (await extensionError.first().isVisible().catch(() => false)) return 'rejected';
          if (await csvImport.importButton.count() === 1 && await csvImport.importButton.isEnabled()) {
            return 'accepted';
          }
          return 'pending';
        };

        await expect.poll(rejectionState).not.toBe('pending');
        expect(await rejectionState()).toBe('rejected');
        expect(await productIds(request)).toEqual(productIdsBefore);
        return;
      }

      if (testCase.scenario === 'noRows') {
        await expect(csvImport.previewLabel).toHaveCount(testCase.expectedPreviewRows);
        await expect(csvImport.importButton).toBeDisabled();
        await expect(csvImport.importButton).toHaveText('Import 0 sản phẩm');
        return;
      }

      if (testCase.scenario === 'invalidHeader') {
        const errorPattern = new RegExp(testCase.expectedErrorPattern, 'i');
        const headerError = page
          .locator('[role="alert"], .bg-red-100, .text-red-600, .text-red-700')
          .filter({ hasText: errorPattern });
        const parsingState = async () => {
          if (await headerError.first().isVisible().catch(() => false)) return 'rejected';
          if (await csvImport.previewLabel.count() > 0) return 'parsed';
          return 'pending';
        };

        await expect.poll(parsingState).not.toBe('pending');

        if (await parsingState() === 'parsed') {
          await expect(csvImport.importButton).toBeEnabled();
          await csvImport.importButton.click();
          await expect(csvImport.result).toBeVisible();
          await expect(csvImport.result).toContainText(errorPattern);
        }

        expect(await productIds(request)).toEqual(productIdsBefore);
        return;
      }

      await expect(csvImport.previewLabel).toBeVisible();

      if (testCase.scenario === 'quotedComma') {
        const requestPromise = page.waitForRequest((outgoing) =>
          outgoing.url().endsWith('/api/admin/import-products') && outgoing.method() === 'POST');
        await csvImport.importButton.click();
        const outgoing = await requestPromise;
        expect(outgoing.postDataJSON().products[0].description).toBe(testCase.expectedDescription);
        await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/${testCase.expectedInserted}`);
        await expect(csvImport.productName(names[0])).toBeVisible();
        return;
      }

      await csvImport.importButton.click();
      await expect(csvImport.result).toBeVisible();

      if (testCase.scenario === 'success') {
        await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/${testCase.expectedInserted}`);
        for (const name of names) {
          await expect(csvImport.productName(name)).toBeVisible();
        }
        expect(await productsByNames(request, names)).toHaveLength(testCase.expectedInserted);
        return;
      }

      if (testCase.scenario === 'validationRollback') {
        const resultText = await csvImport.result.innerText();
        expect.soft(resultText).toMatch(new RegExp(testCase.expectedErrorPattern, 'i'));
        expect.soft(resultText).toMatch(new RegExp(`0\\s*(?:/|dòng thành công).*${testCase.expectedErrorRows}`, 'i'));
        expect.soft(await productsByNames(request, names)).toHaveLength(0);
        return;
      }

      if (testCase.scenario === 'errorReport') {
        await expect(csvImport.result).toContainText(new RegExp(testCase.expectedErrorPattern, 'i'));
        await expect(csvImport.result).toContainText(`${testCase.expectedInserted}/1`);
        await expect(csvImport.result.locator('li')).toHaveCount(testCase.expectedErrorRows);
        expect(await productsByNames(request, names)).toHaveLength(0);
      }
    });

  }

  test.afterEach(async ({ request }) => {
    const response = await request.get(`${apiBaseURL}/api/products`);
    if (!response.ok()) return;
    const products = await response.json();
    for (const product of products.filter((item) => item.name?.startsWith(`FR16-${runId}`))) {
      await request.delete(`${apiBaseURL}/api/products/${product.id}`);
    }
  });
});
