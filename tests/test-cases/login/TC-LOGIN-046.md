# TC-LOGIN-046: Login đúng ngay khi tài khoản đang khóa

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / State Transition

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `{{validAdminEmail}}` |
| password | `{{validAdminPassword}}` |

## Test steps
1. Gửi POST /api/login với headers và JSON body đã nêu.
2. Ghi nhận status, Content-Type và response body.

## Expected result
- HTTP status: `403`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["error"],"properties":{"error":{"type":"string","minLength":1}}}`
- `error` phải tồn tại
- `token` không được xuất hiện
- `user` không được xuất hiện
- FR-02 yêu cầu trả lỗi phù hợp trong 30 giây khóa; đặc tả không ấn định status 403.

## Status / Related bugs
Passed / None

## AI audit
- Source: `EXTENSION_CANDIDATE`
- Recommendation: `INCOMPLETE`
- Reason: Đặc tả yêu cầu từ chối nhưng không quy định HTTP status chính xác; dùng oracle bảo thủ và cần human review.
- Human review: `PENDING`

## Automation mapping
- Data row: `TC-LOGIN-046`
- Coverage: `state-transition`, `security`, `schema-validation`
