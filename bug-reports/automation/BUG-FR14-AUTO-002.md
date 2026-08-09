---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-14] API danh mục không validate tên bắt buộc khi thêm hoặc cập nhật"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR14-DT-007, TC-FR14-DT-008, TC-FR14-DT-011, TC-FR14-BVA-001

## Requirement liên quan
FR-14: Quản lý Danh mục (Category CRUD)

## Severity / Priority
Major / P1

## Environment
Browser: Chromium
OS: macOS Darwin 25.5.0 arm64
Admin URL: http://[::1]:5174
API URL: http://[::1]:3000
Playwright: 1.62.1
Build / Commit: `1b7c5eb` + Commit 7 working tree

## Steps to reproduce
1. Đăng nhập bằng admin `admin@eshop.com` để lấy admin token.
2. Gọi `POST /api/categories` với body `{"name":""}`.
3. Gọi `POST /api/categories` với body `{"name":"   "}`.
4. Tạo một category test hợp lệ.
5. Gọi `PUT /api/categories/<category_id>` với body `{"name":""}`.
6. Gọi `GET /api/categories` để kiểm tra danh sách sau mỗi request.

## Expected result
API phải từ chối tên danh mục rỗng hoặc chỉ gồm khoảng trắng vì FR-14 quy định tên danh mục là bắt buộc, không được để trống. Khi cập nhật, tên cũ của danh mục phải được giữ nguyên nếu tên mới invalid.

## Actual result
API trả `200 OK` và báo thành công cho các input invalid:

- `POST /api/categories` với `{"name":""}` trả `{"message":"Category created","id":19}` và tạo category tên rỗng.
- `POST /api/categories` với `{"name":"   "}` trả `{"message":"Category created","id":20}` và tạo category chỉ gồm khoảng trắng.
- `PUT /api/categories/<category_id>` với `{"name":""}` trả `{"message":"Category updated"}`, tên cũ không còn được giữ và category bị đổi thành tên rỗng.
- BVA `TC-FR14-BVA-001` xác nhận điểm min length 0 cũng bị chấp nhận sai với id `24`.

Automation đã cleanup dữ liệu test sau khi ghi nhận evidence, nên danh sách quay lại 3 danh mục mặc định.

## Evidence
- Playwright HTML report: [`reports/html/fr14-category-management/chromium/hw04-report.html`](../../reports/html/fr14-category-management/chromium/hw04-report.html)
- Playwright original report: [`reports/html/fr14-category-management/chromium/index.html`](../../reports/html/fr14-category-management/chromium/index.html)
- JSON result: [`reports/results/fr14-category-management/chromium/results.json`](../../reports/results/fr14-category-management/chromium/results.json)
- TC-FR14-DT-007 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-47759--thêm-danh-mục-với-tên-rỗng-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47759--thêm-danh-mục-với-tên-rỗng-chromium/test-failed-1.png)

![TC-FR14-DT-007 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47759--thêm-danh-mục-với-tên-rỗng-chromium/test-failed-1.png)

- TC-FR14-DT-008 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-00b76-ới-tên-chỉ-gồm-khoảng-trắng-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-00b76-ới-tên-chỉ-gồm-khoảng-trắng-chromium/test-failed-1.png)

![TC-FR14-DT-008 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-00b76-ới-tên-chỉ-gồm-khoảng-trắng-chromium/test-failed-1.png)

- TC-FR14-DT-011 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-a9fd0--nhật-danh-mục-với-tên-rỗng-chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-a9fd0--nhật-danh-mục-với-tên-rỗng-chromium/test-failed-1.png)

![TC-FR14-DT-011 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-a9fd0--nhật-danh-mục-với-tên-rỗng-chromium/test-failed-1.png)

- TC-FR14-BVA-001 Screenshot Evidence: [`test-results/fr14-category-management/chromium/fr14-category-management-R-47b0e--0-ký-tự-OFF----min-length--chromium/test-failed-1.png`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47b0e--0-ký-tự-OFF----min-length--chromium/test-failed-1.png)

![TC-FR14-BVA-001 Screenshot Evidence](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47b0e--0-ký-tự-OFF----min-length--chromium/test-failed-1.png)

- Error context TC-FR14-DT-007: [`test-results/fr14-category-management/chromium/fr14-category-management-R-47759--thêm-danh-mục-với-tên-rỗng-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47759--thêm-danh-mục-với-tên-rỗng-chromium/error-context.md)
- Error context TC-FR14-DT-008: [`test-results/fr14-category-management/chromium/fr14-category-management-R-00b76-ới-tên-chỉ-gồm-khoảng-trắng-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-00b76-ới-tên-chỉ-gồm-khoảng-trắng-chromium/error-context.md)
- Error context TC-FR14-DT-011: [`test-results/fr14-category-management/chromium/fr14-category-management-R-a9fd0--nhật-danh-mục-với-tên-rỗng-chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-a9fd0--nhật-danh-mục-với-tên-rỗng-chromium/error-context.md)
- Error context TC-FR14-BVA-001: [`test-results/fr14-category-management/chromium/fr14-category-management-R-47b0e--0-ký-tự-OFF----min-length--chromium/error-context.md`](../../test-results/fr14-category-management/chromium/fr14-category-management-R-47b0e--0-ký-tự-OFF----min-length--chromium/error-context.md)

## GitHub Issue
[#242](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/242)
