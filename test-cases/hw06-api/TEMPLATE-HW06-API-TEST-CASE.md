# TC-<FR>-API-<GROUP>-<NUM>: <Tên test case>

## Requirement ID
FR-<ID> / SEC-<ID nếu liên quan>

## API / Test type / Technique
`<METHOD> <ENDPOINT>` / API Testing / `<Domain Partition | Security | Workflow/State | Schema Validation>`

## Blackbox basis

- `README.md`: <FR/SEC rule liên quan>
- `api_specification.md`: <method, endpoint, request body/query/path, response shape>
- Observed response/evidence: <điền sau khi execute nếu có>

## Domain / Security / Workflow analysis

| Variable / Rule | Type | Domain / Constraint / Risk |
| --- | --- | --- |
| `<field>` | `<String/Number/Date/Token/...>` | `<required, boundary, enum, unique, auth, role, IDOR, ...>` |

## Preconditions

- Backend API đang chạy tại `{{baseUrl}}`.
- Request có header `X-Student-Id: {{studentId}}`.
- <Token/setup data nếu cần, ví dụ `userToken`, `adminToken`, `resetToken`, created coupon ID.>

## Test data

| Field/Header/Variable | Value |
| --- | --- |
| Method | `<METHOD>` |
| Endpoint | `<ENDPOINT>` |
| Authorization | `<none/user/admin/expired/malformed>` |
| Request body/query/path | `<JSON/query/path params>` |

## Test steps

1. Chuẩn bị precondition/setup data qua API nếu cần.
2. Gửi request `<METHOD> <ENDPOINT>` bằng Postman/Newman.
3. Kiểm tra status code.
4. Kiểm tra response body/schema/headers.
5. Kiểm tra postcondition hoặc cleanup nếu case tạo dữ liệu.

## Expected result

- HTTP status: `<expected_status>`.
- Response body có các field/assertions: `<expected_fields/assertions>`.
- Không có unexpected `5xx` nếu đây là negative/security case.
- <Postcondition nếu có.>

## Postman/Newman mapping

| Artifact | Value |
| --- | --- |
| Collection | `postman/<collection>.postman_collection.json` |
| Data row key | `<tc_id>` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Newman report | `reports/newman/<report>.html` |

## AI audit / Human review

| Field | Value |
| --- | --- |
| Source | `AI` / `Human` |
| Audit label | `VALID` / `INVALID` / `INCOMPLETE` / `HUMAN_ADDED` |
| Human reasoning | `<lý do review/sửa>` |
| Why AI missed it | `<chỉ điền với HUMAN_ADDED>` |

## Status / Related bugs

`Not run` / `Passed` / `Failed` / `Blocked`

Related bug report: `<reports/bug-reports/BUG-...md hoặc N/A>`
