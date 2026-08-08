import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { RegisterPage } from '../pages/RegisterPage.mjs';

const data = JSON.parse(
  readFileSync(new URL('../data/account-registration.json', import.meta.url), 'utf8'),
);

if (!Array.isArray(data.cases) || data.cases.length < 12) {
  throw new Error('FR-01 requires at least 12 external test-data rows.');
}

const runId = `${Date.now()}-${process.pid}`;
const apiBaseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:3000';
const resolveCase = (testCase) => JSON.parse(
  JSON.stringify(testCase).replaceAll('{runId}', runId),
);

test.describe('FR-01 - Đăng ký tài khoản', () => {
  for (const sourceCase of data.cases) {
    test(`${sourceCase.id}: ${sourceCase.title}`, async ({ page, request }) => {
      const testCase = resolveCase(sourceCase);

      if (testCase.scenario === 'duplicate') {
        const response = await request.post(`${apiBaseURL}/api/register`, {
          data: {
            name: testCase.name,
            email: testCase.email,
            password: testCase.password,
          },
        });

        expect(response.status()).toBe(409);
        const responseBody = await response.json();
        expect(responseBody.error).toMatch(/email.*(tồn tại|đã được sử dụng|exist)/i);
        return;
      }

      const register = new RegisterPage(page);
      await register.goto();

      if (testCase.scenario === 'emailType') {
        await expect(register.emailInput).toHaveAttribute('type', 'email');
        return;
      }

      if (testCase.scenario === 'confirmField') {
        await expect(register.confirmPasswordInput).toHaveCount(1);
        await expect(register.confirmPasswordInput).toHaveAttribute('type', 'password');
        await expect(register.confirmPasswordInput).toHaveAttribute('required', '');
        return;
      }

      if (testCase.scenario === 'invalidEmail') {
        let registrationRequestCount = 0;
        page.on('request', (outgoingRequest) => {
          const url = new URL(outgoingRequest.url());
          if (
            url.pathname === '/api/register' &&
            outgoingRequest.method() === 'POST'
          ) {
            registrationRequestCount += 1;
          }
        });

        await register.fill(testCase);
        await expect(register.emailInput).toHaveAttribute('type', 'email');
        await register.submit();

        await expect(register.emailInput).toBeFocused();
        expect(
          await register.emailInput.evaluate((input) => input.validity.typeMismatch),
        ).toBe(true);
        await expect(page).toHaveURL(/\/register$/);
        expect(registrationRequestCount).toBe(0);
        return;
      }

      await register.fill(testCase);
      await register.submit();

      if (testCase.scenario === 'success') {
        await expect(page).toHaveURL(/\/login$/);
        await expect(page.getByRole('button', { name: 'Đăng Nhập' })).toBeVisible();
        return;
      }

      if (testCase.scenario === 'required') {
        const missingInput = {
          name: register.nameInput,
          email: register.emailInput,
          password: register.passwordInput,
        }[testCase.missingField];
        await expect(page).toHaveURL(/\/register$/);
        await expect(missingInput).toBeFocused();
        expect(await missingInput.evaluate((input) => input.validity.valueMissing)).toBe(true);
        return;
      }

      if (testCase.scenario === 'weakPassword') {
        await expect(page).toHaveURL(/\/register$/);
        await expect(register.errorMessage).toContainText('Mật khẩu quá yếu!');
        return;
      }

      if (testCase.scenario === 'mismatch') {
        await expect(register.confirmPasswordInput).toHaveCount(1);
        await expect(page).toHaveURL(/\/register$/);
        await expect(register.errorMessage).toBeVisible();
        return;
      }

    });
  }
});
