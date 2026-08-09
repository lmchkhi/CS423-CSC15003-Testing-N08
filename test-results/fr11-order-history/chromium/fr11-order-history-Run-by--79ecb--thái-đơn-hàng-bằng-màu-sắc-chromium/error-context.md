# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> Run by: 23127475 | FR-11 - Xem lịch sử đơn hàng >> TC-FR11-DT-012 - Phân biệt trạng thái đơn hàng bằng màu sắc
- Location: tests/automation/specs/fr11-order-history.spec.ts:491:9

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 80
Received:    5.916079783099616
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
        - link "Chào, FR11 fr11.20260809T16142.5.tcfr11dt012@example.com" [ref=f5e9] [cursor=pointer]:
          - /url: /profile
        - button "Thoát" [ref=f5e10] [cursor=pointer]
  - main [ref=f5e11]:
    - generic [ref=f5e12]:
      - generic [ref=f5e13]:
        - heading "Hồ sơ của bạn" [level=2] [ref=f5e14]
        - generic [ref=f5e15]:
          - generic [ref=f5e16]:
            - generic [ref=f5e17]: Email (Không đổi)
            - textbox [disabled] [ref=f5e18]: fr11.20260809T16142.5.tcfr11dt012@example.com
          - generic [ref=f5e19]:
            - generic [ref=f5e20]: Họ Tên
            - textbox [ref=f5e21]: FR11 fr11.20260809T16142.5.tcfr11dt012@example.com
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
              - cell "#54" [ref=f5e41]
              - cell "8/9/2026" [ref=f5e42]
              - cell "231,116 ₫" [ref=f5e43]
              - cell "Đã hủy" [ref=f5e44]
              - cell [ref=f5e45]
            - row [ref=f5e46]:
              - cell "#53" [ref=f5e47]
              - cell "8/9/2026" [ref=f5e48]
              - cell "231,115 ₫" [ref=f5e49]
              - cell "Đã giao" [ref=f5e50]
              - cell [ref=f5e51]
            - row [ref=f5e52]:
              - cell "#52" [ref=f5e53]
              - cell "8/9/2026" [ref=f5e54]
              - cell "231,114 ₫" [ref=f5e55]
              - cell "Đang giao" [ref=f5e56]
              - cell [ref=f5e57]:
                - button "Hủy đơn" [ref=f5e58] [cursor=pointer]
            - row [ref=f5e59]:
              - cell "#51" [ref=f5e60]
              - cell "8/9/2026" [ref=f5e61]
              - cell "231,113 ₫" [ref=f5e62]
              - cell "Đã xác nhận" [ref=f5e63]
              - cell [ref=f5e64]:
                - button "Hủy đơn" [ref=f5e65] [cursor=pointer]
            - row [ref=f5e66]:
              - cell "#50" [ref=f5e67]
              - cell "8/9/2026" [ref=f5e68]
              - cell "231,112 ₫" [ref=f5e69]
              - cell "Chờ xác nhận" [ref=f5e70]
              - cell [ref=f5e71]:
                - button "Hủy đơn" [ref=f5e72] [cursor=pointer]
  - contentinfo [ref=f5e73]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  381 | ) {
  382 |   const body = page.locator('body');
  383 |   for (const order of actorOrders) {
  384 |     await expect.soft(body).toContainText(amountPattern(order.total_amount));
  385 |   }
  386 |   for (const order of otherOrders) {
  387 |     await expect.soft(body).not.toContainText(amountPattern(order.total_amount));
  388 |     await expect.soft(body).not.toContainText(orderIdPattern(order.id));
  389 |   }
  390 | }
  391 |
  392 | async function assertOrderFieldVisible(
  393 |   page: import('@playwright/test').Page,
  394 |   testCase: Fr11Case,
  395 |   order: Order,
  396 | ) {
  397 |   const body = page.locator('body');
  398 |   await expect.soft(body).toContainText(textPattern(testCase.expected.fieldLabelPattern));
  399 |
  400 |   if (testCase.expected.field === 'id') {
  401 |     await expect.soft(body).toContainText(orderIdPattern(order.id));
  402 |     return;
  403 |   }
  404 |
  405 |   if (testCase.expected.field === 'createdAt') {
  406 |     await expect.soft(body).toContainText(datePattern(order.created_at));
  407 |     return;
  408 |   }
  409 |
  410 |   if (testCase.expected.field === 'totalAmount') {
  411 |     await expect.soft(body).toContainText(amountPattern(order.total_amount));
  412 |     await expect.soft(body).toContainText(/₫|đ|vnd|vnđ/i);
  413 |     return;
  414 |   }
  415 |
  416 |   throw new Error(`Unsupported FR-11 field assertion: ${testCase.expected.field}`);
  417 | }
  418 |
  419 | function firstOrderForStatus(orders: Order[], status: OrderStatus): Order {
  420 |   const order = orders.find((candidate) => candidate.status === status);
  421 |   if (!order) {
  422 |     throw new Error(`Missing order with status ${status}`);
  423 |   }
  424 |   return order;
  425 | }
  426 |
  427 | function statusCell(page: import('@playwright/test').Page, order: Order) {
  428 |   return page
  429 |     .getByRole('row')
  430 |     .filter({ hasText: amountPattern(order.total_amount) })
  431 |     .first()
  432 |     .getByRole('cell')
  433 |     .nth(3);
  434 | }
  435 |
  436 | async function assertStatusLabelsTranslated(
  437 |   page: import('@playwright/test').Page,
  438 |   testCase: Fr11Case,
  439 |   orders: Order[],
  440 | ) {
  441 |   const body = page.locator('body');
  442 |   await expect.soft(body).not.toContainText(textPattern(testCase.expected.rawStatusPattern));
  443 |   for (const [rawStatus, labelPattern] of Object.entries(testCase.expected.statusLabels ?? {})) {
  444 |     const status = normalizeStatus(rawStatus);
  445 |     const order = firstOrderForStatus(orders, status);
  446 |     await expect.soft(statusCell(page, order)).toContainText(textPattern(labelPattern));
  447 |   }
  448 | }
  449 |
  450 | async function assertStatusColorsDistinct(
  451 |   page: import('@playwright/test').Page,
  452 |   testCase: Fr11Case,
  453 |   orders: Order[],
  454 | ) {
  455 |   const colors: Record<string, string> = {};
  456 |   for (const [rawStatus, labelPattern] of Object.entries(testCase.expected.statusLabels ?? {})) {
  457 |     const status = normalizeStatus(rawStatus);
  458 |     const order = firstOrderForStatus(orders, status);
  459 |     const cell = statusCell(page, order);
  460 |     await expect.soft(cell).toContainText(textPattern(labelPattern));
  461 |     colors[status] = await cell.locator('*').first().evaluate((element) => {
  462 |       const style = window.getComputedStyle(element);
  463 |       return style.backgroundColor || style.color;
  464 |     });
  465 |   }
  466 |
  467 |   const distances = (testCase.expected.colorPairs ?? []).map(([left, right]) => ({
  468 |     left,
  469 |     right,
  470 |     leftColor: colors[left],
  471 |     rightColor: colors[right],
  472 |     distance: rgbDistance(colors[left], colors[right]),
  473 |   }));
  474 |
  475 |   await test.info().attach('status-color-distances.json', {
  476 |     body: JSON.stringify(distances, null, 2),
  477 |     contentType: 'application/json',
  478 |   });
  479 |
  480 |   for (const pair of distances) {
> 481 |     expect.soft(pair.distance).toBeGreaterThanOrEqual(testCase.expected.minColorDistance ?? 80);
      |                                ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  482 |   }
  483 | }
  484 |
  485 | test.describe(`Run by: ${studentId} | FR-11 - Xem lịch sử đơn hàng`, () => {
  486 |   test.beforeAll(() => {
  487 |     expect(cases.length).toBeGreaterThanOrEqual(15);
  488 |   });
  489 |
  490 |   for (const testCase of cases) {
  491 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  492 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  493 |
  494 |       if (testCase.kind === 'guestBlocked') {
  495 |         const apiResponse = await request.get(apiUrl('/api/orders/my-orders'));
  496 |         expect.soft(apiResponse.status()).toBe(testCase.expected.apiStatus);
  497 |         const guardPattern = textPattern(testCase.expected.guardPattern);
  498 |         await openOrderHistoryAsGuest(page, guardPattern);
  499 |         await expect.soft(page.locator('body')).toContainText(guardPattern);
  500 |         return;
  501 |       }
  502 |
  503 |       const prepared = await prepareUserForCase(request, testCase);
  504 |       const otherUser = testCase.otherOrderSetup
  505 |         ? await prepareUserWithOrders(request, `${testCase.id}-other`, testCase.otherOrderSetup)
  506 |         : undefined;
  507 |       await loginByUi(page, prepared.email, prepared.password);
  508 |       await openOrderHistory(page);
  509 |
  510 |       if (testCase.kind === 'uiDoesNotExposeOtherUserOrder') {
  511 |         expect(otherUser).toBeTruthy();
  512 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  513 |         await assertOtherUserOrderHidden(page, prepared.orders, otherUser!.orders);
  514 |         expect.soft(prepared.orders.map((order) => order.user_id)).not.toContain(otherUser!.userId);
  515 |         return;
  516 |       }
  517 |
  518 |       if (testCase.kind === 'apiOwnOrderDetail') {
  519 |         const ownOrder = prepared.orders[0];
  520 |         expect(ownOrder).toBeTruthy();
  521 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, ownOrder.id);
  522 |         await test.info().attach('own-order-api-response.json', {
  523 |           body: JSON.stringify(body, null, 2),
  524 |           contentType: 'application/json',
  525 |         });
  526 |         expect.soft(response.status()).toBe(testCase.expected.apiStatus);
  527 |         expect.soft(text).toMatch(orderIdPattern(ownOrder.id));
  528 |         expect.soft(body).toMatchObject({
  529 |           id: ownOrder.id,
  530 |           user_id: prepared.userId,
  531 |         });
  532 |         return;
  533 |       }
  534 |
  535 |       if (testCase.kind === 'apiOtherOrderDetailRejected') {
  536 |         expect(otherUser).toBeTruthy();
  537 |         const otherOrder = otherUser!.orders[0];
  538 |         expect(otherOrder).toBeTruthy();
  539 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, otherOrder.id);
  540 |         await test.info().attach('other-order-api-response.json', {
  541 |           body: JSON.stringify(body, null, 2),
  542 |           contentType: 'application/json',
  543 |         });
  544 |         expect.soft(testCase.expected.rejectedStatuses ?? [401, 403, 404]).toContain(response.status());
  545 |         expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
  546 |         return;
  547 |       }
  548 |
  549 |       if (testCase.kind === 'uiDisplaysOrderField') {
  550 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  551 |         await assertOrderFieldVisible(page, testCase, prepared.orders[0]);
  552 |         return;
  553 |       }
  554 |
  555 |       if (testCase.kind === 'uiStatusTranslated') {
  556 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  557 |         await assertStatusLabelsTranslated(page, testCase, prepared.orders);
  558 |         return;
  559 |       }
  560 |
  561 |       if (testCase.kind === 'uiStatusColorsDistinct') {
  562 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  563 |         await assertStatusColorsDistinct(page, testCase, prepared.orders);
  564 |         return;
  565 |       }
  566 |
  567 |       await assertOrderHistoryUi(page, testCase, prepared.orders);
  568 |     });
  569 |   }
  570 | });
  571 |
```