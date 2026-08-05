import { expect, test } from '@playwright/test';
import { config } from '../utils/config';
import { getProducts, loginAdmin } from '../utils/api';

/**
 * Environment check, not part of the graded 3×12 case count. Run it before a
 * matrix so a red suite means "EShop is broken", not "EShop wasn't running".
 *
 *   npm run smoke
 */
test.describe('@smoke SUT reachability', () => {
  test('shop frontend responds', async ({ page }) => {
    await page.goto(config.webUrl);
    // `.first()`: the home page currently renders two <h1> elements, which
    // violates FR-21 but is a GUI-scope defect outside HW04's FR-02/10/13 —
    // this check is only about reachability, so it must not fail on it.
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('admin frontend responds', async ({ page }) => {
    await page.goto(config.adminUrl);
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('backend API serves products and accepts the admin account', async () => {
    const products = await getProducts();
    expect(products.length).toBeGreaterThan(0);

    const admin = await loginAdmin();
    expect(admin.token).toBeTruthy();
  });
});
