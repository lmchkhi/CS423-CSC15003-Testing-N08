<!-- tests/test-runs/FR-05-search-run.md -->

# Test Run: FR-05 — Xem danh sách & Tìm kiếm sản phẩm

## Test Run Info

| Thông tin       | Chi tiết                                                              |
|-----------------|-----------------------------------------------------------------------|
| **Date**        | 2026-06-27                                                            |
| **Tester**      | Manual                                                                |
| **Environment** | Frontend Web (http://localhost:5173) + Backend API (http://localhost:3000) |

---

## Kết quả Test Run

| TC ID           | Tên Test Case                              | Technique | Status     | Ghi chú                                    |
|-----------------|--------------------------------------------|-----------|------------|---------------------------------------------|
| TC-FR05-DT-001  | Tìm kiếm với từ khóa rỗng                 | EP1       | ✅ Passed  |                                             |
| TC-FR05-DT-002  | Tìm kiếm từ khóa hợp lệ có kết quả       | EP2       | ✅ Passed  |                                             |
| TC-FR05-DT-003  | Tìm kiếm từ khóa không có kết quả         | EP3       | ❌ Failed  | Không hiển thị empty state message          |
| TC-FR05-DT-004  | Tìm kiếm từ khóa có ký tự đặc biệt       | EP4       | ❌ Failed  | Không trả về kết quả hoặc empty state       |
| TC-FR05-DT-005  | Tìm kiếm chỉ khoảng trắng                 | EP5       | ✅ Passed  |                                             |
| TC-FR05-DT-006  | Tìm kiếm với XSS Payload                  | EP6       | ❌ Failed  | Server trả 500, lộ raw DB error             |
| TC-FR05-DT-007  | Tìm kiếm với SQL Injection                | EP7       | ❌ Failed  | SQL Injection thành công, trả về toàn bộ SP |
| TC-FR05-DT-008  | Danh sách SP hiển thị dạng grid            | UI-1      | ✅ Passed  |                                             |
| TC-FR05-DT-009  | Card SP hiển thị Ảnh + Tên + Giá          | UI-2      | ❌ Failed  | Giá hiển thị 'VND' thay vì '₫'             |
| TC-FR05-DT-010  | Trạng thái loading khi đang tải            | UI-4      | ❌ Failed  | Không có loading indicator                  |
| TC-FR05-DT-011  | Trang chủ có đúng 1 thẻ h1                | UI-6      | ❌ Failed  | Có 2 thẻ h1 thay vì 1                      |
| TC-FR05-DT-012  | Giá hiển thị đúng format ₫                 | UI-8      | ❌ Failed  | Hiển thị 'VND' thay vì '₫'                 |

---

## Thống kê

| Metric                | Value          |
|-----------------------|----------------|
| **Total**             | 12             |
| **Passed**            | 4 (33.3%)      |
| **Failed**            | 8 (66.7%)      |
| **Related Bug Reports** | BUG-FR05-001 → BUG-FR05-007 |

---

## Danh sách Bug Reports

| Bug ID       | TC liên quan   | Mô tả ngắn                                              | Severity |
|--------------|----------------|----------------------------------------------------------|----------|
| BUG-FR05-001 | DT-003         | Thiếu empty state khi không có kết quả tìm kiếm         | Minor    |
| BUG-FR05-002 | DT-004         | Tìm kiếm ký tự đặc biệt không trả kết quả/empty state  | Minor    |
| BUG-FR05-003 | DT-006         | XSS payload gây lỗi 500, lộ raw DB error                | Critical |
| BUG-FR05-004 | DT-007         | SQL Injection thành công, trả về toàn bộ sản phẩm       | Critical |
| BUG-FR05-005 | DT-009, DT-012 | Ký hiệu tiền tệ hiển thị 'VND' thay vì '₫'             | Minor    |
| BUG-FR05-006 | DT-010         | Thiếu loading indicator khi đang tải dữ liệu            | Minor    |
| BUG-FR05-007 | DT-011         | Trang chủ có 2 thẻ h1 thay vì 1                         | Trivial  |
