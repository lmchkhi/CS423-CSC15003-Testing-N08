# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr03-forgot-password.spec.ts >> Run by: 23127475 | FR-03 - Quên mật khẩu >> TC-FR03-DT-001 - Lấy OTP thành công với email đã đăng ký
- Location: tests/automation/specs/fr03-forgot-password.spec.ts:9:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 5000ms
Expected pattern: /Bước\s*1\s*\/\s*2|Step\s*1\s*\/\s*2/i
Received string:  "
    EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuNhập Email của bạnLấy mã OTP© 2026 EShop SUT. Dành cho mục đích kiểm thử.·········
"

Call log:
  - Expect "soft toContainText" with timeout 5000ms
  - waiting for locator('body')
    14 × locator resolved to <body>…</body>
       - unexpected value "
    EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuNhập Email của bạnLấy mã OTP© 2026 EShop SUT. Dành cho mục đích kiểm thử.
    
  

"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Quên Mật Khẩu" [level=2]
  - text: Nhập Email của bạn
  - textbox
  - button "Lấy mã OTP"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 5000ms
Expected pattern: /\d{6}/
Received string:  "
    EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuMã OTP của bạn là: 6892Mã OTP (4 số)Mật khẩu mớiĐặt lại mật khẩu← Quay lại© 2026 EShop SUT. Dành cho mục đích kiểm thử.·········
"

Call log:
  - Expect "soft toContainText" with timeout 5000ms
  - waiting for locator('body')
    14 × locator resolved to <body>…</body>
       - unexpected value "
    EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuMã OTP của bạn là: 6892Mã OTP (4 số)Mật khẩu mớiĐặt lại mật khẩu← Quay lại© 2026 EShop SUT. Dành cho mục đích kiểm thử.
    
  

"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Quên Mật Khẩu" [level=2]
  - text: "Mã OTP của bạn là: 6892 Mã OTP (4 số)"
  - textbox
  - text: Mật khẩu mới
  - textbox
  - button "Đặt lại mật khẩu"
  - button "← Quay lại"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

```
Error: expect(received).toMatch(expected)

Expected pattern: /^\d{6}$/
Received string:  "5792"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import fr03Cases from '../data/fr03-forgot-password.json';
  3  | 
  4  | const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  5  | const studentId = process.env.STUDENT_ID ?? '23127475';
  6  | 
  7  | test.describe(`Run by: ${studentId} | FR-03 - Quên mật khẩu`, () => {
  8  |   for (const testCase of fr03Cases) {
  9  |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  10 |       await test.step('Mở trang quên mật khẩu và kiểm tra step indicator', async () => {
  11 |         await page.goto('/forgot-password');
  12 |         await expect.soft(page.locator('body')).toContainText(
  13 |           new RegExp(testCase.expectedStepPattern, 'i'),
  14 |         );
  15 |       });
  16 | 
  17 |       await test.step('Nhập email đã đăng ký và gửi yêu cầu OTP trên UI', async () => {
  18 |         const emailInput = page
  19 |           .getByLabel(/email/i)
  20 |           .or(page.getByPlaceholder(/email/i))
  21 |           .or(page.locator('input[type="email"]'))
  22 |           .or(page.getByRole('textbox'))
  23 |           .first();
  24 | 
  25 |         await expect(emailInput).toBeVisible();
  26 |         await emailInput.fill(testCase.email);
  27 | 
  28 |         const submitButton = page
  29 |           .getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i })
  30 |           .first();
  31 |         await expect(submitButton).toBeVisible();
  32 |         await submitButton.click();
  33 |         await expect.soft(page.locator('body')).toContainText(/\d{6}/);
  34 |       });
  35 | 
  36 |       await test.step('Đối chiếu API demo sinh OTP đúng 6 chữ số', async () => {
  37 |         const response = await request.post(`${apiBaseUrl}/api/forgot-password`, {
  38 |           data: { email: testCase.email },
  39 |         });
  40 |         expect.soft(response.status()).toBe(200);
  41 | 
  42 |         const body = await response.json();
  43 |         expect.soft(body).toHaveProperty('resetToken');
> 44 |         expect.soft(String(body.resetToken)).toMatch(new RegExp(testCase.expectedOtpPattern));
     |                                              ^ Error: expect(received).toMatch(expected)
  45 |       });
  46 |     });
  47 |   }
  48 | });
  49 | 
```