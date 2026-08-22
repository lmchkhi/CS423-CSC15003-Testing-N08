# TC-LOGIN-028: SQL injection trong email

## Requirement ID
FR-02, SEC-05

## Module / Test type / Technique
LOGIN / Security / SQL Injection

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `' OR 1=1 --` |
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
- Không được trả token hoặc thông tin user.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-LOGIN-028`
- Coverage: `security`
