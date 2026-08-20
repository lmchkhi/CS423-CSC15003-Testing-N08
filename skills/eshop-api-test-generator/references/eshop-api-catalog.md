# EShop API Catalog cho Test Generation

Dùng file này như compact blackbox input catalog. Không inspect source code.

## Base và accounts

- Base URL: `http://localhost:3000`
- Admin: `admin@eshop.com` / `Admin123!`
- User: `test@eshop.com` / `Test1234!`

## Pools

- Pool A: FR-01 register, FR-02 login/lockout, FR-03 forgot/reset password, FR-04 profile, FR-05 product list/search, FR-06 product detail.
- Pool B: FR-07 cart, FR-08 checkout, FR-09 coupon, FR-10 order state machine, FR-11 user order history.
- Pool C: FR-12 admin access, FR-13 dashboard, FR-14 category CRUD, FR-15 product CRUD, FR-16 product import, FR-17 coupon CRUD, FR-18 admin order management, FR-19 admin user management.

## Endpoints

| Pool | Feature | Method | Endpoint | Auth | Body / Params |
| --- | --- | --- | --- | --- | --- |
| A | FR-01 | POST | `/api/register` | none | `name`, `email`, `password` |
| A | FR-02 | POST | `/api/login` | none | `email`, `password` |
| A | FR-03 | POST | `/api/forgot-password` | none | `email` |
| A | FR-03 | POST | `/api/reset-password` | none | `email`, `resetToken`, `newPassword` |
| A | FR-04 | GET | `/api/users/me` | user | current token |
| A | FR-04 | PUT | `/api/users/me` | user | `name`, `shipping_address`, `phone` |
| A | FR-05 | GET | `/api/products` | none | optional query `search` |
| A | FR-06 | GET | `/api/products/:id` | none | path `id` |
| C | FR-15 | POST | `/api/products` | admin | `name`, `price`, `description`, `imageUrl`, `category_id` |
| C | FR-15 | PUT | `/api/products/:id` | admin | path `id`; product fields |
| C | FR-15 | DELETE | `/api/products/:id` | admin | path `id` |
| A/C | FR-14 | GET | `/api/categories` | none | none |
| C | FR-14 | POST | `/api/categories` | admin | `name` |
| C | FR-14 | PUT | `/api/categories/:id` | admin | path `id`, `name` |
| C | FR-14 | DELETE | `/api/categories/:id` | admin | path `id` |
| B | FR-07 | GET | `/api/cart` | user | none |
| B | FR-07 | POST | `/api/cart` | user | `id`, `name`, `price`, `quantity` |
| B | FR-08 | POST | `/api/checkout` | user | `total_amount`, `shipping_address` |
| B | FR-11 | GET | `/api/orders/my-orders` | user | none |
| B | FR-11 | GET | `/api/orders/:id` | user | path `id`; test ownership |
| B | FR-10 | PUT | `/api/orders/:id/cancel` | user | path `id` |
| B | FR-09 | POST | `/api/apply-coupon` | user expected | `code`, `total_amount`, `user_id` |
| C | FR-17 | GET | `/api/coupons` | admin | none |
| C | FR-19 | GET | `/api/admin/users` | admin | none |
| C | FR-19 | DELETE | `/api/admin/users/:id` | admin | path `id` |
| C | FR-18 | GET | `/api/admin/orders` | admin | none |
| C | FR-18 | PUT | `/api/admin/orders/:id/status` | admin | path `id`, body `status` |
| C | FR-16 | POST | `/api/admin/import-products` | admin | `products[]` with product fields |
| C | FR-17 | POST | `/api/admin/coupons` | admin | `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user` |
| C | FR-17 | DELETE | `/api/admin/coupons/:id` | admin | path `id` |

## Field Rules

- `email`: valid format, unique cho registration.
- `password`: tối thiểu 8 chars, có uppercase, lowercase, digit, special char từ `@ $ ! % * ? &`.
- `phone`: bắt đầu bằng `0`, 10-11 digits.
- `product.name`: required, max 255 chars.
- `product.price`: required, numeric, positive (`> 0`).
- `category_id`: required và phải refer existing category.
- `quantity`: positive integer.
- `coupon.type`: `percent` or `fixed`.
- `discount_value`: positive.
- `min_order_amount`: `>= 0`.
- `max_uses_per_user`: `>= 1`.
- `status`: one of `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.

## Order State Machine

Valid:

- `pending -> confirmed`
- `confirmed -> shipping`
- `shipping -> delivered`
- `pending -> canceled`
- `confirmed -> canceled`

Invalid:

- Mọi transition ra khỏi `delivered`.
- Mọi transition ra khỏi `canceled`.
- Skip state, ví dụ `pending -> shipping` hoặc `confirmed -> delivered`.
- User cancel khi order đã `shipping`.

## Security Rules

- SEC-01: password không plaintext.
- SEC-02: protected APIs yêu cầu valid JWT.
- SEC-03: admin APIs yêu cầu `role = admin`.
- SEC-04: user input phải escaped khi hiển thị; API tests nên detect unsafe reflection khi phù hợp.
- SEC-05: SQL injection payloads không được crash hoặc leak data.
- SEC-06: profile update không được cho đổi role.
- SEC-07: OTP phải 6 digits, có expiration, và one-time use.

## Sample Coupons

| Code | Type | Value | Min Order | Expired At | Uses/User |
| --- | --- | --- | --- | --- | --- |
| SAVE10 | percent | 10 | 300000 | 2099-12-31 | 1 |
| BIGBUY | fixed | 50000 | 500000 | 2099-12-31 | 1 |
| VIP100 | fixed | 100000 | 300000 | 2099-12-31 | 2 |
| EXPIRED | percent | 20 | 100000 | 2020-01-01 | 1 |
