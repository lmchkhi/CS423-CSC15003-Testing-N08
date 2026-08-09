import { expect, test } from '@playwright/test';
import fr14Cases from '../data/fr14-category-management.json';

type AccountKind = 'admin' | 'guest' | 'generatedUser';

type CategorySetup = {
  minCount?: number;
  targetCount?: number;
  namePrefix?: string;
};

type Fr14Case = {
  id: string;
  title: string;
  source: string;
  kind:
    | 'adminCategoryListVisible'
    | 'guestAdminScreenBlocked'
    | 'userAdminScreenBlocked'
    | 'apiGuestCreateRejected'
    | 'apiUserCreateRejected'
    | 'adminCategoryListMany'
    | 'apiAdminCreateAccepted'
    | 'apiAdminCreateRejected'
    | 'apiAdminUpdateAccepted'
    | 'apiAdminUpdateRejected'
    | 'apiAdminUpdateMissingRejected'
    | 'apiUserUpdateRejected'
    | 'apiAdminDeleteAccepted'
    | 'apiAdminDeleteMissingRejected'
    | 'apiUserDeleteRejected'
    | 'adminCategoryListExactCount';
  account: AccountKind;
  categoryName?: string;
  categoryNamePrefix?: string;
  updatedName?: string;
  updatedNamePrefix?: string;
  missingCategoryId?: number;
  categorySetup?: CategorySetup;
  expected: {
    acceptedStatuses?: number[];
    exactCategoryCount?: number;
    minCategoryCount?: number;
    pagePattern?: string;
    guardPattern?: string;
    forbiddenPattern?: string;
    bodyMustNotContainPattern?: string;
    rejectedStatuses?: number[];
    successPattern?: string;
    preserveOriginal?: boolean;
    verifyUi?: boolean;
  };
};

type LoginResult = {
  token: string;
  user: {
    id: number;
    email: string;
    role?: string;
  };
};

type Category = {
  id: number;
  name: string;
};

const cases = fr14Cases as Fr14Case[];
const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
const adminBaseUrl = process.env.ADMIN_BASE_URL ?? process.env.WEB_BASE_URL ?? 'http://localhost:5174';
const studentId = process.env.STUDENT_ID ?? '23127475';
const runId = (process.env.HW04_RUN_AT ?? new Date().toISOString()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 14);
const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@eshop.com';
const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin123!';
const defaultPassword = 'Test1234!';
let userCounter = 0;
let categoryCounter = 0;

function apiUrl(path: string): string {
  return `${apiBaseUrl}${path}`;
}

function adminUrl(path: string): string {
  return new URL(path, adminBaseUrl).toString();
}

function textPattern(pattern?: string): RegExp {
  return new RegExp(pattern ?? '.', 'i');
}

function categoryNamePattern(name: string): RegExp {
  return new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

function hasCategoryManagementContent(bodyText: string): boolean {
  return /tên danh mục|thêm danh mục|danh sách danh mục|category name|add category|điện thoại|laptop|phụ kiện/i.test(bodyText);
}

function hasAccessGuard(bodyText: string): boolean {
  return /đăng nhập|login|không có quyền|forbidden|unauthorized|access denied|admin/i.test(bodyText);
}

function uniqueEmail(testId: string): string {
  userCounter += 1;
  const slug = testId.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `fr14.${runId}.${userCounter}.${slug}@example.com`;
}

function uniqueCategoryName(prefix: string): string {
  categoryCounter += 1;
  if (/^[A-Z]{1,2}$/.test(prefix)) {
    return `${prefix}${categoryCounter}`;
  }
  return `${prefix} ${runId} ${categoryCounter}`;
}

function emailInput(page: import('@playwright/test').Page) {
  return page
    .getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .or(page.getByRole('textbox'))
    .first();
}

function passwordInput(page: import('@playwright/test').Page) {
  return page
    .getByLabel(/mật khẩu|password/i)
    .or(page.getByPlaceholder(/mật khẩu|password/i))
    .or(page.locator('input[type="password"]'))
    .or(page.getByRole('textbox').nth(1))
    .first();
}

async function responseBody(response: import('@playwright/test').APIResponse) {
  const text = await response.text();
  try {
    return { text, body: JSON.parse(text) as unknown };
  } catch {
    return { text, body: text as unknown };
  }
}

async function registerUser(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  password = defaultPassword,
) {
  const response = await request.post(apiUrl('/api/register'), {
    data: {
      name: `FR14 ${email}`,
      email,
      password,
    },
  });
  expect.soft([200, 201, 409]).toContain(response.status());
}

async function loginByApi(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  password: string,
): Promise<LoginResult> {
  const response = await request.post(apiUrl('/api/login'), {
    data: { email, password },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('token');
  expect(body).toHaveProperty('user');
  return body as LoginResult;
}

async function loginAdminByApi(request: import('@playwright/test').APIRequestContext): Promise<LoginResult> {
  return loginByApi(request, adminEmail, adminPassword);
}

async function prepareGeneratedUser(request: import('@playwright/test').APIRequestContext, testId: string) {
  const email = uniqueEmail(testId);
  await registerUser(request, email);
  const login = await loginByApi(request, email, defaultPassword);
  return { email, password: defaultPassword, token: login.token, user: login.user };
}

async function fetchCategories(request: import('@playwright/test').APIRequestContext): Promise<Category[]> {
  const response = await request.get(apiUrl('/api/categories'));
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  return body as Category[];
}

async function createCategoryByApi(
  request: import('@playwright/test').APIRequestContext,
  name: string,
  token?: string,
) {
  const response = await request.post(apiUrl('/api/categories'), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    data: { name },
  });
  const { body, text } = await responseBody(response);
  return { response, body, text };
}

async function updateCategoryByApi(
  request: import('@playwright/test').APIRequestContext,
  categoryId: number,
  name: string,
  token: string,
) {
  const response = await request.put(apiUrl(`/api/categories/${categoryId}`), {
    headers: { Authorization: `Bearer ${token}` },
    data: { name },
  });
  const { body, text } = await responseBody(response);
  return { response, body, text };
}

async function deleteCategoryRawByApi(
  request: import('@playwright/test').APIRequestContext,
  categoryId: number,
  token?: string,
) {
  const response = await request.delete(apiUrl(`/api/categories/${categoryId}`), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const { body, text } = await responseBody(response);
  return { response, body, text };
}

async function deleteCategoryByApi(
  request: import('@playwright/test').APIRequestContext,
  categoryId: number,
  token: string,
) {
  const { response } = await deleteCategoryRawByApi(request, categoryId, token);
  expect.soft([200, 204, 404]).toContain(response.status());
}

async function cleanupCategoryByName(
  request: import('@playwright/test').APIRequestContext,
  adminToken: string,
  name: string,
) {
  const categories = await fetchCategories(request);
  for (const category of categories.filter((item) => item.name === name)) {
    await deleteCategoryByApi(request, category.id, adminToken);
  }
}

async function cleanupCategoriesByNames(
  request: import('@playwright/test').APIRequestContext,
  adminToken: string,
  names: string[],
) {
  const categories = await fetchCategories(request);
  for (const category of categories.filter((item) => names.includes(item.name))) {
    await deleteCategoryByApi(request, category.id, adminToken);
  }
}

function categoryIdFromBody(body: unknown): number | undefined {
  if (body && typeof body === 'object' && 'id' in body) {
    const id = Number((body as { id: unknown }).id);
    return Number.isFinite(id) ? id : undefined;
  }
  return undefined;
}

async function ensureMinCategories(
  request: import('@playwright/test').APIRequestContext,
  adminToken: string,
  setup: CategorySetup = {},
) {
  const created: Category[] = [];
  let categories = await fetchCategories(request);
  const minCount = setup.minCount ?? 1;
  while (categories.length < minCount) {
    const name = uniqueCategoryName(setup.namePrefix ?? 'FR14 Category');
    await createCategoryByApi(request, name, adminToken);
    categories = await fetchCategories(request);
    const createdCategory = categories.find((category) => category.name === name);
    if (createdCategory) {
      created.push(createdCategory);
    }
  }
  return { categories, created };
}

async function withTemporaryCategorySet<T>(
  request: import('@playwright/test').APIRequestContext,
  adminToken: string,
  targetNames: string[],
  run: (activeCategories: Category[], originalCategories: Category[]) => Promise<T>,
): Promise<T> {
  const originalCategories = await fetchCategories(request);
  const setupDeletes: unknown[] = [];
  const setupCreates: unknown[] = [];

  try {
    for (const category of originalCategories) {
      const deleted = await deleteCategoryRawByApi(request, category.id, adminToken);
      setupDeletes.push({ id: category.id, name: category.name, status: deleted.response.status(), body: deleted.body });
    }

    for (const name of targetNames) {
      const created = await createCategoryByApi(request, name, adminToken);
      setupCreates.push({ name, status: created.response.status(), body: created.body });
    }

    const activeCategories = await fetchCategories(request);
    await test.info().attach('category-boundary-setup.json', {
      body: JSON.stringify({ originalCategories, setupDeletes, setupCreates, activeCategories }, null, 2),
      contentType: 'application/json',
    });

    return await run(activeCategories, originalCategories);
  } finally {
    const beforeRestore = await fetchCategories(request).catch(() => [] as Category[]);
    const restoreDeletes: unknown[] = [];
    const restoreCreates: unknown[] = [];

    for (const category of beforeRestore) {
      const deleted = await deleteCategoryRawByApi(request, category.id, adminToken);
      restoreDeletes.push({ id: category.id, name: category.name, status: deleted.response.status(), body: deleted.body });
    }

    for (const category of originalCategories) {
      const existing = await fetchCategories(request).then((items) => items.find((item) => item.name === category.name));
      if (!existing) {
        const created = await createCategoryByApi(request, category.name, adminToken);
        restoreCreates.push({ name: category.name, status: created.response.status(), body: created.body });
      }
    }

    const afterRestore = await fetchCategories(request).catch(() => [] as Category[]);
    await test.info().attach('category-boundary-restore.json', {
      body: JSON.stringify({ beforeRestore, restoreDeletes, restoreCreates, afterRestore }, null, 2),
      contentType: 'application/json',
    });
  }
}

async function attemptLoginUi(page: import('@playwright/test').Page, email: string, password: string) {
  for (const route of ['/login', '/']) {
    await page.goto(adminUrl(route));
    await page.waitForLoadState('networkidle').catch(() => undefined);
    if (!(await emailInput(page).isVisible().catch(() => false))) {
      continue;
    }
    await emailInput(page).fill(email);
    await passwordInput(page).fill(password);
    await page.getByRole('button', { name: /đăng nhập|login|sign in|submit/i }).first().click();
    await page.waitForLoadState('networkidle').catch(() => undefined);
    return;
  }

  await expect(emailInput(page)).toBeVisible();
}

async function loginAdminUi(page: import('@playwright/test').Page) {
  await attemptLoginUi(page, adminEmail, adminPassword);
  await expect(page.locator('body')).toContainText(/dashboard|admin|danh mục|category|sản phẩm|product|đăng xuất|logout/i);
}

async function openCategoryManagement(page: import('@playwright/test').Page, allowGuard = false) {
  const candidateRoutes = ['/categories', '/category', '/category-management', '/admin/categories', '/dashboard/categories', '/dashboard', '/'];

  for (const route of candidateRoutes) {
    await page.goto(adminUrl(route)).catch((error) => {
      if (!allowGuard) {
        throw error;
      }
    });
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const bodyText = await page.locator('body').innerText();
    if (hasCategoryManagementContent(bodyText) && !/404|not found/i.test(bodyText)) {
      return;
    }
    if (allowGuard && hasAccessGuard(bodyText) && !(await page.getByRole('link', { name: /^danh mục$/i }).isVisible().catch(() => false))) {
      return;
    }
  }

  await page.goto(adminUrl('/'));
  await page.waitForLoadState('networkidle').catch(() => undefined);
  const categoryLink = page
    .getByRole('link', { name: /^danh mục$|^category$|^categories$/i })
    .or(page.getByRole('button', { name: /^danh mục$|^category$|^categories$/i }))
    .or(page.getByText(/^danh mục$|^category$|^categories$/i))
    .first();
  if (allowGuard && !(await categoryLink.isVisible().catch(() => false))) {
    return;
  }
  await expect(categoryLink).toBeVisible();
  await categoryLink.click();
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await expect(page.locator('body')).toContainText(/danh mục|category|categories|điện thoại|laptop|phụ kiện/i);
}

async function assertAdminCategoryList(
  page: import('@playwright/test').Page,
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const { categories, created } = await ensureMinCategories(request, adminLogin.token, testCase.categorySetup);
  try {
    await loginAdminUi(page);
    await openCategoryManagement(page);
    const body = page.locator('body');
    await expect.soft(body).toContainText(textPattern(testCase.expected.pagePattern));
    if (testCase.expected.forbiddenPattern) {
      await expect.soft(body).not.toContainText(textPattern(testCase.expected.forbiddenPattern));
    }
    expect.soft(categories.length).toBeGreaterThanOrEqual(testCase.expected.minCategoryCount ?? 1);
    for (const category of categories.slice(0, Math.min(categories.length, testCase.expected.minCategoryCount ?? 3))) {
      await expect.soft(body).toContainText(categoryNamePattern(category.name));
    }
  } finally {
    for (const category of created) {
      await deleteCategoryByApi(request, category.id, adminLogin.token);
    }
  }
}

async function assertAdminScreenBlocked(page: import('@playwright/test').Page, testCase: Fr14Case) {
  await openCategoryManagement(page, true);
  const body = page.locator('body');
  await expect.soft(body).toContainText(textPattern(testCase.expected.guardPattern));
  await expect.soft(body).not.toContainText(textPattern(testCase.expected.bodyMustNotContainPattern));
}

async function assertApiCreateRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
  token?: string,
) {
  const adminLogin = await loginAdminByApi(request);
  const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Unauthorized Create');
  const before = await fetchCategories(request);
  const { response, body, text } = await createCategoryByApi(request, categoryName, token);
  const after = await fetchCategories(request);
  const created = after.find((category) => category.name === categoryName);

  await test.info().attach('category-create-api-response.json', {
    body: JSON.stringify({ status: response.status(), body, beforeCount: before.length, afterCount: after.length, created }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    expect.soft(created, `Category ${categoryName} must not be created`).toBeFalsy();
  } finally {
    if (created) {
      await deleteCategoryByApi(request, created.id, adminLogin.token);
    }
  }
}

async function assertAdminCreateAccepted(
  page: import('@playwright/test').Page,
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Valid Category');
  await cleanupCategoryByName(request, adminLogin.token, categoryName);
  const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  const after = await fetchCategories(request);
  const created = after.find((category) => category.name === categoryName);

  await test.info().attach('admin-category-create-response.json', {
    body: JSON.stringify({ status: response.status(), body, created }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.acceptedStatuses ?? [200, 201]).toContain(response.status());
    expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
    expect.soft(created, `Category ${categoryName} should be created`).toBeTruthy();

    if (testCase.expected.verifyUi) {
      await loginAdminUi(page);
      await openCategoryManagement(page);
      await expect.soft(page.locator('body')).toContainText(categoryNamePattern(categoryName));
    }
  } finally {
    if (created) {
      await deleteCategoryByApi(request, created.id, adminLogin.token);
    } else {
      const id = categoryIdFromBody(body);
      if (id) {
        await deleteCategoryByApi(request, id, adminLogin.token);
      }
    }
  }
}

async function assertAdminCreateRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const categoryName = testCase.categoryName ?? uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Invalid Category');
  const before = await fetchCategories(request);
  const { response, body, text } = await createCategoryByApi(request, categoryName, adminLogin.token);
  const after = await fetchCategories(request);
  const createdByName = after.filter((category) => category.name === categoryName);
  const createdById = categoryIdFromBody(body);
  const created = createdById ? after.find((category) => category.id === createdById) : createdByName[0];

  await test.info().attach('admin-category-create-invalid-response.json', {
    body: JSON.stringify(
      {
        status: response.status(),
        body,
        beforeCount: before.length,
        afterCount: after.length,
        created,
        submittedName: categoryName,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    expect.soft(created, `Invalid category name ${JSON.stringify(categoryName)} must not be created`).toBeFalsy();
  } finally {
    if (created) {
      await deleteCategoryByApi(request, created.id, adminLogin.token);
    }
    await cleanupCategoryByName(request, adminLogin.token, categoryName);
  }
}

async function assertAdminUpdateAccepted(
  page: import('@playwright/test').Page,
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Update Source');
  const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Updated Category');
  const create = await createCategoryByApi(request, originalName, adminLogin.token);
  const createdId = categoryIdFromBody(create.body);
  expect(createdId).toBeTruthy();

  const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
  const after = await fetchCategories(request);
  const updated = after.find((category) => category.id === createdId && category.name === updatedName);
  const oldNameStillPresent = after.some((category) => category.id === createdId && category.name === originalName);

  await test.info().attach('admin-category-update-response.json', {
    body: JSON.stringify({ status: response.status(), body, originalName, updatedName, updated, oldNameStillPresent }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.acceptedStatuses ?? [200, 204]).toContain(response.status());
    expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
    expect.soft(updated, `Category ${createdId} should be renamed to ${updatedName}`).toBeTruthy();
    expect.soft(oldNameStillPresent).toBeFalsy();

    if (testCase.expected.verifyUi) {
      await loginAdminUi(page);
      await openCategoryManagement(page);
      await expect.soft(page.locator('body')).toContainText(categoryNamePattern(updatedName));
    }
  } finally {
    await deleteCategoryByApi(request, createdId!, adminLogin.token);
    await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  }
}

async function assertAdminUpdateRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Cannot Empty');
  const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Invalid Update');
  const create = await createCategoryByApi(request, originalName, adminLogin.token);
  const createdId = categoryIdFromBody(create.body);
  expect(createdId).toBeTruthy();

  const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, adminLogin.token);
  const after = await fetchCategories(request);
  const originalPreserved = after.some((category) => category.id === createdId && category.name === originalName);
  const invalidApplied = after.find((category) => category.id === createdId && category.name === updatedName);

  await test.info().attach('admin-category-update-invalid-response.json', {
    body: JSON.stringify({ status: response.status(), body, originalName, updatedName, originalPreserved, invalidApplied }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [400, 422]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    if (testCase.expected.preserveOriginal) {
      expect.soft(originalPreserved, `Original category ${originalName} should be preserved`).toBeTruthy();
      expect.soft(invalidApplied, `Invalid update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
    }
  } finally {
    await deleteCategoryByApi(request, createdId!, adminLogin.token);
    await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  }
}

async function assertAdminUpdateMissingRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const missingId = testCase.missingCategoryId ?? 999999;
  const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 Missing Category');
  const before = await fetchCategories(request);
  const { response, body, text } = await updateCategoryByApi(request, missingId, updatedName, adminLogin.token);
  const after = await fetchCategories(request);
  const created = after.find((category) => category.name === updatedName || category.id === missingId);

  await test.info().attach('admin-category-update-missing-response.json', {
    body: JSON.stringify(
      {
        status: response.status(),
        body,
        missingId,
        updatedName,
        beforeCount: before.length,
        afterCount: after.length,
        created,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [400, 404, 422]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    expect.soft(created, `Missing category id ${missingId} must not create/update data`).toBeFalsy();
  } finally {
    if (created) {
      await deleteCategoryByApi(request, created.id, adminLogin.token);
    }
    await cleanupCategoryByName(request, adminLogin.token, updatedName);
  }
}

async function assertUserUpdateRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const user = await prepareGeneratedUser(request, testCase.id);
  const originalName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 User Update Source');
  const updatedName = testCase.updatedName ?? uniqueCategoryName(testCase.updatedNamePrefix ?? 'FR14 User Updated');
  const create = await createCategoryByApi(request, originalName, adminLogin.token);
  const createdId = categoryIdFromBody(create.body);
  expect(createdId).toBeTruthy();

  const { response, body, text } = await updateCategoryByApi(request, createdId!, updatedName, user.token);
  const after = await fetchCategories(request);
  const originalPreserved = after.some((category) => category.id === createdId && category.name === originalName);
  const unauthorizedApplied = after.find((category) => category.id === createdId && category.name === updatedName);

  await test.info().attach('user-category-update-response.json', {
    body: JSON.stringify({ status: response.status(), body, originalName, updatedName, originalPreserved, unauthorizedApplied }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    if (testCase.expected.preserveOriginal) {
      expect.soft(originalPreserved, `User token must not rename category ${createdId}`).toBeTruthy();
      expect.soft(unauthorizedApplied, `Unauthorized update ${JSON.stringify(updatedName)} must not be applied`).toBeFalsy();
    }
  } finally {
    await deleteCategoryByApi(request, createdId!, adminLogin.token);
    await cleanupCategoriesByNames(request, adminLogin.token, [originalName, updatedName]);
  }
}

async function assertAdminDeleteAccepted(
  page: import('@playwright/test').Page,
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 Delete Target');
  const create = await createCategoryByApi(request, categoryName, adminLogin.token);
  const createdId = categoryIdFromBody(create.body);
  expect(createdId).toBeTruthy();

  const { response, body, text } = await deleteCategoryRawByApi(request, createdId!, adminLogin.token);
  const after = await fetchCategories(request);
  const stillPresent = after.find((category) => category.id === createdId || category.name === categoryName);

  await test.info().attach('admin-category-delete-response.json', {
    body: JSON.stringify({ status: response.status(), body, categoryName, createdId, stillPresent }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.acceptedStatuses ?? [200, 204]).toContain(response.status());
    expect.soft(text).toMatch(textPattern(testCase.expected.successPattern));
    expect.soft(stillPresent, `Deleted category ${categoryName} must not remain in list`).toBeFalsy();

    if (testCase.expected.verifyUi) {
      await loginAdminUi(page);
      await openCategoryManagement(page);
      await expect.soft(page.locator('body')).not.toContainText(categoryNamePattern(categoryName));
    }
  } finally {
    if (stillPresent) {
      await deleteCategoryByApi(request, stillPresent.id, adminLogin.token);
    }
    await cleanupCategoryByName(request, adminLogin.token, categoryName);
  }
}

async function assertAdminDeleteMissingRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const missingId = testCase.missingCategoryId ?? 999999;
  const before = await fetchCategories(request);
  const { response, body, text } = await deleteCategoryRawByApi(request, missingId, adminLogin.token);
  const after = await fetchCategories(request);
  const targetExists = after.find((category) => category.id === missingId);

  await test.info().attach('admin-category-delete-missing-response.json', {
    body: JSON.stringify({ status: response.status(), body, missingId, beforeCount: before.length, afterCount: after.length, targetExists }, null, 2),
    contentType: 'application/json',
  });

  expect.soft(testCase.expected.rejectedStatuses ?? [400, 404, 422]).toContain(response.status());
  expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  expect.soft(after.length, 'Deleting a missing category must not change category count').toBe(before.length);
  expect.soft(targetExists, `Missing category id ${missingId} must not exist after delete`).toBeFalsy();
}

async function assertUserDeleteRejected(
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const user = await prepareGeneratedUser(request, testCase.id);
  const categoryName = uniqueCategoryName(testCase.categoryNamePrefix ?? 'FR14 User Delete Target');
  const create = await createCategoryByApi(request, categoryName, adminLogin.token);
  const createdId = categoryIdFromBody(create.body);
  expect(createdId).toBeTruthy();

  const { response, body, text } = await deleteCategoryRawByApi(request, createdId!, user.token);
  const after = await fetchCategories(request);
  const stillPresent = after.find((category) => category.id === createdId && category.name === categoryName);

  await test.info().attach('user-category-delete-response.json', {
    body: JSON.stringify({ status: response.status(), body, categoryName, createdId, stillPresent }, null, 2),
    contentType: 'application/json',
  });

  try {
    expect.soft(testCase.expected.rejectedStatuses ?? [401, 403]).toContain(response.status());
    expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
    expect.soft(stillPresent, `User token must not delete category ${categoryName}`).toBeTruthy();
  } finally {
    if (stillPresent) {
      await deleteCategoryByApi(request, stillPresent.id, adminLogin.token);
    }
    await cleanupCategoryByName(request, adminLogin.token, categoryName);
  }
}

async function assertAdminCategoryExactCount(
  page: import('@playwright/test').Page,
  request: import('@playwright/test').APIRequestContext,
  testCase: Fr14Case,
) {
  const adminLogin = await loginAdminByApi(request);
  const targetCount = testCase.categorySetup?.targetCount ?? testCase.expected.exactCategoryCount ?? 0;
  const targetNames = Array.from({ length: targetCount }, () =>
    uniqueCategoryName(testCase.categorySetup?.namePrefix ?? 'FR14 Boundary Category'),
  );

  await withTemporaryCategorySet(request, adminLogin.token, targetNames, async (activeCategories) => {
    expect.soft(activeCategories.length).toBe(testCase.expected.exactCategoryCount ?? targetCount);

    await loginAdminUi(page);
    await openCategoryManagement(page);
    const body = page.locator('body');
    await expect.soft(body).toContainText(textPattern(testCase.expected.pagePattern));
    await expect.soft(body).not.toContainText(/404\s+not\s+found|not found|typeerror|exception/i);

    if (targetNames.length === 0) {
      for (const category of activeCategories) {
        await expect.soft(body).not.toContainText(categoryNamePattern(category.name));
      }
    } else {
      for (const name of targetNames) {
        await expect.soft(body).toContainText(categoryNamePattern(name));
      }
    }
  });
}

test.describe(`Run by: ${studentId} | FR-14 - Quản lý danh mục`, () => {
  test.beforeAll(() => {
    expect(cases.length).toBeGreaterThanOrEqual(22);
  });

  for (const testCase of cases) {
    test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
      page.on('dialog', (dialog) => dialog.accept().catch(() => undefined));
      test.info().annotations.push({ type: 'manual-source', description: testCase.source });

      if (testCase.kind === 'adminCategoryListVisible' || testCase.kind === 'adminCategoryListMany') {
        await assertAdminCategoryList(page, request, testCase);
        return;
      }

      if (testCase.kind === 'guestAdminScreenBlocked') {
        await assertAdminScreenBlocked(page, testCase);
        return;
      }

      if (testCase.kind === 'userAdminScreenBlocked') {
        const user = await prepareGeneratedUser(request, testCase.id);
        await attemptLoginUi(page, user.email, user.password);
        await assertAdminScreenBlocked(page, testCase);
        return;
      }

      if (testCase.kind === 'apiGuestCreateRejected') {
        await assertApiCreateRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiUserCreateRejected') {
        const user = await prepareGeneratedUser(request, testCase.id);
        await assertApiCreateRejected(request, testCase, user.token);
        return;
      }

      if (testCase.kind === 'apiAdminCreateAccepted') {
        await assertAdminCreateAccepted(page, request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminCreateRejected') {
        await assertAdminCreateRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminUpdateAccepted') {
        await assertAdminUpdateAccepted(page, request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminUpdateRejected') {
        await assertAdminUpdateRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminUpdateMissingRejected') {
        await assertAdminUpdateMissingRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiUserUpdateRejected') {
        await assertUserUpdateRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminDeleteAccepted') {
        await assertAdminDeleteAccepted(page, request, testCase);
        return;
      }

      if (testCase.kind === 'apiAdminDeleteMissingRejected') {
        await assertAdminDeleteMissingRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'apiUserDeleteRejected') {
        await assertUserDeleteRejected(request, testCase);
        return;
      }

      if (testCase.kind === 'adminCategoryListExactCount') {
        await assertAdminCategoryExactCount(page, request, testCase);
        return;
      }

      throw new Error(`Unsupported FR-14 test kind: ${testCase.kind}`);
    });
  }
});
