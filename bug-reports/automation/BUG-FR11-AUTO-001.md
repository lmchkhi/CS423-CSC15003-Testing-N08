---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-11] User thường truy cập được chi tiết đơn hàng của user khác qua API"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR11-DT-007

## Requirement liên quan
FR-11: Xem lịch sử đơn hàng (User)

## Severity / Priority
Critical / P1

## Environment
Browser: Chromium, Firefox, WebKit
OS: macOS Darwin 25.5.0 arm64
Frontend URL: http://[::1]:5173
API URL: http://[::1]:3000
Playwright: 1.62.1
Build / Commit: `7a08db4` + Commit 5 working tree

## Steps to reproduce
1. Tạo và đăng nhập user thường A bằng `POST /api/register` và `POST /api/login`.
2. Tạo một đơn hàng riêng cho user A bằng `POST /api/checkout`.
3. Tạo user thường B và một đơn hàng riêng cho user B bằng API black-box.
4. Mở trang lịch sử đơn hàng của user A để xác nhận UI chỉ hiển thị đơn của user A.
5. Gọi `GET /api/orders/<other_user_order_id>` với Bearer token của user A, trong đó `<other_user_order_id>` là đơn của user B.
6. Quan sát HTTP status và body response.

## Expected result
API phải từ chối truy cập vì đơn hàng không thuộc user đang đăng nhập. Response nên là `401`, `403` hoặc `404`, và không được trả các trường dữ liệu chi tiết như `user_id`, `total_amount`, `shipping_address`, `created_at`.

## Actual result
API trả `200 OK` và body chứa chi tiết đơn hàng của user khác. Lỗi reproduce ổn định trên cả Chromium, Firefox và WebKit.

Ví dụ actual response trong WebKit run:

```json
{
  "id": 122,
  "user_id": 95,
  "total_amount": 991107,
  "status": "pending",
  "shipping_address": "FR11 DT007 other user protected order #1",
  "created_at": "2026-08-09 16:20:37"
}
```

## Evidence
- Chromium Playwright HTML report: [`reports/html/fr11-order-history/chromium/hw04-report.html`](../../reports/html/fr11-order-history/chromium/hw04-report.html)
- Chromium original report: [`reports/html/fr11-order-history/chromium/index.html`](../../reports/html/fr11-order-history/chromium/index.html)
- Chromium JSON result: [`reports/results/fr11-order-history/chromium/results.json`](../../reports/results/fr11-order-history/chromium/results.json)
- Chromium Screenshot Evidence: [`test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/test-failed-1.png`](../../test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/test-failed-1.png)

![Chromium Screenshot Evidence](../../test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/test-failed-1.png)

- Chromium error context: [`test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/error-context.md`](../../test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/error-context.md)
- Chromium trace: [`test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/trace.zip`](../../test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/trace.zip)
- Chromium video: [`test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/video.webm`](../../test-results/fr11-order-history/chromium/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-chromium/video.webm)

- Firefox Playwright HTML report: [`reports/html/fr11-order-history/firefox/hw04-report.html`](../../reports/html/fr11-order-history/firefox/hw04-report.html)
- Firefox original report: [`reports/html/fr11-order-history/firefox/index.html`](../../reports/html/fr11-order-history/firefox/index.html)
- Firefox JSON result: [`reports/results/fr11-order-history/firefox/results.json`](../../reports/results/fr11-order-history/firefox/results.json)
- Firefox Screenshot Evidence: [`test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/test-failed-1.png`](../../test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/test-failed-1.png)

![Firefox Screenshot Evidence](../../test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/test-failed-1.png)

- Firefox error context: [`test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/error-context.md`](../../test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/error-context.md)
- Firefox trace: [`test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/trace.zip`](../../test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/trace.zip)
- Firefox video: [`test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/video.webm`](../../test-results/fr11-order-history/firefox/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-firefox/video.webm)

- WebKit Playwright HTML report: [`reports/html/fr11-order-history/webkit/hw04-report.html`](../../reports/html/fr11-order-history/webkit/hw04-report.html)
- WebKit original report: [`reports/html/fr11-order-history/webkit/index.html`](../../reports/html/fr11-order-history/webkit/index.html)
- WebKit JSON result: [`reports/results/fr11-order-history/webkit/results.json`](../../reports/results/fr11-order-history/webkit/results.json)
- WebKit Screenshot Evidence: [`test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/test-failed-1.png`](../../test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/test-failed-1.png)

![WebKit Screenshot Evidence](../../test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/test-failed-1.png)

- WebKit error context: [`test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/error-context.md`](../../test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/error-context.md)
- WebKit trace: [`test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/trace.zip`](../../test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/trace.zip)
- WebKit video: [`test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/video.webm`](../../test-results/fr11-order-history/webkit/fr11-order-history-Run-by--f84db-tiết-đơn-hàng-của-user-khác-webkit/video.webm)

## GitHub Issue
[#239](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/239)
