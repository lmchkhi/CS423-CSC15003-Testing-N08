# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr14-category-management.spec.ts >> Run by: 23127475 | FR-14 - Quản lý danh mục >> TC-FR14-DT-016 - User thường không được xóa danh mục qua API
- Location: tests/automation/specs/fr14-category-management.spec.ts:823:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /Category deleted|success|deleted/i
Received string:      "{\"message\":\"Category deleted\"}"
```

```
Error: User token must not delete category FR14 User Delete Target 20260809T17421 1

expect(received).toBeTruthy()

Received: undefined
```

# Test source

```ts
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
  749 |   expect.soft(after.length, 'Deleting a missing category must not change category count').toBe(before.length);
  750 |   expect.soft(targetExists, `Missing category id ${missingId} must not exist after delete`).toBeFalsy();
  751 | }
  752 |
  753 | async function assertUserDeleteRejected(
  754 |   request: import('@playwright/test').APIRequestContext,
  755 |   testCase: Fr14Case,
  756 | ) {
  757 |   const adminLogin = await loginAdminByApi(request);
  758 |   const user = await prepareGeneratedUser(request, testCase.id);
  759 |   const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 User Delete Target');
  760 |   const create = await createCategoryByApi(request, categoryName, adminLogin.token);
  761 |   const createdId = categoryIdFromBody(create.body);
  762 |   expect(createdId).toBeTruthy();
  763 |
  764 |   const { response, body, text } = await deleteCategoryRawByApi(request, createdId!, user.token);
  765 |   const after = await fetchCategories(request);
  766 |   const stillPresent = after.find((category) => category.id === createdId && category.name === categoryName);
  767 |
  768 |   await test.info().attach('user-category-delete-response.json', {
  769 |     body: JSON.stringify({ status: response.status(), body, categoryName, createdId, stillPresent }, null, 2),
  770 |     contentType: 'application/json',
  771 |   });
  772 |
  773 |   try {
  774 |     expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
  775 |     expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
> 776 |     expect.soft(stillPresent, `User token must not delete category ${categoryName}`).toBeTruthy();
      |                                                                                      ^ Error: User token must not delete category FR14 User Delete Target 20260809T17421 1
  777 |   } finally {
  778 |     if (stillPresent) {
  779 |       await deleteCategoryByApi(request, stillPresent.id, adminLogin.token);
  780 |     }
  781 |     await cleanupCategoryByName(request, adminLogin.token, categoryName);
  782 |   }
  783 | }
  784 |
  785 | async function assertAdminCategoryExactCount(
  786 |   page: import('@playwright/test').Page,
  787 |   request: import('@playwright/test').APIRequestContext,
  788 |   testCase: Fr14Case,
  789 | ) {
  790 |   const adminLogin = await loginAdminByApi(request);
  791 |   const targetCount = testCase.categorySetup?.targetCount ?? testCase.expected.exactCategoryCount ?? 0;
  792 |   const targetNames = Array.from({ length: targetCount }, () =>
  793 |     uniqueCategoryName(testCase.categorySetup?.namePrefix ?? 'FR14 Boundary Category'),
  794 |   );
  795 |
  796 |   await withTemporaryCategorySet(request, adminLogin.token, targetNames, async (activeCategories) => {
  797 |     expect.soft(activeCategories.length).toBe(testCase.expected.exactCategoryCount ?? targetCount);
  798 |
  799 |     await loginAdminUi(page);
  800 |     await openCategoryManagement(page);
  801 |     const body = page.locator('body');
  802 |     await expect.soft(body).toContainText(textPattern(testCase.expected.pagePattern));
  803 |     await expect.soft(body).not.toContainText(/404\s+not\s+found|not found|typeerror|exception/i);
  804 |
  805 |     if (targetNames.length === 0) {
  806 |       for (const category of activeCategories) {
  807 |         await expect.soft(body).not.toContainText(categoryNamePattern(category.name));
  808 |       }
  809 |     } else {
  810 |       for (const name of targetNames) {
  811 |         await expect.soft(body).toContainText(categoryNamePattern(name));
  812 |       }
  813 |     }
  814 |   });
  815 | }
  816 |
  817 | test.describe(`Run by: ${studentId} | FR-14 - Quản lý danh mục`, () => {
  818 |   test.beforeAll(() => {
  819 |     expect(cases.length).toBeGreaterThanOrEqual(22);
  820 |   });
  821 |
  822 |   for (const testCase of cases) {
  823 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  824 |       page.on('dialog', (dialog) => dialog.accept().catch(() => undefined));
  825 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  826 |
  827 |       if (testCase.kind === 'adminCategoryListVisible' || testCase.kind === 'adminCategoryListMany') {
  828 |         await assertAdminCategoryList(page, request, testCase);
  829 |         return;
  830 |       }
  831 |
  832 |       if (testCase.kind === 'guestAdminScreenBlocked') {
  833 |         await assertAdminScreenBlocked(page, testCase);
  834 |         return;
  835 |       }
  836 |
  837 |       if (testCase.kind === 'userAdminScreenBlocked') {
  838 |         const user = await prepareGeneratedUser(request, testCase.id);
  839 |         await attemptLoginUi(page, user.email, user.password);
  840 |         await assertAdminScreenBlocked(page, testCase);
  841 |         return;
  842 |       }
  843 |
  844 |       if (testCase.kind === 'apiGuestCreateRejected') {
  845 |         await assertApiCreateRejected(request, testCase);
  846 |         return;
  847 |       }
  848 |
  849 |       if (testCase.kind === 'apiUserCreateRejected') {
  850 |         const user = await prepareGeneratedUser(request, testCase.id);
  851 |         await assertApiCreateRejected(request, testCase, user.token);
  852 |         return;
  853 |       }
  854 |
  855 |       if (testCase.kind === 'apiAdminCreateAccepted') {
  856 |         await assertAdminCreateAccepted(page, request, testCase);
  857 |         return;
  858 |       }
  859 |
  860 |       if (testCase.kind === 'apiAdminCreateRejected') {
  861 |         await assertAdminCreateRejected(request, testCase);
  862 |         return;
  863 |       }
  864 |
  865 |       if (testCase.kind === 'apiAdminUpdateAccepted') {
  866 |         await assertAdminUpdateAccepted(page, request, testCase);
  867 |         return;
  868 |       }
  869 |
  870 |       if (testCase.kind === 'apiAdminUpdateRejected') {
  871 |         await assertAdminUpdateRejected(request, testCase);
  872 |         return;
  873 |       }
  874 |
  875 |       if (testCase.kind === 'apiAdminUpdateMissingRejected') {
  876 |         await assertAdminUpdateMissingRejected(request, testCase);
```