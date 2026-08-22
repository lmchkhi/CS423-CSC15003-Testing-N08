# TC-LOGIN-EXT-001: Đăng nhập thành công reset bộ đếm sai liên tiếp

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / State / State Transition

## Preconditions
- SUT khả dụng; workflow tạo một tài khoản riêng ở trạng thái chưa bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| email | `{{extensionEmail1}}` |
| password | `{{extensionPassword}}` |
| invalidPassword | `{{invalidPassword}}` |
| sequence | `wrong ×2 → success → wrong ×2 → success` |

## Test steps
1. Tạo tài khoản riêng qua POST /api/register.
2. Đăng nhập sai hai lần, sau đó đăng nhập đúng để reset bộ đếm.
3. Đăng nhập sai thêm hai lần rồi gửi request chính với credentials đúng.
4. Kiểm tra cả hai lần đăng nhập đúng đều thành công và trả JWT.

## Expected result
- HTTP status: `200`
- Content-Type: `application/json`
- `token` phải tồn tại
- `user` phải tồn tại
- Login thành công phải đặt login_attempts về 0; hai lần sai sau reset chưa được khóa tài khoản.

## Status / Related bugs
Failed / #71

## Automation mapping
- Data row: `TC-LOGIN-EXT-001`
- Coverage: `state-transition`, `security`
