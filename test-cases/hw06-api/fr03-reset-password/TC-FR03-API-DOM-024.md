# TC-FR03-API-DOM-024: `newPassword` đúng boundary tối thiểu 8 ký tự và đủ complexity

## Requirement ID
FR-03, FR-01

## API / Test type / Technique
`POST /api/reset-password` / API Testing / `Domain Partition`

## Blackbox basis

- `README.md`: FR-03 forgot/reset password; FR-01 password rule when relevant; SEC rules when relevant.
- `api_specification.md`: `POST /api/reset-password` body fields are `email`, `resetToken`, `newPassword`.
- Observed response/evidence: điền sau Phase 04 execution.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| `email` | String | Required, email format, registered/unknown, type/null/empty/whitespace |
| `resetToken` | String token | Required, 6 digits, issued for same email |
| `newPassword` | String | Required, >=8 chars, uppercase/lowercase/digit/special char |

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
| Request body/query/path | `{"email":"{{fr03Email}}","resetToken":"{{validResetToken}}","newPassword":"Aa12345!"}` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ `POST /api/register` và `POST /api/forgot-password`.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition hoặc cleanup nếu case đổi password.

## Expected result

- HTTP status: `200`.
- Response body/headers/assertions: JSON body có `message:string`; không có password/token..
- Không có unexpected `5xx` nếu đây là negative/security case.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Data row key | `TC-FR03-API-DOM-024` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/fr03-reset-password.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `Human` |
| Audit label | `HUMAN_ADDED` |
| Human reasoning | Human thêm lower-bound valid password. |
| Why AI missed it | AI sinh too-short và long valid password nhưng bỏ sót exact lower boundary 8 ký tự. |

## Status / Related bugs

`Passed`

Related bug report: `N/A`
