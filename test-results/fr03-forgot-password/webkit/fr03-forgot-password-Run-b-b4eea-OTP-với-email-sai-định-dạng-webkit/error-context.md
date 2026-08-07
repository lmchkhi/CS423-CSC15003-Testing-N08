# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr03-forgot-password.spec.ts >> Run by: 23127475 | FR-03 - Quên mật khẩu >> TC-FR03-DT-004 - Lấy OTP với email sai định dạng
- Location: tests/automation/specs/fr03-forgot-password.spec.ts:119:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 5000ms
Expected pattern: /email.*(không hợp lệ|sai định dạng)|invalid.*email|định dạng/i
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
  - textbox: test-at-eshop
  - button "Lấy mã OTP"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  54  |     .or(page.getByRole('textbox'))
  55  |     .first();
  56  | }
  57  | 
  58  | async function registerUser(request: import('@playwright/test').APIRequestContext, email: string, password = 'Test1234!') {
  59  |   const response = await request.post(`${apiBaseUrl}/api/register`, {
  60  |     data: {
  61  |       name: `FR03 ${email}`,
  62  |       email,
  63  |       password,
  64  |     },
  65  |   });
  66  |   expect.soft([200, 201, 409]).toContain(response.status());
  67  | }
  68  | 
  69  | async function requestOtpByApi(request: import('@playwright/test').APIRequestContext, email: string): Promise<string> {
  70  |   const response = await request.post(`${apiBaseUrl}/api/forgot-password`, { data: { email } });
  71  |   expect.soft(response.status()).toBe(200);
  72  |   const body = await response.json();
  73  |   expect.soft(body).toHaveProperty('resetToken');
  74  |   return String(body.resetToken ?? '');
  75  | }
  76  | 
  77  | async function resetPasswordByApi(
  78  |   request: import('@playwright/test').APIRequestContext,
  79  |   email: string,
  80  |   resetToken: string,
  81  |   newPassword: string,
  82  | ) {
  83  |   return request.post(`${apiBaseUrl}/api/reset-password`, {
  84  |     data: {
  85  |       email,
  86  |       resetToken,
  87  |       newPassword,
  88  |     },
  89  |   });
  90  | }
  91  | 
  92  | async function requestOtpByUi(page: import('@playwright/test').Page, email: string): Promise<string> {
  93  |   await page.goto('/forgot-password');
  94  |   const input = emailInput(page);
  95  |   await expect(input).toBeVisible();
  96  |   await input.fill(email);
  97  |   await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
  98  |   const bodyText = await page.locator('body').innerText();
  99  |   return bodyText.match(/\b\d{4,7}\b/)?.[0] ?? '';
  100 | }
  101 | 
  102 | async function fillResetForm(page: import('@playwright/test').Page, otp: string, password: string, confirmPassword?: string) {
  103 |   const fields = page.getByRole('textbox');
  104 |   await expect(fields.first()).toBeVisible();
  105 |   await fields.nth(0).fill(otp);
  106 |   await fields.nth(1).fill(password);
  107 |   if (confirmPassword !== undefined && (await fields.count()) >= 3) {
  108 |     await fields.nth(2).fill(confirmPassword);
  109 |   }
  110 |   await page.getByRole('button', { name: /đặt lại|reset|submit/i }).first().click();
  111 | }
  112 | 
  113 | test.describe(`Run by: ${studentId} | FR-03 - Quên mật khẩu`, () => {
  114 |   test.beforeAll(() => {
  115 |     expect(cases.length).toBeGreaterThanOrEqual(12);
  116 |   });
  117 | 
  118 |   for (const testCase of cases) {
  119 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  120 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  121 | 
  122 |       if (testCase.kind === 'uiForgotValidEmail') {
  123 |         await page.goto('/forgot-password');
  124 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedStepPattern));
  125 | 
  126 |         const input = emailInput(page);
  127 |         await expect(input).toBeVisible();
  128 |         await input.fill(testCase.email!);
  129 |         await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
  130 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedOtpPattern));
  131 | 
  132 |         const apiOtp = await requestOtpByApi(request, testCase.email!);
  133 |         expect.soft(apiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
  134 |         return;
  135 |       }
  136 | 
  137 |       if (testCase.kind === 'uiBackToLoginAtStepOne') {
  138 |         await page.goto('/forgot-password');
  139 |         const backButton = page.getByRole('button', { name: /quay lại.*đăng nhập|back.*login/i }).first();
  140 |         await expect(backButton).toBeVisible();
  141 |         await backButton.click();
  142 |         await expect(page).toHaveURL(textPattern(testCase.expectedUrlPattern));
  143 |         return;
  144 |       }
  145 | 
  146 |       if (testCase.kind === 'uiForgotRejected') {
  147 |         await page.goto('/forgot-password');
  148 |         const input = emailInput(page);
  149 |         await expect(input).toBeVisible();
  150 |         if (testCase.email) {
  151 |           await input.fill(testCase.email);
  152 |         }
  153 |         await page.getByRole('button', { name: /gửi|lấy mã|otp|tiếp tục|submit/i }).first().click();
> 154 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedErrorPattern));
      |                                                 ^ Error: expect(locator).toContainText(expected) failed
  155 |         await expect.soft(page.locator('body')).not.toContainText(textPattern(testCase.mustNotContainPattern));
  156 |         return;
  157 |       }
  158 | 
  159 |       if (testCase.kind === 'uiResetSuccess') {
  160 |         const email = uniqueEmail(testCase.id);
  161 |         await registerUser(request, email);
  162 |         const uiOtp = await requestOtpByUi(page, email);
  163 |         expect.soft(uiOtp).toMatch(textPattern(testCase.expectedOtpPattern));
  164 |         await fillResetForm(page, uiOtp, testCase.newPassword!);
  165 |         await expect.soft(page.locator('body')).toContainText(textPattern(testCase.expectedSuccessPattern));
  166 |         return;
  167 |       }
  168 | 
  169 |       if (testCase.kind === 'uiConfirmPasswordRequired') {
  170 |         const email = uniqueEmail(testCase.id);
  171 |         await registerUser(request, email);
  172 |         await requestOtpByUi(page, email);
  173 |         await expect.soft(page.getByRole('textbox')).toHaveCount(3);
  174 |         await fillResetForm(page, '123456', testCase.newPassword!, testCase.confirmPassword);
  175 |         await expect.soft(page.locator('body')).toContainText(/không khớp|mismatch|confirm|xác nhận/i);
  176 |         return;
  177 |       }
  178 | 
  179 |       if (testCase.kind === 'apiResetRejected') {
  180 |         const response = await resetPasswordByApi(
  181 |           request,
  182 |           testCase.email!,
  183 |           testCase.resetToken!,
  184 |           testCase.newPassword!,
  185 |         );
  186 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  187 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  188 |         return;
  189 |       }
  190 | 
  191 |       if (testCase.kind === 'apiResetRejectedAfterOtp' || testCase.kind === 'apiResetAcceptedAfterOtp') {
  192 |         const email = uniqueEmail(testCase.id);
  193 |         await registerUser(request, email);
  194 |         const otp = await requestOtpByApi(request, email);
  195 |         const response = await resetPasswordByApi(
  196 |           request,
  197 |           email,
  198 |           testCase.overrideResetToken ?? otp,
  199 |           testCase.newPassword ?? '',
  200 |         );
  201 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  202 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  203 |         return;
  204 |       }
  205 | 
  206 |       if (testCase.kind === 'apiOtherEmailOtpRejected') {
  207 |         const emailA = uniqueEmail(`${testCase.id}a`);
  208 |         const emailB = uniqueEmail(`${testCase.id}b`);
  209 |         await registerUser(request, emailA);
  210 |         await registerUser(request, emailB);
  211 |         const otpOfA = await requestOtpByApi(request, emailA);
  212 |         const response = await resetPasswordByApi(request, emailB, otpOfA, testCase.newPassword!);
  213 |         expect.soft(response.status()).toBe(testCase.expectedStatus);
  214 |         expect.soft(await response.text()).toMatch(textPattern(testCase.expectedBodyPattern));
  215 |         return;
  216 |       }
  217 | 
  218 |       if (testCase.kind === 'apiGeneratedOtpLength') {
  219 |         const email = uniqueEmail(testCase.id);
  220 |         await registerUser(request, email);
  221 |         const otp = await requestOtpByApi(request, email);
  222 |         expect.soft(otp).toMatch(textPattern(testCase.expectedOtpPattern));
  223 |         return;
  224 |       }
  225 | 
  226 |       throw new Error(`Unsupported FR-03 test kind: ${testCase.kind}`);
  227 |     });
  228 |   }
  229 | });
  230 | 
```