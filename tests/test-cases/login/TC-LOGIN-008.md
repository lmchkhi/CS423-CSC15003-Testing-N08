# TC-LOGIN-008: Thiếu trường email

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Functional / Equivalence Partitioning

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| password | `{{invalidPassword}}` |

## Test steps
1. Gửi POST /api/login với headers và JSON body đã nêu.
2. Ghi nhận status, Content-Type và response body.

## Expected result
- HTTP status: `400 hoặc 401 hoặc 403 hoặc 422 hoặc 429`
- `token` không được xuất hiện
- `user` không được xuất hiện

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-LOGIN-008`
- Coverage: `domain-partition`
