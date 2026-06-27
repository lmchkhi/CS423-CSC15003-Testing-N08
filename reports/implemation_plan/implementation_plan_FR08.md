# FR-08: Thanh toán (Checkout) — Black-Box Test Analysis (Steps 1, 2, 3)

## 📋 Tổng quan Yêu cầu

**FR-08** (từ [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L102-L108)):
- Chỉ người dùng **đã đăng nhập** mới tiến hành thanh toán được.
- **Tổng tiền thanh toán** được tính tự động từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp.
- Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua.
- **Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên.**
- Sau thanh toán thành công, giỏ hàng được xóa.

**API Checkout** (từ [api_specification.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/api_specification.md#L129-L137)):
- **Endpoint:** `POST /api/checkout`
- **Header:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "total_amount": 200000,
    "shipping_address": "123 Le Loi, TP.HCM"
  }
  ```

> [!IMPORTANT]
> **Mâu thuẫn Spec vs API:** FR-08 yêu cầu *"Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên"*. Nhưng API Spec lại cho phép client gửi `total_amount` trong body. Đây là **attack surface** quan trọng: hacker có thể dùng Postman gửi `total_amount` ảo (ví dụ `0`, `-1`, `1`) để kiểm tra backend có thực sự bỏ qua giá trị này hay không.

---

## STEP 1: Xác định Biến (Variable Identification)

| # | Variable | Type | Source | Domain / Constraints |
|---|----------|------|--------|---------------------|
| V1 | `Authorization` (JWT Token) | String (Header) | HTTP Header | Token JWT hợp lệ do hệ thống cấp sau đăng nhập. Quyết định danh tính người dùng. |
| V2 | `total_amount` | Numeric (Integer) | Request Body (JSON) | Giá trị tổng tiền. **Theo FR-08:** Backend phải tự tính, KHÔNG tin client. Nhưng API cho phép gửi → **attack vector**. Miền giá trị hợp lệ: số dương (> 0). |
| V3 | `shipping_address` | String | Request Body (JSON) | Địa chỉ giao hàng. Chuỗi ký tự mô tả địa chỉ. |
| V4 | Cart State (Trạng thái giỏ hàng) | Implicit | Server-side (DB) | Giỏ hàng phải có ít nhất 1 sản phẩm để checkout thành công. |

---

## STEP 2: Phân vùng Tương đương (Equivalence Partitioning — EP)

### V1: `Authorization` (JWT Token)

| EP ID | Partition | Mô tả | Expected |
|-------|-----------|-------|----------|
| EP-V1-01 | **Valid** — Token hợp lệ của user đã đăng nhập | Bearer token JWT còn hạn, đúng user | ✅ Cho phép checkout |
| EP-V1-02 | **Invalid** — Không có token (Missing) | Không gửi header Authorization | ❌ 401 Unauthorized |
| EP-V1-03 | **Invalid** — Token sai/hết hạn/malformed | Token rác hoặc hết hạn | ❌ 401/403 |

### V2: `total_amount` (Attack Vector — Client gửi ảo)

> [!WARNING]
> **Tư duy Black-box Hacker:** Dù FR-08 nói backend tự tính, API spec vẫn accept `total_amount` từ client. Hacker dùng Postman có thể gửi bất kỳ giá trị nào. Ta cần kiểm tra backend có THẬT SỰ bỏ qua giá trị này không.

| EP ID | Partition | Giá trị mẫu | Expected (theo FR-08 đúng) |
|-------|-----------|-------------|---------------------------|
| EP-V2-01 | **Giá trị đúng** — Khớp tổng tiền thực tế trong cart | `200000` (giả sử cart = 200,000₫) | ✅ Checkout thành công, tổng tiền = giá trị backend tự tính |
| EP-V2-02 | **Giá trị thấp hơn thực tế** — Hacker gửi giá rẻ hơn | `1` (cart thực tế = 200,000₫) | ✅ Checkout thành công nhưng tổng tiền đơn hàng = **200,000₫** (backend tự tính, KHÔNG dùng `1`) |
| EP-V2-03 | **Giá trị = 0** — Hacker cố mua miễn phí | `0` | ✅ Backend phải bỏ qua, tổng tiền = giá trị backend tự tính |
| EP-V2-04 | **Giá trị âm** — Hacker cố tạo refund | `-50000` | ✅ Backend phải bỏ qua, tổng tiền = giá trị backend tự tính |
| EP-V2-05 | **Giá trị cao hơn thực tế** — Over-charge | `99999999` | ✅ Backend phải bỏ qua, tổng tiền = giá trị backend tự tính |
| EP-V2-06 | **Không gửi trường** — Thiếu `total_amount` | *(omit field)* | ✅ Backend tự tính, checkout vẫn thành công |
| EP-V2-07 | **Kiểu dữ liệu sai** — String thay vì Number | `"abc"` | ❌ Backend reject hoặc bỏ qua, tự tính |

### V3: `shipping_address`

| EP ID | Partition | Giá trị mẫu | Expected |
|-------|-----------|-------------|----------|
| EP-V3-01 | **Valid** — Địa chỉ hợp lệ | `"123 Le Loi, Q1, TP.HCM"` | ✅ Checkout thành công |
| EP-V3-02 | **Empty** — Chuỗi rỗng | `""` | ❌ Lỗi validation (địa chỉ bắt buộc) hoặc ✅ dùng địa chỉ mặc định |
| EP-V3-03 | **Missing** — Không gửi trường | *(omit field)* | ❌ Lỗi hoặc ✅ dùng địa chỉ mặc định từ profile |
| EP-V3-04 | **XSS Payload** — Script injection | `"<script>alert('xss')</script>"` | ✅ Lưu nhưng escape khi hiển thị (SEC-04) |
| EP-V3-05 | **SQL Injection** | `"'; DROP TABLE orders;--"` | ✅ Parameterized query ngăn chặn (SEC-05) |

### V4: Cart State (Trạng thái giỏ hàng)

| EP ID | Partition | Mô tả | Expected |
|-------|-----------|-------|----------|
| EP-V4-01 | **Non-empty** — Giỏ hàng có sản phẩm | Cart có ≥ 1 item | ✅ Checkout thành công |
| EP-V4-02 | **Empty** — Giỏ hàng trống | Cart = 0 items | ❌ Không cho checkout (lỗi thông báo) |

---

## STEP 3: Phân tích Giá trị Biên (Boundary Value Analysis — BVA)

> [!NOTE]
> **STRICT BVA RULE Check:** Biến `total_amount` là **strictly numerical** → ✅ Thỏa mãn điều kiện BVA.
> Các biến khác (`Authorization` = String, `shipping_address` = String, `Cart State` = Categorical) → ❌ Không áp dụng BVA.

### Biến: `total_amount` (Client-sent attack value)

**Bối cảnh BVA:** Dù backend nên tự tính, ta test giá trị client gửi để kiểm tra backend có bỏ qua không. Ranh giới tự nhiên của `total_amount` là **0** (biên giữa hợp lệ và không hợp lệ).

**Ý nghĩa logic:**
- Tổng tiền hợp lệ phải > 0 (vì giỏ hàng phải có ít nhất 1 sản phẩm, mỗi sản phẩm có giá > 0)
- Boundary tại **0**: Ranh giới giữa giá trị hợp lệ (dương) và không hợp lệ (0 hoặc âm)

#### Bảng Boundary Points

| Variable | Constraint | Boundary Type | BVA Points |
|----------|-----------|--------------|------------|
| `total_amount` | Phải > 0 (nếu backend dùng giá trị client) | Min boundary tại 0 | **-1 (OFF⁻)**, **0 (ON)**, **1 (OFF⁺)** |

#### BVA Test Matrix

| TC ID | `total_amount` (client gửi) | Giá trị | Boundary Point | Cart thực tế | Expected |
|-------|---------------------------|---------|---------------|-------------|----------|
| BVA-001 | `-1` | -1 | **OFF⁻** (dưới biên) | Có sản phẩm (tổng = 200,000₫) | ✅ Backend **bỏ qua** giá trị -1, tự tính = 200,000₫. Nếu backend dùng -1 → 🐛 **BUG NGHIÊM TRỌNG** |
| BVA-002 | `0` | 0 | **ON** (đúng biên) | Có sản phẩm (tổng = 200,000₫) | ✅ Backend **bỏ qua** giá trị 0, tự tính = 200,000₫. Nếu backend dùng 0 → 🐛 **BUG NGHIÊM TRỌNG** |
| BVA-003 | `1` | 1 | **OFF⁺** (trên biên) | Có sản phẩm (tổng = 200,000₫) | ✅ Backend **bỏ qua** giá trị 1, tự tính = 200,000₫. Nếu backend dùng 1 → 🐛 **BUG NGHIÊM TRỌNG** |

> [!CAUTION]
> **Cách kiểm chứng:** Sau khi gửi `POST /api/checkout` với `total_amount` ảo, cần gọi `GET /api/orders/my-orders` hoặc `GET /api/orders/:id` để kiểm tra `total_amount` thực sự được lưu trong đơn hàng. Nếu giá trị lưu = giá trị client gửi (thay vì giá trị tự tính) → **BUG bảo mật nghiêm trọng**.

---

## Tổng hợp: Ma trận Test Case sẽ được tạo

### Domain Testing (EP) — Dự kiến Test Cases

| TC ID | Mục tiêu | Biến chính |
|-------|---------|-----------|
| TC-FR08-DT-001 | Checkout thành công (happy path) | V1=Valid, V2=đúng, V3=valid, V4=non-empty |
| TC-FR08-DT-002 | Checkout không có token (chưa đăng nhập) | V1=Missing |
| TC-FR08-DT-003 | Checkout với token sai/hết hạn | V1=Invalid |
| TC-FR08-DT-004 | Hacker gửi `total_amount` thấp hơn thực tế | V2=EP-V2-02 |
| TC-FR08-DT-005 | Hacker gửi `total_amount = 0` | V2=EP-V2-03 |
| TC-FR08-DT-006 | Hacker gửi `total_amount` âm | V2=EP-V2-04 |
| TC-FR08-DT-007 | Hacker gửi `total_amount` quá cao | V2=EP-V2-05 |
| TC-FR08-DT-008 | Không gửi trường `total_amount` | V2=EP-V2-06 |
| TC-FR08-DT-009 | Gửi `total_amount` kiểu string | V2=EP-V2-07 |
| TC-FR08-DT-010 | Checkout với `shipping_address` rỗng | V3=EP-V3-02 |
| TC-FR08-DT-011 | Checkout thiếu `shipping_address` | V3=EP-V3-03 |
| TC-FR08-DT-012 | XSS trong `shipping_address` | V3=EP-V3-04 |
| TC-FR08-DT-013 | SQL Injection trong `shipping_address` | V3=EP-V3-05 |
| TC-FR08-DT-014 | Checkout với giỏ hàng trống | V4=EP-V4-02 |
| TC-FR08-DT-015 | Giỏ hàng xóa sau checkout thành công | Post-condition check |

### BVA — Dự kiến Test Cases

| TC ID | Mục tiêu | Boundary |
|-------|---------|----------|
| TC-FR08-BVA-001 | `total_amount = -1` (OFF⁻) | Dưới biên 0 |
| TC-FR08-BVA-002 | `total_amount = 0` (ON) | Đúng biên |
| TC-FR08-BVA-003 | `total_amount = 1` (OFF⁺) | Trên biên 0 |

---

```text
=== AI AUDIT LOG ENTRY ===
* Tool: Claude Opus 4 (Thinking)
* Date: 2026-06-27
* User Prompt: Khởi động QA, thực hiện Black-box Testing cho FR-08 Checkout. Phân tích FR-08 và API spec, áp dụng BVA cho total_amount. Thực hiện Step 1, 2, 3.
* AI Action: Phân tích FR-08 từ description_project.md và api_specification.md. Xác định 4 biến (V1-V4). Tạo EP cho tất cả biến. Áp dụng BVA cho total_amount (strictly numerical). Phát hiện mâu thuẫn Spec vs API — attack surface cho hacker gửi total_amount ảo.
==========================
```
