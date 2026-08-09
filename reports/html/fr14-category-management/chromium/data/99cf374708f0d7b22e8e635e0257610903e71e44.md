# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-008 - Admin thêm danh mục với tên chỉ gồm khoảng trắng
- Location: tests/automation/specs/fr14-category-management.spec.ts:593:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 422]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category created|success|created/i
Received string:      "{\"message\":\"Category created\",\"id\":20}"
```

```
Error: Invalid category name "   " must not be created

expect(received).toBeFalsy()

Received: {"id": 20, "name": "   "}
```

# Test source

```ts
  364 |
  365 | async function assertApiCreateRejected(
  366 |   request: import('@playwright/test').APIRequestContext,
  367 |   testCase: Fr14Case,
  368 |   token?: string,
  369 | ) {
  370 |   const adminLogin = await loginAdminByApi(request);
  371 |   const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Unauthorized Create');
  372 |   const before = await fetchCategories(request);
  373 |   const { response, body, text } = await createCategoryByApi(request, categoryName, token);
  374 |   const after = await fetchCategories(request);
  375 |   const created = after.find((category) => category.name === categoryName);
  376 |
  377 |   await test.info().attach('category-create-api-response.json', {
  378 |     body: JSON.stringify({ status: response.status(), body, beforeCount: before.length, afterCount: after.length, created }, null, 2),
  379 |     contentType: 'application/json',
  380 |   });
  381 |
  382 |   try {
  383 |     expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
  384 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  385 |     expect.soft(created, `Category ${categoryName} must not be created`).toBeFalsy();
  386 |   } finally {
  387 |     if (created) {
  388 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  389 |     }
  390 |   }
  391 | }
  392 |
  393 | async function assertAdminCreateAccepted(
  394 |   page: import('@playwright/test').Page,
  395 |   request: import('@playwright/test').APIRequestContext,
  396 |   testCase: Fr14Case,
  397 | ) {
  398 |   const adminLogin = await loginAdminByApi(request);
  399 |   const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Valid Category');
  400 |   await cleanupCategoryByName(request, adminLogin.token, categoryName);
  401 |   const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  402 |   const after = await fetchCategories(request);
  403 |   const created = after.find((category) => category.name === categoryName);
  404 |
  405 |   await test.info().attach('admin-category-create-response.json', {
  406 |     body: JSON.stringify({ status: response.status(), body, created }, null, 2),
  407 |     contentType: 'application/json',
  408 |   });
  409 |
  410 |   try {
  411 |     expect.soft(testCase.expected.acceptedStatuses ?? [200, 201]).toContain(response.status());
  412 |     expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
  413 |     expect.soft(created, `Category ${categoryName} should be created`).toBeTruthy();
  414 |
  415 |     if (testCase.expected.verifyUi) {
  416 |       await loginAdminUi(page);
  417 |       await openCategoryManagement(page);
  418 |       await expect.soft(page.locator('body')).toContainText(categoryNamePattern(categoryName));
  419 |     }
  420 |   } finally {
  421 |     if (created) {
  422 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  423 |     } else {
  424 |       const id = categoryIdFromBody(body);
  425 |       if (id) {
  426 |         await deleteCategoryByApi(request, id, adminLogin.token);
  427 |       }
  428 |     }
  429 |   }
  430 | }
  431 |
  432 | async function assertAdminCreateRejected(
  433 |   request: import('@playwright/test').APIRequestContext,
  434 |   testCase: Fr14Case,
  435 | ) {
  436 |   const adminLogin = await loginAdminByApi(request);
  437 |   const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Invalid Category');
  438 |   const before = await fetchCategories(request);
  439 |   const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  440 |   const after = await fetchCategories(request);
  441 |   const createdByName = after.filter((category) => category.name === categoryName);
  442 |   const createdById = categoryIdFromBody(body);
  443 |   const created = createdById ? after.find((category) => category.id === createdById) : createdByName[0];
  444 |
  445 |   await test.info().attach('admin-category-create-invalid-response.json', {
  446 |     body: JSON.stringify(
  447 |       {
  448 |         status: response.status(),
  449 |         body,
  450 |         beforeCount: before.length,
  451 |         afterCount: after.length,
  452 |         created,
  453 |         submittedName: categoryName,
  454 |       },
  455 |       null,
  456 |       2,
  457 |     ),
  458 |     contentType: 'application/json',
  459 |   });
  460 |
  461 |   try {
  462 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
  463 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
> 464 |     expect.soft(created, `Invalid category name ${JSON.stringify(categoryName)} must not be created`).toBeFalsy();
      |                                                                                                       ^ Error: Invalid category name "   " must not be created
  465 |   } finally {
  466 |     if (created) {
  467 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  468 |     }
  469 |     await cleanupCategoryByName(request, adminLogin.token, categoryName);
  470 |   }
  471 | }
  472 |
  473 | async function assertAdminUpdateAccepted(
  474 |   page: import('@playwright/test').Page,
  475 |   request: import('@playwright/test').APIRequestContext,
  476 |   testCase: Fr14Case,
  477 | ) {
  478 |   const adminLogin = await loginAdminByApi(request);
  479 |   const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Update Source');
  480 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Updated Category');
  481 |   const create = await createCategoryByApi(request, originalName, adminLogin.token);
  482 |   const createdId = categoryIdFromBody(create.body);
  483 |   expect(createdId).toBeTruthy();
  484 |
  485 |   const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
  486 |   const after = await fetchCategories(request);
  487 |   const updated = after.find((category) => category.id === createdId && category.name === updatedName);
  488 |   const oldNameStillPresent = after.some((category) => category.id === createdId && category.name === originalName);
  489 |
  490 |   await test.info().attach('admin-category-update-response.json', {
  491 |     body: JSON.stringify({ status: response.status(), body, originalName, updatedName, updated, oldNameStillPresent }, null, 2),
  492 |     contentType: 'application/json',
  493 |   });
  494 |
  495 |   try {
  496 |     expect.soft(testCase.expected.acceptedStatuses ?? [200, 204]).toContain(response.status());
  497 |     expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
  498 |     expect.soft(updated, `Category ${createdId} should be renamed to ${updatedName}`).toBeTruthy();
  499 |     expect.soft(oldNameStillPresent).toBeFalsy();
  500 |
  501 |     if (testCase.expected.verifyUi) {
  502 |       await loginAdminUi(page);
  503 |       await openCategoryManagement(page);
  504 |       await expect.soft(page.locator('body')).toContainText(categoryNamePattern(updatedName));
  505 |     }
  506 |   } finally {
  507 |     await deleteCategoryByApi(request, createdId!, adminLogin.token);
  508 |     await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  509 |   }
  510 | }
  511 |
  512 | async function assertAdminUpdateRejected(
  513 |   request: import('@playwright/test').APIRequestContext,
  514 |   testCase: Fr14Case,
  515 | ) {
  516 |   const adminLogin = await loginAdminByApi(request);
  517 |   const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Cannot Empty');
  518 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Invalid Update');
  519 |   const create = await createCategoryByApi(request, originalName, adminLogin.token);
  520 |   const createdId = categoryIdFromBody(create.body);
  521 |   expect(createdId).toBeTruthy();
  522 |
  523 |   const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
  524 |   const after = await fetchCategories(request);
  525 |   const originalPreserved = after.some((category) => category.id === createdId && category.name === originalName);
  526 |   const invalidApplied = after.find((category) => category.id === createdId && category.name === updatedName);
  527 |
  528 |   await test.info().attach('admin-category-update-invalid-response.json', {
  529 |     body: JSON.stringify({ status: response.status(), body, originalName, updatedName, originalPreserved, invalidApplied }, null, 2),
  530 |     contentType: 'application/json',
  531 |   });
  532 |
  533 |   try {
  534 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
  535 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  536 |     if (testCase.expected.preserveOriginal) {
  537 |       expect.soft(originalPreserved, `Original category ${originalName} should be preserved`).toBeTruthy();
  538 |       expect.soft(invalidApplied, `Invalid update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
  539 |     }
  540 |   } finally {
  541 |     await deleteCategoryByApi(request, createdId!, adminLogin.token);
  542 |     await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  543 |   }
  544 | }
  545 |
  546 | async function assertAdminUpdateMissingRejected(
  547 |   request: import('@playwright/test').APIRequestContext,
  548 |   testCase: Fr14Case,
  549 | ) {
  550 |   const adminLogin = await loginAdminByApi(request);
  551 |   const missingId = testCase.missingCategoryId ?? 999999;
  552 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Missing Category');
  553 |   const before = await fetchCategories(request);
  554 |   const { response, body, text } = await updateCategoryByApi(request, missingId, updatedName, adminLogin.token);
  555 |   const after = await fetchCategories(request);
  556 |   const created = after.find((category) => category.name === updatedName || category.id === missingId);
  557 |
  558 |   await test.info().attach('admin-category-update-missing-response.json', {
  559 |     body: JSON.stringify(
  560 |       {
  561 |         status: response.status(),
  562 |         body,
  563 |         missingId,
  564 |         updatedName,
```