import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ShoppingCartPage } from '../pages/ShoppingCartPage.mjs';

const data = JSON.parse(
  readFileSync(new URL('../data/shopping-cart.json', import.meta.url), 'utf8'),
);

const currencyValue = async (locator) => {
  const text = await locator.textContent();
  return Number(text.replace(/[^0-9]/g, ''));
};

if (!Array.isArray(data.cases) || data.cases.length < 12) {
  throw new Error('FR-07 requires at least 12 external test-data rows.');
}
if (!Array.isArray(data.products) || data.products.length < 2) {
  throw new Error('FR-07 requires deterministic external product fixtures.');
}

test.describe('FR-07 - Giỏ hàng', () => {
  for (const testCase of data.cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
      const cart = new ShoppingCartPage(page, data.products);
      await cart.openHome();

      for (const productId of testCase.productIds ?? []) {
        await cart.addProduct(productId);
      }
      await cart.openCart();

      switch (testCase.scenario) {
        case 'emptyMessage':
          await expect(cart.emptyMessage).toBeVisible();
          break;
        case 'emptyIllustration':
          await expect(page.locator('main img, main svg, main [role="img"]')).toHaveCount(1);
          break;
        case 'emptyContinue':
          await page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true }).click();
          await expect(page).toHaveURL(/\/$/);
          break;
        case 'columnHeaders':
          await expect(cart.table).toBeVisible();
          for (const header of testCase.expectedHeaders) {
            await expect(page.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
          }
          break;
        case 'rowDetails': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          const row = cart.rowFor(product.name);
          const cells = row.getByRole('cell');
          const pricePattern = new RegExp(
            `^${String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, '[.,]')} ₫$`,
          );
          await expect(row).toHaveCount(1);
          await expect(cells).toHaveCount(5);
          await expect(cells.nth(0)).toHaveText(product.name);
          await expect(cells.nth(1)).toHaveText(pricePattern);
          await expect(cells.nth(2)).toHaveText('1');
          await expect(cells.nth(3)).toHaveText(pricePattern);
          await expect(cells.nth(4).getByRole('button', { name: 'Xóa', exact: true })).toBeVisible();
          break;
        }
        case 'lineTotal': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          const cells = cart.rowFor(product.name).getByRole('cell');
          expect(await currencyValue(cells.nth(3))).toBe(testCase.expectedAmount);
          break;
        }
        case 'totalLabel':
          await expect(cart.totalBlock()).toContainText(`${testCase.expectedLabel}:`);
          break;
        case 'multiProductTotal':
          await expect(page.getByRole('row')).toHaveCount(3);
          expect(await currencyValue(cart.totalBlock())).toBe(testCase.expectedAmount);
          break;
        case 'duplicateProduct': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          const rows = cart.rowFor(product.name);
          await expect(rows).toHaveCount(1);
          await expect(rows.getByRole('cell').nth(2)).toHaveText(testCase.expectedQuantity);
          break;
        }
        case 'increment': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          const row = cart.rowFor(product.name);
          const increment = row.getByRole('button', { name: '+', exact: true });
          await expect(increment).toBeVisible();
          await increment.click();
          await expect(row.getByRole('cell').nth(2)).toHaveText(testCase.expectedQuantity);
          break;
        }
        case 'decrement': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          const row = cart.rowFor(product.name);
          const cells = row.getByRole('cell');
          const quantityCell = cells.nth(2);
          const lineTotalCell = cells.nth(3);
          const incrementButton = row.getByRole('button', { name: '+', exact: true });
          const decrementButton = row.getByRole('button', { name: '-', exact: true });

          await expect(incrementButton).toBeVisible();
          await expect(decrementButton).toBeVisible();

          await incrementButton.click();
          await expect(quantityCell).toHaveText(testCase.quantityBeforeDecrement);
          await expect.poll(() => currencyValue(lineTotalCell)).toBe(testCase.amountBeforeDecrement);
          await expect.poll(() => currencyValue(cart.totalBlock())).toBe(testCase.amountBeforeDecrement);

          await decrementButton.click();
          await expect(quantityCell).toHaveText(testCase.expectedQuantity);
          await expect.poll(() => currencyValue(lineTotalCell)).toBe(testCase.expectedAmount);
          await expect.poll(() => currencyValue(cart.totalBlock())).toBe(testCase.expectedAmount);
          break;
        }
        case 'deleteCancel': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          let dialogSeen = false;
          page.once('dialog', async (dialog) => {
            dialogSeen = true;
            await dialog.dismiss();
          });
          await cart.rowFor(product.name).getByRole('button', { name: 'Xóa', exact: true }).click();
          expect(dialogSeen).toBe(true);
          await expect(cart.rowFor(product.name)).toHaveCount(1);
          break;
        }
        case 'deleteConfirm': {
          const product = data.products.find((item) => item.id === testCase.productIds[0]);
          let dialogSeen = false;
          page.once('dialog', async (dialog) => {
            dialogSeen = true;
            await dialog.accept();
          });
          await cart.rowFor(product.name).getByRole('button', { name: 'Xóa', exact: true }).click();
          expect(dialogSeen).toBe(true);
          await expect(cart.emptyMessage).toBeVisible();
          break;
        }
        case 'populatedContinue':
          await expect(page.getByRole('link', { name: testCase.expectedLabel, exact: true })).toBeVisible();
          await page.getByRole('link', { name: testCase.expectedLabel, exact: true }).click();
          await expect(page).toHaveURL(/\/$/);
          break;
        default:
          throw new Error(`Unsupported FR-07 scenario: ${testCase.scenario}`);
      }
    });
  }
});
