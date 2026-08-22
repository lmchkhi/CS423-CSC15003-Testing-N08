# TC-FR03-API-WF-003: Token mới nhất được issue có thể reset password thành công

## Requirement ID
FR-03

## API / Test type / Technique
`POST /api/reset-password` / API Testing / `Workflow/State`

## Blackbox basis

- `README.md`: FR-03 forgot/reset password; FR-01 password rule when relevant; SEC rules when relevant.
- `api_specification.md`: `POST /api/reset-password` body fields are `email`, `resetToken`, `newPassword`.
- Observed response/evidence: điền sau Phase 04 execution.
- Không dùng source code để thiết kế expected result.

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| State | Workflow | forgot-password issues token -> reset-password consumes token |
| Password state | Postcondition | Old password invalid, new password valid after successful reset |
| Failed transition | Safety | Failed reset must not corrupt password/token state |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}`.
- Gọi forgot-password hai lần cho cùng email và dùng token response của lần 2.
- Với case đổi password thành công, dùng user test riêng `{{fr03Email}}` hoặc reset-back cleanup để không phá sample account.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/reset-password` |
| Authorization | `none` |
| Request body/query/path | `{"email":"{{fr03Email}}","resetToken":"{{secondResetToken}}","newPassword":"NewPass123!"}` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ `POST /api/register` và `POST /api/forgot-password`.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition hoặc cleanup nếu case đổi password.

## Expected result

- HTTP status: `200`.
- Response body/headers/assertions: Reset response có `message`..
- Không có unexpected `5xx` nếu đây là negative/security case.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Data row key | `TC-FR03-API-WF-003` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/fr03-reset-password.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` |
| Audit label | `INCOMPLETE` |
| Human reasoning | Sửa từ raw WF-004, không assert policy của token cũ. |
| Why AI missed it | N/A |

## Status / Related bugs

`Passed`

Related bug report: `N/A`
