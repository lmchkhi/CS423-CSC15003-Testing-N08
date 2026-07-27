import path from 'node:path';
import { expect, test, type APIRequestContext, type Locator, type Page } from '@playwright/test';
import { loadCases } from './support/data-loader';

type FieldName = 'name' | 'email' | 'password' | 'confirmPassword';
type Journey = 'submit' | 'duplicateEmail' | 'inspectField';
type ExpectedKind = 'navigation' | 'errorMessage' | 'browserValidation' | 'fieldAttribute';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterExpected {
  kind: ExpectedKind;
  value?: string;
  field?: FieldName;
  attribute?: string;
}

interface RegisterCase {
  id: string;
  titleVi: string;
  category: string;
  coveredRule: string;
  journey: Journey;
  input: RegisterInput;
  expected: RegisterExpected;
}

const journeys: Journey[] = ['submit', 'duplicateEmail', 'inspectField'];
const expectedKinds: ExpectedKind[] = [
  'navigation',
  'errorMessage',
  'browserValidation',
  'fieldAttribute',
];
const fields: FieldName[] = ['name', 'email', 'password', 'confirmPassword'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRegisterCase(value: unknown): value is RegisterCase {
  if (!isRecord(value) || !isRecord(value.input) || !isRecord(value.expected)) return false;

  const expectedField = value.expected.field;
  const baseShapeIsValid =
    typeof value.id === 'string' &&
    /^FR01-TC-\d{3}$/.test(value.id) &&
    typeof value.titleVi === 'string' &&
    value.titleVi.length > 0 &&
    typeof value.category === 'string' &&
    value.category.length > 0 &&
    typeof value.coveredRule === 'string' &&
    value.coveredRule.length > 0 &&
    typeof value.journey === 'string' &&
    journeys.includes(value.journey as Journey) &&
    typeof value.input.name === 'string' &&
    typeof value.input.email === 'string' &&
    typeof value.input.password === 'string' &&
    typeof value.input.confirmPassword === 'string' &&
    typeof value.expected.kind === 'string' &&
    expectedKinds.includes(value.expected.kind as ExpectedKind) &&
    (expectedField === undefined ||
      (typeof expectedField === 'string' && fields.includes(expectedField as FieldName))) &&
    (value.expected.value === undefined || typeof value.expected.value === 'string') &&
    (value.expected.attribute === undefined || typeof value.expected.attribute === 'string');

  if (!baseShapeIsValid) return false;

  if (value.expected.kind === 'navigation' || value.expected.kind === 'errorMessage') {
    return typeof value.expected.value === 'string' && value.expected.value.length > 0;
  }
  if (value.expected.kind === 'browserValidation') {
    return typeof expectedField === 'string' && fields.includes(expectedField as FieldName);
  }
  return (
    value.expected.kind === 'fieldAttribute' &&
    typeof expectedField === 'string' &&
    fields.includes(expectedField as FieldName) &&
    typeof value.expected.attribute === 'string' &&
    value.expected.attribute.length > 0 &&
    typeof value.expected.value === 'string'
  );
}

const dataPath = path.resolve(process.cwd(), 'test-data/fr-01-register.json');
const cases = loadCases<RegisterCase>(dataPath, isRegisterCase);
const runId = `${Date.now()}-${process.pid}`;

function resolveTokens(value: string): string {
  return value.replaceAll('{{RUN_ID}}', runId);
}

function fieldLocator(page: Page, field: FieldName): Locator {
  const labels: Record<FieldName, RegExp> = {
    name: /^Họ Tên$/i,
    email: /^Email$/i,
    password: /^Mật khẩu$/i,
    confirmPassword: /^Xác nhận mật khẩu$/i,
  };
  return page.getByText(labels[field], { exact: true }).locator('..').locator('input');
}

async function fillRegistrationForm(page: Page, input: RegisterInput): Promise<void> {
  await fieldLocator(page, 'name').fill(input.name);
  await fieldLocator(page, 'email').fill(resolveTokens(input.email));
  await fieldLocator(page, 'password').fill(input.password);

  const confirmPassword = fieldLocator(page, 'confirmPassword');
  if ((await confirmPassword.count()) > 0) {
    await confirmPassword.fill(input.confirmPassword);
  }
}

async function seedDuplicateEmail(request: APIRequestContext, input: RegisterInput): Promise<void> {
  const response = await request.post('http://127.0.0.1:3000/api/register', {
    data: {
      name: `Thiết lập ${input.name}`,
      email: resolveTokens(input.email),
      password: input.password,
    },
  });
  expect(response.ok(), 'Tiền điều kiện tạo email đã tồn tại phải thành công').toBe(true);
}

test.describe('FR-01 | Đăng ký tài khoản', () => {
  for (const testCase of cases) {
    test(`${testCase.id} | ${testCase.titleVi}`, async ({ page, request }) => {
      await page.goto('/register');

      if (testCase.journey === 'inspectField') {
        const field = fieldLocator(page, testCase.expected.field as FieldName);
        await expect(field).toBeVisible();
        await expect(field).toHaveAttribute(
          testCase.expected.attribute as string,
          testCase.expected.value as string,
        );
        return;
      }

      if (testCase.journey === 'duplicateEmail') {
        await seedDuplicateEmail(request, testCase.input);
      }

      await fillRegistrationForm(page, testCase.input);
      await page.getByRole('button', { name: /^Đăng Ký$/i }).click();

      if (testCase.expected.kind === 'navigation') {
        await expect(page).toHaveURL(new RegExp(`${testCase.expected.value}$`));
        return;
      }

      if (testCase.expected.kind === 'browserValidation') {
        const field = fieldLocator(page, testCase.expected.field as FieldName);
        await expect(field).toBeVisible();
        expect(
          await field.evaluate((element) => (element as HTMLInputElement).checkValidity()),
        ).toBe(false);
        await expect(page).toHaveURL(/\/register$/);
        return;
      }

      const errorMessage = page.getByText(new RegExp(testCase.expected.value as string, 'i')).first();
      await expect(errorMessage).toBeVisible();
      await expect(page).toHaveURL(/\/register$/);
    });
  }
});
