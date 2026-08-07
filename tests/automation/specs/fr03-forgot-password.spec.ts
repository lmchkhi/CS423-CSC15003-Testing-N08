import { expect, test } from '@playwright/test';
import fr03Cases from '../data/fr03-forgot-password.json';

type Fr03Case = {
  id: string;
  title: string;
  source: string;
  kind:
    | 'uiForgotValidEmail'
    | 'uiBackToLoginAtStepOne'
    | 'uiForgotRejected'
    | 'uiResetSuccess'
    | 'uiConfirmPasswordRequired'
    | 'apiResetRejected'
    | 'apiResetRejectedAfterOtp'
    | 'apiOtherEmailOtpRejected'
    | 'apiGeneratedOtpLength'
    | 'apiResetAcceptedAfterOtp';
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
  resetToken?: string;
  overrideResetToken?: string;
  expectedStatus?: number;
  expectedUrlPattern?: string;
  expectedStepPattern?: string;
  expectedOtpPattern?: string;
  expectedErrorPattern?: string;
  expectedSuccessPattern?: string;
  expectedBodyPattern?: string;
  mustNotContainPattern?: string;
};

const cases = fr03Cases as Fr03Case[];
const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
const studentId = process.env.STUDENT_ID ?? '23127475';
const runId = (process.env.HW04_RUN_AT ?? new Date().toISOString()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 14);
let tempCounter = 0;

function uniqueEmail(testId: string): string {
  tempCounter += 1;
  return `fr03.${runId}.${tempCounter}.${testId.toLowerCase().replace(/[^a-z0-9]/g, '')}@example.com`;
}

function textPattern(pattern?: string): RegExp {
  return new RegExp(pattern ?? '.', 'i');
}

function emailInput(page: import('@playwright/test').Page) {
  return page
    .getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .or(page.getByRole('textbox'))
    .first();
}

async function registerUser(request: import('@playwright/test').APIRequestContext, email: string, password = 'Test1234!') {
  const response = await request.post(`${apiBaseUrl}/api/register`, {
    data: {
      name: `FR03 ${email}`,
      email,
      password,
    },
  });
  expect.soft([200, 201, 409]).toContain(response.status());
}

async function requestOtpByApi(request: import('@playwright/test').APIRequestContext, email: string): Promise<string> {
  const response = await request.post(`${apiBaseUrl}/api/forgot-password`, { data: { email } });
  expect.soft(response.status()).toBe(200);
  const body = await response.json();
  expect.soft(body).toHaveProperty('resetToken');
  return String(body.resetToken ?? '');
}

async function resetPasswordByApi(
  request: import('@playwright/test').APIRequestContext,
  email: string,
  resetToken: string,
  newPassword: string,
) {
  return request.post(`${apiBaseUrl}/api/reset-password`, {
    data: {
      email,
      resetToken,
      newPassword,
    },
  });
}

async function requestOtpByUi(page: import('@playwright/test').Page, email: string): Promise<string> {
  await page.goto('/forgot-password');
  const input = emailInput(page);
  await expect(input).toBeVisible();
  await input.fill(email);
  await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
  const bodyText = await page.locator('body').innerText();
  return bodyText.match(/\b\d{4,7}\b/)?.[0] ?? '';
}

async function fillResetForm(page: import('@playwright/test').Page, otp: string, password: string, confirmPassword?: string) {
  const fields = page.getByRole('textbox');
  await expect(fields.first()).toBeVisible();
  await fields.nth(0).fill(otp);
  await fields.nth(1).fill(password);
  if (confirmPassword !== undefined && (await fields.count()) >= 3) {
    await fields.nth(2).fill(confirmPassword);
  }
  await page.getByRole('button', { name: /đặt lại|reset|submit/i }).first().click();
}

test.describe(`Run by: ${studentId} | FR-03 - Quên mật khẩu`, () => {
  test.beforeAll(() => {
    expect(cases.length).toBeGreaterThanOrEqual(12);
  });

  for (const testCase of cases) {
    test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
      test.info().annotations.push({ type: 'manual-source', description: testCase.source });

      if (testCase.kind === 'uiForgotValidEmail') {
        await page.goto('/forgot-password');
        await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedStepPattern));

        const input = emailInput(page);
        await expect(input).toBeVisible();
        await input.fill(testCase.email!);
        await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
        await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedOtpPattern));

        const apiOtp = await requestOtpByApi(request, testCase.email!);
        expect.soft(apiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
        return;
      }

      if (testCase.kind === 'uiBackToLoginAtStepOne') {
        await page.goto('/forgot-password');
        const backButton = page.getByRole('button', { name: /quay lại.*đăng nhập|back.*login/i }).first();
        await expect(backButton).toBeVisible();
        await backButton.click();
        await expect(page).toHaveURL(textPattern(testCase.expectedUrlPattern));
        return;
      }

      if (testCase.kind === 'uiForgotRejected') {
        await page.goto('/forgot-password');
        const input = emailInput(page);
        await expect(input).toBeVisible();
        if (testCase.email) {
          await input.fill(testCase.email);
        }
        await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
        await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedErrorPattern));
        await expect.soft(page.locator('body')).not.toContainText(textPattern(testCase.mustNotContainPattern));
        return;
      }

      if (testCase.kind === 'uiResetSuccess') {
        const email = uniqueEmail(testCase.id);
        await registerUser(request, email);
        const uiOtp = await requestOtpByUi(page, email);
        expect.soft(uiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
        await fillResetForm(page, uiOtp, testCase.newPassword!);
        await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedSuccessPattern));
        return;
      }

      if (testCase.kind === 'uiConfirmPasswordRequired') {
        const email = uniqueEmail(testCase.id);
        await registerUser(request, email);
        await requestOtpByUi(page, email);
        await expect.soft(page.getByRole('textbox')).toHaveCount(3);
        await fillResetForm(page, '123456', testCase.newPassword!, testCase.confirmPassword);
        await expect.soft(page.locator('body')).toContainText(/không khớp|mismatch|confirm|xác nhận/i);
        return;
      }

      if (testCase.kind === 'apiResetRejected') {
        const response = await resetPasswordByApi(
          request,
          testCase.email!,
          testCase.resetToken!,
          testCase.newPassword!,
        );
        expect.soft(response.status()).toBe(testCase.expectedStatus);
        expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
        return;
      }

      if (testCase.kind === 'apiResetRejectedAfterOtp' || testCase.kind === 'apiResetAcceptedAfterOtp') {
        const email = uniqueEmail(testCase.id);
        await registerUser(request, email);
        const otp = await requestOtpByApi(request, email);
        const response = await resetPasswordByApi(
          request,
          email,
          testCase.overrideResetToken ?? otp,
          testCase.newPassword ?? '',
        );
        expect.soft(response.status()).toBe(testCase.expectedStatus);
        expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
        return;
      }

      if (testCase.kind === 'apiOtherEmailOtpRejected') {
        const emailA = uniqueEmail(`${testCase.id}a`);
        const emailB = uniqueEmail(`${testCase.id}b`);
        await registerUser(request, emailA);
        await registerUser(request, emailB);
        const otpOfA = await requestOtpByApi(request, emailA);
        const response = await resetPasswordByApi(request, emailB, otpOfA, testCase.newPassword!);
        expect.soft(response.status()).toBe(testCase.expectedStatus);
        expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
        return;
      }

      if (testCase.kind === 'apiGeneratedOtpLength') {
        const email = uniqueEmail(testCase.id);
        await registerUser(request, email);
        const otp = await requestOtpByApi(request, email);
        expect.soft(otp).toMatch(textPattern(testCase.expectedOtpPattern));
        return;
      }

      throw new Error(`Unsupported FR-03 test kind: ${testCase.kind}`);
    });
  }
});
