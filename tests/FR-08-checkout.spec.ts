import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { expect, test, type APIRequestContext } from '@playwright/test';

type TestCaseSource = 'HW02' | 'Bổ sung';
type TestCaseType = 'positive' | 'negative' | 'edge';
type AuthMode = 'valid' | 'missing' | 'invalid';
type CartState = 'filled' | 'empty';
type AddressKey = 'valid' | 'default' | 'xss' | 'sql';

interface CheckoutInput {
  authMode: AuthMode;
  cartState: CartState;
  totalAmount?: number | string;
  omitTotalAmount?: boolean;
  shippingAddress?: string;
  shippingAddressKey?: AddressKey;
  omitShippingAddress?: boolean;
  profileDefaultAddressKey?: AddressKey;
}

interface CheckoutExpected {
  responseStatus?: number;
  responseOk?: boolean;
  orderCreated: boolean;
  orderTotal?: number;
  orderAddressKey?: AddressKey;
  orderStatus?: string;
  cartCountAfter?: number;
  ordersApiStatusAfter?: number;
}

interface PlaywrightCase<TInput, TExpected> {
  id: string;
  title: string;
  type: TestCaseType;
  preconditions: string[];
  input: TInput;
  expected: TExpected;
  source: TestCaseSource;
  tags?: string[];
  skipReason?: string;
}

interface ProductFixture {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Fr08Fixture {
  feature: 'FR-08';
  baseURL: string;
  product: ProductFixture;
  addresses: Record<AddressKey, string>;
  cases: Array<PlaywrightCase<CheckoutInput, CheckoutExpected>>;
}

interface UserSession {
  userId: number;
  headers: Record<string, string>;
}

interface OrderDto {
  id: number;
  total_amount: number | string | null;
  shipping_address: string | null;
  status: string;
}

const fixturePath = resolve(process.cwd(), 'data/FR-08-checkout.json');
const fixtureValue: unknown = JSON.parse(readFileSync(fixturePath, 'utf8'));

function validateFixture(value: unknown): asserts value is Fr08Fixture {
  if (typeof value !== 'object' || value === null) {
    throw new Error('FR-08 fixture must be an object');
  }

  const candidate = value as Partial<Fr08Fixture>;
  if (candidate.feature !== 'FR-08' || typeof candidate.baseURL !== 'string') {
    throw new Error('FR-08 fixture feature/baseURL is invalid');
  }
  if (!candidate.product || typeof candidate.product.price !== 'number') {
    throw new Error('FR-08 fixture product is invalid');
  }
  if (!candidate.addresses || !candidate.cases || candidate.cases.length !== 15) {
    throw new Error('FR-08 fixture must contain addresses and exactly 15 independent cases');
  }

  const ids = new Set<string>();
  for (const testCase of candidate.cases) {
    if (!testCase.id?.startsWith('TC-FR08-') || testCase.source !== 'HW02') {
      throw new Error(`Invalid traceability for case ${testCase.id ?? '<missing>'}`);
    }
    if (ids.has(testCase.id)) {
      throw new Error(`Duplicate independent case ID: ${testCase.id}`);
    }
    ids.add(testCase.id);
    if (!['positive', 'negative', 'edge'].includes(testCase.type)) {
      throw new Error(`Invalid case type for ${testCase.id}`);
    }
    if (!testCase.input || !testCase.expected) {
      throw new Error(`Missing input/expected for ${testCase.id}`);
    }
  }
}

validateFixture(fixtureValue);
const fixture = fixtureValue;
const baseURL = process.env.SUT_API_URL ?? fixture.baseURL;

function url(path: string): string {
  return `${baseURL}${path}`;
}

async function responseJson<T>(response: { json(): Promise<unknown> }): Promise<T> {
  return (await response.json()) as T;
}

async function createIsolatedUser(request: APIRequestContext, caseId: string): Promise<UserSession> {
  const nonce = randomUUID();
  const email = `fr08.${caseId.toLowerCase()}.${nonce}@eshop.test`;
  const password = `Tmp-${nonce}-Aa1!`;

  const registerResponse = await request.post(url('/api/register'), {
    data: { name: 'FR08 Runtime User', email, password },
  });
  // Assertion group: Network / response.
  expect(registerResponse.status(), `${caseId}: runtime user registration`).toBe(200);

  const loginResponse = await request.post(url('/api/login'), {
    data: { email, password },
  });
  expect(loginResponse.status(), `${caseId}: runtime user login`).toBe(200);
  const loginBody = await responseJson<{ token: string; user: { id: number } }>(loginResponse);
  expect(loginBody.token, `${caseId}: login token exists`).toEqual(expect.any(String));

  return {
    userId: loginBody.user.id,
    headers: { Authorization: `Bearer ${loginBody.token}` },
  };
}

async function getOrders(request: APIRequestContext, headers: Record<string, string>): Promise<OrderDto[]> {
  const response = await request.get(url('/api/orders/my-orders'), { headers });
  expect(response.status(), 'orders API status').toBe(200);
  return responseJson<OrderDto[]>(response);
}

async function getCart(request: APIRequestContext, headers: Record<string, string>): Promise<ProductFixture[]> {
  const response = await request.get(url('/api/cart'), { headers });
  expect(response.status(), 'cart API status').toBe(200);
  return responseJson<ProductFixture[]>(response);
}

function cartTotal(items: ProductFixture[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function shippingAddressFor(input: CheckoutInput): string | undefined {
  if (input.omitShippingAddress) return undefined;
  if (input.shippingAddressKey) return fixture.addresses[input.shippingAddressKey];
  return input.shippingAddress;
}

test.describe('FR-08 Checkout API — data-driven HW02', () => {
  for (const testCase of fixture.cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ request }, testInfo) => {
      testInfo.annotations.push({ type: 'feature', description: fixture.feature });
      testInfo.annotations.push({ type: 'source', description: testCase.source });
      testInfo.annotations.push({ type: 'case-type', description: testCase.type });
      for (const tag of testCase.tags ?? []) {
        testInfo.annotations.push({ type: 'tag', description: tag });
      }

      let headers: Record<string, string> = {};
      let session: UserSession | undefined;
      let ordersBefore: OrderDto[] = [];

      if (testCase.input.authMode === 'valid') {
        session = await createIsolatedUser(request, testCase.id);
        headers = session.headers;

        if (testCase.input.profileDefaultAddressKey) {
          const profileResponse = await request.put(url('/api/users/me'), {
            headers,
            data: {
              name: 'FR08 Runtime User',
              shipping_address: fixture.addresses[testCase.input.profileDefaultAddressKey],
              phone: '0912345678',
            },
          });
          expect(profileResponse.status(), `${testCase.id}: profile setup`).toBe(200);
        }

        if (testCase.input.cartState === 'filled') {
          const addResponse = await request.post(url('/api/cart'), {
            headers,
            data: fixture.product,
          });
          expect(addResponse.status(), `${testCase.id}: add product`).toBe(200);
        }

        const cartBefore = await getCart(request, headers);
        // Assertion group: Count / aggregate.
        if (testCase.input.cartState === 'filled') {
          expect(cartBefore.length, `${testCase.id}: pre-checkout cart count`).toBe(1);
          expect(cartTotal(cartBefore), `${testCase.id}: pre-checkout cart total`).toBe(12_000_000);
        } else {
          expect(cartBefore.length, `${testCase.id}: empty-cart precondition`).toBe(0);
        }
        ordersBefore = await getOrders(request, headers);
      } else if (testCase.input.authMode === 'invalid') {
        headers = { Authorization: 'Bearer invalid-token' };
      }

      const checkoutData: Record<string, unknown> = {};
      if (!testCase.input.omitTotalAmount) {
        checkoutData.total_amount = testCase.input.totalAmount;
      }
      if (!testCase.input.omitShippingAddress) {
        checkoutData.shipping_address = shippingAddressFor(testCase.input);
      }

      const checkoutResponse = await request.post(url('/api/checkout'), {
        headers,
        data: checkoutData,
      });

      // Assertion group: Network / response.
      if (testCase.expected.responseStatus !== undefined) {
        expect(checkoutResponse.status(), `${testCase.id}: checkout status`).toBe(
          testCase.expected.responseStatus,
        );
      } else {
        expect(checkoutResponse.ok(), `${testCase.id}: checkout must be rejected`).toBe(
          testCase.expected.responseOk,
        );
      }

      if (!testCase.expected.orderCreated) {
        if (session) {
          const ordersAfter = await getOrders(request, headers);
          // Assertion group: Count / aggregate.
          expect(ordersAfter.length, `${testCase.id}: no new order`).toBe(ordersBefore.length);
        }
        return;
      }

      const checkoutBody = await responseJson<{ orderId: number }>(checkoutResponse);
      expect(checkoutBody.orderId, `${testCase.id}: order ID`).toEqual(expect.any(Number));
      const orderResponse = await request.get(url(`/api/orders/${checkoutBody.orderId}`), { headers });
      expect(orderResponse.status(), `${testCase.id}: order detail status`).toBe(200);
      const order = await responseJson<OrderDto>(orderResponse);

      // Assertion group: State / attribute.
      expect(order.status, `${testCase.id}: order state`).toBe(testCase.expected.orderStatus);
      expect(order.total_amount, `${testCase.id}: server-calculated total`).toBe(
        testCase.expected.orderTotal,
      );
      if (testCase.expected.orderAddressKey) {
        expect(order.shipping_address, `${testCase.id}: shipping address`).toBe(
          fixture.addresses[testCase.expected.orderAddressKey],
        );
      }

      if (testCase.expected.cartCountAfter !== undefined) {
        const cartAfter = await getCart(request, headers);
        // Assertion group: Count / aggregate.
        expect(cartAfter.length, `${testCase.id}: post-checkout cart count`).toBe(
          testCase.expected.cartCountAfter,
        );
      }

      if (testCase.expected.ordersApiStatusAfter !== undefined) {
        const ordersResponse = await request.get(url('/api/orders/my-orders'), { headers });
        // Assertion group: Network / response.
        expect(ordersResponse.status(), `${testCase.id}: orders API survives payload`).toBe(
          testCase.expected.ordersApiStatusAfter,
        );
      }
    });
  }
});
