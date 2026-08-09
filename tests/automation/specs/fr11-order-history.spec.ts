import { expect, test } from '@playwright/test';
import fr11Cases from '../data/fr11-order-history.json';

type OrderSetup = {
  count: number;
  baseAmount?: number;
  shippingAddress?: string;
};

type Fr11Case = {
  id: string;
  title: string;
  source: string;
  kind: 'uiHistoryWithOrders' | 'uiEmptyHistory' | 'guestBlocked';
  account: 'generated' | 'guest';
  orderSetup?: OrderSetup;
  expected: {
    apiStatus?: number;
    minOrderCount?: number;
    exactOrderCount?: number;
    pagePattern?: string;
    nonEmptyPattern?: string;
    emptyPattern?: string;
    guardPattern?: string;
  };
};

type LoginResult = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};

type Order = {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  shipping_address?: string;
  created_at?: string;
};

const cases = fr11Cases as Fr11Case[];
const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
const studentId = process.env.STUDENT_ID ?? '23127475';
const runId = (process.env.HW04_RUN_AT ?? new Date().toISOString()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 14);
const defaultPassword = 'Test1234!';
let userCounter = 0;

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function textPattern(pattern?: string): RegExp {
  return new RegExp(pattern ?? '.', 'i');
}

function uniqueEmail(testId: string): string {
  userCounter += 1;
  const slug = testId.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `fr11.${runId}.${userCounter}.${slug}@example.com`;
}

function amountPattern(amount: number): RegExp {
  const raw = String(amount);
  const dot = raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const comma = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return new RegExp(`${raw}|${dot}|${comma}`, 'i');
}

function emailInput(page: import('@playwright/test').Page) {
  return page
    .getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .or(page.getByRole('textbox'))
    .first();
}

function passwordInput(page: import('@playwright/test').Page) {
  return page
    .getByLabel(/mật khẩu|password/i)
    .or(page.getByPlaceholder(/mật khẩu|password/i))
    .or(page.locator('input[type="password"]'))
    .or(page.getByRole('textbox').nth(1))
    .first();
}

async function registerUser(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  password = defaultPassword,
) {
  const response = await request.post(apiUrl('/api/register'), {
    data: {
      name: `FR11 ${email}`,
      email,
      password,
    },
  });
  expect.soft([200, 201, 409]).toContain(response.status());
}

async function loginByApi(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  password = defaultPassword,
): Promise<LoginResult> {
  const response = await request.post(apiUrl('/api/login'), {
    data: { email, password },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('token');
  expect(body).toHaveProperty('user');
  return body as LoginResult;
}

async function createOrderByApi(
  request: import('@playwright/test').APIRequestContext,
  token: string,
  totalAmount: number,
  shippingAddress: string,
) {
  const response = await request.post(apiUrl('/api/checkout'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      total_amount: totalAmount,
      shipping_address: shippingAddress,
    },
  });
  expect.soft(response.status()).toBe(200);
  expect.soft(await response.text()).toMatch(/checkout|order|thành công|success/i);
}

async function fetchMyOrders(request: import('@playwright/test').APIRequestContext, token: string): Promise<Order[]> {
  const response = await request.get(apiUrl('/api/orders/my-orders'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  return body as Order[];
}

async function prepareUserForCase(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr11Case,
) {
  const email = uniqueEmail(testCase.id);
  await registerUser(request, email);
  const login = await loginByApi(request, email);
  const setup = testCase.orderSetup ?? { count: 0 };

  for (let index = 0; index < setup.count; index += 1) {
    await createOrderByApi(
      request,
      login.token,
      (setup.baseAmount ?? 231100) + index,
      `${setup.shippingAddress ?? 'FR11 order history address'} #${index + 1}`,
    );
  }

  const orders = await fetchMyOrders(request, login.token);
  return { email, password: defaultPassword, token: login.token, userId: login.user.id, orders };
}

async function loginByUi(page: import('@playwright/test').Page, email: string, password: string) {
  await page.goto('/login');
  await expect(emailInput(page)).toBeVisible();
  await emailInput(page).fill(email);
  await passwordInput(page).fill(password);
  await page.getByRole('button', { name: /đăng nhập|login|sign in|submit/i }).first().click();
  await expect.soft(page.locator('body')).toContainText(/đăng xuất|logout|tài khoản|profile|hồ sơ|lịch sử|đơn hàng/i);
}

async function openOrderHistory(page: import('@playwright/test').Page) {
  const candidateRoutes = ['/orders', '/order-history', '/my-orders', '/profile/orders', '/profile'];

  for (const route of candidateRoutes) {
    await page.goto(route);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const bodyText = await page.locator('body').innerText();
    if (/lịch sử|đơn hàng|orders|order history/i.test(bodyText) && !/404|not found/i.test(bodyText)) {
      return;
    }
  }

  await page.goto('/');
  const historyLink = page
    .getByRole('link', { name: /lịch sử|đơn hàng|orders|order history|profile|hồ sơ/i })
    .first();
  await expect(historyLink).toBeVisible();
  await historyLink.click();
  await expect(page.locator('body')).toContainText(/lịch sử|đơn hàng|orders|order history/i);
}

async function openOrderHistoryAsGuest(page: import('@playwright/test').Page, guardPattern: RegExp) {
  const candidateRoutes = ['/orders', '/order-history', '/my-orders', '/profile/orders', '/profile'];

  for (const route of candidateRoutes) {
    await page.goto(route);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const bodyText = await page.locator('body').innerText();
    if (/login|đăng nhập/i.test(page.url()) || guardPattern.test(bodyText)) {
      return;
    }
  }

  await page.goto('/');
  const historyLink = page
    .getByRole('link', { name: /lịch sử|đơn hàng|orders|order history|profile|hồ sơ/i })
    .first();
  await expect(historyLink).toBeVisible();
  await historyLink.click();
  await expect(page.locator('body')).toContainText(guardPattern);
}

async function assertOrderHistoryUi(page: import('@playwright/test').Page, testCase: Fr11Case, orders: Order[]) {
  await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expected.pagePattern));

  if (testCase.expected.exactOrderCount !== undefined) {
    expect.soft(orders).toHaveLength(testCase.expected.exactOrderCount);
  }

  if (testCase.expected.minOrderCount !== undefined) {
    expect.soft(orders.length).toBeGreaterThanOrEqual(testCase.expected.minOrderCount);
  }

  if (orders.length === 0) {
    await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expected.emptyPattern));
    await expect.soft(page.locator('body')).not.toContainText(/mã đơn|order\s*#|tổng tiền|total|trạng thái/i);
    return;
  }

  await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expected.nonEmptyPattern));
  for (const order of orders) {
    await expect.soft(page.locator('body')).toContainText(amountPattern(order.total_amount));
    expect.soft(order.user_id).toBeGreaterThan(0);
  }
}

test.describe(`Run by: ${studentId} | FR-11 - Xem lịch sử đơn hàng`, () => {
  test.beforeAll(() => {
    expect(cases.length).toBeGreaterThanOrEqual(5);
  });

  for (const testCase of cases) {
    test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
      test.info().annotations.push({ type: 'manual-source', description: testCase.source });

      if (testCase.kind === 'guestBlocked') {
        const apiResponse = await request.get(apiUrl('/api/orders/my-orders'));
        expect.soft(apiResponse.status()).toBe(testCase.expected.apiStatus);
        const guardPattern = textPattern(testCase.expected.guardPattern);
        await openOrderHistoryAsGuest(page, guardPattern);
        await expect.soft(page.locator('body')).toContainText(guardPattern);
        return;
      }

      const prepared = await prepareUserForCase(request, testCase);
      await loginByUi(page, prepared.email, prepared.password);
      await openOrderHistory(page);
      await assertOrderHistoryUi(page, testCase, prepared.orders);
    });
  }
});
