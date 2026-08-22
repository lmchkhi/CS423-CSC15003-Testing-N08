# TC-LOGIN-035: Login public bỏ qua Authorization header không hợp lệ

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / Equivalence Partitioning

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

## Automation mapping
- Data row: `TC-LOGIN-035`
- Coverage: `security`, `schema-validation`
