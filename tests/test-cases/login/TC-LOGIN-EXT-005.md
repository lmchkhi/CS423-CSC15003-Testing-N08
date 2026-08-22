# TC-LOGIN-EXT-005: Response không để lộ tài khoản tồn tại qua thông báo hoặc timing

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / Security / Differential Testing

## Preconditions
- SUT khả dụng; workflow tạo một tài khoản riêng và có một email chắc chắn chưa đăng ký.

## Test data
| Trường | Giá trị |
|---|---|
| registeredEmail | `{{extensionEmail5}}` |
| unknownEmail | `{{extensionUnknownEmail}}` |
| invalidPassword | `{{invalidPassword}}` |

## Test steps
1. Tạo tài khoản riêng.
2. Gửi login với email đã đăng ký và password sai.
3. Gửi request chính với email chưa đăng ký và cùng password sai.
4. So sánh status, Content-Type, trường error và thời gian phản hồi của hai response.

## Expected result
- HTTP status: `400 hoặc 401 hoặc 403 hoặc 422 hoặc 429`
- Content-Type: `application/json`
- `token` không được xuất hiện
- `user` không được xuất hiện
- Hai response không được cung cấp tín hiệu ổn định cho user enumeration; timing threshold 1000 ms dùng như heuristic trong môi trường local.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-LOGIN-EXT-005`
- Coverage: `security`, `state-transition`
