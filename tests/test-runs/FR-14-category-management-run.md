# Test Run: FR-14 - Quản lý danh mục CRUD

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-14: Quản lý danh mục CRUD |
| **Ngày thực thi** | 01/07/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL Admin: http://localhost:5174 · API: http://localhost:3000 |
| **Build / Commit** | `5164f72` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR14-DT-001 | Admin xem danh sách danh mục | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-002 | Guest bị chặn khỏi màn hình quản lý danh mục | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-003 | User thường bị chặn khỏi màn hình quản lý danh mục | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-004 | Guest không được thêm danh mục qua API | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-005 | User thường không được thêm danh mục qua API | Ngô Hồng Thanh | Failed | BUG-FR14-001 | Dùng token user thường vẫn thêm category được. API verification: `POST /api/categories` với token `role = user` trả `200 OK`, `Category created`, id tạm `4`. |
| TC-FR14-DT-006 | Admin thêm danh mục với tên hợp lệ | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-007 | Admin thêm danh mục với tên rỗng | Ngô Hồng Thanh | Failed | BUG-FR14-002 | Vẫn tạo được category với tên rỗng. API verification: `POST /api/categories` với `{"name":""}` trả `200 OK`, `Category created`, id tạm `5`. |
| TC-FR14-DT-008 | Admin thêm danh mục với tên chỉ gồm khoảng trắng | Ngô Hồng Thanh | Failed | BUG-FR14-002 | Vẫn tạo được category với tên chỉ gồm khoảng trắng. API verification: `POST /api/categories` với `{"name":"   "}` trả `200 OK`, `Category created`, id tạm `6`. |
| TC-FR14-DT-009 | Admin thêm danh mục với tên Unicode tiếng Việt | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-010 | Admin cập nhật tên danh mục tồn tại | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-011 | Admin cập nhật danh mục với tên rỗng | Ngô Hồng Thanh | Failed | BUG-FR14-002 | Vẫn cập nhật được category với tên rỗng. API verification: `PUT /api/categories/4` với `{"name":""}` trả `200 OK`, `Category updated`. |
| TC-FR14-DT-012 | Admin cập nhật danh mục không tồn tại | Ngô Hồng Thanh | Failed | BUG-FR14-003 | Vẫn báo `200 OK` với message `Category updated` nhưng không thấy cập nhật hay tạo mới. API verification: `PUT /api/categories/999999` trả success giả. |
| TC-FR14-DT-013 | User thường không được cập nhật danh mục qua API | Ngô Hồng Thanh | Failed | BUG-FR14-001 | Dùng token user thường vẫn cập nhật category được. API verification: `PUT /api/categories/4` với token `role = user` trả `200 OK`, `Category updated`. |
| TC-FR14-DT-014 | Admin xóa danh mục tồn tại | Ngô Hồng Thanh | Passed | | |
| TC-FR14-DT-015 | Admin xóa danh mục không tồn tại hoặc đã bị xóa | Ngô Hồng Thanh | Failed | BUG-FR14-003 | Vẫn báo `200 OK` với message `Category deleted` dù id không tồn tại/đã xóa. API verification: `DELETE /api/categories/999999` trả success giả. |
| TC-FR14-DT-016 | User thường không được xóa danh mục qua API | Ngô Hồng Thanh | Failed | BUG-FR14-001 | Dùng token user thường vẫn xóa category được. API verification: `DELETE /api/categories/4` với token `role = user` trả `200 OK`, `Category deleted`. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR14-BVA-001 | Tên danh mục dài 0 ký tự | Ngô Hồng Thanh | Failed | BUG-FR14-002 | Vẫn tạo được category với tên rỗng. API verification trùng TC-FR14-DT-007: `POST /api/categories` với `{"name":""}` trả `200 OK`. |
| TC-FR14-BVA-002 | Tên danh mục dài 1 ký tự | Ngô Hồng Thanh | Passed | | |
| TC-FR14-BVA-003 | Tên danh mục dài 2 ký tự | Ngô Hồng Thanh | Passed | | |
| TC-FR14-BVA-004 | Danh sách có 0 danh mục | Ngô Hồng Thanh | Passed | | |
| TC-FR14-BVA-005 | Danh sách có đúng 1 danh mục | Ngô Hồng Thanh | Passed | | |
| TC-FR14-BVA-006 | Danh sách có nhiều danh mục | Ngô Hồng Thanh | Passed | | |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 13 |
| Failed | 9 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **22** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
