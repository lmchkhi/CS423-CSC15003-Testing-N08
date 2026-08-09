import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  expect,
  test,
  type APIRequestContext,
  type BrowserContext,
  type Page,
  type TestInfo,
} from '@playwright/test';

type UiScenario =
  | 'unauthenticated-route'
  | 'checkout-summary'
  | 'successful-checkout'
  | 'empty-cart-guard'
  | 'default-address-checkout'
  | 'client-cart-cleared';

interface UiExpected {
  redirectPath?: string;
  heading?: string;
  productName?: string;
  totalAmount?: number;
  totalEditable?: boolean;
  checkoutStatus?: number;
  successText?: string;
  cartCountAfter?: number;
  checkoutActionAvailable?: boolean;
  checkoutRequestCount?: number;
  orderCountDelta?: number;
  defaultAddress?: string;
  emptyCartText?: string;
}

interface UiCase {
  id: string;
  title: string;
  scenario: UiScenario;
  source: 'Bổ sung';
  requirement: string;
  expected: UiExpected;
  tags: string[];
}

interface ProductFixture {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface UiFixture {
  feature: 'FR-08';
  frontendURL: string;
  apiURL: string;
  product: ProductFixture;
  cases: UiCase[];
}

interface RuntimeUser {
  email: string;
  password: string;
  headers: Record<string, string>;
}

interface CartItemDto {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDto {
  id: number;
  shipping_address: string | null;
}

const fixturePath = resolve(process.cwd(), 'data/FR-08-checkout-ui.json');
const fixtureValue: unknown = JSON.parse(readFileSync(fixturePath, 'utf8'));

function validateFixture(value: unknown): asserts value is UiFixture {
  if (typeof value !== 'object' || value === null) {
    throw new Error('FR-08 UI fixture must be an object');
  }

  const candidate = value as Partial<UiFixture>;
  if (
    candidate.feature !== 'FR-08' ||
    typeof candidate.frontendURL !== 'string' ||
    typeof candidate.apiURL !== 'string'
  ) {
    throw new Error('FR-08 UI fixture URLs/feature are invalid');
  }
  if (!candidate.product || typeof candidate.product.price !== 'number') {
    throw new Error('FR-08 UI product fixture is invalid');
  }
  if (!candidate.cases || candidate.cases.length !== 6) {
    throw new Error('FR-08 UI fixture must contain exactly six README-derived cases');
  }

  const ids = new Set<string>();
  for (const testCase of candidate.cases) {
    if (!testCase.id.startsWith('FR08-UI-README-') || testCase.source !== 'Bổ sung') {
      throw new Error(`Invalid UI traceability for ${testCase.id}`);
    }
    if (ids.has(testCase.id)) {
      throw new Error(`Duplicate FR-08 UI case ID: ${testCase.id}`);
    }
    ids.add(testCase.id);
    if (
      ![
        'unauthenticated-route',
        'checkout-summary',
        'successful-checkout',
        'empty-cart-guard',
        'default-address-checkout',
        'client-cart-cleared',
      ].includes(testCase.scenario)
    ) {
      throw new Error(`Invalid FR-08 UI scenario: ${testCase.id}`);
    }
  }
}

validateFixture(fixtureValue);
const fixture = fixtureValue;
const frontendURL = process.env.SUT_FRONTEND_URL ?? fixture.frontendURL;
const apiURL = process.env.SUT_API_URL ?? fixture.apiURL;
const expectedCartTotal = fixture.product.price * fixture.product.quantity;

function apiPath(path: string): string {
  return `${apiURL}${path}`;
}

function annotate(testInfo: TestInfo, testCase: UiCase): void {
  testInfo.annotations.push({ type: 'feature', description: fixture.feature });
  testInfo.annotations.push({ type: 'source', description: 'Bổ sung từ README FR-08' });
  testInfo.annotations.push({ type: 'requirement', description: testCase.requirement });
  for (const tag of testCase.tags) {
    testInfo.annotations.push({ type: 'tag', description: tag });
  }
}

async function responseJson<T>(response: { json(): Promise<unknown> }): Promise<T> {
  return (await response.json()) as T;
}

async function createRuntimeUser(request: APIRequestContext, caseId: string): Promise<RuntimeUser> {
  // The SUT keeps carts in server memory while database resets may reuse user IDs.
  // Select a newly registered identity whose effective cart is empty so every UI case
  // starts from a verified black-box precondition instead of inheriting stale state.
  for (let attempt = 1; attempt <= 50; attempt += 1) {
    const nonce = randomUUID();
    const email = `fr08.ui.${caseId.toLowerCase()}.${nonce}@eshop.test`;
    const password = `Tmp-${nonce}-Aa1!`;

    const registerResponse = await request.post(apiPath('/api/register'), {
      data: { name: 'FR08 UI Runtime User', email, password },
    });
    expect(registerResponse.status(), `${caseId}: runtime registration`).toBe(200);

    const loginResponse = await request.post(apiPath('/api/login'), {
      data: { email, password },
    });
    expect(loginResponse.status(), `${caseId}: runtime API login`).toBe(200);
    const loginBody = await responseJson<{ token: string }>(loginResponse);
    const user = {
      email,
      password,
      headers: { Authorization: `Bearer ${loginBody.token}` },
    };
    const cart = await getBackendCart(request, user.headers);
    if (cart.length === 0) {
      return user;
    }
  }

  throw new Error(`${caseId}: could not allocate a runtime user with an empty backend cart`);
}

async function seedBackendCart(
  request: APIRequestContext,
  user: RuntimeUser,
  caseId: string,
): Promise<void> {
  const addResponse = await request.post(apiPath('/api/cart'), {
    headers: user.headers,
    data: fixture.product,
  });
  expect(addResponse.status(), `${caseId}: backend cart setup`).toBe(200);

  const cart = await getBackendCart(request, user.headers);
  expect(cart, `${caseId}: backend cart precondition`).toHaveLength(1);
  expect(cart[0]?.name, `${caseId}: backend cart product`).toBe(fixture.product.name);
}

async function getBackendCart(
  request: APIRequestContext,
  headers: Record<string, string>,
): Promise<CartItemDto[]> {
  const response = await request.get(apiPath('/api/cart'), { headers });
  expect(response.status(), 'backend cart status').toBe(200);
  return responseJson<CartItemDto[]>(response);
}

async function getOrders(
  request: APIRequestContext,
  user: RuntimeUser,
  caseId: string,
): Promise<OrderDto[]> {
  const response = await request.get(apiPath('/api/orders/my-orders'), {
    headers: user.headers,
  });
  expect(response.status(), `${caseId}: orders status`).toBe(200);
  return responseJson<OrderDto[]>(response);
}

async function updateDefaultAddress(
  request: APIRequestContext,
  user: RuntimeUser,
  address: string,
  caseId: string,
): Promise<void> {
  const response = await request.put(apiPath('/api/users/me'), {
    headers: user.headers,
    data: {
      name: 'FR08 UI Runtime User',
      phone: '0912345678',
      shipping_address: address,
    },
  });
  expect(response.status(), `${caseId}: default-address setup`).toBe(200);
}

async function loginThroughUi(page: Page, user: RuntimeUser): Promise<void> {
  await page.goto(`${frontendURL}/login`);

  // The SUT inputs have no associated label, name, id or stable test id.
  // Scope positional selectors to the only login form and record this fragility in REVIEW_NOTES.
  const loginInputs = page.locator('form input');
  await expect(loginInputs).toHaveCount(2);
  // Mask both runtime identity fields before the video captures typed values.
  // This changes only their visual input type in the test DOM, not the submitted credentials.
  await loginInputs.nth(0).evaluate((input) => input.setAttribute('type', 'password'));
  await loginInputs.nth(1).evaluate((input) => input.setAttribute('type', 'password'));
  await loginInputs.nth(0).fill(user.email);
  await loginInputs.nth(1).fill(user.password);

  await Promise.all([
    page.waitForURL((url) => !url.pathname.includes('/login')),
    page.locator('form button[type="submit"]').click(),
  ]);
  await expect(page.getByText('FR08 UI Runtime User', { exact: false })).toBeVisible();
}

async function addProductToClientCart(page: Page, caseId: string): Promise<void> {
  await page.goto(`${frontendURL}/product/${fixture.product.id}`);
  await expect(
    page.getByRole('heading', { name: fixture.product.name, exact: true }),
    `${caseId}: product-detail precondition`,
  ).toBeVisible();

  await page.locator('input[type="number"]').fill(String(fixture.product.quantity));
  const addButton = page.getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true });
  await addButton.click();
  if (!(await page.getByRole('button', { name: 'Đã thêm', exact: true }).isVisible())) {
    // The current SUT ignores the first click. A second click is setup-only for FR-08 and
    // avoids turning the unrelated Product Detail defect into the oracle of this suite.
    await addButton.click();
  }
  await expect(
    page.getByRole('button', { name: 'Đã thêm', exact: true }),
    `${caseId}: client cart setup`,
  ).toBeVisible();
}

async function startUiTrace(context: BrowserContext): Promise<void> {
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
}

async function stopAndAttachUiTrace(
  context: BrowserContext,
  testInfo: TestInfo,
): Promise<void> {
  const tracePath = testInfo.outputPath('trace.zip');
  await context.tracing.stop({ path: tracePath });
  await testInfo.attach('trace', { path: tracePath, contentType: 'application/zip' });
}

test.use({ video: 'retain-on-failure' });

test.describe('FR-08 Checkout UI — README requirements', () => {
  for (const testCase of fixture.cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ context, page, request }, testInfo) => {
      annotate(testInfo, testCase);
      let traceStarted = false;
      const beginTrace = async (): Promise<void> => {
        if (!traceStarted) {
          await startUiTrace(context);
          traceStarted = true;
        }
      };

      try {
        if (testCase.scenario === 'unauthenticated-route') {
          await beginTrace();
          await page.goto(`${frontendURL}/checkout`);
          // Assertion group: State / URL — unauthenticated users must not stay on checkout.
          await expect(page, `${testCase.id}: protected checkout route`).toHaveURL(
            new RegExp(`${testCase.expected.redirectPath}$`),
          );
          return;
        }

        const user = await createRuntimeUser(request, testCase.id);
        if (testCase.scenario !== 'empty-cart-guard') {
          await seedBackendCart(request, user, testCase.id);
        }
        if (testCase.scenario === 'default-address-checkout') {
          await updateDefaultAddress(
            request,
            user,
            testCase.expected.defaultAddress ?? '',
            testCase.id,
          );
        }

        await loginThroughUi(page, user);
        if (testCase.scenario === 'client-cart-cleared') {
          await addProductToClientCart(page, testCase.id);
          await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
          await expect(
            page.getByText(testCase.expected.productName ?? '', { exact: true }),
            `${testCase.id}: client cart contains product before checkout`,
          ).toBeVisible();
          await page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
          await expect(page, `${testCase.id}: SPA checkout navigation`).toHaveURL(/\/checkout$/);
        } else {
          await page.goto(`${frontendURL}/checkout`);
        }

        if (testCase.scenario === 'checkout-summary') {
          await beginTrace();
        // Assertion group: DOM / visible text.
        await expect.soft(
          page.getByRole('heading', { name: testCase.expected.heading, exact: true }),
          `${testCase.id}: checkout heading`,
        ).toBeVisible();
        await expect.soft(
          page.getByText(testCase.expected.productName ?? '', { exact: true }),
          `${testCase.id}: product from backend cart is visible`,
        ).toBeVisible();

        // The total control has no associated label/test id, so scope the CSS fallback to main.
        const totalInput = page.locator('main input[type="number"]');
        await expect.soft(totalInput, `${testCase.id}: one total control`).toHaveCount(1);
        await expect.soft(totalInput, `${testCase.id}: calculated total`).toHaveValue(
          String(testCase.expected.totalAmount ?? expectedCartTotal),
        );
        // Assertion group: State / attribute.
        await expect
          .soft(totalInput, `${testCase.id}: total is not directly editable`)
          .not.toBeEditable();
          return;
        }

        if (testCase.scenario === 'empty-cart-guard') {
        const ordersBefore = await getOrders(request, user, testCase.id);
        let checkoutRequestCount = 0;
        page.on('request', (observedRequest) => {
          if (
            observedRequest.url() === apiPath('/api/checkout') &&
            observedRequest.method() === 'POST'
          ) {
            checkoutRequestCount += 1;
          }
        });

        const checkoutButton = page.getByRole('button', {
          name: 'Xác Nhận Thanh Toán',
          exact: true,
        });
        const actionAvailable =
          (await checkoutButton.isVisible()) && (await checkoutButton.isEnabled());
        expect.soft(actionAvailable, `${testCase.id}: empty-cart checkout action`).toBe(
          testCase.expected.checkoutActionAvailable,
        );

        if (actionAvailable) {
          const observedResponse = page
            .waitForResponse(
              (response) =>
                response.url() === apiPath('/api/checkout') &&
                response.request().method() === 'POST',
              { timeout: 2_000 },
            )
            .catch(() => null);
          await checkoutButton.click();
          await observedResponse;
        }

          const ordersAfter = await getOrders(request, user, testCase.id);
          // Start after the authenticated browser request so the trace cannot serialize JWT.
          await beginTrace();
        expect.soft(checkoutRequestCount, `${testCase.id}: checkout request count`).toBe(
          testCase.expected.checkoutRequestCount,
        );
        expect(
          ordersAfter.length - ordersBefore.length,
          `${testCase.id}: empty-cart order count delta`,
        ).toBe(testCase.expected.orderCountDelta);
          return;
        }

      const checkoutResponsePromise = page.waitForResponse(
        (response) =>
          response.url() === apiPath('/api/checkout') && response.request().method() === 'POST',
      );
      await page.getByRole('button', { name: 'Xác Nhận Thanh Toán', exact: true }).click();
      const checkoutResponse = await checkoutResponsePromise;

      // Assertion group: Network / response from a real UI action.
      expect(checkoutResponse.status(), `${testCase.id}: UI checkout status`).toBe(
        testCase.expected.checkoutStatus,
      );

        if (testCase.scenario === 'default-address-checkout') {
          // Checkout request already completed; trace captures the resulting UI and assertions.
          await beginTrace();
        const checkoutBody = await responseJson<{ orderId: number }>(checkoutResponse);
        const orderResponse = await request.get(apiPath(`/api/orders/${checkoutBody.orderId}`));
        expect(orderResponse.status(), `${testCase.id}: created-order status`).toBe(200);
        const order = await responseJson<OrderDto>(orderResponse);
        expect(order.shipping_address, `${testCase.id}: persisted default address`).toBe(
          testCase.expected.defaultAddress,
        );
          return;
        }

        // Assertion group: DOM / visible outcome.
        if (testCase.scenario !== 'client-cart-cleared') {
          await beginTrace();
        }
        await expect(
          page.getByText(testCase.expected.successText ?? '', { exact: true }),
          `${testCase.id}: success UI`,
        ).toBeVisible();

        if (testCase.scenario === 'client-cart-cleared') {
          await page.getByRole('button', { name: 'Quay lại trang chủ', exact: true }).click();
          await page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
          // Navigation may issue authenticated requests. Trace only the final cart oracle state.
          await beginTrace();
          await expect(
            page.getByText(testCase.expected.emptyCartText ?? '', { exact: true }),
            `${testCase.id}: empty client cart after checkout`,
          ).toBeVisible();
          await expect(
            page.getByText(testCase.expected.productName ?? '', { exact: true }),
            `${testCase.id}: purchased product removed from client cart`,
          ).toHaveCount(0);
          return;
        }

        const cartAfter = await getBackendCart(request, user.headers);
        // Assertion group: Count / postcondition.
        expect(cartAfter, `${testCase.id}: cart cleared after UI checkout`).toHaveLength(
          testCase.expected.cartCountAfter ?? 0,
        );
      } finally {
        if (traceStarted) {
          await stopAndAttachUiTrace(context, testInfo);
        }
      }
    });
  }
});
