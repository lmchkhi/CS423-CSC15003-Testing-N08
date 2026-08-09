# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-BVA-001 - Tên danh mục dài 0 ký tự (OFF- - min length)
- Location: tests/automation/specs/fr14-category-management.spec.ts:823:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 422]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category created|success|created/i
Received string:      "{\"message\":\"Category created\",\"id\":54}"
```

```
Error: Invalid category name "" must not be created

expect(received).toBeFalsy()

Received: {"id": 54, "name": ""}
```

# Test source

```ts
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
  456 |     expect.soft(created, `Category ${categoryName} must not be created`).toBeFalsy();
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
> 535 |     expect.soft(created, `Invalid category name ${JSON.stringify(categoryName)} must not be created`).toBeFalsy();
      |                                                                                                       ^ Error: Invalid category name "" must not be created
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
  557 |   const after = await fetchCategories(request);
  558 |   const updated = after.find((category) => category.id === createdId && category.name === updatedName);
  559 |   const oldNameStillPresent = after.some((category) => category.id === createdId && category.name === originalName);
  560 |
  561 |   await test.info().attach('admin-category-update-response.json', {
  562 |     body: JSON.stringify({ status: response.status(), body, originalName, updatedName, updated, oldNameStillPresent }, null, 2),
  563 |     contentType: 'application/json',
  564 |   });
  565 |
  566 |   try {
  567 |     expect.soft(testCase.expected.acceptedStatuses ?? [200, 204]).toContain(response.status());
  568 |     expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
  569 |     expect.soft(updated, `Category ${createdId} should be renamed to ${updatedName}`).toBeTruthy();
  570 |     expect.soft(oldNameStillPresent).toBeFalsy();
  571 |
  572 |     if (testCase.expected.verifyUi) {
  573 |       await loginAdminUi(page);
  574 |       await openCategoryManagement(page);
  575 |       await expect.soft(page.locator('body')).toContainText(categoryNamePattern(updatedName));
  576 |     }
  577 |   } finally {
  578 |     await deleteCategoryByApi(request, createdId!, adminLogin.token);
  579 |     await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  580 |   }
  581 | }
  582 |
  583 | async function assertAdminUpdateRejected(
  584 |   request: import('@playwright/test').APIRequestContext,
  585 |   testCase: Fr14Case,
  586 | ) {
  587 |   const adminLogin = await loginAdminByApi(request);
  588 |   const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Cannot Empty');
  589 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Invalid Update');
  590 |   const create = await createCategoryByApi(request, originalName, adminLogin.token);
  591 |   const createdId = categoryIdFromBody(create.body);
  592 |   expect(createdId).toBeTruthy();
  593 |
  594 |   const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
  595 |   const after = await fetchCategories(request);
  596 |   const originalPreserved = after.some((category) => category.id === createdId && category.name === originalName);
  597 |   const invalidApplied = after.find((category) => category.id === createdId && category.name === updatedName);
  598 |
  599 |   await test.info().attach('admin-category-update-invalid-response.json', {
  600 |     body: JSON.stringify({ status: response.status(), body, originalName, updatedName, originalPreserved, invalidApplied }, null, 2),
  601 |     contentType: 'application/json',
  602 |   });
  603 |
  604 |   try {
  605 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
  606 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  607 |     if (testCase.expected.preserveOriginal) {
  608 |       expect.soft(originalPreserved, `Original category ${originalName} should be preserved`).toBeTruthy();
  609 |       expect.soft(invalidApplied, `Invalid update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
  610 |     }
  611 |   } finally {
  612 |     await deleteCategoryByApi(request, createdId!, adminLogin.token);
  613 |     await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  614 |   }
  615 | }
  616 |
  617 | async function assertAdminUpdateMissingRejected(
  618 |   request: import('@playwright/test').APIRequestContext,
  619 |   testCase: Fr14Case,
  620 | ) {
  621 |   const adminLogin = await loginAdminByApi(request);
  622 |   const missingId = testCase.missingCategoryId ?? 999999;
  623 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Missing Category');
  624 |   const before = await fetchCategories(request);
  625 |   const { response, body, text } = await updateCategoryByApi(request, missingId, updatedName, adminLogin.token);
  626 |   const after = await fetchCategories(request);
  627 |   const created = after.find((category) => category.name === updatedName || category.id === missingId);
  628 |
  629 |   await test.info().attach('admin-category-update-missing-response.json', {
  630 |     body: JSON.stringify(
  631 |       {
  632 |         status: response.status(),
  633 |         body,
  634 |         missingId,
  635 |         updatedName,
```