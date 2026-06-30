<!-- tests/test-design/FR-10/TDS-FR10-DTT.md -->

# Test Design Specification — FR10: Trạng thái Đơn hàng (Order State Machine)

**Technique:** Decision Table Testing

---

## 1. Document Information

| Field          | Value                                         |
| -------------- | --------------------------------------------- |
| Document ID    | TDS-FR10-DTT                                  |
| Feature        | Trạng thái Đơn hàng (Order State Machine)     |
| Requirement ID | FR-10                                         |
| SUT            | EShop                                         |
| Author         | AI QA Engineer                                |
| Review Status  | Draft                                         |
| Version        | 1.0                                           |
| Date           | 2026-06-29                                    |

---

## 2. Scope

**In scope:**

- Tất cả chuyển đổi trạng thái hợp lệ trong State Machine: `pending→confirmed`, `confirmed→shipping`, `shipping→delivered`, `pending→canceled`, `confirmed→canceled`, `shipping→canceled` (Admin only)
- Ràng buộc trạng thái kết thúc: `delivered` và `canceled` không được phép chuyển sang bất kỳ trạng thái nào khác
- Ràng buộc vai trò: User không được phép hủy đơn ở trạng thái `shipping`
- Các chuyển đổi không hợp lệ: skip bước, quay ngược, User thực hiện hành động Admin-only
- API endpoints: `PUT /api/admin/orders/:id/status` (Admin) và `PUT /api/orders/:id/cancel` (User)

**Out of scope:**

- Quy trình tạo đơn hàng (checkout) — thuộc FR-08
- Hiển thị lịch sử đơn hàng — thuộc FR-11
- Giao diện quản lý đơn hàng Admin — thuộc FR-18
- Performance testing, stress testing
- Hiển thị trạng thái trên UI (dịch tiếng Việt, màu sắc) — thuộc FR-11

---

## 3. Test Objectives

- Xác minh tất cả chuyển đổi trạng thái hợp lệ trong State Machine hoạt động đúng theo đặc tả.
- Xác minh trạng thái kết thúc (`delivered`, `canceled`) không cho phép chuyển sang trạng thái khác.
- Xác minh User không được phép hủy đơn hàng ở trạng thái `shipping` — chỉ Admin mới có quyền.
- Xác minh tất cả chuyển đổi không hợp lệ (skip bước, quay ngược, v.v.) bị từ chối với thông báo lỗi phù hợp.
- Đảm bảo don't-care conditions (`—`) không ảnh hưởng đến kết quả của các rules đã gộp.

---

## 4. Test Technique Applied

| Technique              | Rationale                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Decision Table Testing | Feature liên quan đến 3 conditions (trạng thái hiện tại, trạng thái đích, vai trò) tạo ra 4 actions phân biệt, yêu cầu kiểm tra tổ hợp để đảm bảo State Machine đúng. |

---

## 5. Identified Conditions & Actions

### Conditions

| Condition ID | Description                                        | Values                                                  |
| ------------ | -------------------------------------------------- | ------------------------------------------------------- |
| C1           | Trạng thái hiện tại của đơn hàng (`current_status`) | `pending` / `confirmed` / `shipping` / `delivered` / `canceled` |
| C2           | Trạng thái đích muốn chuyển sang (`target_status`)  | `confirmed` / `shipping` / `delivered` / `canceled`     |
| C3           | Vai trò người thực hiện (`role`)                    | `admin` / `user`                                        |

### Actions

| Action ID | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| A1        | ✅ Chuyển trạng thái thành công — Đơn hàng cập nhật sang `target_status`     |
| A2        | ❌ Từ chối — Chuyển đổi không hợp lệ (transition vi phạm State Machine)     |
| A3        | ❌ Từ chối — Trạng thái kết thúc (`delivered`/`canceled`) không thể chuyển tiếp |
| A4        | ❌ Từ chối — User không được phép hủy đơn đang ở trạng thái `shipping`      |

---

## 6. Reduced Decision Table

| Rule                                        | R1      | R2        | R3       | R4      | R5        | R6       | R7       | R8        | R9       | R10     |
| ------------------------------------------- | ------- | --------- | -------- | ------- | --------- | -------- | -------- | --------- | -------- | ------- |
| **C1: Trạng thái hiện tại**                 | pending | confirmed | shipping | pending | confirmed | shipping | shipping | delivered | canceled | —^(*)   |
| **C2: Trạng thái đích**                     | confirmed | shipping | delivered | canceled | canceled | canceled | canceled | —        | —        | —^(*)   |
| **C3: Vai trò**                             | Admin   | Admin     | Admin    | —       | —         | Admin    | User     | —         | —        | —^(*)   |
|                                             |         |           |          |         |           |          |          |           |          |         |
| **✅ A1: Chuyển trạng thái thành công**      | ✅      | ✅        | ✅       | ✅      | ✅        | ✅       |          |           |          |         |
| **❌ A2: Transition không hợp lệ**          |         |           |          |         |           |          |          |           |          | ❌      |
| **❌ A3: Trạng thái kết thúc**              |         |           |          |         |           |          |          | ❌        | ❌       |         |
| **❌ A4: User không được hủy shipping**     |         |           |          |         |           |          | ❌       |           |          |         |

> ^(*) **R10 (Default Rule):** Tất cả tổ hợp `(C1, C2, C3)` không khớp với R1–R9 đều bị từ chối là chuyển đổi không hợp lệ (A2).

> **Reduction Notes:**
>
> - **R4, R5:** Gộp từ 2 rules mỗi cặp vì cả Admin lẫn User đều được phép hủy đơn `pending`/`confirmed` → C3 = — (don't-care).
> - **R8, R9:** Gộp từ 10 rules mỗi cặp vì `delivered`/`canceled` là trạng thái kết thúc — bất kể `target_status` hay `role` → C2, C3 = —.
> - **R6 vs R7:** Không gộp được vì `shipping → canceled` phân biệt theo role: Admin ✅ (R6), User ❌ (R7).
> - **R10:** Gộp ~22 tổ hợp invalid còn lại (skip bước, quay ngược, User thực hiện hành động Admin-only) thành 1 rule mặc định.

---

## 7. Risk Assessment

| Risk ID | Risk Description                                                                 | Likelihood | Impact   | Mitigation                                                       |
| ------- | -------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------- |
| R-01    | Backend chỉ kiểm tra token tồn tại mà không kiểm tra `role=admin`               | Medium     | High     | Kiểm tra tất cả transitions với cả role Admin và User            |
| R-02    | State Machine cho phép skip bước (pending→shipping) do thiếu validation          | Medium     | High     | Thêm test cases cho các chuyển đổi skip bước (R10)               |
| R-03    | Final states (delivered/canceled) không được enforce đúng trên backend           | Medium     | Critical | Kiểm tra nhiều target_status khác nhau từ final states (R8, R9)  |
| R-04    | User cancel API không kiểm tra trạng thái `shipping` trước khi cho phép hủy     | High       | High     | Test case R7 cụ thể kiểm tra User hủy đơn shipping              |
| R-05    | API chấp nhận trạng thái không hợp lệ (e.g., giá trị ngoài enum)                | Low        | Medium   | Có thể mở rộng thêm test case cho giá trị status không hợp lệ   |

---

## 8. Traceability Matrix

| Test Case ID    | Rule ID | Requirement ID | Conditions Exercised                              | Expected Action                                    | Priority |
| --------------- | ------- | -------------- | ------------------------------------------------- | -------------------------------------------------- | -------- |
| TC-FR10-DTT-001 | R1      | FR-10          | C1=pending, C2=confirmed, C3=Admin                | ✅ A1 — Chuyển thành công sang confirmed            | High     |
| TC-FR10-DTT-002 | R2      | FR-10          | C1=confirmed, C2=shipping, C3=Admin               | ✅ A1 — Chuyển thành công sang shipping             | High     |
| TC-FR10-DTT-003 | R3      | FR-10          | C1=shipping, C2=delivered, C3=Admin               | ✅ A1 — Chuyển thành công sang delivered            | High     |
| TC-FR10-DTT-004 | R4      | FR-10          | C1=pending, C2=canceled, C3=User (don't-care)     | ✅ A1 — User hủy đơn pending thành công             | High     |
| TC-FR10-DTT-005 | R5      | FR-10          | C1=confirmed, C2=canceled, C3=User (don't-care)   | ✅ A1 — User hủy đơn confirmed thành công           | High     |
| TC-FR10-DTT-006 | R6      | FR-10          | C1=shipping, C2=canceled, C3=Admin                | ✅ A1 — Admin hủy đơn shipping thành công           | High     |
| TC-FR10-DTT-007 | R7      | FR-10          | C1=shipping, C2=canceled, C3=User                 | ❌ A4 — User không được hủy đơn shipping            | Critical |
| TC-FR10-DTT-008 | R8      | FR-10          | C1=delivered, C2=confirmed, C3=Admin (don't-care) | ❌ A3 — Trạng thái kết thúc, không chuyển tiếp     | High     |
| TC-FR10-DTT-009 | R9      | FR-10          | C1=canceled, C2=confirmed, C3=Admin (don't-care)  | ❌ A3 — Trạng thái kết thúc, không chuyển tiếp     | High     |
| TC-FR10-DTT-010 | R10     | FR-10          | C1=pending, C2=shipping, C3=Admin                 | ❌ A2 — Skip bước: bỏ qua confirmed                | Medium   |
| TC-FR10-DTT-011 | R10     | FR-10          | C1=confirmed, C2=pending, C3=Admin                | ❌ A2 — Quay ngược: confirmed về pending            | Medium   |
| TC-FR10-DTT-012 | R10     | FR-10          | C1=pending, C2=confirmed, C3=User                 | ❌ A2 — User thực hiện hành động Admin-only         | Medium   |

> **Ghi chú R10:** Rule mặc định được exercise bởi 3 test cases đại diện cho 3 loại transition không hợp lệ: (1) skip bước, (2) quay ngược, (3) User vi phạm quyền Admin.

---

## 9. Entry & Exit Criteria

### Entry Criteria

- Hệ thống EShop đã được triển khai và truy cập được tại môi trường test (Backend: `http://localhost:3000`).
- Tài khoản Admin (`admin@eshop.com` / `Admin123!`) và User (`test@eshop.com` / `Test1234!`) sẵn sàng.
- Có ít nhất một đơn hàng ở mỗi trạng thái (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`) hoặc có khả năng tạo đơn hàng mới để đưa về trạng thái mong muốn.
- TDS này đã được review và phê duyệt.

### Exit Criteria

- Tất cả 10 rules trong Reduced Decision Table đã được exercise bởi ít nhất một test case.
- Tất cả test cases có Priority = `High` / `Critical` đã được thực thi.
- Tất cả defects phát hiện đã được ghi nhận dưới dạng bug reports.
