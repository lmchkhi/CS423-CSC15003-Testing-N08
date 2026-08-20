# EShop Blackbox Reference

Dùng reference này cho HW06 test design. Nội dung chỉ tóm tắt requirements và API information từ tài liệu dành cho assignment.

## Runtime và accounts

- Backend base URL: `http://localhost:3000`
- Frontend Web: `http://localhost:5173`
- Web Admin: `http://localhost:5174`
- Admin sample account: `admin@eshop.com` / `Admin123!`
- User sample account: `test@eshop.com` / `Test1234!`

## Feature Pools

Pool A:

- FR-01 Account registration.
- FR-02 Login and account lockout.
- FR-03 Forgot password and reset password.
- FR-04 Profile management.
- FR-05 Product listing and search.
- FR-06 Product detail.

Pool B:

- FR-07 Shopping cart.
- FR-08 Checkout.
- FR-09 Coupons.
- FR-10 Order state machine.
- FR-11 User order history.

Pool C:

- FR-12 Admin access control.
- FR-13 Dashboard.
- FR-14 Category CRUD.
- FR-15 Product CRUD.
- FR-16 Product CSV import.
- FR-17 Coupon CRUD.
- FR-18 Admin order management.
- FR-19 Admin user management.

## API Catalog

Authentication:

| Method | Endpoint | Auth | Ghi chú |
| --- | --- | --- | --- |
| POST | `/api/register` | No | Body: `name`, `email`, `password`. |
| POST | `/api/login` | No | Body: `email`, `password`; success trả JWT token và user. |
| POST | `/api/forgot-password` | No | Body: `email`; demo response có thể expose reset token. |
| POST | `/api/reset-password` | No | Body: `email`, `resetToken`, `newPassword`. |

Users:

| Method | Endpoint | Auth | Ghi chú |
| --- | --- | --- | --- |
| GET | `/api/users/me` | User | Trả profile của current user. |
| PUT | `/api/users/me` | User | Body: `name`, `shipping_address`, `phone`; không được cho đổi `role`. |

Products and categories:

| Method | Endpoint | Auth | Ghi chú |
| --- | --- | --- | --- |
| GET | `/api/products` | No | Optional `?search=keyword`. |
| GET | `/api/products/:id` | No | Product detail theo ID. |
| POST | `/api/products` | Admin | Body: `name`, `price`, `description`, `imageUrl`, `category_id`. |
| PUT | `/api/products/:id` | Admin | Update product. |
| DELETE | `/api/products/:id` | Admin | Delete product. |
| GET | `/api/categories` | No | List categories. |
| POST | `/api/categories` | Admin | Body: `name`. |
| PUT | `/api/categories/:id` | Admin | Update category. |
| DELETE | `/api/categories/:id` | Admin | Delete category. |

Cart, checkout, orders, coupons:

| Method | Endpoint | Auth | Ghi chú |
| --- | --- | --- | --- |
| GET | `/api/cart` | User | Lấy cart. |
| POST | `/api/cart` | User | Body: `id`, `name`, `price`, `quantity`. |
| POST | `/api/checkout` | User | Body gồm `total_amount`, `shipping_address`; backend phải tự tính lại total. |
| GET | `/api/orders/my-orders` | User | Chỉ order history của current user. |
| GET | `/api/orders/:id` | User/Admin tùy resource | Test IDOR và ownership. |
| PUT | `/api/orders/:id/cancel` | User | Chỉ được trước shipping theo FR-10. |
| POST | `/api/apply-coupon` | User expected | Body: `code`, `total_amount`, `user_id`; test auth/IDOR concerns. |
| GET | `/api/coupons` | Admin | List coupons. |

Admin:

| Method | Endpoint | Auth | Ghi chú |
| --- | --- | --- | --- |
| GET | `/api/admin/users` | Admin | Không được expose passwords. |
| DELETE | `/api/admin/users/:id` | Admin | Admin không được xóa chính mình. |
| GET | `/api/admin/orders` | Admin | Tất cả orders. |
| PUT | `/api/admin/orders/:id/status` | Admin | Body: `status`; tuân theo FR-10. |
| POST | `/api/admin/import-products` | Admin | Body: `{ "products": [...] }`; CSV requirement map sang all-or-nothing import behavior. |
| POST | `/api/admin/coupons` | Admin | Body: `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`. |
| DELETE | `/api/admin/coupons/:id` | Admin | Delete coupon. |

## Domain Rules

Registration:

- Required: name, email, password.
- Email phải valid và unique.
- Password tối thiểu 8 chars và có uppercase, lowercase, digit, special char trong `@ $ ! % * ? &`.
- Assignment requirements có nhắc confirm password ở UI level; API spec body chỉ liệt kê `name`, `email`, `password`, nên không tự thêm `confirmPassword` làm API field nếu chưa observe.

Login:

- Wrong login tăng failed-attempt counter đúng 1.
- Ba lần sai liên tiếp trở lên sẽ lock account 30 giây trong demo.
- Successful login trả JWT token.
- Error messages không nên reveal sensitive detail.

Forgot/reset password:

- OTP/reset token nên có 6 digits, gắn với requesting email, có hạn, và invalid sau khi dùng.
- New password theo registration strength rule.

Profile:

- Phone bắt đầu bằng `0` và có 10-11 digits.
- Email không được đổi qua profile update.
- User chỉ update own profile và không được đổi `role`.

Products:

- Product name required và max 255 chars.
- Price required và phải positive (`> 0`).
- Category required và phải tồn tại.
- Search keyword phải được handle an toàn; không render hoặc reflect executable HTML.

Cart và checkout:

- Cart product quantity phải là positive integer.
- Add cùng product phải tăng quantity, không tạo duplicate row.
- Checkout yêu cầu login.
- Backend phải recalculate total và reject hoặc ignore client-supplied manipulation.
- Successful checkout clear cart.

Coupons:

Coupon chỉ valid nếu mọi điều kiện đều đúng:

- Code tồn tại và active.
- Current date trước `expired_at`.
- Order total lớn hơn hoặc bằng `min_order_amount`.
- User authenticated.
- User chưa vượt `max_uses_per_user`.

Sample coupons:

| Code | Type | Value | Min Order | Expired At | Uses/User |
| --- | --- | --- | --- | --- | --- |
| SAVE10 | percent | 10% | 300000 | 2099-12-31 | 1 |
| BIGBUY | fixed | 50000 | 500000 | 2099-12-31 | 1 |
| VIP100 | fixed | 100000 | 300000 | 2099-12-31 | 2 |
| EXPIRED | percent | 20% | 100000 | 2020-01-01 | 1 |

Order state machine:

```text
pending -> confirmed -> shipping -> delivered
pending -> canceled
confirmed -> canceled
```

- `delivered` and `canceled` are final states.
- User cannot cancel once an order is `shipping`; only admin may manipulate later states through admin endpoints.
- Invalid transitions must return a suitable error.

## Security Requirements

| ID | Requirement |
| --- | --- |
| SEC-01 | Password không được lưu plaintext. |
| SEC-02 | Secure APIs phải yêu cầu valid JWT token. |
| SEC-03 | Admin APIs phải verify `role = 'admin'`, không chỉ kiểm tra token tồn tại. |
| SEC-04 | User input hiển thị trên UI phải được escaped; API tests vẫn có thể check reflected payload safety. |
| SEC-05 | Database queries phải dùng parameterized queries; API tests nên verify benign SQLi payloads không crash hoặc leak data. |
| SEC-06 | Profile update không được cho đổi role từ client input. |
| SEC-07 | Reset OTP phải đủ entropy, expiration, và one-time use behavior. |
