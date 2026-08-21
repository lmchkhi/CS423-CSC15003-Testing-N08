# TC-LOGIN-007: Credentials không hợp lệ không lộ nguyên nhân

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / Equivalence Partitioning

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `another@example.invalid` |
| password | `{{invalidPassword}}` |

## Test steps
1. Gửi POST /api/login với headers và JSON body đã nêu.
2. Ghi nhận status, Content-Type và response body.

## Expected result
- HTTP status: `401`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["error"],"properties":{"error":{"type":"string","minLength":1}}}`
- `error` phải tồn tại
- `token` không được xuất hiện
- `user` không được xuất hiện
- Thông báo phải cùng mức khái quát với trường hợp email chưa đăng ký; wrong-password state được kiểm tra riêng ở TC-LOGIN-038 trở đi.

## Status / Related bugs
Passed / None

## AI audit
- Source: `AI_GENERATED`
- Recommendation: `INCOMPLETE`
- Reason: Đặc tả yêu cầu từ chối nhưng không quy định HTTP status chính xác; dùng oracle bảo thủ và cần human review.
- Human review: `PENDING`

## Automation mapping
- Data row: `TC-LOGIN-007`
- Coverage: `domain-partition`, `security`
