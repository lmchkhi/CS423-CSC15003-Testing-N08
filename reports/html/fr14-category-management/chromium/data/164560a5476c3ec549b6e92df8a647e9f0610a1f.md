# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-012 - Admin cập nhật danh mục không tồn tại
- Location: tests/automation/specs/fr14-category-management.spec.ts:823:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [400, 404, 422]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category updated|success|updated/i
Received string:      "{\"message\":\"Category updated\"}"
```

# Test source

```ts
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
  636 |         beforeCount: before.length,
  637 |         afterCount: after.length,
  638 |         created,
  639 |       },
  640 |       null,
  641 |       2,
  642 |     ),
  643 |     contentType: 'application/json',
  644 |   });
  645 |
  646 |   try {
  647 |     expect.soft(testCase.expected.rejectedStatuses ?? [400, 404, 422]).toContain(response.status());
> 648 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
      |                           ^ Error: expect(received).not.toMatch(expected)
  649 |     expect.soft(created, `Missing category id ${missingId} must not create/update data`).toBeFalsy();
  650 |   } finally {
  651 |     if (created) {
  652 |       await deleteCategoryByApi(request, created.id, adminLogin.token);
  653 |     }
  654 |     await cleanupCategoryByName(request, adminLogin.token, updatedName);
  655 |   }
  656 | }
  657 |
  658 | async function assertUserUpdateRejected(
  659 |   request: import('@playwright/test').APIRequestContext,
  660 |   testCase: Fr14Case,
  661 | ) {
  662 |   const adminLogin = await loginAdminByApi(request);
  663 |   const user = await prepareGeneratedUser(request, testCase.id);
  664 |   const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 User Update Source');
  665 |   const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 User Updated');
  666 |   const create = await createCategoryByApi(request, originalName, adminLogin.token);
  667 |   const createdId = categoryIdFromBody(create.body);
  668 |   expect(createdId).toBeTruthy();
  669 |
  670 |   const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, user.token);
  671 |   const after = await fetchCategories(request);
  672 |   const originalPreserved = after.some((category) => category.id === createdId && category.name === originalName);
  673 |   const unauthorizedApplied = after.find((category) => category.id === createdId && category.name === updatedName);
  674 |
  675 |   await test.info().attach('user-category-update-response.json', {
  676 |     body: JSON.stringify({ status: response.status(), body, originalName, updatedName, originalPreserved, unauthorizedApplied }, null, 2),
  677 |     contentType: 'application/json',
  678 |   });
  679 |
  680 |   try {
  681 |     expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
  682 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  683 |     if (testCase.expected.preserveOriginal) {
  684 |       expect.soft(originalPreserved, `User token must not rename category ${createdId}`).toBeTruthy();
  685 |       expect.soft(unauthorizedApplied, `Unauthorized update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
  686 |     }
  687 |   } finally {
  688 |     await deleteCategoryByApi(request, createdId!, adminLogin.token);
  689 |     await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  690 |   }
  691 | }
  692 |
  693 | async function assertAdminDeleteAccepted(
  694 |   page: import('@playwright/test').Page,
  695 |   request: import('@playwright/test').APIRequestContext,
  696 |   testCase: Fr14Case,
  697 | ) {
  698 |   const adminLogin = await loginAdminByApi(request);
  699 |   const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Delete Target');
  700 |   const create = await createCategoryByApi(request, categoryName, adminLogin.token);
  701 |   const createdId = categoryIdFromBody(create.body);
  702 |   expect(createdId).toBeTruthy();
  703 |
  704 |   const { response, body, text } = await deleteCategoryRawByApi(request, createdId!, adminLogin.token);
  705 |   const after = await fetchCategories(request);
  706 |   const stillPresent = after.find((category) => category.id === createdId || category.name === categoryName);
  707 |
  708 |   await test.info().attach('admin-category-delete-response.json', {
  709 |     body: JSON.stringify({ status: response.status(), body, categoryName, createdId, stillPresent }, null, 2),
  710 |     contentType: 'application/json',
  711 |   });
  712 |
  713 |   try {
  714 |     expect.soft(testCase.expected.acceptedStatuses ?? [200, 204]).toContain(response.status());
  715 |     expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
  716 |     expect.soft(stillPresent, `Deleted category ${categoryName} must not remain in list`).toBeFalsy();
  717 |
  718 |     if (testCase.expected.verifyUi) {
  719 |       await loginAdminUi(page);
  720 |       await openCategoryManagement(page);
  721 |       await expect.soft(page.locator('body')).not.toContainText(categoryNamePattern(categoryName));
  722 |     }
  723 |   } finally {
  724 |     if (stillPresent) {
  725 |       await deleteCategoryByApi(request, stillPresent.id, adminLogin.token);
  726 |     }
  727 |     await cleanupCategoryByName(request, adminLogin.token, categoryName);
  728 |   }
  729 | }
  730 |
  731 | async function assertAdminDeleteMissingRejected(
  732 |   request: import('@playwright/test').APIRequestContext,
  733 |   testCase: Fr14Case,
  734 | ) {
  735 |   const adminLogin = await loginAdminByApi(request);
  736 |   const missingId = testCase.missingCategoryId ?? 999999;
  737 |   const before = await fetchCategories(request);
  738 |   const { response, body, text } = await deleteCategoryRawByApi(request, missingId, adminLogin.token);
  739 |   const after = await fetchCategories(request);
  740 |   const targetExists = after.find((category) => category.id === missingId);
  741 |
  742 |   await test.info().attach('admin-category-delete-missing-response.json', {
  743 |     body: JSON.stringify({ status: response.status(), body, missingId, beforeCount: before.length, afterCount: after.length, targetExists }, null, 2),
  744 |     contentType: 'application/json',
  745 |   });
  746 |
  747 |   expect.soft(testCase.expected.rejectedStatuses ?? [400, 404, 422]).toContain(response.status());
  748 |   expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
```