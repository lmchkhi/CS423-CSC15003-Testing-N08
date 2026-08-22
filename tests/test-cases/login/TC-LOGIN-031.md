# TC-LOGIN-031: XSS payload trong email không được bypass đăng nhập

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / Injection

## Preconditions
- SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `<script>alert(1)</script>` |
| password | `{{invalidPassword}}` |

## Test steps
1. Gửi POST /api/login với headers và JSON body đã nêu.
2. Ghi nhận status, Content-Type và response body.

## Expected result
- HTTP status: `400 hoặc 401 hoặc 403 hoặc 422 hoặc 429`
- `token` không được xuất hiện
- `user` không được xuất hiện
- Không được trả token hoặc thông tin user.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-LOGIN-031`
- Coverage: `security`
