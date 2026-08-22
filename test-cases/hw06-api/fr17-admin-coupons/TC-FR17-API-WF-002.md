# TC-FR17-API-WF-002: Duplicate create sau first success bị reject

## Requirement ID
FR-17

## API / Test type / Technique
`POST /api/admin/coupons` / API Testing / `Workflow/State`

## Blackbox basis

- `README.md`: FR-12 admin access control; FR-17 coupon CRUD required/unique/range rules; SEC-02/SEC-03/SEC-05 khi liên quan.
- `api_specification.md`: `POST /api/admin/coupons` body gồm `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`; cleanup bằng `DELETE /api/admin/coupons/:id`; list verify bằng `GET /api/coupons` nếu cần.
- Observed response/evidence: Newman HTML `reports/newman/hw06-fr17-admin-coupons.html`, JSON `reports/newman/hw06-fr17-admin-coupons.json`, CLI `reports/newman/hw06-fr17-admin-coupons-cli.txt`.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| `code` | String | Required, unique, empty/null/whitespace/wrong type, duplicate, SQLi/XSS |
| `type` | Enum | Required, only `percent` hoặc `fixed`, null/empty/unsupported/wrong-case |
| `discount_value` | Number | Required, positive, zero/negative/null/wrong type |
| `min_order_amount` | Number | Required, `>= 0`, zero boundary, negative/null/wrong type |
| `expired_at` | Date string | Required, expected `YYYY-MM-DD` format based on API sample, null/malformed/past date |
| `max_uses_per_user` | Number | Required, `>= 1`, boundary 1, zero/null/wrong type |
| `Authorization` | JWT role | Admin token required by FR-12/SEC-02/SEC-03; user/missing/malformed/invalid token rejected |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}` khi execute bằng Postman/Newman.
- Login admin bằng `POST /api/login` để lấy `{{adminToken}}` khi case cần admin token.
- Login user thường để lấy `{{userToken}}` khi case kiểm tra wrong role.
- Nếu request tạo coupon thành công và response/list có `id`, cleanup bằng `DELETE /api/admin/coupons/:id` trong Phase 10.
- First create succeeded with code `HW06DUP{{runId}}`.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/admin/coupons` |
| Authorization | `admin JWT unless case states missing/malformed/invalid/user token` |
| Request body/query/path | Second `POST /api/admin/coupons` dùng cùng code/body |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ login admin/user hoặc tạo coupon setup.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Verify list/cleanup nếu case tạo dữ liệu hoặc kiểm tra lifecycle.

## Expected result

- HTTP status: `400 hoặc 409`.
- Response body/headers/assertions: Error body; list chỉ có một coupon với code đó.
- Không có unexpected `5xx` nếu đây là negative/security case.
- Rationale: Enforce `code` uniqueness lifecycle.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr17-admin-coupons.postman_collection.json` |
| Data row key | `TC-FR17-API-WF-002` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/hw06-fr17-admin-coupons.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `INCOMPLETE` |
| Human reasoning | Raw đúng nhưng cần sequence setup first create và list verify; sửa thành executable workflow. |
| Why AI missed it | N/A |

## Status / Related bugs

`Failed`

Related bug report: `reports/bug-reports/BUG-FR17-API-002.md`
