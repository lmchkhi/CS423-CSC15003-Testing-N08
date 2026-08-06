# FR-14: Quản lý danh mục CRUD

## Nguồn cần đọc

- `SystemRequirementsSpecification.md`, mục FR-12 và FR-14.
- `api_specification.md`, endpoint categories và admin auth.
- `tests/test-cases/FR-14-category-management`.
- `tests/test-runs/FR-14-category-management-run.md`.
- `bug-reports/BUG-FR14-*.md` khi automation phát hiện lại defect.

## Requirement oracle

- Admin có thể thêm, xem, xóa danh mục.
- Tên danh mục bắt buộc, không được rỗng.
- Các API ảnh hưởng dữ liệu `POST/PUT/DELETE /api/categories` phải yêu cầu token admin theo FR-12.
- Guest hoặc user thường không được thao tác dữ liệu danh mục.

## API liên quan

- `POST /api/login` để lấy token admin và user thường.
- `GET /api/categories`.
- `POST /api/categories` body `{ "name": "Tên DM" }`.
- `PUT /api/categories/:id`.
- `DELETE /api/categories/:id`.

## Case nên ưu tiên tự động hóa

- Domain: chọn ít nhất 12 trong TC-FR14-DT-001 đến TC-FR14-DT-016.
- BVA: TC-FR14-BVA-001 đến TC-FR14-BVA-006 nếu muốn tăng edge/count coverage.
- Đảm bảo có cả UI admin và API authorization: admin xem/thêm/sửa/xóa; guest bị chặn; user thường bị chặn; tên rỗng; tên toàn khoảng trắng; tên Unicode tiếng Việt; id không tồn tại.

## Bug đã biết từ HW02

- User thường có thể thêm/sửa/xóa category qua API.
- Backend có thể chấp nhận tên category rỗng hoặc chỉ gồm khoảng trắng.
- Update/delete category không tồn tại có thể trả success giả.

Với thao tác tạo/sửa/xóa, tạo dữ liệu category có prefix duy nhất, ví dụ `HW04-${timestamp}`, và cleanup bằng API admin nếu test pass qua bước tạo.
