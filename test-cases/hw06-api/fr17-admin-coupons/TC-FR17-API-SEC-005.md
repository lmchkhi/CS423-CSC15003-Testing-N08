# TC-FR17-API-SEC-005: SQL injection payload trong `code` không gây 5xx/leak SQL

## Requirement ID
FR-17 / SEC-02, SEC-03, SEC-05

## API / Test type / Technique
`POST /api/admin/coupons` / API Testing / `Security`

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
- Admin logged in.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/admin/coupons` |
| Authorization | `admin JWT unless case states missing/malformed/invalid/user token` |
| Request body/query/path | `{"code":"' OR '1'='1","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ login admin/user hoặc tạo coupon setup.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Verify list/cleanup nếu case tạo dữ liệu hoặc kiểm tra lifecycle.

## Expected result

- HTTP status: `200/201 hoặc 400`.
- Response body/headers/assertions: không stack/sql leak; không 5xx; nếu API lưu payload như literal thì response phải an toàn và coupon phải được cleanup.
- Không có unexpected `5xx` nếu đây là negative/security case.
- Rationale: SEC-05 yêu cầu query an toàn.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr17-admin-coupons.postman_collection.json` |
| Data row key | `TC-FR17-API-SEC-005` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/hw06-fr17-admin-coupons.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `INCOMPLETE` |
| Human reasoning | Sửa oracle sau execution review: SEC-05 yêu cầu không SQL leak/crash, nhưng spec không nêu charset bắt buộc cho `code`; do đó không ép reject nếu API lưu payload như literal an toàn. |
| Why AI missed it | N/A |

## Status / Related bugs

`Passed`

Related bug report: `N/A`
