# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account-registration.spec.mjs >> FR-01 - Đăng ký tài khoản >> TC-REG-015: Từ chối khi xác nhận mật khẩu không khớp
- Location: tests/e2e/account-registration.spec.mjs:21:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('label').filter({ hasText: 'Xác nhận mật khẩu' }).filter({ hasText: /^Xác nhận mật khẩu$/ }).locator('..').locator('input')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('label').filter({ hasText: 'Xác nhận mật khẩu' }).filter({ hasText: /^Xác nhận mật khẩu$/ }).locator('..').locator('input')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - heading "Đăng Ký Tài Khoản" [level=2] [ref=e12]
      - generic [ref=e13]: Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Họ Tên
          - textbox [ref=e17]: Nguyễn An
        - generic [ref=e18]:
          - generic [ref=e19]: Email
          - textbox [ref=e20]: mismatch-1786158063307-48069@example.com
        - generic [ref=e21]:
          - generic [ref=e22]: Mật khẩu
          - textbox [ref=e23]: Valid1!a
          - paragraph [ref=e24]: "Yêu cầu: Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
        - button "Đăng Ký" [ref=e25] [cursor=pointer]
        - generic [ref=e26]:
          - text: Đã có tài khoản?
          - link "Đăng nhập" [ref=e27]:
            - /url: /login
  - contentinfo [ref=e28]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
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
  67  |         await expect(register.emailInput).toHaveAttribute('type', 'email');
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
> 107 |         await expect(register.confirmPasswordInput).toHaveCount(1);
      |                                                     ^ Error: expect(locator).toHaveCount(expected) failed
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