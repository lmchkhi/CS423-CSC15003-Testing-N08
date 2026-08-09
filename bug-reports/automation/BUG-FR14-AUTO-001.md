---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-14] User thường thêm được danh mục qua API"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR14-DT-005

## Requirement liên quan
FR-14: Quản lý Danh mục (Category CRUD)

## Severity / Priority
Critical / P1

## Environment
Browser: Chromium
OS: macOS Darwin 25.5.0 arm64
Admin URL: http://[::1]:5174
API URL: http://[::1]:3000
Playwright: 1.62.1
Build / Commit: `1b7c5eb` + Commit 7 working tree

## Steps to reproduce
1. Tạo user thường bằng `POST /api/register`.
2. Đăng nhập user thường bằng `POST /api/login` để lấy JWT có role `user`.
3. Gọi `POST /api/categories` với Bearer token của user thường.
4. Gửi body có tên danh mục hợp lệ, ví dụ `FR14 User Create 20260809T17094 2`.
5. Gọi `GET /api/categories` để kiểm tra danh mục có được tạo không.

## Expected result
API phải từ chối request vì token không có `role = 'admin'`. Response nên là `401` hoặc `403`, và danh mục mới không được tạo trong danh sách.

## Actual result
API trả `200 OK` với body báo tạo thành công:

```json
{
  "message": "Category created",
  "id": 17
}
```

Danh mục `FR14 User Create 20260809T17094 2` xuất hiện trong danh sách ngay sau request. Automation đã cleanup dữ liệu test sau khi ghi nhận evidence, nên danh sách quay lại 3 danh mục mặc định.

## Evidence
- Playwright HTML report: [`reports/html/fr14-category-management/chromium/hw04-report.html`](../../reports/html/fr14-category-management/chromium/hw04-report.html)
- Playwright original report: [`reports/html/fr14-category-management/chromium/index.html`](../../reports/html/fr14-category-management/chromium/index.html)
- JSON result: [`reports/results/fr14-category-management/chromium/results.json`](../../reports/results/fr14-category-management/chromium/results.json)
- Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/test-failed-1.png)

![Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/test-failed-1.png)

- Error context: [`test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/error-context.md)
- Trace: [`test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/trace.zip`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/trace.zip)
- Video: [`test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/video.webm`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-c1020--được-thêm-danh-mục-qua-API-chromium/video.webm)

## GitHub Issue
[#241](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/241)
