# TC-LOGIN-042: Login đúng sau đúng 2 lần sai vẫn phải thành công

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / State Transition

## Preconditions
- Hai testcase TC-LOGIN-040 và TC-LOGIN-041 vừa chạy liên tiếp trên cùng tài khoản.

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
- FR-02 chỉ khóa từ 3 lần sai liên tiếp; sau 2 lần sai tài khoản chưa được khóa.

## Status / Related bugs
Failed / #246

## AI audit
- Source: `EXTENSION_CANDIDATE`
- Recommendation: `VALID`
- Reason: Oracle được nêu trực tiếp trong FR-02, SEC hoặc API specification.
- Human review: `PENDING`

## Automation mapping
- Data row: `TC-LOGIN-042`
- Coverage: `state-transition`, `schema-validation`, `security`
