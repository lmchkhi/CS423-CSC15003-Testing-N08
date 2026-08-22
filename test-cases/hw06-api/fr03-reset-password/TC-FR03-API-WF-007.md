# TC-FR03-API-WF-007: Failed reset do weak password không đổi password hiện tại

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
- Tạo user với `OldPass123!`; có valid token.
- Với case đổi password thành công, dùng user test riêng `{{fr03Email}}` hoặc reset-back cleanup để không phá sample account.

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/reset-password` |
| Authorization | `none` |
| Request body/query/path | `1) reset weak password; 2) login old password` |

## Test steps

1. Chuẩn bị precondition/setup data qua API blackbox nếu cần, ví dụ `POST /api/register` và `POST /api/forgot-password`.
2. Gửi request chính hoặc sequence được mô tả trong test data bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers và security assertions.
5. Kiểm tra postcondition hoặc cleanup nếu case đổi password.

## Expected result

- HTTP status: `400 then 200`.
- Response body/headers/assertions: Old password vẫn login được sau failed reset..
- Không có unexpected `5xx` nếu đây là negative/security case.

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Data row key | `TC-FR03-API-WF-007` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/fr03-reset-password.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `Human` |
| Audit label | `HUMAN_ADDED` |
| Human reasoning | Human thêm postcondition dữ liệu không đổi sau failed reset. |
| Why AI missed it | AI tập trung token consumption, bỏ sót postcondition password hiện tại. |

## Status / Related bugs

`Failed`

Related bug report: `reports/bug-reports/BUG-FR03-API-001.md`
