# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> Run by: 23127475 | FR-11 - Xem lịch sử đơn hàng >> TC-FR11-DT-007 - Từ chối truy cập chi tiết đơn hàng của user khác
- Location: tests/automation/specs/fr11-order-history.spec.ts:500:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 200
Received array: [401, 403, 404]
```

```
Error: expect(received).not.toMatch(expected)

Expected pattern: not /"user_id"|total_amount|shipping_address|created_at/i
Received string:      "{\"id\":122,\"user_id\":95,\"total_amount\":991107,\"status\":\"pending\",\"shipping_address\":\"FR11 DT007 other user protected order #1\",\"created_at\":\"2026-08-09 16:20:37\"}"
```

# Page snapshot

```yaml
- generic [ref=f5e3]:
  - banner [ref=f5e4]:
    - link "EShop" [ref=f5e5]:
      - /url: /
    - navigation [ref=f5e6]:
      - link "Giỏ hàng" [ref=f5e7]:
        - /url: /cart
      - generic [ref=f5e8]:
        - link "Chào, FR11 fr11.20260809T16200.9.tcfr11dt007@example.com" [ref=f5e9]:
          - /url: /profile
        - button "Thoát" [ref=f5e10] [cursor=pointer]
  - main [ref=f5e11]:
    - generic [ref=f5e12]:
      - generic [ref=f5e13]:
        - heading "Hồ sơ của bạn" [level=2] [ref=f5e14]
        - generic [ref=f5e15]:
          - generic [ref=f5e16]:
            - generic [ref=f5e17]: Email (Không đổi)
            - textbox [disabled] [ref=f5e18]: fr11.20260809T16200.9.tcfr11dt007@example.com
          - generic [ref=f5e19]:
            - generic [ref=f5e20]: Họ Tên
            - textbox [ref=f5e21]: FR11 fr11.20260809T16200.9.tcfr11dt007@example.com
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
              - cell "#121" [ref=f5e41]
              - cell "8/9/2026" [ref=f5e42]
              - cell "231,107 ₫" [ref=f5e43]
              - cell "Chờ xác nhận" [ref=f5e44]
              - cell [ref=f5e45]:
                - button "Hủy đơn" [ref=f5e46] [cursor=pointer]
  - contentinfo [ref=f5e47]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  454 |     const order = firstOrderForStatus(orders, status);
  455 |     await expect.soft(statusCell(page, order)).toContainText(textPattern(labelPattern));
  456 |   }
  457 | }
  458 |
  459 | async function assertStatusColorsDistinct(
  460 |   page: import('@playwright/test').Page,
  461 |   testCase: Fr11Case,
  462 |   orders: Order[],
  463 | ) {
  464 |   const colors: Record<string, string> = {};
  465 |   for (const [rawStatus, labelPattern] of Object.entries(testCase.expected.statusLabels ?? {})) {
  466 |     const status = normalizeStatus(rawStatus);
  467 |     const order = firstOrderForStatus(orders, status);
  468 |     const cell = statusCell(page, order);
  469 |     await expect.soft(cell).toContainText(textPattern(labelPattern));
  470 |     colors[status] = await cell.locator('*').first().evaluate((element) => {
  471 |       const style = window.getComputedStyle(element);
  472 |       return style.backgroundColor || style.color;
  473 |     });
  474 |   }
  475 |
  476 |   const distances = (testCase.expected.colorPairs ?? []).map(([left, right]) => ({
  477 |     left,
  478 |     right,
  479 |     leftColor: colors[left],
  480 |     rightColor: colors[right],
  481 |     distance: rgbDistance(colors[left], colors[right]),
  482 |   }));
  483 |
  484 |   await test.info().attach('status-color-distances.json', {
  485 |     body: JSON.stringify(distances, null, 2),
  486 |     contentType: 'application/json',
  487 |   });
  488 |
  489 |   for (const pair of distances) {
  490 |     expect.soft(pair.distance).toBeGreaterThanOrEqual(testCase.expected.minColorDistance ?? 80);
  491 |   }
  492 | }
  493 |
  494 | test.describe(`Run by: ${studentId} | FR-11 - Xem lịch sử đơn hàng`, () => {
  495 |   test.beforeAll(() => {
  496 |     expect(cases.length).toBeGreaterThanOrEqual(15);
  497 |   });
  498 |
  499 |   for (const testCase of cases) {
  500 |     test(`${testCase.id} - ${testCase.title}`, async ({ page, request }) => {
  501 |       test.info().annotations.push({ type: 'manual-source', description: testCase.source });
  502 |
  503 |       if (testCase.kind === 'guestBlocked') {
  504 |         const apiResponse = await request.get(apiUrl('/api/orders/my-orders'));
  505 |         expect.soft(apiResponse.status()).toBe(testCase.expected.apiStatus);
  506 |         const guardPattern = textPattern(testCase.expected.guardPattern);
  507 |         await openOrderHistoryAsGuest(page, guardPattern);
  508 |         await expect.soft(page.locator('body')).toContainText(guardPattern);
  509 |         return;
  510 |       }
  511 |
  512 |       const prepared = await prepareUserForCase(request, testCase);
  513 |       const otherUser = testCase.otherOrderSetup
  514 |         ? await prepareUserWithOrders(request, `${testCase.id}-other`, testCase.otherOrderSetup)
  515 |         : undefined;
  516 |       await loginByUi(page, prepared.email, prepared.password);
  517 |       await openOrderHistory(page);
  518 |
  519 |       if (testCase.kind === 'uiDoesNotExposeOtherUserOrder') {
  520 |         expect(otherUser).toBeTruthy();
  521 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  522 |         await assertOtherUserOrderHidden(page, prepared.orders, otherUser!.orders);
  523 |         expect.soft(prepared.orders.map((order) => order.user_id)).not.toContain(otherUser!.userId);
  524 |         return;
  525 |       }
  526 |
  527 |       if (testCase.kind === 'apiOwnOrderDetail') {
  528 |         const ownOrder = prepared.orders[0];
  529 |         expect(ownOrder).toBeTruthy();
  530 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, ownOrder.id);
  531 |         await test.info().attach('own-order-api-response.json', {
  532 |           body: JSON.stringify(body, null, 2),
  533 |           contentType: 'application/json',
  534 |         });
  535 |         expect.soft(response.status()).toBe(testCase.expected.apiStatus);
  536 |         expect.soft(text).toMatch(orderIdPattern(ownOrder.id));
  537 |         expect.soft(body).toMatchObject({
  538 |           id: ownOrder.id,
  539 |           user_id: prepared.userId,
  540 |         });
  541 |         return;
  542 |       }
  543 |
  544 |       if (testCase.kind === 'apiOtherOrderDetailRejected') {
  545 |         expect(otherUser).toBeTruthy();
  546 |         const otherOrder = otherUser!.orders[0];
  547 |         expect(otherOrder).toBeTruthy();
  548 |         const { response, body, text } = await fetchOrderDetail(request, prepared.token, otherOrder.id);
  549 |         await test.info().attach('other-order-api-response.json', {
  550 |           body: JSON.stringify(body, null, 2),
  551 |           contentType: 'application/json',
  552 |         });
  553 |         expect.soft(testCase.expected.rejectedStatuses ?? [401, 403, 404]).toContain(response.status());
> 554 |         expect.soft(text).not.toMatch(textPattern(testCase.expected.bodyMustNotContainPattern));
      |                               ^ Error: expect(received).not.toMatch(expected)
  555 |         return;
  556 |       }
  557 |
  558 |       if (testCase.kind === 'uiDisplaysOrderField') {
  559 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  560 |         await assertOrderFieldVisible(page, testCase, prepared.orders[0]);
  561 |         return;
  562 |       }
  563 |
  564 |       if (testCase.kind === 'uiStatusTranslated') {
  565 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  566 |         await assertStatusLabelsTranslated(page, testCase, prepared.orders);
  567 |         return;
  568 |       }
  569 |
  570 |       if (testCase.kind === 'uiStatusColorsDistinct') {
  571 |         await assertOrderHistoryUi(page, testCase, prepared.orders);
  572 |         await assertStatusColorsDistinct(page, testCase, prepared.orders);
  573 |         return;
  574 |       }
  575 |
  576 |       await assertOrderHistoryUi(page, testCase, prepared.orders);
  577 |     });
  578 |   }
  579 | });
  580 |
```