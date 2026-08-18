# Hợp Đồng Chọn API (API Selection Contract)

Contract cho việc chọn API từ EShop SUT.

> **Nguồn duy nhất đáng tin cậy (Single Source of Truth):** Mọi path, method, request/response body dưới đây được đồng bộ trực tiếp từ `api_specification.md` của SUT. **Agent KHÔNG được suy diễn hay đoán path** — nếu SUT cập nhật spec, agent phải đọc lại `api_specification.md` gốc trước khi thiết kế test, không dựa vào bảng bên dưới nếu có xung đột.

### Pool A — Authentication, Categories, Products
- **FR-01**: Account registration → `POST /api/register`
- **FR-02**: Login và account lockout → `POST /api/login`
- **FR-03**: Forgot password (2 bước) → `POST /api/forgot-password`, `POST /api/reset-password`
- **FR-04**: Profile management → `GET /api/users/me`, `PUT /api/users/me`
- **FR-05**: Product listing/search → `GET /api/products` (query `?search=keyword`)
- **FR-06**: Product detail → `GET /api/products/:id`

### Pool B — Shopping Cart and Checkout
- **FR-07**: Shopping cart → `GET /api/cart`, `POST /api/cart`
- **FR-08**: Checkout → `POST /api/checkout`
- **FR-09**: Discount coupons → `POST /api/apply-coupon`
- **FR-10**: Order state machine → **hai endpoint tách biệt, KHÔNG dùng chung một route:**
  - `PUT /api/admin/orders/:id/status` — **chỉ Admin**, cập nhật tự do giữa các trạng thái `pending → confirmed → shipping → delivered / canceled`.
  - `PUT /api/orders/:id/cancel` — **user thường**, chỉ được chuyển sang `canceled` và **chỉ khi đơn chưa giao** (chưa `delivered`).
  - ⚠️ Đây là trọng tâm test SEC (role escalation / IDOR): phải kiểm tra user thường **không** gọi được endpoint admin, và **không** hủy được đơn đã ở trạng thái `delivered` hoặc đã `canceled`.
- **FR-11**: Order history → `GET /api/orders/my-orders` (danh sách), `GET /api/orders/:id` (chi tiết)

### Pool C — Web Admin
*Tất cả API dưới đây yêu cầu `Authorization: Bearer <token>` và tài khoản phải có quyền Admin.*
- **FR-12**: Access control → role-based middleware trên toàn bộ nhóm `/api/admin/*`
- **FR-13**: Dashboard → *(không có endpoint riêng trong `api_specification.md` hiện tại — nếu chọn FR-13, agent phải xác minh trực tiếp trong code SUT `src/`, không giả định path)*
- **FR-14**: Category CRUD → `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- **FR-15**: Product CRUD → `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- **FR-16**: Product CSV import → `POST /api/admin/import-products` (body: JSON array `products`)
- **FR-17**: Coupon CRUD → `GET /api/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/:id`
- **FR-18**: Order management → `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`
- **FR-19**: User management → `GET /api/admin/users`, `DELETE /api/admin/users/:id`

### Yêu Cầu Bảo Mật (Security Requirements)
- SEC-01 đến SEC-07 (như đã định nghĩa trong `api_specification.md`).
- SQL injection, XSS, IDOR, role escalation, authentication bypass, v.v.
- Chú ý đặc biệt: phân quyền Admin vs User trên các endpoint trùng tài nguyên nhưng khác route (ví dụ FR-10 ở trên) — đây là nơi role escalation/IDOR dễ bị bỏ sót nhất.

### Quy Tắc Lựa Chọn (Selection Rules)
- Phải chọn chính xác 1 API từ mỗi pool (A, B, C).
- Không trùng lặp trong nhóm (No duplication within group).
- **Trước khi thiết kế test cho bất kỳ endpoint nào, agent phải đọc lại `api_specification.md` gốc của SUT** (không copy từ file contract này) để lấy path, method, request/response body chính xác nhất — file spec là nguồn chuẩn, file này chỉ là bản tóm tắt hỗ trợ điều hướng.
- Tài liệu hóa các endpoints đã chọn cùng với parameters, request/response schemas trong báo cáo Phase A.
