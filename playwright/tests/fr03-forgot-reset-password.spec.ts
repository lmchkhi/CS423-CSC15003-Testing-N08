import { expect, type APIRequestContext, type Locator, type Page, test } from '@playwright/test';
import { loadFr03Cases, type Fr03Case } from '../utils/fr03Data';

type RegisterResponse = {
  message?: string;
  id?: number;
};

type ForgotPasswordResponse = {
  message?: string;
  resetToken?: string;
};

type LoginResponse = {
  token?: string;
  user?: unknown;
};

const apiBaseUrl = process.env.API_URL ?? 'http://localhost:3000';
const softTimeout = 750;

function pathOrDefault(value: string | undefined, fallback: string): string {
  return value ?? fallback;
}

function uniqueEmail(testCase: Fr03Case, suffix = ''): string {
  const prefix = testCase.emailPrefix ?? 'fr03.automation';
  const domain = testCase.emailDomain ?? 'example.com';
  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}${suffix}.${runId}@${domain}`;
}

async function createUser(request: APIRequestContext, testCase: Fr03Case, email: string): Promise<void> {
  const response = await request.post(`${apiBaseUrl}/api/register`, {
    data: {
      name: testCase.accountName ?? 'FR03 Automation User',
      email,
      password: testCase.initialPassword ?? 'OldPass123!'
    }
  });

  expect(response.status(), 'registered user setup should succeed through public API').toBe(200);
  const body = (await response.json()) as RegisterResponse;
  expect(body).toMatchObject({ message: expect.any(String) });
}

async function loginStatus(request: APIRequestContext, email: string, password: string): Promise<number> {
  const response = await request.post(`${apiBaseUrl}/api/login`, {
    data: { email, password }
  });
  return response.status();
}

async function assertLoginSucceeds(request: APIRequestContext, email: string, password: string): Promise<void> {
  const response = await request.post(`${apiBaseUrl}/api/login`, {
    data: { email, password }
  });

  expect(response.status(), 'login should succeed').toBe(200);
  const body = (await response.json()) as LoginResponse;
  expect(body, 'login response should include a JWT token').toHaveProperty('token');
  expect(body.token).toEqual(expect.any(String));
}

async function forgotPasswordApi(request: APIRequestContext, email: string): Promise<ForgotPasswordResponse> {
  const response = await request.post(`${apiBaseUrl}/api/forgot-password`, {
    data: { email }
  });

  expect(response.status(), 'forgot-password API setup should return an OTP for a registered email').toBe(200);
  return (await response.json()) as ForgotPasswordResponse;
}

async function resetPasswordApi(
  request: APIRequestContext,
  email: string,
  resetToken: string,
  newPassword: string
): Promise<number> {
  const response = await request.post(`${apiBaseUrl}/api/reset-password`, {
    data: { email, resetToken, newPassword }
  });
  return response.status();
}

async function visible(locator: Locator, timeout = softTimeout): Promise<boolean> {
  try {
    await expect(locator.first()).toBeVisible({ timeout });
    return true;
  } catch {
    return false;
  }
}

async function firstVisible(locators: Locator[], label: string): Promise<Locator> {
  for (const locator of locators) {
    const count = await locator.count();
    for (let index = 0; index < Math.max(count, 1); index += 1) {
      const candidate = count > 0 ? locator.nth(index) : locator.first();
      if (await visible(candidate)) {
        return candidate;
      }
    }
  }

  throw new Error(`Could not find visible control: ${label}`);
}

async function openForgotPasswordPage(page: Page, testCase: Fr03Case): Promise<void> {
  await page.goto(pathOrDefault(testCase.forgotPasswordPath, '/forgot-password'));
  await page.waitForLoadState('domcontentloaded');
}

async function submitCurrentForm(page: Page): Promise<void> {
  const submit = await firstVisible(
    [
      page.getByRole('button', {
        name: /gửi|lấy mã|tiếp tục|đặt lại|xác nhận|submit|send|reset|continue/i
      }),
      page.locator('button[type="submit"], input[type="submit"]')
    ],
    'form submit'
  );

  await submit.click();
}

async function emailInput(page: Page): Promise<Locator> {
  return firstVisible(
    [
      page.getByLabel(/email|e-mail|địa chỉ email/i),
      page.getByPlaceholder(/email|e-mail|địa chỉ email/i),
      page.locator('input[type="email"]'),
      page.locator('form input').first()
    ],
    'forgot-password email input'
  );
}

async function fillForgotPasswordEmail(page: Page, email: string): Promise<void> {
  const input = await emailInput(page);
  await input.fill(email);
  await expect(input).toHaveValue(email);
}

function extractionPattern(testCase: Fr03Case): RegExp {
  return new RegExp(testCase.otpExtractionPattern ?? 'Mã OTP của bạn là:\\s*(\\d{4,6})');
}

function expectedOtpPattern(testCase: Fr03Case): RegExp {
  return new RegExp(testCase.expectedOtpPattern ?? '\\b\\d{6}\\b');
}

async function maybeVisibleOtp(page: Page, testCase: Fr03Case): Promise<string | null> {
  const bodyText = (await page.locator('body').textContent()) ?? '';
  const match = bodyText.match(extractionPattern(testCase));
  return match ? match[1] ?? match[0] : null;
}

async function requireVisibleOtp(page: Page, testCase: Fr03Case): Promise<string> {
  await expect(page.locator('body'), 'demo UI should display an OTP value usable in Step 2').toContainText(
    extractionPattern(testCase),
    { timeout: 3_000 }
  );
  const otp = await maybeVisibleOtp(page, testCase);
  if (!otp) {
    throw new Error('Could not extract a visible OTP from the forgot-password page.');
  }
  return otp;
}

async function requestOtpViaUi(
  page: Page,
  testCase: Fr03Case,
  email: string | null
): Promise<{ responseStatus: number | null; otp: string | null }> {
  await openForgotPasswordPage(page, testCase);

  if (email !== null) {
    await fillForgotPasswordEmail(page, email);
  }

  const responsePromise = page
    .waitForResponse((response) => response.url().includes('/api/forgot-password'), { timeout: 3_000 })
    .catch(() => null);
  await submitCurrentForm(page);
  const response = await responsePromise;
  await page.waitForTimeout(250);

  return {
    responseStatus: response?.status() ?? null,
    otp: await maybeVisibleOtp(page, testCase)
  };
}

async function createUserAndRequestOtp(
  page: Page,
  request: APIRequestContext,
  testCase: Fr03Case
): Promise<{ email: string; otp: string }> {
  const email = uniqueEmail(testCase);
  await createUser(request, testCase, email);
  const result = await requestOtpViaUi(page, testCase, email);

  expect(result.responseStatus, 'registered email OTP request should succeed').toBe(200);
  const otp = await requireVisibleOtp(page, testCase);
  return { email, otp };
}

async function fillResetForm(page: Page, otp: string, newPassword: string, confirmPassword?: string): Promise<number> {
  const otpInput = await firstVisible(
    [
      page.getByLabel(/otp|mã|token/i),
      page.getByPlaceholder(/otp|mã|token/i),
      page.locator(
        'input[name*="otp" i], input[name*="token" i], input[autocomplete="one-time-code"], input[type="number"], input[type="text"]'
      )
    ],
    'OTP input'
  );
  await otpInput.fill(otp);
  await expect(otpInput).toHaveValue(otp);

  const passwordInputs = page.locator('input[type="password"]');
  const passwordInputCount = await passwordInputs.count();
  expect(passwordInputCount, 'reset step should expose at least one password input').toBeGreaterThanOrEqual(1);

  await passwordInputs.nth(0).fill(newPassword);
  await expect(passwordInputs.nth(0)).toHaveValue(newPassword);
  if (passwordInputCount >= 2) {
    await passwordInputs.nth(1).fill(confirmPassword ?? newPassword);
    await expect(passwordInputs.nth(1)).toHaveValue(confirmPassword ?? newPassword);
  }

  return passwordInputCount;
}

async function submitReset(page: Page): Promise<number | null> {
  const responsePromise = page
    .waitForResponse((response) => response.url().includes('/api/reset-password'), { timeout: 3_000 })
    .catch(() => null);
  await submitCurrentForm(page);
  const response = await responsePromise;
  await page.waitForTimeout(250);
  return response?.status() ?? null;
}

async function expectPasswordUnchanged(
  request: APIRequestContext,
  email: string,
  oldPassword: string,
  rejectedPassword: string
): Promise<void> {
  expect(await loginStatus(request, email, rejectedPassword), 'rejected password must not become valid').not.toBe(200);
  await assertLoginSucceeds(request, email, oldPassword);
}

for (const testCase of loadFr03Cases()) {
  test(`${testCase.id} ${testCase.title}`, async ({ page, request }) => {
    switch (testCase.kind) {
      case 'stepOneIndicator': {
        await openForgotPasswordPage(page, testCase);
        await expect(page.locator('body')).toContainText(new RegExp(testCase.expectedStepOnePattern ?? 'Bước\\s*1'));
        break;
      }

      case 'backToLogin': {
        await openForgotPasswordPage(page, testCase);
        const backText = new RegExp(testCase.expectedBackToLoginPattern ?? 'Quay lại đăng nhập', 'i');
        const backControl = page.getByText(backText);
        await expect(backControl).toBeVisible({ timeout: 1_500 });
        await backControl.click();
        await expect(page).toHaveURL(new RegExp(pathOrDefault(testCase.loginPath, '/login')));
        break;
      }

      case 'emailInputType': {
        await openForgotPasswordPage(page, testCase);
        await expect(await emailInput(page)).toHaveAttribute('type', testCase.expectedEmailType ?? 'email');
        break;
      }

      case 'emptyEmailRejected': {
        const result = await requestOtpViaUi(page, testCase, null);
        expect(result.responseStatus, 'empty email should not be accepted by the UI/API').not.toBe(200);
        expect(result.otp, 'empty email must not produce a visible OTP').toBeNull();
        await expect(page.locator('body')).not.toContainText(extractionPattern(testCase));
        break;
      }

      case 'invalidEmailRejected': {
        const result = await requestOtpViaUi(page, testCase, testCase.requestEmail ?? 'not-an-email');
        expect(result.responseStatus, 'invalid email format should not be accepted').not.toBe(200);
        expect(result.otp, 'invalid email format must not produce a visible OTP').toBeNull();
        break;
      }

      case 'unregisteredEmailRejected': {
        const result = await requestOtpViaUi(page, testCase, uniqueEmail(testCase));
        expect(result.responseStatus, 'unregistered email should not receive an OTP').not.toBe(200);
        expect(result.otp, 'unregistered email must not produce a visible OTP').toBeNull();
        break;
      }

      case 'otpSixDigits': {
        const { otp } = await createUserAndRequestOtp(page, request, testCase);
        await expect(page.locator('body')).toContainText(expectedOtpPattern(testCase), { timeout: 1_500 });
        expect(otp, 'OTP must be exactly 6 digits').toMatch(/^\d{6}$/);
        break;
      }

      case 'stepTwoIndicator': {
        const email = uniqueEmail(testCase);
        await createUser(request, testCase, email);
        await requestOtpViaUi(page, testCase, email);
        await expect(page.locator('body')).toContainText(new RegExp(testCase.expectedStepTwoPattern ?? 'Bước\\s*2'));
        break;
      }

      case 'resetFormFields': {
        const email = uniqueEmail(testCase);
        await createUser(request, testCase, email);
        await requestOtpViaUi(page, testCase, email);
        await expect(page.locator('input')).toHaveCount(
          Math.max(2, testCase.expectedPasswordInputCount ?? 2),
          { timeout: 1_500 }
        );
        expect(await page.locator('input[type="password"]').count()).toBeGreaterThanOrEqual(
          testCase.expectedPasswordInputCount ?? 2
        );
        break;
      }

      case 'weakPasswordRejected': {
        const { email, otp } = await createUserAndRequestOtp(page, request, testCase);
        const passwordInputCount = await fillResetForm(page, otp, testCase.newPassword ?? 'Aa1!');
        expect
          .soft(passwordInputCount, 'reset form should still provide password confirmation')
          .toBeGreaterThanOrEqual(2);
        const resetStatus = await submitReset(page);
        expect(resetStatus, 'weak password reset should be rejected').not.toBe(200);
        await expectPasswordUnchanged(
          request,
          email,
          testCase.initialPassword ?? 'OldPass123!',
          testCase.newPassword ?? 'Aa1!'
        );
        break;
      }

      case 'mismatchedConfirmRejected': {
        const { email, otp } = await createUserAndRequestOtp(page, request, testCase);
        const passwordInputCount = await fillResetForm(
          page,
          otp,
          testCase.newPassword ?? 'NewPass123!',
          testCase.confirmPassword ?? 'Different123!'
        );
        expect(passwordInputCount, 'FR-03 requires a confirm-new-password field').toBeGreaterThanOrEqual(2);
        const resetStatus = await submitReset(page);
        expect(resetStatus, 'mismatched password confirmation should be rejected').not.toBe(200);
        await expectPasswordUnchanged(
          request,
          email,
          testCase.initialPassword ?? 'OldPass123!',
          testCase.newPassword ?? 'NewPass123!'
        );
        break;
      }

      case 'wrongOtpRejected': {
        const email = uniqueEmail(testCase);
        await createUser(request, testCase, email);
        await requestOtpViaUi(page, testCase, email);
        await fillResetForm(page, testCase.otpOverride ?? '000000', testCase.newPassword ?? 'NewPass123!');
        const resetStatus = await submitReset(page);
        expect(resetStatus, 'wrong OTP should be rejected').not.toBe(200);
        await expectPasswordUnchanged(
          request,
          email,
          testCase.initialPassword ?? 'OldPass123!',
          testCase.newPassword ?? 'NewPass123!'
        );
        break;
      }

      case 'otpEmailScope': {
        const emailA = uniqueEmail(testCase, '.a');
        const emailB = uniqueEmail(testCase, '.b');
        await createUser(request, testCase, emailA);
        await createUser(request, testCase, emailB);
        const forgotBody = await forgotPasswordApi(request, emailA);
        expect(forgotBody.resetToken, 'forgot-password API must return an OTP/resetToken in demo mode').toEqual(
          expect.any(String)
        );

        const resetStatus = await resetPasswordApi(
          request,
          emailB,
          String(forgotBody.resetToken),
          testCase.newPassword ?? 'NewPass123!'
        );
        expect(resetStatus, 'OTP must only be valid for the email that requested it').not.toBe(200);
        await expectPasswordUnchanged(
          request,
          emailB,
          testCase.initialPassword ?? 'OldPass123!',
          testCase.newPassword ?? 'NewPass123!'
        );
        break;
      }

      case 'successfulReset': {
        const { email, otp } = await createUserAndRequestOtp(page, request, testCase);
        expect.soft(otp, 'OTP should be exactly 6 digits before reset is attempted').toMatch(/^\d{6}$/);
        const passwordInputCount = await fillResetForm(page, otp, testCase.newPassword ?? 'NewPass123!');
        expect
          .soft(passwordInputCount, 'successful reset flow should include password confirmation')
          .toBeGreaterThanOrEqual(2);
        const resetStatus = await submitReset(page);
        expect.soft(resetStatus, 'successful reset request should return 200').toBe(200);
        await expect
          .soft(page.locator('body'))
          .toContainText(new RegExp(testCase.expectedSuccessPattern ?? 'thành công|success|đăng nhập|login', 'i'), {
            timeout: 1_500
          });
        await assertLoginSucceeds(request, email, testCase.newPassword ?? 'NewPass123!');
        break;
      }
    }
  });
}
