# SUT Requirements — trích cho phạm vi HW04 (FR-02, FR-10, FR-13)

> Trích nguyên văn từ `eshop-sut/README.md` (Đặc tả Yêu cầu Hệ thống EShop,
> phiên bản 2.0 — cập nhật 2026-05-14) và `eshop-sut/api_specification.md`.
> **Đây là oracle của toàn bộ suite automation**: assertion phải mã hoá đúng
> những gì tài liệu này nói hệ thống *phải* làm, không phải hành vi hiện tại
> của bản build đang chạy. Không viết lại, không diễn giải lại file này.

## 1. Môi trường

| Thành phần   | Công nghệ                   | URL mặc định            |
| ------------ | --------------------------- | ----------------------- |
| Backend API  | Node.js + Express + SQLite  | `http://localhost:3000` |
| Frontend Web | React + Vite + Tailwind CSS | `http://localhost:5173` |
| Web Admin    | React + Vite + Tailwind CSS | `http://localhost:5174` |

**Tài khoản mặc định:**

- Admin: `admin@eshop.com` / `Admin123!`
- User test: `test@eshop.com` / `Test1234!`

---

## 2. FR-02: Đăng nhập & Khóa tài khoản (Pool A — web `:5173`)

- Người dùng nhập Email và Mật khẩu.
- Sau mỗi lần đăng nhập sai, hệ thống tăng bộ đếm lên **đúng 1 đơn vị**.
- Nếu đăng nhập sai từ **3 lần trở lên** liên tiếp, tài khoản bị tạm khóa
  **30 giây** (môi trường demo). Hệ thống trả về thông báo lỗi phù hợp; không
  để lộ chi tiết nguyên nhân.
- Đăng nhập thành công trả về JWT Token. Token được lưu phía client và gửi kèm
  tất cả các yêu cầu có xác thực qua header `Authorization: Bearer <token>`.
- Trường email phải dùng `type="email"` (có validate HTML5 format).

Ràng buộc liên quan từ FR-01 (dùng khi tạo tài khoản throwaway cho test khóa
tài khoản): mật khẩu tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường,
1 chữ số và 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`); email phải
đúng định dạng và là duy nhất.

---

## 3. FR-10: Trạng thái Đơn hàng — Order State Machine (Pool B — web + admin)

Đơn hàng có **5 trạng thái** và phải tuân theo sơ đồ chuyển đổi sau:

```
                 [Admin xác nhận]          [Admin giao hàng]      [Admin hoàn tất]
  ┌──────────┐ ─────────────────► ┌───────────┐ ──────────────► ┌──────────┐ ──────────► ┌───────────┐
  │ pending  │                    │ confirmed │                  │ shipping │             │ delivered │
  └──────────┘                    └───────────┘                  └──────────┘             └───────────┘
       │                               │
       │ [User/Admin hủy]              │ [User/Admin hủy]
       ▼                               ▼
  ┌──────────┐                    ┌──────────┐
  │ canceled │                    │ canceled │
  └──────────┘                    └──────────┘
```

**Ràng buộc trạng thái kết thúc (Final States):**

- Trạng thái `delivered` và `canceled` là **trạng thái kết thúc** — không được
  phép chuyển sang bất kỳ trạng thái nào khác.
- Khi đơn hàng đã ở trạng thái `shipping`, **User không được phép tự hủy** —
  chỉ Admin mới có thể thao tác.
- Mọi chuyển đổi không hợp lệ phải trả về lỗi với thông báo phù hợp.

Bối cảnh cần cho setup đơn hàng:

- **FR-08 Thanh toán**: chỉ người dùng đã đăng nhập mới checkout được; backend
  phải tự tính lại tổng tiền, không chấp nhận `total_amount` do client gửi;
  sau thanh toán thành công giỏ hàng được xóa.
- **FR-11 Lịch sử đơn hàng (User)**: người dùng chỉ xem được đơn của chính
  mình; hiển thị Mã đơn, Ngày đặt, Tổng tiền, Trạng thái hiện tại; trạng thái
  phải được dịch sang tiếng Việt rõ ràng và phân biệt màu sắc.

---

## 4. FR-13: Dashboard (Pool C — admin `:5174`)

- Hiển thị tổng doanh thu: **chỉ tính tổng `total_amount` của các đơn có
  `status = 'delivered'`**.
- Hiển thị tổng số đơn hàng.

Bối cảnh bắt buộc từ FR-12 (Access Control):

- Phân hệ Admin chỉ dành cho tài khoản có `role = 'admin'`.
- **Tất cả** API Admin (`/api/admin/*`) và các API ảnh hưởng dữ liệu đều phải
  yêu cầu: (1) Token JWT hợp lệ, (2) `role = 'admin'` trong Token.

---

## 5. API dùng cho setup / teardown / oracle phụ

*Base URL `http://localhost:3000`. API có xác thực yêu cầu header
`Authorization: Bearer <token>`.*

| Mục đích | Endpoint |
| --- | --- |
| Đăng ký tài khoản throwaway | `POST /api/register` — `{name, email, password}` |
| Đăng nhập lấy token | `POST /api/login` — `{email, password}` |
| Thêm vào giỏ | `POST /api/cart` — `{id, name, price, quantity}` |
| Đặt hàng | `POST /api/checkout` — `{total_amount, shipping_address}` |
| Lịch sử đơn của user | `GET /api/orders/my-orders` |
| Chi tiết đơn | `GET /api/orders/:id` |
| User hủy đơn | `PUT /api/orders/:id/cancel` |
| Danh sách đơn toàn hệ thống (admin) | `GET /api/admin/orders` |
| Admin đổi trạng thái đơn | `PUT /api/admin/orders/:id/status` — `{status}` với `pending`/`confirmed`/`shipping`/`delivered`/`canceled` |
| Danh sách sản phẩm (lấy id/giá thật để checkout) | `GET /api/products` |

> Dùng API **chỉ** cho setup, teardown và tính giá trị kỳ vọng. Hành vi của
> chính feature vẫn phải được kiểm thử qua UI (§6: automation cho *web
> frontend*).
