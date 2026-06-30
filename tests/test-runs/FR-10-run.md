<!-- tests/test-runs/FR-10-run.md -->

# Test Run: FR-10 — Trạng thái Đơn hàng (Order State Machine)

## Thông tin chung

| Mục                 | Chi tiết                                                |
| -------------------- | ------------------------------------------------------- |
| **Requirement**      | FR-10: Trạng thái Đơn hàng (Order State Machine)       |
| **Nền tảng**         | Web Admin (http://localhost:5174) + Frontend Web (http://localhost:5173) + API (http://localhost:3000) |
| **Ngày thực hiện**   | 2026-06-29                                              |
| **Người thực hiện**  | Tester (Manual)                                         |
| **Môi trường**       | Backend Node.js + Express + SQLite, Frontend React + Vite |
| **Tài khoản test**   | Admin: admin@eshop.com / Admin123! — User: test@eshop.com / Test1234! |
| **Test Technique**   | Decision Table Testing (DTT)                            |

---

## Tổng kết

| Metric            | Giá trị     |
| ----------------- | ----------- |
| Tổng Test Cases   | 12          |
| ✅ Passed         | 8 (66.7%)   |
| ❌ Failed         | 3 (25.0%)   |
| ⏭️ Not Run        | 1 (8.3%)    |
| 🐛 Bug phát hiện  | 3           |

---

## Kết quả Decision Table Testing (DTT)

| TC ID   | Rule | Tên Test Case                                                                | Status      | Bug ID        |
| ------- | ---- | ---------------------------------------------------------------------------- | ----------- | ------------- |
| DTT-001 | R1   | Admin xác nhận đơn hàng pending → confirmed thành công                      | ✅ PASSED   |               |
| DTT-002 | R2   | Admin chuyển đơn hàng confirmed → shipping thành công                       | ✅ PASSED   |               |
| DTT-003 | R3   | Admin hoàn tất đơn hàng shipping → delivered thành công                     | ✅ PASSED   |               |
| DTT-004 | R4   | User hủy đơn hàng pending thành công                                        | ✅ PASSED   |               |
| DTT-005 | R5   | User hủy đơn hàng confirmed thành công                                      | ✅ PASSED   |               |
| DTT-006 | R6   | Admin hủy đơn hàng shipping thành công                                      | ❌ FAILED   | BUG-FR10-001  |
| DTT-007 | R7   | User bị từ chối hủy đơn hàng shipping                                       | ❌ FAILED   | BUG-FR10-002  |
| DTT-008 | R8   | Từ chối chuyển trạng thái từ delivered — trạng thái kết thúc                | ✅ PASSED   |               |
| DTT-009 | R9   | Từ chối chuyển trạng thái từ canceled — trạng thái kết thúc                 | ✅ PASSED   |               |
| DTT-010 | R10  | Từ chối transition skip bước — Admin: pending → shipping                    | ✅ PASSED   |               |
| DTT-011 | R10  | Từ chối transition quay ngược — Admin: confirmed → pending                  | ⏭️ NOT RUN  |               |
| DTT-012 | R10  | Từ chối User thực hiện hành động Admin-only: pending → confirmed            | ❌ FAILED   | BUG-FR10-003  |

---

## Danh sách Bug phát hiện

| Bug ID        | Severity | Priority | Mô tả ngắn                                                                                         | TC liên quan |
| ------------- | -------- | -------- | --------------------------------------------------------------------------------------------------- | ------------ |
| BUG-FR10-001  | Major    | P1       | Admin hủy đơn hàng shipping — hệ thống hoạt động đúng nhưng không nhất quán với UI/flow mong đợi  | DTT-006      |
| BUG-FR10-002  | Critical | P0       | User có thể hủy đơn hàng đang shipping — vi phạm ràng buộc State Machine FR-10                    | DTT-007      |
| BUG-FR10-003  | Critical | P0       | User có thể gọi API Admin để xác nhận đơn hàng — thiếu kiểm tra role trên API Admin orders         | DTT-012      |

---

## Nhận xét chung

- **Lỗi nghiêm trọng nhất (BUG-FR10-002):** Hệ thống cho phép User tự hủy đơn hàng đang ở trạng thái `shipping`. Theo đặc tả FR-10: "Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác." API `PUT /api/orders/:id/cancel` không kiểm tra trạng thái đơn hàng hiện tại trước khi cho phép hủy.
- **Lỗi bảo mật nghiêm trọng (BUG-FR10-003):** User có thể gọi trực tiếp API Admin (`PUT /api/admin/orders/:id/status`) với token User và hệ thống chấp nhận. Điều này vi phạm cả FR-10 (State Machine), FR-12 (Access Control) và SEC-03 (API Admin phải kiểm tra `role = 'admin'`).
- **Lỗi TC-006 (BUG-FR10-001):** Test case đánh FAILED mặc dù actual result trùng expected. Cần xác minh lại — có thể liên quan đến hành vi UI không nhất quán (nút hủy không hiển thị đúng trên giao diện Admin cho đơn hàng shipping).
- **Valid transitions hoạt động đúng:** Toàn bộ quy trình tiến trình (R1-R3: pending → confirmed → shipping → delivered) hoạt động chính xác.
- **Final states được enforce đúng:** Cả `delivered` (R8) và `canceled` (R9) đều từ chối chuyển đổi — đúng đặc tả.
- **Skip bước được chặn:** Admin không thể bỏ qua bước trung gian (R10: pending → shipping) — đúng đặc tả.
- **TC-011 chưa thực thi:** Cần thực thi thêm test case quay ngược confirmed → pending.
