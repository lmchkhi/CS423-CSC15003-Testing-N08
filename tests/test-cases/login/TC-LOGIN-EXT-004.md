# TC-LOGIN-EXT-004: Bộ đếm đăng nhập sai được cô lập theo tài khoản

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / State / State Transition

## Preconditions
- SUT khả dụng; workflow tạo hai tài khoản riêng ở trạng thái chưa bị khóa.

## Test data
| Trường | Giá trị |
|---|---|
| accountA | `{{extensionEmail4A}}` |
| accountB | `{{extensionEmail4B}}` |
| password | `{{extensionPassword}}` |
| invalidPassword | `{{invalidPassword}}` |

## Test steps
1. Tạo hai tài khoản A và B.
2. Xen kẽ hai lần đăng nhập sai cho A và hai lần cho B.
3. Đăng nhập đúng A trong workflow và đăng nhập đúng B bằng request chính.
4. Kiểm tra lỗi của tài khoản này không làm tăng counter hoặc khóa tài khoản kia.

## Expected result
- HTTP status: `200`
- Content-Type: `application/json`
- `token` phải tồn tại
- `user` phải tồn tại
- Mỗi tài khoản phải có state machine và login_attempts độc lập.

## Status / Related bugs
Failed / #71

## Automation mapping
- Data row: `TC-LOGIN-EXT-004`
- Coverage: `state-transition`, `security`
