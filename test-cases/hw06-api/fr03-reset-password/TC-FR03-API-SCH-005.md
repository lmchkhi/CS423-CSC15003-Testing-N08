# TC-FR03-API-SCH-005: Happy path response time dưới 1000ms

## Requirement ID
Postman/Newman assertion

## API / Test type / Technique
`POST /api/reset-password` / API Testing / `Schema Validation`

## Blackbox basis

- `README.md`: FR-03 forgot/reset password; FR-01 password rule when relevant; SEC rules when relevant.
- `api_specification.md`: `POST /api/reset-password` body fields are `email`, `resetToken`, `newPassword`.
- Observed response/evidence: điền sau Phase 04 execution.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| Response status | Contract | Must match success/error expectation |
| Response body | Schema | JSON shape contains expected public fields only |
| Headers/method | Contract | Content-Type and HTTP method must match API spec |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}`.
- Có valid resetToken từ setup.
- Với case đổi password thành công, dùng user test riêng `{{fr03Email}}` hoặc reset-back cleanup để không phá sample account.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/reset-password` |
| Authorization | `none` |
| Request body/query/path | `Valid reset body` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ `POST /api/register` và `POST /api/forgot-password`.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition hoặc cleanup nếu case đổi password.

## Expected result

- HTTP status: `200`.
- Response body/headers/assertions: Response time `< 1000ms`..
- Không có unexpected `5xx` nếu đây là negative/security case.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Data row key | `TC-FR03-API-SCH-005` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/fr03-reset-password.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `VALID` |
| Human reasoning | Execution quality assertion. |
| Why AI missed it | N/A |

## Status / Related bugs

`Not run`

Related bug report: `N/A`
