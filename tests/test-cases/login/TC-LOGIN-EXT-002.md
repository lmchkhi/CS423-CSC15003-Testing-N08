# TC-LOGIN-EXT-002: Khóa tài khoản đúng tại lần đăng nhập sai thứ ba

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / State / State Transition

## Preconditions
- SUT khả dụng; workflow tạo hai tài khoản riêng để kiểm tra trước ngưỡng và tại ngưỡng độc lập.

## Test data
| Trường | Giá trị |
|---|---|
| preThresholdAccount | `{{extensionEmail2Pre}}` |
| thresholdAccount | `{{extensionEmail2Threshold}}` |
| password | `{{extensionPassword}}` |
| invalidPassword | `{{invalidPassword}}` |

## Test steps
1. Với tài khoản thứ nhất, đăng nhập sai hai lần rồi đăng nhập đúng; lần đúng phải thành công để chứng minh chưa bị khóa sớm.
2. Với tài khoản thứ hai, đăng nhập sai đúng ba lần liên tiếp.
3. Gửi request chính bằng credentials đúng của tài khoản thứ hai.
4. Kiểm tra tài khoản thứ hai đang bị khóa và response không có token/user.

## Expected result
- HTTP status: `403 hoặc 429`
- Content-Type: `application/json`
- `token` không được xuất hiện
- `user` không được xuất hiện
- Hai lần sai chưa được khóa; từ lần sai thứ ba trở đi credentials đúng phải bị từ chối trong thời gian lockout.

## Status / Related bugs
Failed / #71

## Automation mapping
- Data row: `TC-LOGIN-EXT-002`
- Coverage: `state-transition`, `security`
