# TC-LOGIN-037: Schema thành công không lộ trường nhạy cảm

## Requirement ID
FR-02, SEC-01

## Module / Test type / Technique
LOGIN / Contract / Schema Validation

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `{{validUserEmail}}` |
| password | `{{validUserPassword}}` |

## Test steps
1. Gửi POST /api/login với headers và JSON body đã nêu.
2. Ghi nhận status, Content-Type và response body.

## Expected result
- HTTP status: `200`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["token","user"],"properties":{"token":{"type":"string","pattern":"^[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$"},"user":{"type":"object","required":["id","email","role"]}}}`
- `token` phải tồn tại
- `user` phải có kiểu `object`
- `password` không được xuất hiện
- `user.password` không được xuất hiện

## Status / Related bugs
Failed / #69

## AI audit
- Source: `AI_GENERATED`
- Recommendation: `VALID`
- Reason: Oracle được nêu trực tiếp trong FR-02, SEC hoặc API specification.
- Human review: `PENDING`

## Automation mapping
- Data row: `TC-LOGIN-037`
- Coverage: `schema-validation`, `security`
