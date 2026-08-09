# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-005 - User thường không được thêm danh mục qua API
- Location: tests/automation/specs/fr14-category-management.spec.ts:346:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category created|success|created/i
Received string:      "{\"message\":\"Category created\",\"id\":6}"
```

```
Error: Category FR14 User Create 20260809T16523 2 must not be created

expect(received).toBeFalsy()

Received: {"id": 6, "name": "FR14 User Create 20260809T16523 2"}
```

# Test source

```ts
  232 |     }
  233 |     await emailInput(page).fill(email);
  234 |     await passwordInput(page).fill(password);
  235 |     await page.getByRole('button', { name: /đăng nhập|login|sign in|submit/i }).first().click();
  236 |     await page.waitForLoadState('networkidle').catch(() => undefined);
  237 |     return;
  238 |   }
  239 |
  240 |   await expect(emailInput(page)).toBeVisible();
  241 | }
  242 |
  243 | async function loginAdminUi(page: import('@playwright/test').Page) {
  244 |   await attemptLoginUi(page, adminEmail, adminPassword);
  245 |   await expect(page.locator('body')).toContainText(/dashboard|admin|danh mục|category|sản phẩm|product|đăng xuất|logout/i);
  246 | }
  247 |
  248 | async function openCategoryManagement(page: import('@playwright/test').Page, allowGuard = false) {
  249 |   const candidateRoutes = ['/categories', '/category', '/category-management', '/admin/categories', '/dashboard/categories', '/dashboard', '/'];
  250 |
  251 |   for (const route of candidateRoutes) {
  252 |     await page.goto(adminUrl(route));
  253 |     await page.waitForLoadState('networkidle').catch(() => undefined);
  254 |     const bodyText = await page.locator('body').innerText();
  255 |     if (hasCategoryManagementContent(bodyText) && !/404|not found/i.test(bodyText)) {
  256 |       return;
  257 |     }
  258 |     if (allowGuard && hasAccessGuard(bodyText) && !(await page.getByRole('link', { name: /^danh mục$/i }).isVisible().catch(() => false))) {
  259 |       return;
  260 |     }
  261 |   }
  262 |
  263 |   await page.goto(adminUrl('/'));
  264 |   await page.waitForLoadState('networkidle').catch(() => undefined);
  265 |   const categoryLink = page
  266 |     .getByRole('link', { name: /^danh mục$|^category$|^categories$/i })
  267 |     .or(page.getByRole('button', { name: /^danh mục$|^category$|^categories$/i }))
  268 |     .or(page.getByText(/^danh mục$|^category$|^categories$/i))
  269 |     .first();
  270 |   if (allowGuard && !(await categoryLink.isVisible().catch(() => false))) {
  271 |     return;
  272 |   }
  273 |   await expect(categoryLink).toBeVisible();
  274 |   await categoryLink.click();
  275 |   await page.waitForLoadState('networkidle').catch(() => undefined);
  276 |   await expect(page.locator('body')).toContainText(/danh mục|category|categories|điện thoại|laptop|phụ kiện/i);
  277 | }
  278 |
  279 | async function assertAdminCategoryList(
  280 |   page: import('@playwright/test').Page,
  281 |   request: import('@playwright/test').APIRequestContext,
  282 |   testCase: Fr14Case,
  283 | ) {
  284 |   const adminLogin = await loginAdminByApi(request);
  285 |   const { categories, created } = await ensureMinCategories(request, adminLogin.token, testCase.categorySetup);
  286 |   try {
  287 |     await loginAdminUi(page);
  288 |     await openCategoryManagement(page);
  289 |     const body = page.locator('body');
  290 |     await expect.soft(body).toContainText(textPattern(testCase.expected.pagePattern));
  291 |     if (testCase.expected.forbiddenPattern) {
  292 |       await expect.soft(body).not.toContainText(textPattern(testCase.expected.forbiddenPattern));
  293 |     }
  294 |     expect.soft(categories.length).toBeGreaterThanOrEqual(testCase.expected.minCategoryCount ?? 1);
  295 |     for (const category of categories.slice(0, Math.min(categories.length, testCase.expected.minCategoryCount ?? 3))) {
  296 |       await expect.soft(body).toContainText(categoryNamePattern(category.name));
  297 |     }
  298 |   } finally {
  299 |     for (const category of created) {
  300 |       await deleteCategoryByApi(request, category.id, adminLogin.token);
  301 |     }
  302 |   }
  303 | }
  304 |
  305 | async function assertAdminScreenBlocked(page: import('@playwright/test').Page, testCase: Fr14Case) {
  306 |   await openCategoryManagement(page, true);
  307 |   const body = page.locator('body');
  308 |   await expect.soft(body).toContainText(textPattern(testCase.expected.guardPattern));
  309 |   await expect.soft(body).not.toContainText(textPattern(testCase.expected.bodyMustNotContainPattern));
  310 | }
  311 |
  312 | async function assertApiCreateRejected(
  313 |   request: import('@playwright/test').APIRequestContext,
  314 |   testCase: Fr14Case,
  315 |   token?: string,
  316 | ) {
  317 |   const adminLogin = await loginAdminByApi(request);
  318 |   const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Unauthorized Create');
  319 |   const before = await fetchCategories(request);
  320 |   const { response, body, text } = await createCategoryByApi(request, categoryName, token);
  321 |   const after = await fetchCategories(request);
  322 |   const created = after.find((category) => category.name === categoryName);
  323 |
  324 |   await test.info().attach('category-create-api-response.json', {
  325 |     body: JSON.stringify({ status: response.status(), body, beforeCount: before.length, afterCount: after.length, created }, null, 2),
  326 |     contentType: 'application/json',
  327 |   });
  328 |
  329 |   try {
  330 |     expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
  331 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
> 332 |     expect.soft(created, `Category ${categoryName} must not be created`).toBeFalsy();
      |                                                                          ^ Error: Category FR14 User Create 20260809T16523 2 must not be created
  333 |   } finally {
  334 |     if (created) {
  335 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  336 |     }
  337 |   }
  338 | }
  339 |
  340 | test.describe(`Run by: ${studentId} | FR-14 - Quản lý danh mục`, () => {
  341 |   test.beforeAll(() => {
  342 |     expect(cases.length).toBeGreaterThanOrEqual(6);
  343 |   });
  344 |
  345 |   for (const testCase of cases) {
  346 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  347 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  348 |
  349 |       if (testCase.kind === 'adminCategoryListVisible' || testCase.kind === 'adminCategoryListMany') {
  350 |         await assertAdminCategoryList(page, request, testCase);
  351 |         return;
  352 |       }
  353 |
  354 |       if (testCase.kind === 'guestAdminScreenBlocked') {
  355 |         await assertAdminScreenBlocked(page, testCase);
  356 |         return;
  357 |       }
  358 |
  359 |       if (testCase.kind === 'userAdminScreenBlocked') {
  360 |         const user = await prepareGeneratedUser(request, testCase.id);
  361 |         await attemptLoginUi(page, user.email, user.password);
  362 |         await assertAdminScreenBlocked(page, testCase);
  363 |         return;
  364 |       }
  365 |
  366 |       if (testCase.kind === 'apiGuestCreateRejected') {
  367 |         await assertApiCreateRejected(request, testCase);
  368 |         return;
  369 |       }
  370 |
  371 |       if (testCase.kind === 'apiUserCreateRejected') {
  372 |         const user = await prepareGeneratedUser(request, testCase.id);
  373 |         await assertApiCreateRejected(request, testCase, user.token);
  374 |         return;
  375 |       }
  376 |
  377 |       throw new Error(`Unsupported FR-14 test kind: ${testCase.kind}`);
  378 |     });
  379 |   }
  380 | });
  381 |
```