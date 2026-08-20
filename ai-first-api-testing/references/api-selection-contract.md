# Hợp đồng chọn API

Dùng tài liệu này để map feature scope sang endpoint. Trước khi chốt, đọc lại `src/eshop-sut/api_specification.md` và `src/eshop-sut/README.md` vì bảng này chỉ là chỉ mục.

## Pool A — Authentication, Categories, Products

- FR-01 Registration: `POST /api/register`
- FR-02 Login/lockout: `POST /api/login`
- FR-03 Password reset: `POST /api/forgot-password`, `POST /api/reset-password`
- FR-04 Profile: `GET /api/users/me`, `PUT /api/users/me`
- FR-05 Product listing/search: `GET /api/products?search=...`
- FR-06 Product detail: `GET /api/products/:id`

## Pool B — Cart and Checkout

- FR-07 Cart: `GET /api/cart`, `POST /api/cart`
- FR-08 Checkout: `POST /api/checkout`
- FR-09 Coupon application: `POST /api/apply-coupon`
- FR-10 Order state machine:
  - user cancellation: `PUT /api/orders/:id/cancel`
  - admin transition: `PUT /api/admin/orders/:id/status`
- FR-11 User order history/detail: `GET /api/orders/my-orders`, `GET /api/orders/:id`

FR-10 expected transitions come from the SUT README: `pending -> confirmed -> shipping -> delivered`; `pending` and `confirmed` may transition to `canceled`; `delivered` and `canceled` are final; a user cannot cancel at `shipping`, while an admin may act only according to the state machine. The API specification's looser phrase “chưa giao” must not silently weaken these rules.

## Pool C — Web Admin

These mutating/admin scopes require a valid JWT and `role = admin` according to FR-12.

- FR-12 Access control: `/api/admin/*` and protected product/category/coupon mutations
- FR-13 Dashboard: no endpoint documented in the API specification; inspect source and record the documentation gap before selecting it
- FR-14 Category CRUD: `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- FR-15 Product CRUD: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- FR-16 CSV import: `POST /api/admin/import-products`
- FR-17 Coupon CRUD: `GET /api/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/:id`
- FR-18 Order management: `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`
- FR-19 User management: `GET /api/admin/users`, `DELETE /api/admin/users/:id`

FR-16 has a notable contract gap: the business requirement describes CSV upload/RFC 4180, while the published API specification shows a JSON `products` array. Record this discrepancy and ask for a human decision before assuming an upload format.

## Selection checks

- Select one feature/API scope from each Pool A, B and C. A feature may contain multiple endpoints when its workflow requires them.
- Confirm the selected triple is not duplicated by another group member; repository inspection cannot prove this without the group's selection list.
- Record feature ID, method/path, auth/role, inputs, preconditions, expected rule source, known spec gaps and data/state dependencies.
- Do not claim an exact response schema where the API specification only provides prose or a partial example. Such schema assertions remain `INCOMPLETE` until the expected contract is approved.
- Map relevant SEC-01–SEC-07 from the SUT README; do not state that these requirements are defined in `api_specification.md`.
