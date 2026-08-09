import { expect, test } from '@playwright/test';
import fr11Cases from '../data/fr11-order-history.json';

type OrderSetup = {
  count: number;
  baseAmount?: number;
  shippingAddress?: string;
  statuses?: OrderStatus[];
};

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'canceled';

type Fr11Case = {
  id: string;
  title: string;
  source: string;
  kind:
    | 'uiHistoryWithOrders'
    | 'uiEmptyHistory'
    | 'guestBlocked'
    | 'uiDoesNotExposeOtherUserOrder'
    | 'apiOwnOrderDetail'
    | 'apiOtherOrderDetailRejected'
    | 'uiDisplaysOrderField'
    | 'uiStatusTranslated'
    | 'uiStatusColorsDistinct';
  account: 'generated' | 'guest';
  orderSetup?: OrderSetup;
  otherOrderSetup?: OrderSetup;
  expected: {
    apiStatus?: number;
    rejectedStatuses?: number[];
    minOrderCount?: number;
    exactOrderCount?: number;
    pagePattern?: string;
    nonEmptyPattern?: string;
    emptyPattern?: string;
    guardPattern?: string;
    bodyMustNotContainPattern?: string;
    field?: 'id' | 'createdAt' | 'totalAmount';
    fieldLabelPattern?: string;
    statusLabels?: Partial<Record<OrderStatus, string>>;
    rawStatusPattern?: string;
    colorPairs?: [OrderStatus, OrderStatus][];
    minColorDistance?: number;
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

type PreparedUser = {
  email: string;
  password: string;
  token: string;
  userId: number;
  orders: Order[];
};

const cases = fr11Cases as Fr11Case[];
const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
const studentId = process.env.STUDENT_ID ?? '23127475';
const runId = (process.env.HW04_RUN_AT ?? new Date().toISOString()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 14);
const defaultPassword = 'Test1234!';
const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@eshop.com';
const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin123!';
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

function orderIdPattern(orderId: number): RegExp {
  return new RegExp(`(#\\s*${orderId}|mã\\s*đơn\\s*:?\\s*#?\\s*${orderId}\\b|order\\s*#?\\s*${orderId}\\b|\\b${orderId}\\b)`, 'i');
}

function datePattern(value?: string): RegExp {
  const datePart = String(value ?? '').split(/[ T]/)[0];
  const [year, month, day] = datePart.split('-');
  if (!year || !month || !day) {
    return /ngày|date|created|đặt/i;
  }
  const d = String(Number(day));
  const m = String(Number(month));
  return new RegExp(`${year}-${month}-${day}|${day}/${month}/${year}|${d}/${m}/${year}|${m}/${d}/${year}|${day}-${month}-${year}`, 'i');
}

function normalizeStatus(value: string): OrderStatus {
  if (['pending', 'confirmed', 'shipping', 'delivered', 'canceled'].includes(value)) {
    return value as OrderStatus;
  }
  throw new Error(`Unsupported FR-11 order status: ${value}`);
}

function statusTransitionPath(status: OrderStatus): OrderStatus[] {
  if (status === 'pending') return [];
  if (status === 'confirmed') return ['confirmed'];
  if (status === 'shipping') return ['confirmed', 'shipping'];
  if (status === 'delivered') return ['confirmed', 'shipping', 'delivered'];
  return ['canceled'];
}

function rgbDistance(a: string, b: string): number {
  const rgb = (value: string) => (value.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
  const [ar, ag, ab] = rgb(a);
  const [br, bg, bb] = rgb(b);
  return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2);
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

async function loginAdminByApi(request: import('@playwright/test').APIRequestContext): Promise<LoginResult> {
  return loginByApi(request, adminEmail, adminPassword);
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
  const bodyText = await response.text();
  expect.soft(bodyText).toMatch(/checkout|order|thành công|success/i);
  const body = JSON.parse(bodyText);
  return Number(body.orderId);
}

async function updateOrderStatusByApi(
  request: import('@playwright/test').APIRequestContext,
  adminToken: string,
  orderId: number,
  status: OrderStatus,
) {
  const response = await request.put(apiUrl(`/api/admin/orders/${orderId}/status`), {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    data: {
      status,
    },
  });
  expect.soft(response.status()).toBe(200);
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

async function fetchOrderDetail(
  request: import('@playwright/test').APIRequestContext,
  token: string,
  orderId: number,
) {
  const response = await request.get(apiUrl(`/api/orders/${orderId}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await response.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Body can be plain text for rejected API responses.
  }
  return { response, body, text };
}

async function prepareUserWithOrders(
  request: import('@playwright/test').APIRequestContext,
  testId: string,
  setup: OrderSetup = { count: 0 },
): Promise<PreparedUser> {
  const email = uniqueEmail(testId);
  await registerUser(request, email);
  const login = await loginByApi(request, email);
  const desiredStatuses = setup.statuses?.map(normalizeStatus) ?? [];
  const needsAdmin = desiredStatuses.some((status) => status !== 'pending');
  const adminLogin = needsAdmin ? await loginAdminByApi(request) : undefined;

  for (let index = 0; index < setup.count; index += 1) {
    const orderId = await createOrderByApi(
      request,
      login.token,
      (setup.baseAmount ?? 231100) + index,
      `${setup.shippingAddress ?? 'FR11 order history address'} #${index + 1}`,
    );
    const desiredStatus = desiredStatuses[index];
    if (desiredStatus && desiredStatus !== 'pending') {
      for (const nextStatus of statusTransitionPath(desiredStatus)) {
        await updateOrderStatusByApi(request, adminLogin!.token, orderId, nextStatus);
      }
    }
  }

  const orders = await fetchMyOrders(request, login.token);
  return { email, password: defaultPassword, token: login.token, userId: login.user.id, orders };
}

async function prepareUserForCase(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr11Case,
) {
  return prepareUserWithOrders(request, testCase.id, testCase.orderSetup ?? { count: 0 });
}

async function loginByUi(page: import('@playwright/test').Page, email: string, password: string) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.goto('/login');
    await expect(emailInput(page)).toBeVisible();
    await emailInput(page).fill(email);
    await passwordInput(page).fill(password);
    await page.getByRole('button', { name: /đăng nhập|login|sign in|submit/i }).first().click();
    await page.waitForLoadState('networkidle').catch(() => undefined);

    const bodyText = await page.locator('body').innerText();
    if (/đăng xuất|logout|thoát|chào|tài khoản|profile|hồ sơ|lịch sử|đơn hàng/i.test(bodyText)) {
      return;
    }
  }

  await expect(page.locator('body')).toContainText(/đăng xuất|logout|thoát|chào|tài khoản|profile|hồ sơ|lịch sử|đơn hàng/i);
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

async function assertOtherUserOrderHidden(
  page: import('@playwright/test').Page,
  actorOrders: Order[],
  otherOrders: Order[],
) {
  const body = page.locator('body');
  for (const order of actorOrders) {
    await expect.soft(body).toContainText(amountPattern(order.total_amount));
  }
  for (const order of otherOrders) {
    await expect.soft(body).not.toContainText(amountPattern(order.total_amount));
    await expect.soft(body).not.toContainText(orderIdPattern(order.id));
  }
}

async function assertOrderFieldVisible(
  page: import('@playwright/test').Page,
  testCase: Fr11Case,
  order: Order,
) {
  const body = page.locator('body');
  await expect.soft(body).toContainText(textPattern(testCase.expected.fieldLabelPattern));

  if (testCase.expected.field === 'id') {
    await expect.soft(body).toContainText(orderIdPattern(order.id));
    return;
  }

  if (testCase.expected.field === 'createdAt') {
    await expect.soft(body).toContainText(datePattern(order.created_at));
    return;
  }

  if (testCase.expected.field === 'totalAmount') {
    await expect.soft(body).toContainText(amountPattern(order.total_amount));
    await expect.soft(body).toContainText(/₫|đ|vnd|vnđ/i);
    return;
  }

  throw new Error(`Unsupported FR-11 field assertion: ${testCase.expected.field}`);
}

function firstOrderForStatus(orders: Order[], status: OrderStatus): Order {
  const order = orders.find((candidate) => candidate.status === status);
  if (!order) {
    throw new Error(`Missing order with status ${status}`);
  }
  return order;
}

function statusCell(page: import('@playwright/test').Page, order: Order) {
  return page
    .getByRole('row')
    .filter({ hasText: amountPattern(order.total_amount) })
    .first()
    .getByRole('cell')
    .nth(3);
}

async function assertStatusLabelsTranslated(
  page: import('@playwright/test').Page,
  testCase: Fr11Case,
  orders: Order[],
) {
  const body = page.locator('body');
  await expect.soft(body).not.toContainText(textPattern(testCase.expected.rawStatusPattern));
  for (const [rawStatus, labelPattern] of Object.entries(testCase.expected.statusLabels ?? {})) {
    const status = normalizeStatus(rawStatus);
    const order = firstOrderForStatus(orders, status);
    await expect.soft(statusCell(page, order)).toContainText(textPattern(labelPattern));
  }
}

async function assertStatusColorsDistinct(
  page: import('@playwright/test').Page,
  testCase: Fr11Case,
  orders: Order[],
) {
  const colors: Record<string, string> = {};
  for (const [rawStatus, labelPattern] of Object.entries(testCase.expected.statusLabels ?? {})) {
    const status = normalizeStatus(rawStatus);
    const order = firstOrderForStatus(orders, status);
    const cell = statusCell(page, order);
    await expect.soft(cell).toContainText(textPattern(labelPattern));
    colors[status] = await cell.locator('*').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.backgroundColor || style.color;
    });
  }

  const distances = (testCase.expected.colorPairs ?? []).map(([left, right]) => ({
    left,
    right,
    leftColor: colors[left],
    rightColor: colors[right],
    distance: rgbDistance(colors[left], colors[right]),
  }));

  await test.info().attach('status-color-distances.json', {
    body: JSON.stringify(distances, null, 2),
    contentType: 'application/json',
  });

  for (const pair of distances) {
    expect.soft(pair.distance).toBeGreaterThanOrEqual(testCase.expected.minColorDistance ?? 80);
  }
}

test.describe(`Run by: ${studentId} | FR-11 - Xem lịch sử đơn hàng`, () => {
  test.beforeAll(() => {
    expect(cases.length).toBeGreaterThanOrEqual(15);
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
      const otherUser = testCase.otherOrderSetup
        ? await prepareUserWithOrders(request, `${testCase.id}-other`, testCase.otherOrderSetup)
        : undefined;
      await loginByUi(page, prepared.email, prepared.password);
      await openOrderHistory(page);

      if (testCase.kind === 'uiDoesNotExposeOtherUserOrder') {
        expect(otherUser).toBeTruthy();
        await assertOrderHistoryUi(page, testCase, prepared.orders);
        await assertOtherUserOrderHidden(page, prepared.orders, otherUser!.orders);
        expect.soft(prepared.orders.map((order) => order.user_id)).not.toContain(otherUser!.userId);
        return;
      }

      if (testCase.kind === 'apiOwnOrderDetail') {
        const ownOrder = prepared.orders[0];
        expect(ownOrder).toBeTruthy();
        const { response, body, text } = await fetchOrderDetail(request, prepared.token, ownOrder.id);
        await test.info().attach('own-order-api-response.json', {
          body: JSON.stringify(body, null, 2),
          contentType: 'application/json',
        });
        expect.soft(response.status()).toBe(testCase.expected.apiStatus);
        expect.soft(text).toMatch(orderIdPattern(ownOrder.id));
        expect.soft(body).toMatchObject({
          id: ownOrder.id,
          user_id: prepared.userId,
        });
        return;
      }

      if (testCase.kind === 'apiOtherOrderDetailRejected') {
        expect(otherUser).toBeTruthy();
        const otherOrder = otherUser!.orders[0];
        expect(otherOrder).toBeTruthy();
        const { response, body, text } = await fetchOrderDetail(request, prepared.token, otherOrder.id);
        await test.info().attach('other-order-api-response.json', {
          body: JSON.stringify(body, null, 2),
          contentType: 'application/json',
        });
        expect.soft(testCase.expected.rejectedStatuses ?? [401, 403, 404]).toContain(response.status());
        expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
        return;
      }

      if (testCase.kind === 'uiDisplaysOrderField') {
        await assertOrderHistoryUi(page, testCase, prepared.orders);
        await assertOrderFieldVisible(page, testCase, prepared.orders[0]);
        return;
      }

      if (testCase.kind === 'uiStatusTranslated') {
        await assertOrderHistoryUi(page, testCase, prepared.orders);
        await assertStatusLabelsTranslated(page, testCase, prepared.orders);
        return;
      }

      if (testCase.kind === 'uiStatusColorsDistinct') {
        await assertOrderHistoryUi(page, testCase, prepared.orders);
        await assertStatusColorsDistinct(page, testCase, prepared.orders);
        return;
      }

      await assertOrderHistoryUi(page, testCase, prepared.orders);
    });
  }
});
