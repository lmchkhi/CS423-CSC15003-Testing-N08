---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-14] API cập nhật/xóa danh mục không tồn tại vẫn trả thành công"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR14-DT-012, TC-FR14-DT-015

## Requirement liên quan
FR-14: Quản lý Danh mục (Category CRUD)

## Severity / Priority
Major / P2

## Environment
Browser: Chromium, Firefox, WebKit
OS: macOS Darwin 25.5.0 arm64
Admin URL: http://[::1]:5174
API URL: http://[::1]:3000
Playwright: 1.62.1
Build / Commit: `9eedea6` + Commit 8 working tree

## Steps to reproduce
1. Đăng nhập bằng admin `admin@eshop.com` để lấy admin token.
2. Xác định một category id không tồn tại, ví dụ `999999`.
3. Gọi `PUT /api/categories/999999` với body `{"name":"FR14 Missing Category ..."}`.
4. Gọi `DELETE /api/categories/999999`.
5. Gọi `GET /api/categories` để kiểm tra danh sách.

## Expected result
API phải trả lỗi phù hợp như `400`, `404` hoặc `422`, hoặc thông báo category không tồn tại. Hệ thống không được báo cập nhật/xóa thành công khi không có record nào bị ảnh hưởng.

## Actual result
API trả `200 OK` với body success cho cả hai thao tác:

```json
{
  "message": "Category updated"
}
```

```json
{
  "message": "Category deleted"
}
```

Không có category mới được tạo/xóa, nhưng response success gây hiểu sai rằng thao tác update/delete đã thực hiện thành công.

## Evidence
- Playwright HTML report: [`reports/html/fr14-category-management/chromium/hw04-report.html`](../../reports/html/fr14-category-management/chromium/hw04-report.html)
- Playwright HTML report Firefox: [`reports/html/fr14-category-management/firefox/hw04-report.html`](../../reports/html/fr14-category-management/firefox/hw04-report.html)
- Playwright HTML report WebKit: [`reports/html/fr14-category-management/webkit/hw04-report.html`](../../reports/html/fr14-category-management/webkit/hw04-report.html)
- Playwright original report: [`reports/html/fr14-category-management/chromium/index.html`](../../reports/html/fr14-category-management/chromium/index.html)
- JSON result: [`reports/results/fr14-category-management/chromium/results.json`](../../reports/results/fr14-category-management/chromium/results.json)
- TC-FR14-DT-012 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/test-failed-1.png)

![TC-FR14-DT-012 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/test-failed-1.png)

- TC-FR14-DT-015 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-377bb-hông-tồn-tại-hoặc-đã-bị-xóa-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-377bb-hông-tồn-tại-hoặc-đã-bị-xóa-chromium/test-failed-1.png)

![TC-FR14-DT-015 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-377bb-hông-tồn-tại-hoặc-đã-bị-xóa-chromium/test-failed-1.png)

- Error context: [`test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/error-context.md)
- Error context TC-FR14-DT-015: [`test-results/fr14-category-management/chromium/fr14-category-management-R-377bb-hông-tồn-tại-hoặc-đã-bị-xóa-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-377bb-hông-tồn-tại-hoặc-đã-bị-xóa-chromium/error-context.md)
- Trace: [`test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/trace.zip`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/trace.zip)
- Video: [`test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/video.webm`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-6fc1b-nhật-danh-mục-không-tồn-tại-chromium/video.webm)

## GitHub Issue
[#243](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/243)
