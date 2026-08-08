import {
  expect,
  test,
  type Locator,
  type Page,
  type Response,
  type TestInfo,
} from '@playwright/test';

type TestCaseType = 'positive' | 'negative' | 'edge';

interface InlineCaseMeta {
  id: `TC-FR05-DT-${string}`;
  title: string;
  type: TestCaseType;
  source: 'HW02';
}

interface ProductDto {
  id: number;
  name: string;
  price: number;
}

interface SearchCaseData extends InlineCaseMeta {
  keyword: string;
}

interface GridObservation {
  display: string;
  flexWrap: string;
  distinctColumns: number;
}

const webBaseURL = process.env.SUT_WEB_URL ?? 'http://localhost:5173';
const productResponsePattern = /\/api\/products\?search=/;
const emptyStatePattern = /không tìm thấy sản phẩm|không có sản phẩm|no products/i;
const rawSystemErrorPattern =
  /database error|sqlite_error|sql syntax|internal server error|stack trace/i;
const settledUiAssertionTimeoutMs = 1_000;

// The user approved inline case data for this Phase C bootstrap version.
const cases = {
  empty: {
    id: 'TC-FR05-DT-001',
    title: 'Tìm kiếm với từ khóa rỗng',
    type: 'edge',
    source: 'HW02',
    keyword: '',
  },
  validResult: {
    id: 'TC-FR05-DT-002',
    title: 'Tìm kiếm từ khóa hợp lệ có kết quả',
    type: 'positive',
    source: 'HW02',
    keyword: 'Iphone',
  },
  noResult: {
    id: 'TC-FR05-DT-003',
    title: 'Tìm kiếm từ khóa không có kết quả',
    type: 'negative',
    source: 'HW02',
    keyword: 'xyznoexist123',
  },
  specialCharacters: {
    id: 'TC-FR05-DT-004',
    title: 'Tìm kiếm từ khóa có ký tự đặc biệt',
    type: 'edge',
    source: 'HW02',
    keyword: 'Áo @#$%',
  },
  whitespaceOnly: {
    id: 'TC-FR05-DT-005',
    title: 'Tìm kiếm chỉ khoảng trắng',
    type: 'edge',
    source: 'HW02',
    keyword: '   ',
  },
  xss: {
    id: 'TC-FR05-DT-006',
    title: 'Tìm kiếm với XSS Payload',
    type: 'negative',
    source: 'HW02',
    keyword: "<script>alert('XSS')</script>",
  },
  sqlInjection: {
    id: 'TC-FR05-DT-007',
    title: 'Tìm kiếm với SQL Injection Payload',
    type: 'negative',
    source: 'HW02',
    keyword: "' OR '1'='1' --",
  },
  grid: {
    id: 'TC-FR05-DT-008',
    title: 'UI-1: Danh sách sản phẩm hiển thị dạng grid',
    type: 'positive',
    source: 'HW02',
  },
  cardContent: {
    id: 'TC-FR05-DT-009',
    title: 'UI-2: Card sản phẩm hiển thị đầy đủ Ảnh + Tên + Giá',
    type: 'positive',
    source: 'HW02',
  },
  loading: {
    id: 'TC-FR05-DT-010',
    title: 'UI-4: Trạng thái loading khi đang tải dữ liệu',
    type: 'positive',
    source: 'HW02',
  },
  h1: {
    id: 'TC-FR05-DT-011',
    title: 'UI-6: Trang chủ có đúng 1 thẻ h1',
    type: 'positive',
    source: 'HW02',
  },
  priceFormat: {
    id: 'TC-FR05-DT-012',
    title: 'UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn',
    type: 'positive',
    source: 'HW02',
  },
} as const satisfies Record<string, InlineCaseMeta | SearchCaseData>;

function annotate(testInfo: TestInfo, meta: InlineCaseMeta): void {
  testInfo.annotations.push(
    { type: 'case-type', description: meta.type },
    { type: 'source', description: meta.source },
    { type: 'automation-surface', description: meta.id >= 'TC-FR05-DT-008' && meta.id !== 'TC-FR05-DT-009' && meta.id !== 'TC-FR05-DT-010' ? 'UI' : 'UI+network' },
  );
}

function productHeadings(page: Page): Locator {
  return page.getByRole('heading', { level: 2 });
}

function searchTextbox(page: Page): Locator {
  return page.getByRole('textbox', { name: 'Tìm kiếm...' });
}

async function openHome(page: Page): Promise<void> {
  const navigation = await page.goto(webBaseURL, { waitUntil: 'networkidle' });
  expect(navigation?.status(), 'frontend navigation status').toBe(200);

  // Assertion group: DOM / visible text.
  await expect(page.getByRole('main')).toBeVisible();
  await expect(searchTextbox(page)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tìm' })).toBeVisible();
}

async function submitSearch(page: Page, keyword: string): Promise<Response> {
  const textbox = searchTextbox(page);
  await textbox.fill(keyword);

  const [response] = await Promise.all([
    page.waitForResponse(
      (candidate) =>
        candidate.request().method() === 'GET' &&
        productResponsePattern.test(candidate.url()),
    ),
    textbox.press('Enter'),
  ]);

  return response;
}

async function productsFrom(response: Response): Promise<ProductDto[]> {
  const value: unknown = await response.json();
  if (!Array.isArray(value)) {
    throw new Error(`Expected product array from ${response.url()}`);
  }

  return value.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`Product ${index} is not an object`);
    }
    const candidate = entry as Partial<ProductDto>;
    if (
      typeof candidate.id !== 'number' ||
      typeof candidate.name !== 'string' ||
      typeof candidate.price !== 'number'
    ) {
      throw new Error(`Product ${index} has an invalid public shape`);
    }
    return { id: candidate.id, name: candidate.name, price: candidate.price };
  });
}

async function expectNoRawSystemError(page: Page): Promise<void> {
  // Assertion group: DOM / visible text.
  await expect
    .soft(page.locator('body'))
    .not.toContainText(rawSystemErrorPattern, { timeout: settledUiAssertionTimeoutMs });
  await expect.soft(page.getByRole('main')).toBeVisible();
}

async function expectEmptyState(page: Page): Promise<void> {
  // Assertion groups: Count / aggregate and DOM / visible text.
  await expect
    .soft(productHeadings(page))
    .toHaveCount(0, { timeout: settledUiAssertionTimeoutMs });
  await expect
    .soft(page.getByText(emptyStatePattern).first())
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

test.describe('FR-05 — Xem danh sách và tìm kiếm sản phẩm', () => {
  test(`${cases.empty.id} — ${cases.empty.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.empty);
    await openHome(page);
    const response = await submitSearch(page, cases.empty.keyword);

    // Assertion group: Network / response (supporting oracle).
    expect(response.status()).toBe(200);
    const products = await productsFrom(response);
    expect(products.length).toBeGreaterThan(0);

    // Assertion group: Count / aggregate (UI is primary).
    await expect(productHeadings(page)).toHaveCount(products.length);
    await expectNoRawSystemError(page);
  });

  test(`${cases.validResult.id} — ${cases.validResult.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.validResult);
    await openHome(page);
    const response = await submitSearch(page, cases.validResult.keyword);

    expect(response.status()).toBe(200);
    const products = await productsFrom(response);
    expect(products.length).toBeGreaterThan(0);

    await expect(
      page.getByText(`Kết quả tìm kiếm cho: ${cases.validResult.keyword}`),
    ).toBeVisible();
    await expect(productHeadings(page)).toHaveCount(products.length);
    const visibleNames = await productHeadings(page).allTextContents();
    for (const name of visibleNames) {
      expect(name.toLocaleLowerCase('vi-VN')).toContain(
        cases.validResult.keyword.toLocaleLowerCase('vi-VN'),
      );
    }
    await expectNoRawSystemError(page);
  });

  test(`${cases.noResult.id} — ${cases.noResult.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.noResult);
    await openHome(page);
    const response = await submitSearch(page, cases.noResult.keyword);

    expect(response.status()).toBe(200);
    expect(await productsFrom(response)).toHaveLength(0);
    await expectEmptyState(page);
    await expectNoRawSystemError(page);
  });

  test(`${cases.specialCharacters.id} — ${cases.specialCharacters.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.specialCharacters);
    await openHome(page);
    const response = await submitSearch(page, cases.specialCharacters.keyword);
    testInfo.annotations.push({
      type: 'request-url-diagnostic',
      description: response.url(),
    });

    // Assertion group: State / attribute.
    await expect(searchTextbox(page)).toHaveValue(cases.specialCharacters.keyword);
    expect(response.status()).toBeLessThan(500);
    await expect(
      page.getByText(`Kết quả tìm kiếm cho: ${cases.specialCharacters.keyword}`),
    ).toBeVisible();
    await expectEmptyState(page);
    await expectNoRawSystemError(page);
  });

  test(`${cases.whitespaceOnly.id} — ${cases.whitespaceOnly.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.whitespaceOnly);
    await openHome(page);
    const response = await submitSearch(page, cases.whitespaceOnly.keyword);

    expect(response.status()).toBe(200);
    expect(new URL(response.url()).searchParams.get('search')).toBe('');
    const products = await productsFrom(response);
    expect(products.length).toBeGreaterThan(0);
    await expect(productHeadings(page)).toHaveCount(products.length);
    await expect(searchTextbox(page)).toHaveValue(cases.whitespaceOnly.keyword);
    await expectNoRawSystemError(page);
  });

  test(`${cases.xss.id} — ${cases.xss.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.xss);
    const dialogs: string[] = [];
    const pageErrors: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await openHome(page);
    const response = await submitSearch(page, cases.xss.keyword);

    // Assertion group: Network / response. A 500 is never accepted here.
    expect.soft(response.status()).toBeLessThan(500);
    expect.soft(dialogs, 'XSS must not execute an alert/dialog').toHaveLength(0);
    expect.soft(pageErrors, 'XSS must not trigger page errors').toHaveLength(0);

    // Assertion groups: State / attribute and DOM / visible text.
    await expect.soft(searchTextbox(page)).toHaveValue(cases.xss.keyword);
    await expect.soft(
      page.locator('script').filter({ hasText: cases.xss.keyword }),
    ).toHaveCount(0);
    await expectNoRawSystemError(page);
  });

  test(`${cases.sqlInjection.id} — ${cases.sqlInjection.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.sqlInjection);
    await openHome(page);
    const baselineCount = await productHeadings(page).count();
    expect(baselineCount).toBeGreaterThan(0);

    const response = await submitSearch(page, cases.sqlInjection.keyword);
    expect.soft(response.status()).toBeLessThan(500);
    const responseProducts = await productsFrom(response);

    // Assertion group: Network / response (supporting evidence).
    expect.soft(responseProducts).toHaveLength(0);
    expect.soft(responseProducts.length).not.toBe(baselineCount);

    // UI remains the primary oracle for safe empty search results.
    await expectEmptyState(page);
    await expectNoRawSystemError(page);
  });

  test(`${cases.grid.id} — ${cases.grid.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.grid);
    await page.setViewportSize({ width: 1440, height: 900 });
    await openHome(page);
    await expect(productHeadings(page).first()).toBeVisible();
    expect(await productHeadings(page).count()).toBeGreaterThanOrEqual(2);

    const desktop = await observeGrid(page);
    expect(
      desktop.display === 'grid' ||
        (desktop.display === 'flex' && desktop.flexWrap === 'wrap'),
    ).toBe(true);
    expect(desktop.distinctColumns).toBeGreaterThan(1);

    await page.setViewportSize({ width: 500, height: 900 });
    const narrow = await observeGrid(page);
    expect(narrow.distinctColumns).toBeLessThan(desktop.distinctColumns);
  });

  test(`${cases.cardContent.id} — ${cases.cardContent.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.cardContent);
    await openHome(page);
    const headings = productHeadings(page);
    expect(await headings.count()).toBeGreaterThanOrEqual(3);

    for (let index = 0; index < 3; index += 1) {
      const heading = headings.nth(index);
      // The SUT exposes no article/listitem/test id for a product card, so the
      // approved black-box fallback scopes the nearest card ancestor.
      const card = heading.locator('..');
      // An image with empty alt is intentionally absent from the accessibility
      // tree; CSS img is required to observe and fail the approved alt assertion.
      const image = card.locator('img');

      await expect.soft(heading).not.toHaveText('');
      await expect.soft(image).toHaveCount(1);
      await expect.soft(image).toHaveAttribute('src', /\S+/);
      await expect
        .soft(image)
        .toHaveAttribute('alt', /\S+/, { timeout: settledUiAssertionTimeoutMs });

      const imageLayout = await image.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          objectFit: getComputedStyle(element).objectFit,
        };
      });
      expect.soft(imageLayout.width).toBeGreaterThan(0);
      expect.soft(imageLayout.height).toBeGreaterThan(0);
      expect.soft(['contain', 'cover', 'fill', 'scale-down']).toContain(
        imageLayout.objectFit,
      );

      await expect.soft(
        card.getByText(/\d{1,3}(?:[.,]\d{3})+\s*₫/, { exact: true }),
      ).toBeVisible({ timeout: settledUiAssertionTimeoutMs });
    }
  });

  test(`${cases.loading.id} — ${cases.loading.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.loading);
    let markIntercepted: (() => void) | undefined;
    let releaseRequests: (() => void) | undefined;
    const intercepted = new Promise<void>((resolve) => {
      markIntercepted = resolve;
    });
    const released = new Promise<void>((resolve) => {
      releaseRequests = resolve;
    });

    await page.route('**/api/products**', async (route) => {
      markIntercepted?.();
      await released;
      await route.continue();
    });

    const navigation = await page.goto(webBaseURL, { waitUntil: 'domcontentloaded' });
    expect(navigation?.status()).toBe(200);
    await intercepted;

    // CSS fallback is necessary because the approved manual case allows visual
    // spinner/skeleton implementations that may not expose an accessible role.
    const semanticLoading = page
      .getByRole('status')
      .or(page.getByText(/loading|đang tải/i));
    const visualLoadingFallback = page.locator(
      '[aria-busy="true"], [class*="spinner"], [class*="skeleton"]',
    );
    const loadingIndicator = semanticLoading.or(visualLoadingFallback).first();

    await expect
      .soft(loadingIndicator)
      .toBeVisible({ timeout: settledUiAssertionTimeoutMs });
    await expect.soft(productHeadings(page)).toHaveCount(0);

    const responsePromise = page.waitForResponse(
      (response) => productResponsePattern.test(response.url()),
    );
    releaseRequests?.();
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    await expect(productHeadings(page).first()).toBeVisible();
    await expect(loadingIndicator).toBeHidden();
  });

  test(`${cases.h1.id} — ${cases.h1.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.h1);
    await openHome(page);
    await expect(productHeadings(page).first()).toBeVisible();

    const topHeadings = page.getByRole('heading', { level: 1 });
    await expect(topHeadings).toHaveCount(1, {
      timeout: settledUiAssertionTimeoutMs,
    });
    await expect(topHeadings.first()).not.toHaveText('');
  });

  test(`${cases.priceFormat.id} — ${cases.priceFormat.title}`, async ({ page }, testInfo) => {
    annotate(testInfo, cases.priceFormat);
    await openHome(page);
    const headings = productHeadings(page);
    expect(await headings.count()).toBeGreaterThanOrEqual(3);

    for (let index = 0; index < 3; index += 1) {
      const card = headings.nth(index).locator('..');
      await expect.soft(
        card.getByText(/\d{1,3}(?:[.,]\d{3})+\s*₫/, { exact: true }),
      ).toBeVisible({ timeout: settledUiAssertionTimeoutMs });
    }
  });
});
