# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR-08-checkout-ui.spec.ts >> FR-08 Checkout UI — README requirements >> FR08-UI-README-003: Checkout qua UI thành công và xóa giỏ backend
- Location: tests\FR-08-checkout-ui.spec.ts:217:5

# Error details

```
Error: FR08-UI-README-003: cart cleared after UI checkout

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 2}]
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - banner [ref=f1e4]:
    - link "EShop" [ref=f1e5] [cursor=pointer]:
      - /url: /
    - navigation [ref=f1e6]:
      - link "Giỏ hàng" [ref=f1e7] [cursor=pointer]:
        - /url: /cart
      - generic [ref=f1e8]:
        - link "Chào, FR08 UI Runtime User" [ref=f1e9] [cursor=pointer]:
          - /url: /profile
        - button "Thoát" [ref=f1e10] [cursor=pointer]
  - main [ref=f1e11]:
    - generic [ref=f1e12]:
      - heading "Thanh toán thành công!" [level=2] [ref=f1e13]
      - paragraph [ref=f1e14]: Cảm ơn bạn đã mua sắm tại EShop.
      - button "Quay lại trang chủ" [ref=f1e15] [cursor=pointer]
  - contentinfo [ref=f1e16]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  183 |   const loginInputs = page.locator('form input');
  184 |   await expect(loginInputs).toHaveCount(2);
  185 |   // Mask both runtime identity fields before the failure video starts capturing typed values.
  186 |   // This changes only their visual input type in the test DOM, not the submitted credentials.
  187 |   await loginInputs.nth(0).evaluate((input) => input.setAttribute('type', 'password'));
  188 |   await loginInputs.nth(1).evaluate((input) => input.setAttribute('type', 'password'));
  189 |   await loginInputs.nth(0).fill(user.email);
  190 |   await loginInputs.nth(1).fill(user.password);
  191 | 
  192 |   await Promise.all([
  193 |     page.waitForURL((url) => !url.pathname.includes('/login')),
  194 |     page.locator('form button[type="submit"]').click(),
  195 |   ]);
  196 |   await expect(page.getByText('FR08 UI Runtime User', { exact: false })).toBeVisible();
  197 | }
  198 | 
  199 | async function startUiTrace(context: BrowserContext): Promise<void> {
  200 |   // Start after authentication so trace/network attachments never contain login credentials.
  201 |   await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  202 | }
  203 | 
  204 | async function stopAndAttachUiTrace(
  205 |   context: BrowserContext,
  206 |   testInfo: TestInfo,
  207 | ): Promise<void> {
  208 |   const tracePath = testInfo.outputPath('trace.zip');
  209 |   await context.tracing.stop({ path: tracePath });
  210 |   await testInfo.attach('trace', { path: tracePath, contentType: 'application/zip' });
  211 | }
  212 | 
  213 | test.use({ video: 'retain-on-failure' });
  214 | 
  215 | test.describe('FR-08 Checkout UI — README requirements', () => {
  216 |   for (const testCase of fixture.cases) {
  217 |     test(`${testCase.id}: ${testCase.title}`, async ({ context, page, request }, testInfo) => {
  218 |       annotate(testInfo, testCase);
  219 |       let traceStarted = false;
  220 | 
  221 |       try {
  222 |         if (testCase.scenario === 'unauthenticated-route') {
  223 |           await startUiTrace(context);
  224 |           traceStarted = true;
  225 |           await page.goto(`${frontendURL}/checkout`);
  226 |           // Assertion group: State / URL — unauthenticated users must not stay on checkout.
  227 |           await expect(page, `${testCase.id}: protected checkout route`).toHaveURL(
  228 |             new RegExp(`${testCase.expected.redirectPath}$`),
  229 |           );
  230 |           return;
  231 |         }
  232 | 
  233 |         const user = await createRuntimeUser(request, testCase.id);
  234 |         await seedBackendCart(request, user, testCase.id);
  235 |         await loginThroughUi(page, user);
  236 |         await page.goto(`${frontendURL}/checkout`);
  237 |         await startUiTrace(context);
  238 |         traceStarted = true;
  239 | 
  240 |         if (testCase.scenario === 'checkout-summary') {
  241 |           // Assertion group: DOM / visible text.
  242 |           await expect.soft(
  243 |             page.getByRole('heading', { name: testCase.expected.heading, exact: true }),
  244 |             `${testCase.id}: checkout heading`,
  245 |           ).toBeVisible();
  246 |           await expect.soft(
  247 |             page.getByText(testCase.expected.productName ?? '', { exact: true }),
  248 |             `${testCase.id}: product from backend cart is visible`,
  249 |           ).toBeVisible();
  250 | 
  251 |           // The total control has no associated label/test id, so scope the CSS fallback to main.
  252 |           const totalInput = page.locator('main input[type="number"]');
  253 |           await expect.soft(totalInput, `${testCase.id}: one total control`).toHaveCount(1);
  254 |           await expect.soft(totalInput, `${testCase.id}: calculated total`).toHaveValue(
  255 |             String(testCase.expected.totalAmount ?? expectedCartTotal),
  256 |           );
  257 |           // Assertion group: State / attribute.
  258 |           await expect
  259 |             .soft(totalInput, `${testCase.id}: total is not directly editable`)
  260 |             .not.toBeEditable();
  261 |           return;
  262 |         }
  263 | 
  264 |         const checkoutResponsePromise = page.waitForResponse(
  265 |           (response) =>
  266 |             response.url() === apiPath('/api/checkout') && response.request().method() === 'POST',
  267 |         );
  268 |         await page.getByRole('button', { name: 'Xác Nhận Thanh Toán', exact: true }).click();
  269 |         const checkoutResponse = await checkoutResponsePromise;
  270 | 
  271 |         // Assertion group: Network / response from a real UI action.
  272 |         expect(checkoutResponse.status(), `${testCase.id}: UI checkout status`).toBe(
  273 |           testCase.expected.checkoutStatus,
  274 |         );
  275 |         // Assertion group: DOM / visible outcome.
  276 |         await expect(
  277 |           page.getByText(testCase.expected.successText ?? '', { exact: true }),
  278 |           `${testCase.id}: success UI`,
  279 |         ).toBeVisible();
  280 | 
  281 |         const cartAfter = await getBackendCart(request, user.headers);
  282 |         // Assertion group: Count / postcondition.
> 283 |         expect(cartAfter, `${testCase.id}: cart cleared after UI checkout`).toHaveLength(
      |                                                                             ^ Error: FR08-UI-README-003: cart cleared after UI checkout
  284 |           testCase.expected.cartCountAfter ?? 0,
  285 |         );
  286 |       } finally {
  287 |         if (traceStarted) {
  288 |           await stopAndAttachUiTrace(context, testInfo);
  289 |         }
  290 |       }
  291 |     });
  292 |   }
  293 | });
  294 | 
```