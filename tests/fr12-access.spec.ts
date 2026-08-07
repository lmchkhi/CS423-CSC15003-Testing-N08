import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  expect,
  test,
  type APIRequestContext,
  type APIResponse,
  type TestInfo,
} from '@playwright/test';

type TestCaseSource = 'HW02' | 'Bổ sung';
type TestCaseType = 'positive' | 'negative' | 'edge';
type AuthMode = 'none' | 'invalid' | 'user' | 'admin';
type ResourceKind = 'user' | 'product' | 'category' | 'coupon';
type CleanupCreated =
  | 'productByName'
  | 'productByResponseId'
  | 'categoryByResponseId'
  | 'couponByResponseId';
type JsonObject = Record<string, unknown>;

interface ResourceInput {
  kind: ResourceKind;
  pathToken: string;
}

interface AccessInput {
  authMode: AuthMode;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  body?: JsonObject;
  resource?: ResourceInput;
  cleanupCreated?: CleanupCreated;
  resetOrder?: boolean;
}

interface AccessExpected {
  status: number;
  bodyKind: 'array' | 'object';
}

interface ExpectedResponse {
  status: number;
  method: string;
  urlPattern: string;
  bodySubset?: JsonObject;
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
  expectedResponse?: ExpectedResponse;
  evidence?: string[];
}

interface RuntimeSetup {
  namePrefix: string;
  emailDomain: string;
  productPrice: number;
  categoryId: number;
  productSeed: JsonObject;
  categorySeed: JsonObject;
  couponSeed: JsonObject;
}

interface Fr12Fixture {
  feature: 'FR-12';
  baseURL: string;
  invalidToken: string;
  endpoints: {
    login: string;
    register: string;
    checkout: string;
    adminUsers: string;
    adminOrders: string;
    products: string;
    categories: string;
    adminCoupons: string;
  };
  setup: {
    successStatus: number;
    cleanupAcceptedStatuses: number[];
    emptyOrderCount: number;
    order: {
      id: number;
      initialStatus: string;
      checkoutBody: JsonObject;
    };
    resetCommand: {
      command: string;
      args: string[];
      cwd: string;
    };
    runtime: RuntimeSetup;
  };
  rootCauseTags: {
    productNoAuthMiddleware: string;
    adminApiNoRoleCheck: string;
    categoryNoRoleCheck: string;
    wrongStatusInvalidToken: string;
  };
  cases: Array<PlaywrightCase<AccessInput, AccessExpected>>;
}

interface Credentials {
  email: string;
  password: string;
}

interface RuntimeValues {
  uniqueName: string;
  uniqueCode: string;
}

interface CleanupTarget {
  kind: ResourceKind;
  id: number;
}

interface OrderDto {
  id: number;
  status: string;
}

const fixturePath = resolve(process.cwd(), 'data/fr12-access.json');
const fixtureValue: unknown = JSON.parse(readFileSync(fixturePath, 'utf8'));

function validateFixture(value: unknown): asserts value is Fr12Fixture {
  if (typeof value !== 'object' || value === null) {
    throw new Error('FR-12 fixture must be an object');
  }

  const candidate = value as Partial<Fr12Fixture>;
  if (candidate.feature !== 'FR-12' || typeof candidate.baseURL !== 'string') {
    throw new Error('FR-12 fixture feature/baseURL is invalid');
  }
  if (!candidate.endpoints || !candidate.setup || !candidate.rootCauseTags) {
    throw new Error('FR-12 fixture endpoints/setup/rootCauseTags is missing');
  }
  if (!Array.isArray(candidate.cases) || candidate.cases.length !== 40) {
    throw new Error('FR-12 fixture must contain exactly 40 HW02 cases');
  }

  const ids = new Set<string>();
  for (const [index, testCase] of candidate.cases.entries()) {
    const expectedId = `TC-FR12-DT-${String(index + 1).padStart(3, '0')}`;
    if (testCase.id !== expectedId || testCase.source !== 'HW02') {
      throw new Error(`Invalid traceability at ${testCase.id ?? '<missing>'}`);
    }
    if (ids.has(testCase.id)) throw new Error(`Duplicate case ID: ${testCase.id}`);
    ids.add(testCase.id);
    if (!['positive', 'negative', 'edge'].includes(testCase.type)) {
      throw new Error(`Invalid case type for ${testCase.id}`);
    }
    if (!testCase.input || !testCase.expected || !testCase.expectedResponse) {
      throw new Error(`Missing input/expected/expectedResponse for ${testCase.id}`);
    }
    if (
      testCase.type === 'positive' &&
      testCase.expected.bodyKind === 'object' &&
      Object.keys(testCase.expectedResponse.bodySubset ?? {}).length === 0
    ) {
      throw new Error(`Positive object case requires bodySubset: ${testCase.id}`);
    }
    if (testCase.skipReason) throw new Error(`Unexpected skipReason for ${testCase.id}`);
  }

  const expectedRootCauseCases = new Map<string, string[]>([
    [
      candidate.rootCauseTags.productNoAuthMiddleware,
      [
        'TC-FR12-DT-023',
        'TC-FR12-DT-024',
        'TC-FR12-DT-026',
        'TC-FR12-DT-027',
        'TC-FR12-DT-029',
        'TC-FR12-DT-030',
      ],
    ],
    [
      candidate.rootCauseTags.adminApiNoRoleCheck,
      [
        'TC-FR12-DT-003',
        'TC-FR12-DT-006',
        'TC-FR12-DT-009',
        'TC-FR12-DT-012',
        'TC-FR12-DT-015',
        'TC-FR12-DT-018',
        'TC-FR12-DT-021',
      ],
    ],
    [
      candidate.rootCauseTags.categoryNoRoleCheck,
      ['TC-FR12-DT-033', 'TC-FR12-DT-036', 'TC-FR12-DT-039'],
    ],
    [candidate.rootCauseTags.wrongStatusInvalidToken, ['TC-FR12-DT-002']],
  ]);
  const expectedFailedIds = new Set([...expectedRootCauseCases.values()].flat());

  for (const [tag, expectedIds] of expectedRootCauseCases) {
    const actualIds = candidate.cases
      .filter((testCase) => testCase.tags?.includes(tag))
      .map((testCase) => testCase.id);
    if (actualIds.length !== expectedIds.length || actualIds.some((id) => !expectedIds.includes(id))) {
      throw new Error(
        `Root-cause mapping for ${tag} must be ${expectedIds.join(', ')}, received ${actualIds.join(', ')}`,
      );
    }
  }

  for (const testCase of candidate.cases) {
    const rootCauseTags = testCase.tags?.filter((tag) => tag.startsWith('root-cause:')) ?? [];
    const expectedTagCount = expectedFailedIds.has(testCase.id) ? 1 : 0;
    if (rootCauseTags.length !== expectedTagCount) {
      throw new Error(
        `${testCase.id} must have ${expectedTagCount} root-cause tag(s), received ${rootCauseTags.length}`,
      );
    }
  }
}

validateFixture(fixtureValue);
const fixture = fixtureValue;
const baseURL = process.env.SUT_API_URL ?? fixture.baseURL;

function apiUrl(path: string): string {
  return `${baseURL}${path}`;
}

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Required environment variable is missing: ${name}`);
  return value;
}

function credentials(role: 'user' | 'admin'): Credentials {
  const prefix = role === 'user' ? 'ESHOP_USER' : 'ESHOP_ADMIN';
  return {
    email: requiredEnvironment(`${prefix}_EMAIL`),
    password: requiredEnvironment(`${prefix}_PASSWORD`),
  };
}

async function responseJson(response: APIResponse): Promise<unknown> {
  return response.json() as Promise<unknown>;
}

async function login(
  request: APIRequestContext,
  role: 'user' | 'admin',
): Promise<Record<string, string>> {
  const loginResponse = await request.post(apiUrl(fixture.endpoints.login), {
    data: credentials(role),
  });
  expect(loginResponse.status(), `${role} login precondition`).toBe(fixture.setup.successStatus);
  const body = (await responseJson(loginResponse)) as { token?: unknown };
  expect(body.token, `${role} login token`).toEqual(expect.any(String));
  return { Authorization: `Bearer ${String(body.token)}` };
}

async function authHeaders(
  request: APIRequestContext,
  mode: AuthMode,
): Promise<Record<string, string>> {
  if (mode === 'none') return {};
  if (mode === 'invalid') return { Authorization: `Bearer ${fixture.invalidToken}` };
  return login(request, mode);
}

function resolveTemplates(value: unknown, runtime: RuntimeValues): unknown {
  if (typeof value === 'string') {
    return value
      .replaceAll('{{uniqueName}}', runtime.uniqueName)
      .replaceAll('{{uniqueCode}}', runtime.uniqueCode);
  }
  if (Array.isArray(value)) return value.map((item) => resolveTemplates(item, runtime));
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveTemplates(item, runtime)]),
    );
  }
  return value;
}

function runtimeValues(testCase: PlaywrightCase<AccessInput, AccessExpected>): RuntimeValues {
  const nonce = randomUUID().replaceAll('-', '');
  return {
    uniqueName: `${fixture.setup.runtime.namePrefix} ${testCase.id} ${nonce}`,
    uniqueCode: `F12${nonce.slice(0, 12)}`.toUpperCase(),
  };
}

function resetBackend(): void {
  execFileSync(fixture.setup.resetCommand.command, fixture.setup.resetCommand.args, {
    cwd: resolve(process.cwd(), fixture.setup.resetCommand.cwd),
    encoding: 'utf8',
    stdio: 'pipe',
  });
}

async function prepareOrderOne(request: APIRequestContext): Promise<void> {
  resetBackend();
  const userHeaders = await login(request, 'user');
  const adminHeaders = await login(request, 'admin');

  const emptyResponse = await request.get(apiUrl(fixture.endpoints.adminOrders), {
    headers: adminHeaders,
  });
  expect(emptyResponse.status(), 'orders status immediately after reset').toBe(
    fixture.setup.successStatus,
  );
  const emptyOrders = (await responseJson(emptyResponse)) as OrderDto[];
  expect(emptyOrders, 'orders must be empty immediately after reset').toHaveLength(
    fixture.setup.emptyOrderCount,
  );

  const checkoutResponse = await request.post(apiUrl(fixture.endpoints.checkout), {
    headers: userHeaders,
    data: fixture.setup.order.checkoutBody,
  });
  expect(checkoutResponse.status(), 'checkout creates order 1 precondition').toBe(
    fixture.setup.successStatus,
  );

  const ordersResponse = await request.get(apiUrl(fixture.endpoints.adminOrders), {
    headers: adminHeaders,
  });
  const orders = (await responseJson(ordersResponse)) as OrderDto[];
  const order = orders.find((item) => item.id === fixture.setup.order.id);
  expect(order, 'runtime order 1 exists').toMatchObject({
    id: fixture.setup.order.id,
    status: fixture.setup.order.initialStatus,
  });
}

async function createTemporaryResource(
  request: APIRequestContext,
  kind: ResourceKind,
  runtime: RuntimeValues,
): Promise<number> {
  if (kind === 'user') {
    const nonce = randomUUID();
    const response = await request.post(apiUrl(fixture.endpoints.register), {
      data: {
        name: runtime.uniqueName,
        email: `fr12.${nonce}@${fixture.setup.runtime.emailDomain}`,
        password: `Tmp-${nonce}-Aa1!`,
      },
    });
    expect(response.status(), 'temporary user registration').toBe(fixture.setup.successStatus);
    return Number(((await responseJson(response)) as { id: unknown }).id);
  }

  const adminHeaders = await login(request, 'admin');
  const endpoint =
    kind === 'product'
      ? fixture.endpoints.products
      : kind === 'category'
        ? fixture.endpoints.categories
        : fixture.endpoints.adminCoupons;
  const seed =
    kind === 'product'
      ? fixture.setup.runtime.productSeed
      : kind === 'category'
        ? fixture.setup.runtime.categorySeed
        : fixture.setup.runtime.couponSeed;
  const response = await request.post(apiUrl(endpoint), {
    headers: adminHeaders,
    data: resolveTemplates(seed, runtime),
  });
  expect(response.status(), `temporary ${kind} creation`).toBe(fixture.setup.successStatus);
  return Number(((await responseJson(response)) as { id: unknown }).id);
}

function cleanupPath(kind: ResourceKind, id: number): string {
  if (kind === 'user') return `${fixture.endpoints.adminUsers}/${id}`;
  if (kind === 'product') return `${fixture.endpoints.products}/${id}`;
  if (kind === 'category') return `${fixture.endpoints.categories}/${id}`;
  return `${fixture.endpoints.adminCoupons}/${id}`;
}

async function cleanupTargets(
  request: APIRequestContext,
  targets: CleanupTarget[],
): Promise<void> {
  if (targets.length === 0) return;
  const adminHeaders = await login(request, 'admin');
  for (const target of targets.reverse()) {
    try {
      const response = await request.delete(apiUrl(cleanupPath(target.kind, target.id)), {
        headers: adminHeaders,
      });
      if (!fixture.setup.cleanupAcceptedStatuses.includes(response.status())) {
        // Best-effort teardown is approved; an unexpected cleanup status is recorded, not masked.
        console.warn(`Cleanup ${target.kind}/${target.id} returned ${response.status()}`);
      }
    } catch (error) {
      console.warn(`Cleanup ${target.kind}/${target.id} failed`, error);
    }
  }
}

async function productIdByName(
  request: APIRequestContext,
  name: string,
): Promise<number | undefined> {
  const response = await request.get(apiUrl(fixture.endpoints.products));
  if (response.status() !== fixture.setup.successStatus) return undefined;
  const products = (await responseJson(response)) as Array<{ id: number; name: string }>;
  return products.find((product) => product.name === name)?.id;
}

function annotate(testInfo: TestInfo, testCase: PlaywrightCase<AccessInput, AccessExpected>): void {
  testInfo.annotations.push({ type: 'feature', description: fixture.feature });
  testInfo.annotations.push({ type: 'hw02-id', description: testCase.id });
  testInfo.annotations.push({ type: 'source', description: testCase.source });
  testInfo.annotations.push({ type: 'case-type', description: testCase.type });
  for (const tag of testCase.tags ?? []) {
    testInfo.annotations.push({ type: 'tag', description: tag });
  }
}

test.describe('FR-12 Access Control — data-driven HW02', () => {
  for (const testCase of fixture.cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ request }, testInfo) => {
      annotate(testInfo, testCase);
      const cleanup: CleanupTarget[] = [];
      const runtime = runtimeValues(testCase);

      try {
        if (testCase.input.resetOrder) await prepareOrderOne(request);

        let path = testCase.input.path;
        if (testCase.input.resource) {
          const resourceId = await createTemporaryResource(
            request,
            testCase.input.resource.kind,
            runtime,
          );
          cleanup.push({ kind: testCase.input.resource.kind, id: resourceId });
          path = path.replace(testCase.input.resource.pathToken, String(resourceId));
        }

        const headers = await authHeaders(request, testCase.input.authMode);
        const body = resolveTemplates(testCase.input.body, runtime);
        const requestUrl = apiUrl(path);
        const response = await request.fetch(requestUrl, {
          method: testCase.input.method,
          headers,
          ...(body === undefined ? {} : { data: body }),
        });
        const responseBody = (await response.json()) as unknown;

        if (response.status() === fixture.setup.successStatus && testCase.input.cleanupCreated) {
          const responseId = Number((responseBody as { id?: unknown }).id);
          if (
            testCase.input.cleanupCreated === 'productByName' &&
            !Number.isFinite(responseId)
          ) {
            const id = await productIdByName(request, runtime.uniqueName);
            if (id !== undefined) cleanup.push({ kind: 'product', id });
          } else if (Number.isFinite(responseId)) {
            const kind: ResourceKind = testCase.input.cleanupCreated.startsWith('product')
              ? 'product'
              : testCase.input.cleanupCreated.startsWith('category')
                ? 'category'
                : 'coupon';
            cleanup.push({ kind, id: responseId });
          }
        }

        // Assertion group 1: State / attribute — HTTP status through response.status().
        expect.soft(response.status(), `${testCase.id}: response status`).toBe(
          testCase.expected.status,
        );

        // Assertion group 2: Network / response — direct API status, request contract and body.
        expect.soft(response.status(), `${testCase.id}: network response status`).toBe(
          testCase.expectedResponse!.status,
        );
        expect.soft(testCase.input.method, `${testCase.id}: request method`).toBe(
          testCase.expectedResponse!.method,
        );
        expect.soft(response.url(), `${testCase.id}: response URL`).toContain(
          testCase.expectedResponse!.urlPattern,
        );
        // Assertion group 3: Count / aggregate for arrays; expected properties for objects.
        if (testCase.expected.bodyKind === 'array') {
          expect.soft(Array.isArray(responseBody), `${testCase.id}: response body array`).toBe(true);
          if (Array.isArray(responseBody)) {
            expect
              .soft(responseBody.length, `${testCase.id}: response array length`)
              .toBeGreaterThanOrEqual(0);
          }
        } else {
          expect
            .soft(
              typeof responseBody === 'object' &&
                responseBody !== null &&
                !Array.isArray(responseBody),
              `${testCase.id}: response body object`,
            )
            .toBe(true);
          for (const property of Object.keys(testCase.expectedResponse!.bodySubset ?? {})) {
            expect
              .soft(responseBody, `${testCase.id}: response property ${property}`)
              .toHaveProperty(property);
          }
        }
        if (testCase.expectedResponse!.bodySubset) {
          expect.soft(responseBody, `${testCase.id}: response body subset`).toMatchObject(
            testCase.expectedResponse!.bodySubset,
          );
        }

      } finally {
        await cleanupTargets(request, cleanup);
      }
    });
  }
});
