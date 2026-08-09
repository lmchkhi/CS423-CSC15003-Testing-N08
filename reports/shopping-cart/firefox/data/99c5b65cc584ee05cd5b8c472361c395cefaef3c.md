# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shopping-cart.spec.mjs >> FR-07 - Giỏ hàng >> TC-CART-004: Hiển thị đúng năm tiêu đề cột
- Location: tests/e2e/shopping-cart.spec.mjs:23:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('columnheader', { name: 'Đơn giá', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('columnheader', { name: 'Đơn giá', exact: true })

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Giỏ Hàng" [level=2]
  - table:
    - rowgroup:
      - row "Sản phẩm Giá Số lượng Thành tiền Thao tác":
        - columnheader "Sản phẩm"
        - columnheader "Giá"
        - columnheader "Số lượng"
        - columnheader "Thành tiền"
        - columnheader "Thao tác"
    - rowgroup:
      - row "Bàn phím cơ FR07 123,456 ₫ 1 123,456 ₫ Xóa":
        - cell "Bàn phím cơ FR07"
        - cell "123,456 ₫"
        - cell "1"
        - cell "123,456 ₫"
        - cell "Xóa":
          - button "Xóa"
  - text: "Tổng tạm tính: 123,456 ₫"
  - link "← Mua tiếp":
    - /url: /
  - button "Tiến hành thanh toán"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { readFileSync } from 'node:fs';
  3   | import { ShoppingCartPage } from '../pages/ShoppingCartPage.mjs';
  4   | 
  5   | const data = JSON.parse(
  6   |   readFileSync(new URL('../data/shopping-cart.json', import.meta.url), 'utf8'),
  7   | );
  8   | 
  9   | const currencyValue = async (locator) => {
  10  |   const text = await locator.textContent();
  11  |   return Number(text.replace(/[^0-9]/g, ''));
  12  | };
  13  | 
  14  | if (!Array.isArray(data.cases) || data.cases.length < 12) {
  15  |   throw new Error('FR-07 requires at least 12 external test-data rows.');
  16  | }
  17  | if (!Array.isArray(data.products) || data.products.length < 2) {
  18  |   throw new Error('FR-07 requires deterministic external product fixtures.');
  19  | }
  20  | 
  21  | test.describe('FR-07 - Giỏ hàng', () => {
  22  |   for (const testCase of data.cases) {
  23  |     test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
  24  |       const cart = new ShoppingCartPage(page, data.products);
  25  |       await cart.openHome();
  26  | 
  27  |       for (const productId of testCase.productIds ?? []) {
  28  |         await cart.addProduct(productId);
  29  |       }
  30  |       await cart.openCart();
  31  | 
  32  |       switch (testCase.scenario) {
  33  |         case 'emptyMessage':
  34  |           await expect(cart.emptyMessage).toBeVisible();
  35  |           break;
  36  |         case 'emptyIllustration':
  37  |           await expect(page.locator('main img, main svg, main [role="img"]')).toHaveCount(1);
  38  |           break;
  39  |         case 'emptyContinue':
  40  |           await page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true }).click();
  41  |           await expect(page).toHaveURL(/\/$/);
  42  |           break;
  43  |         case 'columnHeaders':
  44  |           await expect(cart.table).toBeVisible();
  45  |           for (const header of testCase.expectedHeaders) {
> 46  |             await expect(page.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
      |                                                                                         ^ Error: expect(locator).toBeVisible() failed
  47  |           }
  48  |           break;
  49  |         case 'rowDetails': {
  50  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  51  |           const row = cart.rowFor(product.name);
  52  |           await expect(row).toHaveCount(1);
  53  |           await expect(row).toContainText(product.name);
  54  |           await expect(row).toContainText(/123[.,]456 ₫/);
  55  |           await expect(row).toContainText('1');
  56  |           await expect(row.getByRole('button', { name: 'Xóa', exact: true })).toBeVisible();
  57  |           break;
  58  |         }
  59  |         case 'lineTotal': {
  60  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  61  |           const cells = cart.rowFor(product.name).getByRole('cell');
  62  |           expect(await currencyValue(cells.nth(3))).toBe(testCase.expectedAmount);
  63  |           break;
  64  |         }
  65  |         case 'totalLabel':
  66  |           await expect(cart.totalBlock()).toContainText(`${testCase.expectedLabel}:`);
  67  |           break;
  68  |         case 'multiProductTotal':
  69  |           await expect(page.getByRole('row')).toHaveCount(3);
  70  |           expect(await currencyValue(cart.totalBlock())).toBe(testCase.expectedAmount);
  71  |           break;
  72  |         case 'duplicateProduct': {
  73  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  74  |           const rows = cart.rowFor(product.name);
  75  |           await expect(rows).toHaveCount(1);
  76  |           await expect(rows.getByRole('cell').nth(2)).toHaveText(testCase.expectedQuantity);
  77  |           break;
  78  |         }
  79  |         case 'increment': {
  80  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  81  |           const row = cart.rowFor(product.name);
  82  |           const increment = row.getByRole('button', { name: '+', exact: true });
  83  |           await expect(increment).toBeVisible();
  84  |           await increment.click();
  85  |           await expect(row.getByRole('cell').nth(2)).toHaveText(testCase.expectedQuantity);
  86  |           break;
  87  |         }
  88  |         case 'decrement': {
  89  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  90  |           const row = cart.rowFor(product.name);
  91  |           await expect(row.getByRole('button', { name: '-', exact: true })).toBeVisible();
  92  |           break;
  93  |         }
  94  |         case 'deleteCancel': {
  95  |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  96  |           let dialogSeen = false;
  97  |           page.once('dialog', async (dialog) => {
  98  |             dialogSeen = true;
  99  |             await dialog.dismiss();
  100 |           });
  101 |           await cart.rowFor(product.name).getByRole('button', { name: 'Xóa', exact: true }).click();
  102 |           expect(dialogSeen).toBe(true);
  103 |           await expect(cart.rowFor(product.name)).toHaveCount(1);
  104 |           break;
  105 |         }
  106 |         case 'deleteConfirm': {
  107 |           const product = data.products.find((item) => item.id === testCase.productIds[0]);
  108 |           let dialogSeen = false;
  109 |           page.once('dialog', async (dialog) => {
  110 |             dialogSeen = true;
  111 |             await dialog.accept();
  112 |           });
  113 |           await cart.rowFor(product.name).getByRole('button', { name: 'Xóa', exact: true }).click();
  114 |           expect(dialogSeen).toBe(true);
  115 |           await expect(cart.emptyMessage).toBeVisible();
  116 |           break;
  117 |         }
  118 |         case 'populatedContinue':
  119 |           await expect(page.getByRole('link', { name: testCase.expectedLabel, exact: true })).toBeVisible();
  120 |           await page.getByRole('link', { name: testCase.expectedLabel, exact: true }).click();
  121 |           await expect(page).toHaveURL(/\/$/);
  122 |           break;
  123 |         default:
  124 |           throw new Error(`Unsupported FR-07 scenario: ${testCase.scenario}`);
  125 |       }
  126 |     });
  127 |   }
  128 | });
  129 | 
```