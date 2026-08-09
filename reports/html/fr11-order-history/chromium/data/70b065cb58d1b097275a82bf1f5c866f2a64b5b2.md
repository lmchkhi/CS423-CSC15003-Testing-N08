# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> Run by: 23127475 | FR-11 - Xem lịch sử đơn hàng >> TC-FR11-DT-007 - Từ chối truy cập chi tiết đơn hàng của user khác
- Location: tests/automation/specs/fr11-order-history.spec.ts:362:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403, 404]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /"user_id"|total_amount|shipping_address|created_at/i
Received string:      "{\"id\":28,\"user_id\":34,\"total_amount\":991107,\"status\":\"pending\",\"shipping_address\":\"FR11 DT007 other user protected order #1\",\"created_at\":\"2026-08-09 15:40:59\"}"
```

# Page snapshot

```yaml
- generic [ref=f5e3]:
  - banner [ref=f5e4]:
    - link "EShop" [ref=f5e5] [cursor=pointer]:
      - /url: /
    - navigation [ref=f5e6]:
      - link "Giỏ hàng" [ref=f5e7] [cursor=pointer]:
        - /url: /cart
      - generic [ref=f5e8]:
        - link "Chào, FR11 fr11.20260809T15403.9.tcfr11dt007@example.com" [ref=f5e9] [cursor=pointer]:
          - /url: /profile
        - button "Thoát" [ref=f5e10] [cursor=pointer]
  - main [ref=f5e11]:
    - generic [ref=f5e12]:
      - generic [ref=f5e13]:
        - heading "Hồ sơ của bạn" [level=2] [ref=f5e14]
        - generic [ref=f5e15]:
          - generic [ref=f5e16]:
            - generic [ref=f5e17]: Email (Không đổi)
            - textbox [disabled] [ref=f5e18]: fr11.20260809T15403.9.tcfr11dt007@example.com
          - generic [ref=f5e19]:
            - generic [ref=f5e20]: Họ Tên
            - textbox [ref=f5e21]: FR11 fr11.20260809T15403.9.tcfr11dt007@example.com
          - generic [ref=f5e22]:
            - generic [ref=f5e23]: Số điện thoại
            - 'textbox "VD: 0912345678" [ref=f5e24]'
          - generic [ref=f5e25]:
            - generic [ref=f5e26]: Địa chỉ giao hàng
            - textbox "Nhập địa chỉ của bạn" [ref=f5e27]
          - button "Cập nhật" [ref=f5e28] [cursor=pointer]
      - generic [ref=f5e29]:
        - heading "Lịch sử đơn hàng" [level=2] [ref=f5e30]
        - table [ref=f5e31]:
          - rowgroup [ref=f5e32]:
            - row [ref=f5e33]:
              - columnheader "Mã ĐH" [ref=f5e34]
              - columnheader "Ngày đặt" [ref=f5e35]
              - columnheader "Tổng tiền" [ref=f5e36]
              - columnheader "Trạng thái" [ref=f5e37]
              - columnheader "Thao tác" [ref=f5e38]
          - rowgroup [ref=f5e39]:
            - row [ref=f5e40]:
              - cell "#27" [ref=f5e41]
              - cell "8/9/2026" [ref=f5e42]
              - cell "231,107 ₫" [ref=f5e43]
              - cell "Chờ xác nhận" [ref=f5e44]
              - cell [ref=f5e45]:
                - button "Hủy đơn" [ref=f5e46] [cursor=pointer]
  - contentinfo [ref=f5e47]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  316 |   actorOrders: Order[],
  317 |   otherOrders: Order[],
  318 | ) {
  319 |   const body = page.locator('body');
  320 |   for (const order of actorOrders) {
  321 |     await expect.soft(body).toContainText(amountPattern(order.total_amount));
  322 |   }
  323 |   for (const order of otherOrders) {
  324 |     await expect.soft(body).not.toContainText(amountPattern(order.total_amount));
  325 |     await expect.soft(body).not.toContainText(orderIdPattern(order.id));
  326 |   }
  327 | }
  328 | 
  329 | async function assertOrderFieldVisible(
  330 |   page: import('@playwright/test').Page,
  331 |   testCase: Fr11Case,
  332 |   order: Order,
  333 | ) {
  334 |   const body = page.locator('body');
  335 |   await expect.soft(body).toContainText(textPattern(testCase.expected.fieldLabelPattern));
  336 | 
  337 |   if (testCase.expected.field === 'id') {
  338 |     await expect.soft(body).toContainText(orderIdPattern(order.id));
  339 |     return;
  340 |   }
  341 | 
  342 |   if (testCase.expected.field === 'createdAt') {
  343 |     await expect.soft(body).toContainText(datePattern(order.created_at));
  344 |     return;
  345 |   }
  346 | 
  347 |   if (testCase.expected.field === 'totalAmount') {
  348 |     await expect.soft(body).toContainText(amountPattern(order.total_amount));
  349 |     await expect.soft(body).toContainText(/₫|đ|vnd|vnđ/i);
  350 |     return;
  351 |   }
  352 | 
  353 |   throw new Error(`Unsupported FR-11 field assertion: ${testCase.expected.field}`);
  354 | }
  355 | 
  356 | test.describe(`Run by: ${studentId} | FR-11 - Xem lịch sử đơn hàng`, () => {
  357 |   test.beforeAll(() => {
  358 |     expect(cases.length).toBeGreaterThanOrEqual(12);
  359 |   });
  360 | 
  361 |   for (const testCase of cases) {
  362 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  363 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  364 | 
  365 |       if (testCase.kind === 'guestBlocked') {
  366 |         const apiResponse = await request.get(apiUrl('/api/orders/my-orders'));
  367 |         expect.soft(apiResponse.status()).toBe(testCase.expected.apiStatus);
  368 |         const guardPattern = textPattern(testCase.expected.guardPattern);
  369 |         await openOrderHistoryAsGuest(page, guardPattern);
  370 |         await expect.soft(page.locator('body')).toContainText(guardPattern);
  371 |         return;
  372 |       }
  373 | 
  374 |       const prepared = await prepareUserForCase(request, testCase);
  375 |       const otherUser = testCase.otherOrderSetup
  376 |         ? await prepareUserWithOrders(request, `${testCase.id}-other`, testCase.otherOrderSetup)
  377 |         : undefined;
  378 |       await loginByUi(page, prepared.email, prepared.password);
  379 |       await openOrderHistory(page);
  380 | 
  381 |       if (testCase.kind === 'uiDoesNotExposeOtherUserOrder') {
  382 |         expect(otherUser).toBeTruthy();
  383 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  384 |         await assertOtherUserOrderHidden(page, prepared.orders, otherUser!.orders);
  385 |         expect.soft(prepared.orders.map((order) => order.user_id)).not.toContain(otherUser!.userId);
  386 |         return;
  387 |       }
  388 | 
  389 |       if (testCase.kind === 'apiOwnOrderDetail') {
  390 |         const ownOrder = prepared.orders[0];
  391 |         expect(ownOrder).toBeTruthy();
  392 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, ownOrder.id);
  393 |         await test.info().attach('own-order-api-response.json', {
  394 |           body: JSON.stringify(body, null, 2),
  395 |           contentType: 'application/json',
  396 |         });
  397 |         expect.soft(response.status()).toBe(testCase.expected.apiStatus);
  398 |         expect.soft(text).toMatch(orderIdPattern(ownOrder.id));
  399 |         expect.soft(body).toMatchObject({
  400 |           id: ownOrder.id,
  401 |           user_id: prepared.userId,
  402 |         });
  403 |         return;
  404 |       }
  405 | 
  406 |       if (testCase.kind === 'apiOtherOrderDetailRejected') {
  407 |         expect(otherUser).toBeTruthy();
  408 |         const otherOrder = otherUser!.orders[0];
  409 |         expect(otherOrder).toBeTruthy();
  410 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, otherOrder.id);
  411 |         await test.info().attach('other-order-api-response.json', {
  412 |           body: JSON.stringify(body, null, 2),
  413 |           contentType: 'application/json',
  414 |         });
  415 |         expect.soft(testCase.expected.rejectedStatuses ?? [401, 403, 404]).toContain(response.status());
> 416 |         expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
      |                               ^ Error: expect(received).not.toMatch(expected)
  417 |         return;
  418 |       }
  419 | 
  420 |       if (testCase.kind === 'uiDisplaysOrderField') {
  421 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  422 |         await assertOrderFieldVisible(page, testCase, prepared.orders[0]);
  423 |         return;
  424 |       }
  425 | 
  426 |       await assertOrderHistoryUi(page, testCase, prepared.orders);
  427 |     });
  428 |   }
  429 | });
  430 | 
```