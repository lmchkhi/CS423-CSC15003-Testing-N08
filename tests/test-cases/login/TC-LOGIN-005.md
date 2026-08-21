# TC-LOGIN-005: Mật khẩu đúng kèm khoảng trắng cuối

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Functional / Equivalence Partitioning

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `nobody@example.invalid` |
| password | `{{validUserPasswordWithTrailingSpace}}` |

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

## Status / Related bugs
Passed / None

## AI audit
- Source: `AI_GENERATED`
- Recommendation: `INCOMPLETE`
- Reason: Dùng email không tồn tại để không làm biến đổi lockout state; server vẫn phải từ chối an toàn.
- Human review: `PENDING`

## Automation mapping
- Data row: `TC-LOGIN-005`
- Coverage: `domain-partition`
