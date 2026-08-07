import { test as base, type Page } from '@playwright/test';
import { config } from '../utils/config';
import { loginAdmin, type AuthUser } from '../utils/api';

/**
 * The shop (:5173) and the admin app (:5174) are separate origins with
 * separate storage, and recon showed they do not even agree on a key name:
 * the shop reads `token`, the admin app reads `adminToken`. Seeding the wrong
 * key silently leaves the app logged out, so each origin gets its own helper.
 *
 * Injecting the JWT is cheaper and far less brittle than driving a login form
 * once per test, and FR-10 is not testing either login screen — FR-02 is.
 */
const SHOP_TOKEN_KEY = 'token';
const ADMIN_TOKEN_KEY = 'adminToken';

async function seedToken(
  page: Page,
  origin: string,
  key: string,
  token: string,
): Promise<void> {
  await page.goto(origin);
  await page.evaluate(
    ([k, t]) => window.localStorage.setItem(k, t),
    [key, token] as const,
  );
  await page.reload();
}

export async function seedAdminToken(page: Page, token: string): Promise<void> {
  await seedToken(page, config.adminUrl, ADMIN_TOKEN_KEY, token);
}

export async function seedUserToken(page: Page, token: string): Promise<void> {
  await seedToken(page, config.webUrl, SHOP_TOKEN_KEY, token);
}

/**
 * `admin` is the seeded administrator, shared by every case as the actor that
 * performs setup. It never becomes the subject of a case: FR-10 cases always
 * act on their own freshly created order.
 */
export const test = base.extend<{ admin: AuthUser }>({
  admin: async ({}, use) => {
    await use(await loginAdmin());
  },
});

export { expect } from '@playwright/test';
