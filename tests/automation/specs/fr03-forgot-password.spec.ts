import { expect, test } from '@playwright/test';
import fr03Cases from '../data/fr03-forgot-password.json';

const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
const studentId = process.env.STUDENT_ID ?? '23127475';

test.describe(`Run by: ${studentId} | FR-03 - Quên mật khẩu`, () => {
  for (const testCase of fr03Cases) {
    test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
      await test.step('Mở trang quên mật khẩu và kiểm tra step indicator', async () => {
        await page.goto('/forgot-password');
        await expect.soft(page.locator('body')).toContainText(
          new RegExp(testCase.expectedStepPattern, 'i'),
        );
      });

      await test.step('Nhập email đã đăng ký và gửi yêu cầu OTP trên UI', async () => {
        const emailInput = page
          .getByLabel(/email/i)
          .or(page.getByPlaceholder(/email/i))
          .or(page.locator('input[type="email"]'))
          .or(page.getByRole('textbox'))
          .first();

        await expect(emailInput).toBeVisible();
        await emailInput.fill(testCase.email);

        const submitButton = page
          .getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i })
          .first();
        await expect(submitButton).toBeVisible();
        await submitButton.click();
        await expect.soft(page.locator('body')).toContainText(/\d{6}/);
      });

      await test.step('Đối chiếu API demo sinh OTP đúng 6 chữ số', async () => {
        const response = await request.post(`${apiBaseUrl}/api/forgot-password`, {
          data: { email: testCase.email },
        });
        expect.soft(response.status()).toBe(200);

        const body = await response.json();
        expect.soft(body).toHaveProperty('resetToken');
        expect.soft(String(body.resetToken)).toMatch(new RegExp(testCase.expectedOtpPattern));
      });
    });
  }
});
