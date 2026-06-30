# AI Gap Analysis - FR-14 - Category Management CRUD

## Summary

Sau khi thực thi 22 test cases cho FR-14, có 3 nhóm lỗi được ghi nhận:

| Bug ID | Nội dung | Test cases liên quan |
| --- | --- | --- |
| BUG-FR14-001 | User thường có thể gọi API thêm/sửa/xóa danh mục dù mutation category phải yêu cầu `role = 'admin'` | TC-FR14-DT-005, TC-FR14-DT-013, TC-FR14-DT-016 |
| BUG-FR14-002 | API không validate tên danh mục bắt buộc, cho phép tên rỗng hoặc chỉ gồm khoảng trắng khi thêm/cập nhật | TC-FR14-DT-007, TC-FR14-DT-008, TC-FR14-DT-011, TC-FR14-BVA-001 |
| BUG-FR14-003 | API update/delete category id không tồn tại vẫn trả thông báo thành công | TC-FR14-DT-012, TC-FR14-DT-015 |

| Technique | Designed | Executed | Passed | Failed | Not Run |
| --- | --- | --- | --- | --- | --- |
| Domain Testing | 16 | 16 | 8 | 8 | 0 |
| BVA | 6 | 6 | 5 | 1 | 0 |

## AI Misses / Corrections

- AI thiết kế đúng các miền quan trọng cho FR-14: role admin/user/guest, tên category rỗng/whitespace/Unicode, category id tồn tại/không tồn tại và boundary min length. Các test này đã phát hiện 3 nhóm lỗi sau khi chạy.
- AI không tạo test duplicate name hoặc max length vì `SystemRequirementsSpecification.md` và `api_specification.md` không nêu ràng buộc uniqueness/max length cho category name. Đây là quyết định đúng theo nguyên tắc black-box, nhưng nếu UI/API công khai thể hiện rule bổ sung thì cần thêm test case sau.
- SRS FR-14 chỉ ghi Admin có thể Thêm / Xem / Xóa, còn `api_specification.md` có `PUT /api/categories/:id` và tên feature là CRUD. Bộ test vẫn giữ Update trong phạm vi kiểm thử; khi chạy, Update qua API phát hiện cả lỗi phân quyền, lỗi validate tên rỗng và lỗi id không tồn tại trả success giả.
- API verification dùng token admin/user để xác nhận: user token gọi `POST/PUT/DELETE /api/categories` đều trả `200 OK`; admin token thêm/cập nhật tên rỗng vẫn trả `200 OK`; `PUT/DELETE /api/categories/999999` vẫn trả success.

## Human Review Action

- Cập nhật `tests/test-runs/FR-14-category-management-run.md` với 13 Passed, 9 Failed, 0 Not Run.
- Cập nhật `Status / Related bugs` trong các file test case FR-14 liên quan.
- Tạo bug reports `BUG-FR14-001.md`, `BUG-FR14-002.md`, `BUG-FR14-003.md`.
- Dọn dữ liệu category tạm sau API verification; danh sách category quay về 3 category mặc định.
- Cập nhật summary trong `reports/main-report.md` và `README.md`.
