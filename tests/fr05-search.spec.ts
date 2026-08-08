import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  expect,
  test,
  type Locator,
  type Page,
  type Response,
  type TestInfo,
} from '@playwright/test';

type TestCaseSource = 'HW02' | 'Bổ sung';
type TestCaseType = 'positive' | 'negative' | 'edge';
type AutomationSurface = 'UI' | 'UI+network' | 'API';
type NetworkRole = 'none' | 'supporting' | 'diagnostic' | 'synchronization';
type CaseKind =
  | 'search-empty'
  | 'search-valid-result'
  | 'search-no-result'
  | 'search-special-characters'
  | 'search-whitespace'
  | 'search-xss'
  | 'search-sql-injection'
  | 'ui-grid'
  | 'ui-product-card'
  | 'ui-loading'
  | 'ui-h1'
  | 'ui-price-format';

type JsonObject = Record<string, unknown>;

interface ViewportFixture {
  width: number;
  height: number;
}

interface CaseInput extends JsonObject {
  path: string;
  keyword?: string;
  uiSynchronizationText?: string;
  desktopViewport?: ViewportFixture;
  narrowViewport?: ViewportFixture;
  sampleCardCount?: number;
  imageHostPattern?: string;
  productRoutePattern?: string;
  headingSelector?: string;
}

interface CaseExpected extends JsonObject {
  responseStatus?: number;
  maximumResponseStatusExclusive?: number;
  minimumProductCount?: number;
  productCount?: number;
  uiProductCount?: number;
  responseProductCount?: number;
  searchSummaryTemplate?: string;
  emptyStatePatterns?: string[];
  pricePattern?: string;
  imageSrcPattern?: string;
  imageAltPattern?: string;
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

interface Fr05Case extends PlaywrightCase<CaseInput, CaseExpected> {
  kind: CaseKind;
  surface: AutomationSurface;
  networkRole: NetworkRole;
}

interface SharedExpected {
  navigationStatus: number;
  rawSystemErrorPatterns: string[];
  settledUiAssertionTimeoutMs: number;
}

interface Fix2Backlog {
  loadingSynchronization: string;
  passScreenshotAttachment: string;
}

interface Fr05Fixture {
  feature: 'FR-05';
  webBaseURL: string;
  apiBaseURL: string;
  sharedExpected: SharedExpected;
  fix2Backlog: Fix2Backlog;
  surfaceMap: Record<string, AutomationSurface>;
  cases: Fr05Case[];
}

interface ProductDto {
  id: number;
  name: string;
  price: number;
}

interface GridObservation {
  display: string;
  flexWrap: string;
  distinctColumns: number;
}

const expectedKinds: CaseKind[] = [
  'search-empty',
  'search-valid-result',
  'search-no-result',
  'search-special-characters',
  'search-whitespace',
  'search-xss',
  'search-sql-injection',
  'ui-grid',
  'ui-product-card',
  'ui-loading',
  'ui-h1',
  'ui-price-format',
];

const networkSupportingIds = new Set([
  'TC-FR05-DT-001',
  'TC-FR05-DT-004',
  'TC-FR05-DT-006',
  'TC-FR05-DT-007',
  'TC-FR05-DT-009',
  'TC-FR05-DT-010',
]);

const productResponsePattern = /\/api\/products\?search=/;
const fixturePath = resolve(process.cwd(), 'data/fr05-search.json');
const fixtureValue: unknown = JSON.parse(readFileSync(fixturePath, 'utf8'));

function recordValue(value: unknown, label: string): JsonObject {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as JsonObject;
}

function stringValue(object: JsonObject, key: string, label: string): string {
  const value = object[key];
  if (typeof value !== 'string') throw new Error(`${label}.${key} must be a string`);
  return value;
}

function numberValue(object: JsonObject, key: string, label: string): number {
  const value = object[key];
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${label}.${key} must be a finite number`);
  }
  return value;
}

function booleanValue(object: JsonObject, key: string, label: string): boolean {
  const value = object[key];
  if (typeof value !== 'boolean') throw new Error(`${label}.${key} must be a boolean`);
  return value;
}

function stringArrayValue(object: JsonObject, key: string, label: string): string[] {
  const value = object[key];
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw new Error(`${label}.${key} must be a string array`);
  }
  return value;
}

function viewportValue(object: JsonObject, key: string, label: string): ViewportFixture {
  const value = recordValue(object[key], `${label}.${key}`);
  return {
    width: numberValue(value, 'width', `${label}.${key}`),
    height: numberValue(value, 'height', `${label}.${key}`),
  };
}

function validateRegexPattern(object: JsonObject, key: string, label: string): void {
  const pattern = stringValue(object, key, label);
  try {
    new RegExp(pattern);
  } catch (error) {
    throw new Error(`${label}.${key} is not a valid RegExp: ${String(error)}`);
  }
}

function validateCaseShape(testCase: JsonObject, index: number): void {
  const label = `FR-05 case ${index + 1}`;
  const input = recordValue(testCase.input, `${label}.input`);
  const expected = recordValue(testCase.expected, `${label}.expected`);
  const kind = stringValue(testCase, 'kind', label) as CaseKind;

  stringValue(input, 'path', `${label}.input`);

  if (kind.startsWith('search-')) stringValue(input, 'keyword', `${label}.input`);

  switch (kind) {
    case 'search-empty':
      numberValue(expected, 'responseStatus', `${label}.expected`);
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      booleanValue(expected, 'uiCountMatchesResponse', `${label}.expected`);
      booleanValue(expected, 'noRawSystemError', `${label}.expected`);
      break;
    case 'search-valid-result':
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      stringValue(expected, 'searchSummaryTemplate', `${label}.expected`);
      booleanValue(expected, 'productNamesContainKeyword', `${label}.expected`);
      booleanValue(expected, 'caseInsensitive', `${label}.expected`);
      break;
    case 'search-no-result':
      stringValue(expected, 'searchSummaryTemplate', `${label}.expected`);
      numberValue(expected, 'productCount', `${label}.expected`);
      stringArrayValue(expected, 'emptyStatePatterns', `${label}.expected`);
      break;
    case 'search-special-characters':
      numberValue(expected, 'maximumResponseStatusExclusive', `${label}.expected`);
      stringValue(expected, 'searchSummaryTemplate', `${label}.expected`);
      booleanValue(expected, 'inputValuePreserved', `${label}.expected`);
      numberValue(expected, 'productCount', `${label}.expected`);
      stringArrayValue(expected, 'emptyStatePatterns', `${label}.expected`);
      booleanValue(expected, 'requestUrlIsDiagnosticOnly', `${label}.expected`);
      break;
    case 'search-whitespace':
      stringValue(input, 'uiSynchronizationText', `${label}.input`);
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      booleanValue(expected, 'uiCountMatchesInitial', `${label}.expected`);
      booleanValue(expected, 'inputValuePreserved', `${label}.expected`);
      break;
    case 'search-xss':
      numberValue(expected, 'maximumResponseStatusExclusive', `${label}.expected`);
      numberValue(expected, 'dialogCount', `${label}.expected`);
      numberValue(expected, 'pageErrorCount', `${label}.expected`);
      numberValue(expected, 'injectedScriptCount', `${label}.expected`);
      booleanValue(expected, 'inputValuePreserved', `${label}.expected`);
      break;
    case 'search-sql-injection':
      numberValue(expected, 'maximumResponseStatusExclusive', `${label}.expected`);
      numberValue(expected, 'responseProductCount', `${label}.expected`);
      numberValue(expected, 'uiProductCount', `${label}.expected`);
      booleanValue(expected, 'mustNotMatchBaselineCount', `${label}.expected`);
      stringArrayValue(expected, 'emptyStatePatterns', `${label}.expected`);
      break;
    case 'ui-grid':
      viewportValue(input, 'desktopViewport', `${label}.input`);
      viewportValue(input, 'narrowViewport', `${label}.input`);
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      numberValue(expected, 'minimumDesktopColumns', `${label}.expected`);
      booleanValue(expected, 'narrowColumnsLessThanDesktop', `${label}.expected`);
      stringArrayValue(expected, 'allowedContainerDisplays', `${label}.expected`);
      stringValue(expected, 'requiredFlexWrapWhenFlex', `${label}.expected`);
      break;
    case 'ui-product-card':
      numberValue(input, 'sampleCardCount', `${label}.input`);
      stringValue(input, 'imageHostPattern', `${label}.input`);
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      numberValue(expected, 'imageCountPerCard', `${label}.expected`);
      validateRegexPattern(expected, 'imageSrcPattern', `${label}.expected`);
      validateRegexPattern(expected, 'imageAltPattern', `${label}.expected`);
      numberValue(expected, 'minimumImageWidth', `${label}.expected`);
      numberValue(expected, 'minimumImageHeight', `${label}.expected`);
      stringArrayValue(expected, 'allowedObjectFit', `${label}.expected`);
      validateRegexPattern(expected, 'pricePattern', `${label}.expected`);
      booleanValue(expected, 'networkImageIsDiagnosticOnly', `${label}.expected`);
      break;
    case 'ui-loading':
      stringValue(input, 'productRoutePattern', `${label}.input`);
      numberValue(expected, 'responseStatus', `${label}.expected`);
      stringArrayValue(expected, 'loadingTextPatterns', `${label}.expected`);
      stringArrayValue(expected, 'loadingCssPatterns', `${label}.expected`);
      numberValue(expected, 'productCountWhilePending', `${label}.expected`);
      booleanValue(expected, 'productsVisibleAfterResponse', `${label}.expected`);
      booleanValue(expected, 'loadingHiddenAfterResponse', `${label}.expected`);
      stringValue(expected, 'synchronizationStatus', `${label}.expected`);
      break;
    case 'ui-h1':
      stringValue(input, 'headingSelector', `${label}.input`);
      numberValue(expected, 'headingCount', `${label}.expected`);
      booleanValue(expected, 'headingTextNonEmpty', `${label}.expected`);
      break;
    case 'ui-price-format':
      numberValue(input, 'sampleCardCount', `${label}.input`);
      numberValue(expected, 'minimumProductCount', `${label}.expected`);
      validateRegexPattern(expected, 'pricePattern', `${label}.expected`);
      break;
  }
}

function validateFixture(value: unknown): asserts value is Fr05Fixture {
  const root = recordValue(value, 'FR-05 fixture');
  if (root.feature !== 'FR-05') throw new Error('FR-05 fixture feature is invalid');
  stringValue(root, 'webBaseURL', 'FR-05 fixture');
  stringValue(root, 'apiBaseURL', 'FR-05 fixture');

  const sharedExpected = recordValue(root.sharedExpected, 'FR-05 sharedExpected');
  numberValue(sharedExpected, 'navigationStatus', 'FR-05 sharedExpected');
  stringArrayValue(sharedExpected, 'rawSystemErrorPatterns', 'FR-05 sharedExpected');
  numberValue(sharedExpected, 'settledUiAssertionTimeoutMs', 'FR-05 sharedExpected');

  const fix2Backlog = recordValue(root.fix2Backlog, 'FR-05 fix2Backlog');
  stringValue(fix2Backlog, 'loadingSynchronization', 'FR-05 fix2Backlog');
  stringValue(fix2Backlog, 'passScreenshotAttachment', 'FR-05 fix2Backlog');

  const surfaceMap = recordValue(root.surfaceMap, 'FR-05 surfaceMap');
  const caseValues = root.cases;
  if (!Array.isArray(caseValues) || caseValues.length !== 12) {
    throw new Error('FR-05 fixture must contain exactly 12 cases');
  }
  if (Object.keys(surfaceMap).length !== 12) {
    throw new Error('FR-05 surfaceMap must contain exactly 12 IDs');
  }

  const seenIds = new Set<string>();
  for (const [index, rawCase] of caseValues.entries()) {
    const testCase = recordValue(rawCase, `FR-05 case ${index + 1}`);
    const expectedId = `TC-FR05-DT-${String(index + 1).padStart(3, '0')}`;
    const id = stringValue(testCase, 'id', `FR-05 case ${index + 1}`);
    if (id !== expectedId || seenIds.has(id)) {
      throw new Error(`Invalid or duplicate traceability ID: ${id}`);
    }
    seenIds.add(id);

    if (stringValue(testCase, 'kind', `FR-05 case ${index + 1}`) !== expectedKinds[index]) {
      throw new Error(`${id}: kind does not match canonical order`);
    }
    if (testCase.source !== 'HW02') throw new Error(`${id}: source must remain HW02`);
    if (!['positive', 'negative', 'edge'].includes(String(testCase.type))) {
      throw new Error(`${id}: invalid case type`);
    }
    if (!Array.isArray(testCase.preconditions) || testCase.preconditions.length === 0) {
      throw new Error(`${id}: preconditions must be a non-empty array`);
    }
    stringValue(testCase, 'title', `FR-05 case ${index + 1}`);

    const expectedSurface: AutomationSurface = networkSupportingIds.has(id)
      ? 'UI+network'
      : 'UI';
    const mappedSurface = surfaceMap[id];
    if (testCase.surface !== expectedSurface || mappedSurface !== expectedSurface) {
      throw new Error(`${id}: surface must be ${expectedSurface}`);
    }
    if (testCase.surface === 'API') throw new Error(`${id}: API-only is not allowed`);
    if (expectedSurface === 'UI' && testCase.networkRole !== 'none') {
      throw new Error(`${id}: UI-only case must use networkRole=none`);
    }
    if (expectedSurface === 'UI+network' && testCase.networkRole === 'none') {
      throw new Error(`${id}: supporting network role is missing`);
    }
    if (testCase.skipReason) throw new Error(`${id}: unexpected skipReason`);

    validateCaseShape(testCase, index);
  }
}

validateFixture(fixtureValue);
const fixture = fixtureValue;
const webBaseURL = process.env.SUT_WEB_URL ?? fixture.webBaseURL;
const settledUiAssertionTimeoutMs = fixture.sharedExpected.settledUiAssertionTimeoutMs;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function phrasesPattern(phrases: string[]): RegExp {
  return new RegExp(phrases.map(escapeRegExp).join('|'), 'i');
}

function fixturePattern(testCase: Fr05Case, key: string): RegExp {
  return new RegExp(stringValue(testCase.expected, key, `${testCase.id}.expected`));
}

function inputString(testCase: Fr05Case, key: string): string {
  return stringValue(testCase.input, key, `${testCase.id}.input`);
}

function inputNumber(testCase: Fr05Case, key: string): number {
  return numberValue(testCase.input, key, `${testCase.id}.input`);
}

function expectedString(testCase: Fr05Case, key: string): string {
  return stringValue(testCase.expected, key, `${testCase.id}.expected`);
}

function expectedNumber(testCase: Fr05Case, key: string): number {
  return numberValue(testCase.expected, key, `${testCase.id}.expected`);
}

function expectedBoolean(testCase: Fr05Case, key: string): boolean {
  return booleanValue(testCase.expected, key, `${testCase.id}.expected`);
}

function expectedStrings(testCase: Fr05Case, key: string): string[] {
  return stringArrayValue(testCase.expected, key, `${testCase.id}.expected`);
}

function annotate(testInfo: TestInfo, testCase: Fr05Case): void {
  testInfo.annotations.push(
    { type: 'case-type', description: testCase.type },
    { type: 'source', description: testCase.source },
    { type: 'automation-surface', description: testCase.surface },
    { type: 'ui-oracle', description: 'primary' },
    { type: 'network-role', description: testCase.networkRole },
  );
}

function pageURL(testCase: Fr05Case): string {
  return new URL(inputString(testCase, 'path'), webBaseURL).toString();
}

function productHeadings(page: Page): Locator {
  return page.getByRole('heading', { level: 2 });
}

function searchTextbox(page: Page): Locator {
  return page.getByRole('textbox', { name: 'Tìm kiếm...' });
}

async function openHome(page: Page, testCase: Fr05Case): Promise<void> {
  const navigation = await page.goto(pageURL(testCase), { waitUntil: 'networkidle' });
  expect(navigation?.status(), 'frontend navigation status').toBe(
    fixture.sharedExpected.navigationStatus,
  );
  await expect(page.getByRole('main')).toBeVisible();
  await expect(searchTextbox(page)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tìm' })).toBeVisible();
}

async function submitSearchUI(page: Page, testCase: Fr05Case): Promise<void> {
  await searchTextbox(page).fill(inputString(testCase, 'keyword'));
  await searchTextbox(page).press('Enter');
}

async function submitSearchWithNetwork(page: Page, testCase: Fr05Case): Promise<Response> {
  await searchTextbox(page).fill(inputString(testCase, 'keyword'));
  const [response] = await Promise.all([
    page.waitForResponse(
      (candidate) =>
        candidate.request().method() === 'GET' &&
        productResponsePattern.test(candidate.url()),
    ),
    searchTextbox(page).press('Enter'),
  ]);
  return response;
}

async function productsFrom(response: Response): Promise<ProductDto[]> {
  const value: unknown = await response.json();
  if (!Array.isArray(value)) throw new Error(`Expected product array from ${response.url()}`);
  return value.map((entry, index) => {
    const product = recordValue(entry, `Product ${index}`);
    return {
      id: numberValue(product, 'id', `Product ${index}`),
      name: stringValue(product, 'name', `Product ${index}`),
      price: numberValue(product, 'price', `Product ${index}`),
    };
  });
}

function searchSummary(testCase: Fr05Case): string {
  return expectedString(testCase, 'searchSummaryTemplate').replace(
    '{keyword}',
    inputString(testCase, 'keyword'),
  );
}

async function expectNoRawSystemError(page: Page): Promise<void> {
  const pattern = phrasesPattern(fixture.sharedExpected.rawSystemErrorPatterns);
  await expect
    .soft(page.getByRole('main'))
    .not.toContainText(pattern, { timeout: settledUiAssertionTimeoutMs });
}

async function expectEmptyState(page: Page, testCase: Fr05Case): Promise<void> {
  await expect
    .soft(productHeadings(page))
    .toHaveCount(expectedNumber(testCase, 'productCount'), {
      timeout: settledUiAssertionTimeoutMs,
    });
  await expect
    .soft(page.getByText(phrasesPattern(expectedStrings(testCase, 'emptyStatePatterns'))).first())
    .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
}

async function observeGrid(page: Page): Promise<GridObservation> {
  return productHeadings(page).evaluateAll((headings) => {
    const cards = headings
      .map((heading) => heading.parentElement)
      .filter((card): card is HTMLElement => card instanceof HTMLElement);
    const container = cards[0]?.parentElement;
    if (!(container instanceof HTMLElement)) {
      throw new Error('Product grid container is not observable from heading ancestors');
    }
    const style = getComputedStyle(container);
    return {
      display: style.display,
      flexWrap: style.flexWrap,
      distinctColumns: new Set(
        cards.map((card) => Math.round(card.getBoundingClientRect().x)),
      ).size,
    };
  });
}

async function runCase(page: Page, testInfo: TestInfo, testCase: Fr05Case): Promise<void> {
  annotate(testInfo, testCase);

  switch (testCase.kind) {
    case 'search-empty': {
      await openHome(page, testCase);
      const response = await submitSearchWithNetwork(page, testCase);
      expect(response.status()).toBe(expectedNumber(testCase, 'responseStatus'));
      const products = await productsFrom(response);
      expect(products.length).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      if (expectedBoolean(testCase, 'uiCountMatchesResponse')) {
        await expect(productHeadings(page)).toHaveCount(products.length);
      }
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-valid-result': {
      await openHome(page, testCase);
      await submitSearchUI(page, testCase);
      await expect(page.getByText(searchSummary(testCase))).toBeVisible();
      const headings = productHeadings(page);
      expect(await headings.count()).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      const keyword = inputString(testCase, 'keyword');
      const visibleNames = await headings.allTextContents();
      if (expectedBoolean(testCase, 'productNamesContainKeyword')) {
        for (const name of visibleNames) {
          const actual = expectedBoolean(testCase, 'caseInsensitive')
            ? name.toLocaleLowerCase('vi-VN')
            : name;
          const expectedKeyword = expectedBoolean(testCase, 'caseInsensitive')
            ? keyword.toLocaleLowerCase('vi-VN')
            : keyword;
          expect(actual).toContain(expectedKeyword);
        }
      }
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-no-result': {
      await openHome(page, testCase);
      await submitSearchUI(page, testCase);
      await expect(page.getByText(searchSummary(testCase))).toBeVisible();
      await expectEmptyState(page, testCase);
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-special-characters': {
      await openHome(page, testCase);
      const response = await submitSearchWithNetwork(page, testCase);
      if (expectedBoolean(testCase, 'requestUrlIsDiagnosticOnly')) {
        testInfo.annotations.push({
          type: 'request-url-diagnostic',
          description: response.url(),
        });
      }
      expect(response.status()).toBeLessThan(
        expectedNumber(testCase, 'maximumResponseStatusExclusive'),
      );
      if (expectedBoolean(testCase, 'inputValuePreserved')) {
        await expect(searchTextbox(page)).toHaveValue(inputString(testCase, 'keyword'));
      }
      await expect(page.getByText(searchSummary(testCase))).toBeVisible();
      await expectEmptyState(page, testCase);
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-whitespace': {
      await openHome(page, testCase);
      const initialCount = await productHeadings(page).count();
      await submitSearchUI(page, testCase);
      await page.getByText(inputString(testCase, 'uiSynchronizationText')).waitFor({
        state: 'visible',
      });
      expect(initialCount).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      if (expectedBoolean(testCase, 'uiCountMatchesInitial')) {
        await expect(productHeadings(page)).toHaveCount(initialCount);
      }
      if (expectedBoolean(testCase, 'inputValuePreserved')) {
        await expect(searchTextbox(page)).toHaveValue(inputString(testCase, 'keyword'));
      }
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-xss': {
      const dialogs: string[] = [];
      const pageErrors: string[] = [];
      page.on('dialog', async (dialog) => {
        dialogs.push(dialog.message());
        await dialog.dismiss();
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));
      await openHome(page, testCase);
      const response = await submitSearchWithNetwork(page, testCase);
      expect.soft(response.status()).toBeLessThan(
        expectedNumber(testCase, 'maximumResponseStatusExclusive'),
      );
      expect.soft(dialogs).toHaveLength(expectedNumber(testCase, 'dialogCount'));
      expect.soft(pageErrors).toHaveLength(expectedNumber(testCase, 'pageErrorCount'));
      if (expectedBoolean(testCase, 'inputValuePreserved')) {
        await expect.soft(searchTextbox(page)).toHaveValue(inputString(testCase, 'keyword'));
      }
      // CSS is required for security DOM structure: injected script nodes are
      // intentionally not discoverable through an accessible role.
      await expect
        .soft(page.locator('script').filter({ hasText: inputString(testCase, 'keyword') }))
        .toHaveCount(expectedNumber(testCase, 'injectedScriptCount'));
      await expectNoRawSystemError(page);
      break;
    }
    case 'search-sql-injection': {
      await openHome(page, testCase);
      const baselineCount = await productHeadings(page).count();
      const response = await submitSearchWithNetwork(page, testCase);
      expect.soft(response.status()).toBeLessThan(
        expectedNumber(testCase, 'maximumResponseStatusExclusive'),
      );
      const responseProducts = await productsFrom(response);
      expect.soft(responseProducts).toHaveLength(
        expectedNumber(testCase, 'responseProductCount'),
      );
      if (expectedBoolean(testCase, 'mustNotMatchBaselineCount')) {
        expect.soft(responseProducts.length).not.toBe(baselineCount);
      }
      await expect
        .soft(productHeadings(page))
        .toHaveCount(expectedNumber(testCase, 'uiProductCount'), {
          timeout: settledUiAssertionTimeoutMs,
        });
      await expect
        .soft(page.getByText(phrasesPattern(expectedStrings(testCase, 'emptyStatePatterns'))).first())
        .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
      await expectNoRawSystemError(page);
      break;
    }
    case 'ui-grid': {
      await page.setViewportSize(viewportValue(testCase.input, 'desktopViewport', testCase.id));
      await openHome(page, testCase);
      await expect(productHeadings(page).first()).toBeVisible();
      expect(await productHeadings(page).count()).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      const desktop = await observeGrid(page);
      expect(expectedStrings(testCase, 'allowedContainerDisplays')).toContain(desktop.display);
      if (desktop.display === 'flex') {
        expect(desktop.flexWrap).toBe(expectedString(testCase, 'requiredFlexWrapWhenFlex'));
      }
      expect(desktop.distinctColumns).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumDesktopColumns'),
      );
      await page.setViewportSize(viewportValue(testCase.input, 'narrowViewport', testCase.id));
      const narrow = await observeGrid(page);
      if (expectedBoolean(testCase, 'narrowColumnsLessThanDesktop')) {
        expect(narrow.distinctColumns).toBeLessThan(desktop.distinctColumns);
      }
      break;
    }
    case 'ui-product-card': {
      const imageDiagnostics: string[] = [];
      const imageHost = inputString(testCase, 'imageHostPattern');
      page.on('response', (response) => {
        if (response.url().includes(imageHost)) {
          imageDiagnostics.push(`response:${response.status()}:${response.url()}`);
        }
      });
      page.on('requestfailed', (request) => {
        if (request.url().includes(imageHost)) {
          imageDiagnostics.push(`requestfailed:${request.failure()?.errorText ?? 'unknown'}`);
        }
      });
      await openHome(page, testCase);
      const headings = productHeadings(page);
      expect(await headings.count()).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      const sampleCount = inputNumber(testCase, 'sampleCardCount');
      for (let index = 0; index < sampleCount; index += 1) {
        const heading = headings.nth(index);
        // CSS/DOM ancestor fallback: the SUT exposes no article/listitem/test id
        // for a product card, so the card is scoped from its role=heading child.
        const card = heading.locator('..');
        // CSS is required for img DOM structure because alt="" removes the image
        // from the accessibility tree and getByRole('img') cannot observe the defect.
        const image = card.locator('img');
        await expect.soft(heading).not.toHaveText('');
        await expect.soft(image).toHaveCount(expectedNumber(testCase, 'imageCountPerCard'));
        await expect.soft(image).toHaveAttribute('src', fixturePattern(testCase, 'imageSrcPattern'));
        await expect
          .soft(image)
          .toHaveAttribute('alt', fixturePattern(testCase, 'imageAltPattern'), {
            timeout: settledUiAssertionTimeoutMs,
          });
        const imageLayout = await image.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            objectFit: getComputedStyle(element).objectFit,
          };
        });
        expect.soft(imageLayout.width).toBeGreaterThanOrEqual(
          expectedNumber(testCase, 'minimumImageWidth'),
        );
        expect.soft(imageLayout.height).toBeGreaterThanOrEqual(
          expectedNumber(testCase, 'minimumImageHeight'),
        );
        expect(expectedStrings(testCase, 'allowedObjectFit')).toContain(imageLayout.objectFit);
        await expect
          .soft(card.getByText(fixturePattern(testCase, 'pricePattern'), { exact: true }))
          .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
      }
      if (expectedBoolean(testCase, 'networkImageIsDiagnosticOnly')) {
        testInfo.annotations.push({
          type: 'image-network-diagnostic',
          description: imageDiagnostics.join(' | ') || 'No image response observed; UI oracle retained',
        });
      }
      break;
    }
    case 'ui-loading': {
      // Fix 1 keeps provisional request holding only. The user explicitly moved
      // complete loading synchronization and pass screenshots to Fix 2.
      let markIntercepted: (() => void) | undefined;
      let releaseRequests: (() => void) | undefined;
      const intercepted = new Promise<void>((resolve) => {
        markIntercepted = resolve;
      });
      const released = new Promise<void>((resolve) => {
        releaseRequests = resolve;
      });
      await page.route(inputString(testCase, 'productRoutePattern'), async (route) => {
        markIntercepted?.();
        await released;
        await route.continue();
      });
      const navigation = await page.goto(pageURL(testCase), { waitUntil: 'domcontentloaded' });
      expect(navigation?.status()).toBe(fixture.sharedExpected.navigationStatus);
      await intercepted;

      const semanticLoading = page
        .getByRole('status')
        .or(page.getByText(phrasesPattern(expectedStrings(testCase, 'loadingTextPatterns'))));
      // CSS is limited to approved loading DOM structures that may have no role.
      const visualLoading = page.locator(expectedStrings(testCase, 'loadingCssPatterns').join(', '));
      const loadingIndicator = semanticLoading.or(visualLoading).first();
      await expect
        .soft(loadingIndicator)
        .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
      await expect
        .soft(productHeadings(page))
        .toHaveCount(expectedNumber(testCase, 'productCountWhilePending'));

      const responsePromise = page.waitForResponse(
        (response) => productResponsePattern.test(response.url()),
      );
      releaseRequests?.();
      const response = await responsePromise;
      expect(response.status()).toBe(expectedNumber(testCase, 'responseStatus'));
      if (expectedBoolean(testCase, 'productsVisibleAfterResponse')) {
        await expect(productHeadings(page).first()).toBeVisible();
      }
      if (expectedBoolean(testCase, 'loadingHiddenAfterResponse')) {
        await expect(loadingIndicator).toBeHidden();
      }
      testInfo.annotations.push({
        type: 'fix2-backlog',
        description: fixture.fix2Backlog.loadingSynchronization,
      });
      break;
    }
    case 'ui-h1': {
      await openHome(page, testCase);
      await expect(productHeadings(page).first()).toBeVisible();
      // CSS is intentional: this case asserts exact h1 DOM structure/count.
      const topHeadings = page.locator(inputString(testCase, 'headingSelector'));
      await expect(topHeadings).toHaveCount(expectedNumber(testCase, 'headingCount'), {
        timeout: settledUiAssertionTimeoutMs,
      });
      if (expectedBoolean(testCase, 'headingTextNonEmpty')) {
        await expect(topHeadings.first()).not.toHaveText('');
      }
      break;
    }
    case 'ui-price-format': {
      await openHome(page, testCase);
      const headings = productHeadings(page);
      expect(await headings.count()).toBeGreaterThanOrEqual(
        expectedNumber(testCase, 'minimumProductCount'),
      );
      const sampleCount = inputNumber(testCase, 'sampleCardCount');
      for (let index = 0; index < sampleCount; index += 1) {
        // DOM ancestor fallback is required because cards expose no semantic role.
        const card = headings.nth(index).locator('..');
        await expect
          .soft(card.getByText(fixturePattern(testCase, 'pricePattern'), { exact: true }))
          .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
      }
      break;
    }
  }
}

test.describe('FR-05 — Xem danh sách và tìm kiếm sản phẩm — Fix 1', () => {
  for (const testCase of fixture.cases) {
    test(`${testCase.id} — ${testCase.title}`, async ({ page }, testInfo) => {
      await runCase(page, testInfo, testCase);
    });
  }
});
