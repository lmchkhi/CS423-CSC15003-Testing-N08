# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account-registration.spec.mjs >> FR-01 - Đăng ký tài khoản >> TC-REG-006: Từ chối email sai định dạng
- Location: tests/e2e/account-registration.spec.mjs:21:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('label').filter({ hasText: 'Email' }).filter({ hasText: /^Email$/ }).locator('..').locator('input')
Expected: "email"
Received: "text"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('label').filter({ hasText: 'Email' }).filter({ hasText: /^Email$/ }).locator('..').locator('input')
    14 × locator resolved to <input required="" type="text" value="email-khong-hop-le" class="w-full border p-2 rounded"/>
       - unexpected value "text"

```

```yaml
- textbox: email-khong-hop-le
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { readFileSync } from 'node:fs';
  3   | import { RegisterPage } from '../pages/RegisterPage.mjs';
  4   | 
  5   | const data = JSON.parse(
  6   |   readFileSync(new URL('../data/account-registration.json', import.meta.url), 'utf8'),
  7   | );
  8   | 
  9   | if (!Array.isArray(data.cases) || data.cases.length < 12) {
  10  |   throw new Error('FR-01 requires at least 12 external test-data rows.');
  11  | }
  12  | 
  13  | const runId = `${Date.now()}-${process.pid}`;
  14  | const apiBaseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:3000';
  15  | const resolveCase = (testCase) => JSON.parse(
  16  |   JSON.stringify(testCase).replaceAll('{runId}', runId),
  17  | );
  18  | 
  19  | test.describe('FR-01 - Đăng ký tài khoản', () => {
  20  |   for (const sourceCase of data.cases) {
  21  |     test(`${sourceCase.id}: ${sourceCase.title}`, async ({ page, request }) => {
  22  |       const testCase = resolveCase(sourceCase);
  23  | 
  24  |       if (testCase.scenario === 'duplicate') {
  25  |         const response = await request.post(`${apiBaseURL}/api/register`, {
  26  |           data: {
  27  |             name: testCase.name,
  28  |             email: testCase.email,
  29  |             password: testCase.password,
  30  |           },
  31  |         });
  32  | 
  33  |         expect(response.status()).toBe(409);
  34  |         const responseBody = await response.json();
  35  |         expect(responseBody.error).toMatch(/email.*(tồn tại|đã được sử dụng|exist)/i);
  36  |         return;
  37  |       }
  38  | 
  39  |       const register = new RegisterPage(page);
  40  |       await register.goto();
  41  | 
  42  |       if (testCase.scenario === 'emailType') {
  43  |         await expect(register.emailInput).toHaveAttribute('type', 'email');
  44  |         return;
  45  |       }
  46  | 
  47  |       if (testCase.scenario === 'confirmField') {
  48  |         await expect(register.confirmPasswordInput).toHaveCount(1);
  49  |         await expect(register.confirmPasswordInput).toHaveAttribute('type', 'password');
  50  |         await expect(register.confirmPasswordInput).toHaveAttribute('required', '');
  51  |         return;
  52  |       }
  53  | 
  54  |       if (testCase.scenario === 'invalidEmail') {
  55  |         let registrationRequestCount = 0;
  56  |         page.on('request', (outgoingRequest) => {
  57  |           const url = new URL(outgoingRequest.url());
  58  |           if (
  59  |             url.pathname === '/api/register' &&
  60  |             outgoingRequest.method() === 'POST'
  61  |           ) {
  62  |             registrationRequestCount += 1;
  63  |           }
  64  |         });
  65  | 
  66  |         await register.fill(testCase);
> 67  |         await expect(register.emailInput).toHaveAttribute('type', 'email');
      |                                           ^ Error: expect(locator).toHaveAttribute(expected) failed
  68  |         await register.submit();
  69  | 
  70  |         await expect(register.emailInput).toBeFocused();
  71  |         expect(
  72  |           await register.emailInput.evaluate((input) => input.validity.typeMismatch),
  73  |         ).toBe(true);
  74  |         await expect(page).toHaveURL(/\/register$/);
  75  |         expect(registrationRequestCount).toBe(0);
  76  |         return;
  77  |       }
  78  | 
  79  |       await register.fill(testCase);
  80  |       await register.submit();
  81  | 
  82  |       if (testCase.scenario === 'success') {
  83  |         await expect(page).toHaveURL(/\/login$/);
  84  |         await expect(page.getByRole('button', { name: 'Đăng Nhập' })).toBeVisible();
  85  |         return;
  86  |       }
  87  | 
  88  |       if (testCase.scenario === 'required') {
  89  |         const missingInput = {
  90  |           name: register.nameInput,
  91  |           email: register.emailInput,
  92  |           password: register.passwordInput,
  93  |         }[testCase.missingField];
  94  |         await expect(page).toHaveURL(/\/register$/);
  95  |         await expect(missingInput).toBeFocused();
  96  |         expect(await missingInput.evaluate((input) => input.validity.valueMissing)).toBe(true);
  97  |         return;
  98  |       }
  99  | 
  100 |       if (testCase.scenario === 'weakPassword') {
  101 |         await expect(page).toHaveURL(/\/register$/);
  102 |         await expect(register.errorMessage).toContainText('Mật khẩu quá yếu!');
  103 |         return;
  104 |       }
  105 | 
  106 |       if (testCase.scenario === 'mismatch') {
  107 |         await expect(register.confirmPasswordInput).toHaveCount(1);
  108 |         await expect(page).toHaveURL(/\/register$/);
  109 |         await expect(register.errorMessage).toBeVisible();
  110 |         return;
  111 |       }
  112 | 
  113 |     });
  114 |   }
  115 | });
  116 | 
```