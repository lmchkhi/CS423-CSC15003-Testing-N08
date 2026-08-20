# TC-FR03-API-SEC-001: SQL injection payload trong `email` không gây 500/leak

## Requirement ID
SEC-05

## API / Test type / Technique
`POST /api/reset-password` / API Testing / `Security`

## Blackbox basis

- `README.md`: FR-03 forgot/reset password; FR-01 password rule when relevant; SEC rules when relevant.
- `api_specification.md`: `POST /api/reset-password` body fields are `email`, `resetToken`, `newPassword`.
- Observed response/evidence: điền sau Phase 04 execution.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| Token binding | SEC-07 | Token must belong to requested email and be one-time use |
| User input | SEC-05 | SQLi/script-like payload must not cause 5xx or internal leak |
| Sensitive data | SEC-01/SEC-07 | Password/token must not be exposed unnecessarily |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}`.
- Không cần token hợp lệ.
- Với case đổi password thành công, dùng user test riêng `{{fr03Email}}` hoặc reset-back cleanup để không phá sample account.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/reset-password` |
| Authorization | `none` |
| Request body/query/path | `{"email":"' OR '1'='1","resetToken":"123456","newPassword":"NewPass123!"}` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ `POST /api/register` và `POST /api/forgot-password`.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition hoặc cleanup nếu case đổi password.

## Expected result

- HTTP status: `400`.
- Response body/headers/assertions: Có `message` hoặc `error`; không có `stack`, `trace`, SQL error..
- Không có unexpected `5xx` nếu đây là negative/security case.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Data row key | `TC-FR03-API-SEC-001` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/fr03-reset-password.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `VALID` |
| Human reasoning | SEC-05 blackbox negative case. |
| Why AI missed it | N/A |

## Status / Related bugs

`Not run`

Related bug report: `N/A`
