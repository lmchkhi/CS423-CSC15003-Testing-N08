<!-- tests/test-runs/FR-12-access-run.md -->

# Test Run: FR-12 — Kiểm soát truy cập (Access Control)

## Tóm tắt

| Thông tin           | Giá trị        |
|---------------------|----------------|
| Ngày thực hiện      | 2026-06-27     |
| Tester              |                |
| Tổng test case      | 40             |
| Passed              | 23             |
| Failed              | 17             |
| Not Run             | 0              |
| Pass Rate           | 57.5%          |

## Kết quả chi tiết

| TC ID  | Tên Test Case                                                  | Status     | Ghi chú                                              |
|--------|----------------------------------------------------------------|------------|-------------------------------------------------------|
| DT-001 | Truy cập API danh sách người dùng — Không có Token             | ✅ Passed  | 401 Unauthorized                                      |
| DT-002 | Truy cập API danh sách người dùng — Token không hợp lệ        | ❌ Failed  | 403 thay vì 401                                       |
| DT-003 | Truy cập API danh sách người dùng — Token user thường          | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-004 | Truy cập API danh sách người dùng — Token admin                | ✅ Passed  | 200 OK                                                |
| DT-005 | Xóa người dùng (Admin) — Không có Token                       | ✅ Passed  | 401 Unauthorized                                      |
| DT-006 | Xóa người dùng (Admin) — Token user thường                    | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-007 | Xóa người dùng (Admin) — Token admin                          | ✅ Passed  | 200 OK                                                |
| DT-008 | Truy cập API danh sách đơn hàng (Admin) — Không có Token      | ✅ Passed  | 401 Unauthorized                                      |
| DT-009 | Truy cập API danh sách đơn hàng (Admin) — Token user thường   | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-010 | Truy cập API danh sách đơn hàng (Admin) — Token admin          | ✅ Passed  | 200 OK                                                |
| DT-011 | Cập nhật trạng thái đơn hàng (Admin) — Không có Token          | ✅ Passed  | 401 Unauthorized                                      |
| DT-012 | Cập nhật trạng thái đơn hàng (Admin) — Token user thường       | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-013 | Cập nhật trạng thái đơn hàng (Admin) — Token admin             | ✅ Passed  | 200 OK                                                |
| DT-014 | Import sản phẩm CSV (Admin) — Không có Token                   | ✅ Passed  | 401 Unauthorized                                      |
| DT-015 | Import sản phẩm CSV (Admin) — Token user thường                | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-016 | Import sản phẩm CSV (Admin) — Token admin                      | ✅ Passed  | 200 OK                                                |
| DT-017 | Thêm mã giảm giá (Admin) — Không có Token                     | ✅ Passed  | 401 Unauthorized                                      |
| DT-018 | Thêm mã giảm giá (Admin) — Token user thường                  | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-019 | Thêm mã giảm giá (Admin) — Token admin                        | ✅ Passed  | 200 OK                                                |
| DT-020 | Xóa mã giảm giá (Admin) — Không có Token                      | ✅ Passed  | 401 Unauthorized                                      |
| DT-021 | Xóa mã giảm giá (Admin) — Token user thường                   | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-022 | Xóa mã giảm giá (Admin) — Token admin                         | ✅ Passed  | 200 OK                                                |
| DT-023 | Thêm sản phẩm — Không có Token                                | ❌ Failed  | 200 thay vì 401 — hoàn toàn thiếu auth               |
| DT-024 | Thêm sản phẩm — Token user thường                             | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-025 | Thêm sản phẩm — Token admin                                   | ✅ Passed  | 200 OK                                                |
| DT-026 | Cập nhật sản phẩm — Không có Token                             | ❌ Failed  | 200 thay vì 401 — hoàn toàn thiếu auth               |
| DT-027 | Cập nhật sản phẩm — Token user thường                          | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-028 | Cập nhật sản phẩm — Token admin                                | ✅ Passed  | 200 OK                                                |
| DT-029 | Xóa sản phẩm — Không có Token                                 | ❌ Failed  | 200 thay vì 401 — hoàn toàn thiếu auth               |
| DT-030 | Xóa sản phẩm — Token user thường                              | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-031 | Xóa sản phẩm — Token admin                                    | ✅ Passed  | 200 OK                                                |
| DT-032 | Thêm danh mục — Không có Token                                | ✅ Passed  | 401 Unauthorized                                      |
| DT-033 | Thêm danh mục — Token user thường                             | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-034 | Thêm danh mục — Token admin                                   | ✅ Passed  | 200 OK                                                |
| DT-035 | Cập nhật danh mục — Không có Token                             | ✅ Passed  | 401 Unauthorized                                      |
| DT-036 | Cập nhật danh mục — Token user thường                          | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-037 | Cập nhật danh mục — Token admin                                | ✅ Passed  | 200 OK                                                |
| DT-038 | Xóa danh mục — Không có Token                                 | ✅ Passed  | 401 Unauthorized                                      |
| DT-039 | Xóa danh mục — Token user thường                              | ❌ Failed  | 200 thay vì 403 — thiếu kiểm tra role                |
| DT-040 | Xóa danh mục — Token admin                                    | ✅ Passed  | 200 OK                                                |

## Danh sách Bug Reports

| Bug ID        | Tên                                                  | Severity       | Test Cases liên quan                                  |
|---------------|------------------------------------------------------|----------------|-------------------------------------------------------|
| BUG-FR12-001  | Product API endpoints thiếu middleware xác thực      | Critical / P0  | DT-023, DT-024, DT-026, DT-027, DT-029, DT-030       |
| BUG-FR12-002  | Admin API endpoints thiếu kiểm tra role              | Critical / P0  | DT-003, DT-006, DT-009, DT-012, DT-015, DT-018, DT-021 |
| BUG-FR12-003  | Category API endpoints thiếu kiểm tra role           | Critical / P0  | DT-033, DT-036, DT-039                                |
| BUG-FR12-004  | Token không hợp lệ trả về 403 thay vì 401           | Minor / P2     | DT-002                                                |
