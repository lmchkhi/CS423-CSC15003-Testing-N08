# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-005 - User thường không được thêm danh mục qua API
- Location: tests/automation/specs/fr14-category-management.spec.ts:823:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category created|success|created/i
Received string:      "{\"message\":\"Category created\",\"id\":47}"
```

```
Error: Category FR14 User Create 20260809T17372 2 must not be created

expect(received).toBeFalsy()

Received: {"id": 47, "name": "FR14 User Create 20260809T17372 2"}
```

# Test source

```ts
  356 |     await page.waitForLoadState('networkidle').catch(() => undefined);
  357 |     return;
  358 |   }
  359 |
  360 |   await expect(emailInput(page)).toBeVisible();
  361 | }
  362 |
  363 | async function loginAdminUi(page: import('@playwright/test').Page) {
  364 |   await attemptLoginUi(page, adminEmail, adminPassword);
  365 |   await expect(page.locator('body')).toContainText(/dashboard|admin|danh mục|category|sản phẩm|product|đăng xuất|logout/i);
  366 | }
  367 |
  368 | async function openCategoryManagement(page: import('@playwright/test').Page, allowGuard = false) {
  369 |   const candidateRoutes = ['/categories', '/category', '/category-management', '/admin/categories', '/dashboard/categories', '/dashboard', '/'];
  370 |
  371 |   for (const route of candidateRoutes) {
  372 |     await page.goto(adminUrl(route)).catch((error) => {
  373 |       if (!allowGuard) {
  374 |         throw error;
  375 |       }
  376 |     });
  377 |     await page.waitForLoadState('networkidle').catch(() => undefined);
  378 |     const bodyText = await page.locator('body').innerText();
  379 |     if (hasCategoryManagementContent(bodyText) && !/404|not found/i.test(bodyText)) {
  380 |       return;
  381 |     }
  382 |     if (allowGuard && hasAccessGuard(bodyText) && !(await page.getByRole('link', { name: /^danh mục$/i }).isVisible().catch(() => false))) {
  383 |       return;
  384 |     }
  385 |   }
  386 |
  387 |   await page.goto(adminUrl('/'));
  388 |   await page.waitForLoadState('networkidle').catch(() => undefined);
  389 |   const categoryLink = page
  390 |     .getByRole('link', { name: /^danh mục$|^category$|^categories$/i })
  391 |     .or(page.getByRole('button', { name: /^danh mục$|^category$|^categories$/i }))
  392 |     .or(page.getByText(/^danh mục$|^category$|^categories$/i))
  393 |     .first();
  394 |   if (allowGuard && !(await categoryLink.isVisible().catch(() => false))) {
  395 |     return;
  396 |   }
  397 |   await expect(categoryLink).toBeVisible();
  398 |   await categoryLink.click();
  399 |   await page.waitForLoadState('networkidle').catch(() => undefined);
  400 |   await expect(page.locator('body')).toContainText(/danh mục|category|categories|điện thoại|laptop|phụ kiện/i);
  401 | }
  402 |
  403 | async function assertAdminCategoryList(
  404 |   page: import('@playwright/test').Page,
  405 |   request: import('@playwright/test').APIRequestContext,
  406 |   testCase: Fr14Case,
  407 | ) {
  408 |   const adminLogin = await loginAdminByApi(request);
  409 |   const { categories, created } = await ensureMinCategories(request, adminLogin.token, testCase.categorySetup);
  410 |   try {
  411 |     await loginAdminUi(page);
  412 |     await openCategoryManagement(page);
  413 |     const body = page.locator('body');
  414 |     await expect.soft(body).toContainText(textPattern(testCase.expected.pagePattern));
  415 |     if (testCase.expected.forbiddenPattern) {
  416 |       await expect.soft(body).not.toContainText(textPattern(testCase.expected.forbiddenPattern));
  417 |     }
  418 |     expect.soft(categories.length).toBeGreaterThanOrEqual(testCase.expected.minCategoryCount ?? 1);
  419 |     for (const category of categories.slice(0, Math.min(categories.length, testCase.expected.minCategoryCount ?? 3))) {
  420 |       await expect.soft(body).toContainText(categoryNamePattern(category.name));
  421 |     }
  422 |   } finally {
  423 |     for (const category of created) {
  424 |       await deleteCategoryByApi(request, category.id, adminLogin.token);
  425 |     }
  426 |   }
  427 | }
  428 |
  429 | async function assertAdminScreenBlocked(page: import('@playwright/test').Page, testCase: Fr14Case) {
  430 |   await openCategoryManagement(page, true);
  431 |   const body = page.locator('body');
  432 |   await expect.soft(body).toContainText(textPattern(testCase.expected.guardPattern));
  433 |   await expect.soft(body).not.toContainText(textPattern(testCase.expected.bodyMustNotContainPattern));
  434 | }
  435 |
  436 | async function assertApiCreateRejected(
  437 |   request: import('@playwright/test').APIRequestContext,
  438 |   testCase: Fr14Case,
  439 |   token?: string,
  440 | ) {
  441 |   const adminLogin = await loginAdminByApi(request);
  442 |   const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Unauthorized Create');
  443 |   const before = await fetchCategories(request);
  444 |   const { response, body, text } = await createCategoryByApi(request, categoryName, token);
  445 |   const after = await fetchCategories(request);
  446 |   const created = after.find((category) => category.name === categoryName);
  447 |
  448 |   await test.info().attach('category-create-api-response.json', {
  449 |     body: JSON.stringify({ status: response.status(), body, beforeCount: before.length, afterCount: after.length, created }, null, 2),
  450 |     contentType: 'application/json',
  451 |   });
  452 |
  453 |   try {
  454 |     expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
  455 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
> 456 |     expect.soft(created, `Category ${categoryName} must not be created`).toBeFalsy();
      |                                                                          ^ Error: Category FR14 User Create 20260809T17372 2 must not be created
  457 |   } finally {
  458 |     if (created) {
  459 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  460 |     }
  461 |   }
  462 | }
  463 |
  464 | async function assertAdminCreateAccepted(
  465 |   page: import('@playwright/test').Page,
  466 |   request: import('@playwright/test').APIRequestContext,
  467 |   testCase: Fr14Case,
  468 | ) {
  469 |   const adminLogin = await loginAdminByApi(request);
  470 |   const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Valid Category');
  471 |   await cleanupCategoryByName(request, adminLogin.token, categoryName);
  472 |   const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  473 |   const after = await fetchCategories(request);
  474 |   const created = after.find((category) => category.name === categoryName);
  475 |
  476 |   await test.info().attach('admin-category-create-response.json', {
  477 |     body: JSON.stringify({ status: response.status(), body, created }, null, 2),
  478 |     contentType: 'application/json',
  479 |   });
  480 |
  481 |   try {
  482 |     expect.soft(testCase.expected.acceptedStatuses ?? [200, 201]).toContain(response.status());
  483 |     expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
  484 |     expect.soft(created, `Category ${categoryName} should be created`).toBeTruthy();
  485 |
  486 |     if (testCase.expected.verifyUi) {
  487 |       await loginAdminUi(page);
  488 |       await openCategoryManagement(page);
  489 |       await expect.soft(page.locator('body')).toContainText(categoryNamePattern(categoryName));
  490 |     }
  491 |   } finally {
  492 |     if (created) {
  493 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  494 |     } else {
  495 |       const id = categoryIdFromBody(body);
  496 |       if (id) {
  497 |         await deleteCategoryByApi(request, id, adminLogin.token);
  498 |       }
  499 |     }
  500 |   }
  501 | }
  502 |
  503 | async function assertAdminCreateRejected(
  504 |   request: import('@playwright/test').APIRequestContext,
  505 |   testCase: Fr14Case,
  506 | ) {
  507 |   const adminLogin = await loginAdminByApi(request);
  508 |   const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Invalid Category');
  509 |   const before = await fetchCategories(request);
  510 |   const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  511 |   const after = await fetchCategories(request);
  512 |   const createdByName = after.filter((category) => category.name === categoryName);
  513 |   const createdById = categoryIdFromBody(body);
  514 |   const created = createdById ? after.find((category) => category.id === createdById) : createdByName[0];
  515 |
  516 |   await test.info().attach('admin-category-create-invalid-response.json', {
  517 |     body: JSON.stringify(
  518 |       {
  519 |         status: response.status(),
  520 |         body,
  521 |         beforeCount: before.length,
  522 |         afterCount: after.length,
  523 |         created,
  524 |         submittedName: categoryName,
  525 |       },
  526 |       null,
  527 |       2,
  528 |     ),
  529 |     contentType: 'application/json',
  530 |   });
  531 |
  532 |   try {
  533 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
  534 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  535 |     expect.soft(created, `Invalid category name ${JSON.stringify(categoryName)} must not be created`).toBeFalsy();
  536 |   } finally {
  537 |     if (created) {
  538 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  539 |     }
  540 |     await cleanupCategoryByName(request, adminLogin.token, categoryName);
  541 |   }
  542 | }
  543 |
  544 | async function assertAdminUpdateAccepted(
  545 |   page: import('@playwright/test').Page,
  546 |   request: import('@playwright/test').APIRequestContext,
  547 |   testCase: Fr14Case,
  548 | ) {
  549 |   const adminLogin = await loginAdminByApi(request);
  550 |   const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Update Source');
  551 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Updated Category');
  552 |   const create = await createCategoryByApi(request, originalName, adminLogin.token);
  553 |   const createdId = categoryIdFromBody(create.body);
  554 |   expect(createdId).toBeTruthy();
  555 |
  556 |   const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
```