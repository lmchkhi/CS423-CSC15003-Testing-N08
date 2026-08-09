# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-011 - Admin cập nhật danh mục với tên rỗng
- Location: tests/automation/specs/fr14-category-management.spec.ts:593:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 422]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category updated|success|updated/i
Received string:      "{\"message\":\"Category updated\"}"
```

```
Error: Original category FR14 Cannot Empty 20260809T17100 4 should be preserved

expect(received).toBeTruthy()

Received: false
```

```
Error: Invalid update "" must not be applied

expect(received).toBeFalsy()

Received: {"id": 23, "name": ""}
```

# Test source

```ts
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
  464 |     expect.soft(created, `Invalid category name ${JSON.stringify(categoryName)} must not be created`).toBeFalsy();
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
> 538 |       expect.soft(invalidApplied, `Invalid update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
      |                                                                                                        ^ Error: Invalid update "" must not be applied
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
  565 |         beforeCount: before.length,
  566 |         afterCount: after.length,
  567 |         created,
  568 |       },
  569 |       null,
  570 |       2,
  571 |     ),
  572 |     contentType: 'application/json',
  573 |   });
  574 |
  575 |   try {
  576 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 404, 422]).toContain(response.status());
  577 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  578 |     expect.soft(created, `Missing category id ${missingId} must not create/update data`).toBeFalsy();
  579 |   } finally {
  580 |     if (created) {
  581 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  582 |     }
  583 |     await cleanupCategoryByName(request, adminLogin.token, updatedName);
  584 |   }
  585 | }
  586 |
  587 | test.describe(`Run by: ${studentId} | FR-14 - Quản lý danh mục`, () => {
  588 |   test.beforeAll(() => {
  589 |     expect(cases.length).toBeGreaterThanOrEqual(16);
  590 |   });
  591 |
  592 |   for (const testCase of cases) {
  593 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  594 |       page.on('dialog', (dialog) => dialog.accept().catch(() => undefined));
  595 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  596 |
  597 |       if (testCase.kind === 'adminCategoryListVisible' || testCase.kind === 'adminCategoryListMany') {
  598 |         await assertAdminCategoryList(page, request, testCase);
  599 |         return;
  600 |       }
  601 |
  602 |       if (testCase.kind === 'guestAdminScreenBlocked') {
  603 |         await assertAdminScreenBlocked(page, testCase);
  604 |         return;
  605 |       }
  606 |
  607 |       if (testCase.kind === 'userAdminScreenBlocked') {
  608 |         const user = await prepareGeneratedUser(request, testCase.id);
  609 |         await attemptLoginUi(page, user.email, user.password);
  610 |         await assertAdminScreenBlocked(page, testCase);
  611 |         return;
  612 |       }
  613 |
  614 |       if (testCase.kind === 'apiGuestCreateRejected') {
  615 |         await assertApiCreateRejected(request, testCase);
  616 |         return;
  617 |       }
  618 |
  619 |       if (testCase.kind === 'apiUserCreateRejected') {
  620 |         const user = await prepareGeneratedUser(request, testCase.id);
  621 |         await assertApiCreateRejected(request, testCase, user.token);
  622 |         return;
  623 |       }
  624 |
  625 |       if (testCase.kind === 'apiAdminCreateAccepted') {
  626 |         await assertAdminCreateAccepted(page, request, testCase);
  627 |         return;
  628 |       }
  629 |
  630 |       if (testCase.kind === 'apiAdminCreateRejected') {
  631 |         await assertAdminCreateRejected(request, testCase);
  632 |         return;
  633 |       }
  634 |
  635 |       if (testCase.kind === 'apiAdminUpdateAccepted') {
  636 |         await assertAdminUpdateAccepted(page, request, testCase);
  637 |         return;
  638 |       }
```