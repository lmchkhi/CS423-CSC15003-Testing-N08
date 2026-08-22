# TC-FR17-API-DOM-001: Create valid percent coupon với typical values

## Requirement ID
FR-17

## API / Test type / Technique
`POST /api/admin/coupons` / API Testing / `Domain Partition`

## Blackbox basis

- `README.md`: FR-12 admin access control; FR-17 coupon CRUD required/unique/range rules; SEC-02/SEC-03/SEC-05 khi liên quan.
- `api_specification.md`: `POST /api/admin/coupons` body gồm `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`; cleanup bằng `DELETE /api/admin/coupons/:id`; list verify bằng `GET /api/coupons` nếu cần.
- Observed response/evidence: điền sau Phase 10 execution.
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
- Admin logged in; generated unique code `HW06PCT{{runId}}` chưa tồn tại.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/admin/coupons` |
| Authorization | `admin JWT unless case states missing/malformed/invalid/user token` |
| Request body/query/path | `{"code":"HW06PCT{{runId}}","type":"percent","discount_value":15,"min_order_amount":200000,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ login admin/user hoặc tạo coupon setup.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Verify list/cleanup nếu case tạo dữ liệu hoặc kiểm tra lifecycle.

## Expected result

- HTTP status: `200 hoặc 201`.
- Response body/headers/assertions: JSON success; response có message/id hoặc created coupon reference; created coupon cần cleanup bằng DELETE nếu có id.
- Không có unexpected `5xx` nếu đây là negative/security case.
- Rationale: Happy path cho required fields và percent type.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr17-admin-coupons.postman_collection.json` |
| Data row key | `TC-FR17-API-DOM-001` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/hw06-fr17-admin-coupons.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `VALID` |
| Human reasoning | Giữ nguyên/sửa nhẹ từ raw AI; đúng FR-17/FR-12/API spec và có thể execute bằng admin/user token setup blackbox. |
| Why AI missed it | N/A |

## Status / Related bugs

`Not run`

Related bug report: `N/A`
