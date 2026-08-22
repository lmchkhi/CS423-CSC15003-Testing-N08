# TC-LOGIN-EXT-003: Tự mở khóa tại biên thời gian 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
LOGIN / State / State Transition / Temporal BVA

## Preconditions
- SUT khả dụng; workflow tạo một tài khoản riêng và có thể chờ khoảng 30 giây.

## Test data
| Trường | Giá trị |
|---|---|
| email | `{{extensionEmail3}}` |
| password | `{{extensionPassword}}` |
| invalidPassword | `{{invalidPassword}}` |
| lockDuration | `30 giây` |

## Test steps
1. Tạo tài khoản riêng và đăng nhập sai ba lần để kích hoạt lockout.
2. Chờ 29 giây rồi thử credentials đúng; request phải còn bị từ chối.
3. Chờ thêm 1,5 giây và gửi request chính bằng credentials đúng.
4. Kiểm tra request sau mốc 30 giây thành công và trả JWT.

## Expected result
- HTTP status: `200`
- Content-Type: `application/json`
- `token` phải tồn tại
- `user` phải tồn tại
- Lockout phải hết hiệu lực từ mốc 30 giây theo FR-02.

## Status / Related bugs
Failed / #73

## Automation mapping
- Data row: `TC-LOGIN-EXT-003`
- Coverage: `state-transition`, `security`
