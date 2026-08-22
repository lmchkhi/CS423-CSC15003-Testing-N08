# TC-FR09-API-WF-007: Failed unknown-code attempt không ảnh hưởng valid coupon use

## Requirement ID
FR-09

## API / Test type / Technique
`POST /api/apply-coupon` / API Testing / `Workflow/State`

## Blackbox basis

- `README.md`: FR-09 coupon C1-C5, sample coupons, percent/fixed formula; SEC rules when relevant.
- `api_specification.md`: `POST /api/apply-coupon` body fields are `code`, `total_amount`, `user_id`; response contains `discount_amount` and `final_amount`.
- Observed response/evidence: Phase 07 Newman run `reports/newman/hw06-fr09-apply-coupon.html` / `reports/newman/hw06-fr09-apply-coupon.json`.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| `code` | String | Required, existing/active coupon, expired/unknown, whitespace/case/type, SQLi/XSS |
| `total_amount` | Number | Required, >= coupon min_order_amount, boundary below min, zero/negative/wrong type |
| `user_id` | Number/User identity | Required by API spec, must align with JWT user, IDOR and per-user usage limit risk |
| `Authorization` | JWT | Required by FR-09 C4/SEC-02; missing/malformed/invalid token must be rejected |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}`.
- Login user bằng `POST /api/login` để lấy `{{userToken}}` và `{{userId}}` khi case cần authenticated user.
- Dùng user/coupon state riêng cho workflow usage-limit cases để tránh nhiễu giữa test runs.
- User logged in.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/apply-coupon` |
| Authorization | `user JWT unless case states missing/malformed/invalid` |
| Request body/query/path | `First NOTREAL, then SAVE10 valid body` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ login user A/user B.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition usage quota nếu đây là workflow case.

## Expected result

- HTTP status: `4xx then 200`.
- Response body/headers/assertions: Second response có SAVE10 discount đúng.
- Không có unexpected `5xx` nếu đây là negative/security case.
- Rationale: Failed C1 không nên corrupt coupon state.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr09-apply-coupon.postman_collection.json` |
| Data row key | `TC-FR09-API-WF-007` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/hw06-fr09-apply-coupon.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `VALID` |
| Human reasoning | Giữ nguyên từ AI; đúng FR-09/API spec và có thể execute bằng login/setup blackbox. |
| Why AI missed it | N/A |

## Status / Related bugs

`Failed`

Related bug report: `reports/bug-reports/BUG-FR09-API-001.md`
